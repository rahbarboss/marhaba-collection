import Common "common";

module {
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    address : ?{
      line1 : Text;
      line2 : Text;
      city : Text;
      state : Text;
      pincode : Text;
    };
    wishlist : [Common.ProductId];
    recentlyViewed : [Common.ProductId];
    rewardPoints : Nat;
    referralCode : Common.ReferralCode;
    referredBy : ?Common.ReferralCode;
    preferredLanguage : Text;
  };

  public type UserProfileInput = {
    name : Text;
    email : Text;
    phone : Text;
    address : ?{
      line1 : Text;
      line2 : Text;
      city : Text;
      state : Text;
      pincode : Text;
    };
    preferredLanguage : Text;
  };
};
