import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CouponsLib "../lib/coupons";
import Types "../types/coupons";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<Common.UserId, Types.Cart>,
  coupons : Map.Map<Common.CouponCode, Types.Coupon>,
) {
  public query ({ caller }) func getCart() : async Types.Cart {
    CouponsLib.getCart(carts, caller)
  };

  public shared ({ caller }) func addToCart(productId : Common.ProductId, quantity : Nat) : async () {
    CouponsLib.addToCart(carts, caller, productId, quantity)
  };

  public shared ({ caller }) func removeFromCart(productId : Common.ProductId) : async () {
    CouponsLib.removeFromCart(carts, caller, productId)
  };

  public shared ({ caller }) func updateCartItem(productId : Common.ProductId, quantity : Nat) : async () {
    CouponsLib.updateCartItem(carts, caller, productId, quantity)
  };

  public shared ({ caller }) func clearCart() : async () {
    CouponsLib.clearCart(carts, caller)
  };

  public shared ({ caller }) func applyCoupon(code : Common.CouponCode, orderTotal : Nat) : async Types.ApplyCouponResult {
    CouponsLib.applyCoupon(coupons, carts, caller, code, orderTotal)
  };

  public query func getAvailableCoupons(orderTotal : Nat) : async [Types.Coupon] {
    CouponsLib.getAvailableCoupons(coupons, orderTotal)
  };

  public query func getBestCoupon(orderTotal : Nat) : async ?Types.Coupon {
    CouponsLib.getBestCoupon(coupons, orderTotal)
  };

  // Admin coupon management
  public shared ({ caller }) func addCoupon(input : Types.CouponInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can manage coupons");
    };
    CouponsLib.addCoupon(coupons, input)
  };

  public shared ({ caller }) func updateCoupon(input : Types.CouponInput) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can manage coupons");
    };
    CouponsLib.updateCoupon(coupons, input)
  };

  public shared ({ caller }) func deleteCoupon(code : Common.CouponCode) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can manage coupons");
    };
    CouponsLib.deleteCoupon(coupons, code)
  };
};
