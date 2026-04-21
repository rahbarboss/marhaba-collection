import Common "common";

module {
  public type DiscountType = { #percent; #flat };

  public type Coupon = {
    code : Common.CouponCode;
    discountType : DiscountType;
    discountValue : Nat;
    minOrderValue : Nat;
    maxDiscount : Nat;
    isActive : Bool;
    expiresAt : Common.Timestamp;
    usageCount : Nat;
    maxUsage : Nat;
  };

  public type CouponInput = {
    code : Common.CouponCode;
    discountType : DiscountType;
    discountValue : Nat;
    minOrderValue : Nat;
    maxDiscount : Nat;
    isActive : Bool;
    expiresAt : Common.Timestamp;
    maxUsage : Nat;
  };

  public type CartItem = {
    productId : Common.ProductId;
    quantity : Nat;
  };

  public type Cart = {
    userId : Common.UserId;
    items : [CartItem];
    couponApplied : ?Common.CouponCode;
  };

  public type ApplyCouponResult = {
    isValid : Bool;
    discountAmount : Nat;
    message : Text;
  };
};
