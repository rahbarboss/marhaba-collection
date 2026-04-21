import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Types "../types/coupons";
import Common "../types/common";

module {
  public func getCart(
    carts : Map.Map<Common.UserId, Types.Cart>,
    userId : Common.UserId,
  ) : Types.Cart {
    switch (carts.get(userId)) {
      case (?cart) cart;
      case null {
        let empty : Types.Cart = { userId = userId; items = []; couponApplied = null };
        empty
      };
    }
  };

  public func addToCart(
    carts : Map.Map<Common.UserId, Types.Cart>,
    userId : Common.UserId,
    productId : Common.ProductId,
    quantity : Nat,
  ) {
    let cart = getCart(carts, userId);
    let pid = productId;
    let existing = cart.items.find(func(i : Types.CartItem) : Bool { return i.productId == pid });
    let newItems = switch (existing) {
      case (?_) {
        cart.items.map(func(i : Types.CartItem) : Types.CartItem {
          if (i.productId == pid) {
            let u : Types.CartItem = { productId = i.productId; quantity = i.quantity + quantity };
            return u
          };
          return i
        })
      };
      case null {
        cart.items.concat([{ productId = productId; quantity = quantity }])
      };
    };
    let newCart : Types.Cart = { userId = cart.userId; items = newItems; couponApplied = cart.couponApplied };
    carts.add(userId, newCart);
  };

  public func removeFromCart(
    carts : Map.Map<Common.UserId, Types.Cart>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) {
    let cart = getCart(carts, userId);
    let pid = productId;
    let filtered = cart.items.filter(func(i : Types.CartItem) : Bool { return i.productId != pid });
    let newCart : Types.Cart = { userId = cart.userId; items = filtered; couponApplied = cart.couponApplied };
    carts.add(userId, newCart);
  };

  public func updateCartItem(
    carts : Map.Map<Common.UserId, Types.Cart>,
    userId : Common.UserId,
    productId : Common.ProductId,
    quantity : Nat,
  ) {
    let cart = getCart(carts, userId);
    let pid = productId;
    let qty = quantity;
    let updated = cart.items.map(func(i : Types.CartItem) : Types.CartItem {
      if (i.productId == pid) {
        let u : Types.CartItem = { productId = i.productId; quantity = qty };
        return u
      };
      return i
    });
    let newCart : Types.Cart = { userId = cart.userId; items = updated; couponApplied = cart.couponApplied };
    carts.add(userId, newCart);
  };

  public func clearCart(
    carts : Map.Map<Common.UserId, Types.Cart>,
    userId : Common.UserId,
  ) {
    let cart = getCart(carts, userId);
    let newCart : Types.Cart = { userId = cart.userId; items = []; couponApplied = null };
    carts.add(userId, newCart);
  };

  public func applyCoupon(
    coupons : Map.Map<Common.CouponCode, Types.Coupon>,
    carts : Map.Map<Common.UserId, Types.Cart>,
    userId : Common.UserId,
    code : Common.CouponCode,
    orderTotal : Nat,
  ) : Types.ApplyCouponResult {
    switch (coupons.get(code)) {
      case null {
        let r : Types.ApplyCouponResult = { isValid = false; discountAmount = 0; message = "Coupon not found" };
        r
      };
      case (?coupon) {
        if (not coupon.isActive) {
          return { isValid = false; discountAmount = 0; message = "Coupon is inactive" };
        };
        let now = Time.now();
        if (now > coupon.expiresAt) {
          return { isValid = false; discountAmount = 0; message = "Coupon has expired" };
        };
        if (orderTotal < coupon.minOrderValue) {
          return {
            isValid = false;
            discountAmount = 0;
            message = "Minimum order value of Rs." # coupon.minOrderValue.toText() # " required";
          };
        };
        if (coupon.usageCount >= coupon.maxUsage) {
          return { isValid = false; discountAmount = 0; message = "Coupon usage limit reached" };
        };
        let rawDiscount = switch (coupon.discountType) {
          case (#percent) orderTotal * coupon.discountValue / 100;
          case (#flat) coupon.discountValue;
        };
        let discountAmount = if (rawDiscount > coupon.maxDiscount and coupon.maxDiscount > 0)
          coupon.maxDiscount else rawDiscount;
        let updatedCoupon : Types.Coupon = {
          code = coupon.code;
          discountType = coupon.discountType;
          discountValue = coupon.discountValue;
          minOrderValue = coupon.minOrderValue;
          maxDiscount = coupon.maxDiscount;
          isActive = coupon.isActive;
          expiresAt = coupon.expiresAt;
          usageCount = coupon.usageCount + 1;
          maxUsage = coupon.maxUsage;
        };
        coupons.add(code, updatedCoupon);
        let cart = getCart(carts, userId);
        let newCart : Types.Cart = { userId = cart.userId; items = cart.items; couponApplied = ?code };
        carts.add(userId, newCart);
        { isValid = true; discountAmount = discountAmount; message = "Coupon applied! You save Rs." # discountAmount.toText() };
      };
    }
  };

  public func getAvailableCoupons(
    coupons : Map.Map<Common.CouponCode, Types.Coupon>,
    orderTotal : Nat,
  ) : [Types.Coupon] {
    let now = Time.now();
    let tot = orderTotal;
    coupons.values().filter(func(c : Types.Coupon) : Bool {
      return c.isActive and now <= c.expiresAt and tot >= c.minOrderValue and c.usageCount < c.maxUsage
    }).toArray()
  };

  public func getBestCoupon(
    coupons : Map.Map<Common.CouponCode, Types.Coupon>,
    orderTotal : Nat,
  ) : ?Types.Coupon {
    let available = getAvailableCoupons(coupons, orderTotal);
    if (available.size() == 0) return null;
    var best = available[0];
    var bestDiscount = calcDiscount(best, orderTotal);
    for (c in available.values()) {
      let d = calcDiscount(c, orderTotal);
      if (d > bestDiscount) {
        best := c;
        bestDiscount := d;
      };
    };
    ?best
  };

  public func addCoupon(
    coupons : Map.Map<Common.CouponCode, Types.Coupon>,
    input : Types.CouponInput,
  ) {
    let coupon : Types.Coupon = {
      code = input.code;
      discountType = input.discountType;
      discountValue = input.discountValue;
      minOrderValue = input.minOrderValue;
      maxDiscount = input.maxDiscount;
      isActive = input.isActive;
      expiresAt = input.expiresAt;
      usageCount = 0;
      maxUsage = input.maxUsage;
    };
    coupons.add(input.code, coupon);
  };

  public func updateCoupon(
    coupons : Map.Map<Common.CouponCode, Types.Coupon>,
    input : Types.CouponInput,
  ) : Bool {
    switch (coupons.get(input.code)) {
      case null false;
      case (?existing) {
        let updated : Types.Coupon = {
          code = existing.code;
          discountType = input.discountType;
          discountValue = input.discountValue;
          minOrderValue = input.minOrderValue;
          maxDiscount = input.maxDiscount;
          isActive = input.isActive;
          expiresAt = input.expiresAt;
          usageCount = existing.usageCount;
          maxUsage = input.maxUsage;
        };
        coupons.add(input.code, updated);
        true
      };
    }
  };

  public func deleteCoupon(
    coupons : Map.Map<Common.CouponCode, Types.Coupon>,
    code : Common.CouponCode,
  ) : Bool {
    switch (coupons.get(code)) {
      case null false;
      case (?_) {
        coupons.remove(code);
        true
      };
    }
  };

  private func calcDiscount(coupon : Types.Coupon, orderTotal : Nat) : Nat {
    let raw = switch (coupon.discountType) {
      case (#percent) orderTotal * coupon.discountValue / 100;
      case (#flat) coupon.discountValue;
    };
    if (raw > coupon.maxDiscount and coupon.maxDiscount > 0) coupon.maxDiscount else raw
  };
};
