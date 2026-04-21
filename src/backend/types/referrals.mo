import Common "common";

module {
  public type Referral = {
    code : Common.ReferralCode;
    ownerId : Common.UserId;
    usedBy : [Common.UserId];
    rewardPoints : Nat;
  };

  public type Notification = {
    id : Common.NotificationId;
    userId : Common.UserId;
    notificationType : NotificationType;
    title : Text;
    body : Text;
    isRead : Bool;
    createdAt : Common.Timestamp;
  };

  public type NotificationType = { #deal; #order; #price_drop; #reward };
};
