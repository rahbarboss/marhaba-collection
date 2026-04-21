import Map "mo:core/Map";
import Text "mo:core/Text";
import Types "../types/users";
import Common "../types/common";

module {
  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : ?Types.UserProfile {
    profiles.get(userId)
  };

  public func saveProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    input : Types.UserProfileInput,
    existingReferralCode : ?Common.ReferralCode,
  ) : Types.UserProfile {
    let referralCode = switch (existingReferralCode) {
      case (?code) code;
      case null generateCode(userId);
    };
    let existing = profiles.get(userId);
    let wishlist = switch (existing) { case (?p) p.wishlist; case null [] };
    let recentlyViewed = switch (existing) { case (?p) p.recentlyViewed; case null [] };
    let rewardPoints = switch (existing) { case (?p) p.rewardPoints; case null 0 };
    let referredBy = switch (existing) { case (?p) p.referredBy; case null null };
    let profile : Types.UserProfile = {
      name = input.name;
      email = input.email;
      phone = input.phone;
      address = input.address;
      wishlist = wishlist;
      recentlyViewed = recentlyViewed;
      rewardPoints = rewardPoints;
      referralCode = referralCode;
      referredBy = referredBy;
      preferredLanguage = input.preferredLanguage;
    };
    profiles.add(userId, profile);
    profile
  };

  public func addToWishlist(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) : Bool {
    switch (profiles.get(userId)) {
      case null false;
      case (?p) {
        let pid = productId;
        let already = p.wishlist.find(func(id : Common.ProductId) : Bool { return id == pid });
        if (already != null) return true;
        let updated : Types.UserProfile = {
          name = p.name;
          email = p.email;
          phone = p.phone;
          address = p.address;
          wishlist = p.wishlist.concat([productId]);
          recentlyViewed = p.recentlyViewed;
          rewardPoints = p.rewardPoints;
          referralCode = p.referralCode;
          referredBy = p.referredBy;
          preferredLanguage = p.preferredLanguage;
        };
        profiles.add(userId, updated);
        true
      };
    }
  };

  public func removeFromWishlist(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) : Bool {
    switch (profiles.get(userId)) {
      case null false;
      case (?p) {
        let pid = productId;
        let filtered = p.wishlist.filter(func(id : Common.ProductId) : Bool { return id != pid });
        let updated : Types.UserProfile = {
          name = p.name;
          email = p.email;
          phone = p.phone;
          address = p.address;
          wishlist = filtered;
          recentlyViewed = p.recentlyViewed;
          rewardPoints = p.rewardPoints;
          referralCode = p.referralCode;
          referredBy = p.referredBy;
          preferredLanguage = p.preferredLanguage;
        };
        profiles.add(userId, updated);
        true
      };
    }
  };

  public func getWishlist(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : [Common.ProductId] {
    switch (profiles.get(userId)) {
      case null [];
      case (?p) p.wishlist;
    }
  };

  public func trackRecentlyViewed(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) {
    switch (profiles.get(userId)) {
      case null {};
      case (?p) {
        let pid = productId;
        let filtered = p.recentlyViewed.filter(func(id : Common.ProductId) : Bool { return id != pid });
        let newId : [Common.ProductId] = [productId];
        let withNew = newId.concat(filtered);
        let capped = if (withNew.size() > 20) withNew.sliceToArray(0, 20) else withNew;
        let updated : Types.UserProfile = {
          name = p.name;
          email = p.email;
          phone = p.phone;
          address = p.address;
          wishlist = p.wishlist;
          recentlyViewed = capped;
          rewardPoints = p.rewardPoints;
          referralCode = p.referralCode;
          referredBy = p.referredBy;
          preferredLanguage = p.preferredLanguage;
        };
        profiles.add(userId, updated);
      };
    }
  };

  public func getRecentlyViewed(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : [Common.ProductId] {
    switch (profiles.get(userId)) {
      case null [];
      case (?p) p.recentlyViewed;
    }
  };

  public func addRewardPoints(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    points : Nat,
  ) {
    switch (profiles.get(userId)) {
      case null {};
      case (?p) {
        let updated : Types.UserProfile = {
          name = p.name;
          email = p.email;
          phone = p.phone;
          address = p.address;
          wishlist = p.wishlist;
          recentlyViewed = p.recentlyViewed;
          rewardPoints = p.rewardPoints + points;
          referralCode = p.referralCode;
          referredBy = p.referredBy;
          preferredLanguage = p.preferredLanguage;
        };
        profiles.add(userId, updated);
      };
    }
  };

  public func redeemRewards(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    points : Nat,
  ) : Bool {
    switch (profiles.get(userId)) {
      case null false;
      case (?p) {
        if (p.rewardPoints < points) false
        else {
          let updated : Types.UserProfile = {
            name = p.name;
            email = p.email;
            phone = p.phone;
            address = p.address;
            wishlist = p.wishlist;
            recentlyViewed = p.recentlyViewed;
            rewardPoints = p.rewardPoints - points;
            referralCode = p.referralCode;
            referredBy = p.referredBy;
            preferredLanguage = p.preferredLanguage;
          };
          profiles.add(userId, updated);
          true
        };
      };
    }
  };

  public func getAllUsers(
    profiles : Map.Map<Common.UserId, Types.UserProfile>
  ) : [(Common.UserId, Types.UserProfile)] {
    profiles.entries().toArray()
  };

  public func generateUniqueReferralCode(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : Common.ReferralCode {
    switch (profiles.get(userId)) {
      case (?p) {
        if (p.referralCode != "") return p.referralCode;
        let code = generateCode(userId);
        let updated : Types.UserProfile = {
          name = p.name;
          email = p.email;
          phone = p.phone;
          address = p.address;
          wishlist = p.wishlist;
          recentlyViewed = p.recentlyViewed;
          rewardPoints = p.rewardPoints;
          referralCode = code;
          referredBy = p.referredBy;
          preferredLanguage = p.preferredLanguage;
        };
        profiles.add(userId, updated);
        code
      };
      case null generateCode(userId);
    }
  };

  // Generate a 6-char alphanumeric referral code from principal text
  public func generateCode(userId : Common.UserId) : Common.ReferralCode {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charArr = chars.toArray();
    let pidText = userId.toText();
    let pidChars = pidText.toArray();
    var code = "";
    var i = 0;
    let pLen = pidChars.size();
    while (i < 6) {
      let charCode = pidChars[i % pLen].toNat32().toNat();
      let idx = (charCode + i * 13) % 36;
      code := code # Text.fromChar(charArr[idx]);
      i += 1;
    };
    code
  };
};
