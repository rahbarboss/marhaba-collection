import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReferralsLib "../lib/referrals";
import UsersLib "../lib/users";
import Types "../types/referrals";
import UsersTypes "../types/users";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  referrals : Map.Map<Common.ReferralCode, Types.Referral>,
  profiles : Map.Map<Common.UserId, UsersTypes.UserProfile>,
  notifications : List.List<Types.Notification>,
  initialNotificationId : Nat,
) {
  var nextNotificationId : Nat = initialNotificationId;

  public shared ({ caller }) func applyReferralCode(code : Common.ReferralCode) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to apply referral code");
    };
    let success = ReferralsLib.applyReferralCode(referrals, code, caller);
    if (success) {
      // Award 100 reward points to both referrer and referee
      switch (referrals.get(code)) {
        case (?r) {
          UsersLib.addRewardPoints(profiles, r.ownerId, 100);
          UsersLib.addRewardPoints(profiles, caller, 100);
          // Send notification to referrer
          let _ = ReferralsLib.addNotification(
            notifications, nextNotificationId, r.ownerId,
            #reward, "Referral Bonus!", "Someone used your referral code. You earned 100 points!"
          );
          nextNotificationId += 1;
        };
        case null {};
      };
    };
    success
  };

  public query ({ caller }) func getNotifications() : async [Types.Notification] {
    ReferralsLib.getNotifications(notifications, caller)
  };

  public shared ({ caller }) func markNotificationRead(notificationId : Common.NotificationId) : async Bool {
    ReferralsLib.markNotificationRead(notifications, notificationId, caller)
  };

  // Admin can send notifications to any user
  public shared ({ caller }) func sendNotification(
    userId : Common.UserId,
    notificationType : Types.NotificationType,
    title : Text,
    body : Text,
  ) : async Types.Notification {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can send notifications");
    };
    let notif = ReferralsLib.addNotification(notifications, nextNotificationId, userId, notificationType, title, body);
    nextNotificationId += 1;
    notif
  };
};
