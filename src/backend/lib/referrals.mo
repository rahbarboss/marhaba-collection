import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/referrals";
import Common "../types/common";

module {
  public func applyReferralCode(
    referrals : Map.Map<Common.ReferralCode, Types.Referral>,
    code : Common.ReferralCode,
    userId : Common.UserId,
  ) : Bool {
    switch (referrals.get(code)) {
      case null false;
      case (?referral) {
        // Can't use own code
        if (referral.ownerId == userId) return false;
        // Can't use same code twice
        let uid = userId;
        let alreadyUsed = referral.usedBy.find(func(id : Common.UserId) : Bool { return id == uid });
        if (alreadyUsed != null) return false;
        let updated : Types.Referral = {
          code = referral.code;
          ownerId = referral.ownerId;
          usedBy = referral.usedBy.concat([userId]);
          rewardPoints = referral.rewardPoints + 100;
        };
        referrals.add(code, updated);
        true
      };
    }
  };

  public func getReferral(
    referrals : Map.Map<Common.ReferralCode, Types.Referral>,
    code : Common.ReferralCode,
  ) : ?Types.Referral {
    referrals.get(code)
  };

  public func registerReferralCode(
    referrals : Map.Map<Common.ReferralCode, Types.Referral>,
    code : Common.ReferralCode,
    ownerId : Common.UserId,
  ) {
    switch (referrals.get(code)) {
      case (?_) {}; // Already registered
      case null {
        let referral : Types.Referral = {
          code = code;
          ownerId = ownerId;
          usedBy = [];
          rewardPoints = 0;
        };
        referrals.add(code, referral);
      };
    }
  };

  public func addNotification(
    notifications : List.List<Types.Notification>,
    nextId : Nat,
    userId : Common.UserId,
    notificationType : Types.NotificationType,
    title : Text,
    body : Text,
  ) : Types.Notification {
    let notification : Types.Notification = {
      id = nextId;
      userId = userId;
      notificationType = notificationType;
      title = title;
      body = body;
      isRead = false;
      createdAt = Time.now();
    };
    notifications.add(notification);
    notification
  };

  public func getNotifications(
    notifications : List.List<Types.Notification>,
    userId : Common.UserId,
  ) : [Types.Notification] {
    let uid = userId;
    notifications.filter(func(n : Types.Notification) : Bool { return n.userId == uid }).toArray()
  };

  public func markNotificationRead(
    notifications : List.List<Types.Notification>,
    notificationId : Common.NotificationId,
    userId : Common.UserId,
  ) : Bool {
    let nid = notificationId;
    let uid = userId;
    let existing = notifications.find(func(n : Types.Notification) : Bool { return n.id == nid and n.userId == uid });
    switch (existing) {
      case null false;
      case (?_) {
        notifications.mapInPlace(func(n : Types.Notification) : Types.Notification {
          if (n.id == nid and n.userId == uid) {
            let updated : Types.Notification = {
              id = n.id;
              userId = n.userId;
              notificationType = n.notificationType;
              title = n.title;
              body = n.body;
              isRead = true;
              createdAt = n.createdAt;
            };
            return updated
          };
          return n
        });
        true
      };
    }
  };
};
