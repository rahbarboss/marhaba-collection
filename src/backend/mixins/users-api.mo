import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UsersLib "../lib/users";
import ReferralsLib "../lib/referrals";
import Types "../types/users";
import ReferralsTypes "../types/referrals";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Common.UserId, Types.UserProfile>,
  referrals : Map.Map<Common.ReferralCode, ReferralsTypes.Referral>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?Types.UserProfile {
    profiles.get(caller)
  };

  public shared ({ caller }) func saveCallerUserProfile(input : Types.UserProfileInput) : async Types.UserProfile {
    let existing = profiles.get(caller);
    let existingCode = switch (existing) { case (?p) ?p.referralCode; case null null };
    let profile = UsersLib.saveProfile(profiles, caller, input, existingCode);
    // Register referral code
    ReferralsLib.registerReferralCode(referrals, profile.referralCode, caller);
    profile
  };

  public query ({ caller }) func getUserProfile(userId : Common.UserId) : async ?Types.UserProfile {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    profiles.get(userId)
  };

  public query ({ caller }) func getAllUsers() : async [(Common.UserId, Types.UserProfile)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };
    UsersLib.getAllUsers(profiles)
  };

  public shared ({ caller }) func addToWishlist(productId : Common.ProductId) : async Bool {
    UsersLib.addToWishlist(profiles, caller, productId)
  };

  public shared ({ caller }) func removeFromWishlist(productId : Common.ProductId) : async Bool {
    UsersLib.removeFromWishlist(profiles, caller, productId)
  };

  public query ({ caller }) func getWishlist() : async [Common.ProductId] {
    UsersLib.getWishlist(profiles, caller)
  };

  public shared ({ caller }) func trackRecentlyViewed(productId : Common.ProductId) : async () {
    UsersLib.trackRecentlyViewed(profiles, caller, productId)
  };

  public query ({ caller }) func getRecentlyViewed() : async [Common.ProductId] {
    UsersLib.getRecentlyViewed(profiles, caller)
  };

  public query ({ caller }) func getRewards() : async Nat {
    switch (profiles.get(caller)) {
      case null 0;
      case (?p) p.rewardPoints;
    }
  };

  public shared ({ caller }) func redeemRewards(points : Nat) : async Bool {
    UsersLib.redeemRewards(profiles, caller, points)
  };

  public shared ({ caller }) func generateReferralCode() : async Common.ReferralCode {
    let code = UsersLib.generateUniqueReferralCode(profiles, caller);
    ReferralsLib.registerReferralCode(referrals, code, caller);
    code
  };
};
