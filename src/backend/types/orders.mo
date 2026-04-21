import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type OrderStatus = {
    #ordered;
    #packed;
    #shipped;
    #out_for_delivery;
    #delivered;
    #cancelled;
  };

  public type PaymentMethod = {
    #upi;
    #card;
    #wallet;
    #cod;
    #split : { method1 : Text; amount1 : Nat; method2 : Text; amount2 : Nat };
  };

  public type PaymentStatus = { #pending; #paid; #failed; #refunded };

  public type OrderItem = {
    productId : Common.ProductId;
    name : Text;
    price : Nat;
    quantity : Nat;
    image : Storage.ExternalBlob;
  };

  public type Address = {
    name : Text;
    phone : Text;
    line1 : Text;
    line2 : Text;
    city : Text;
    state : Text;
    pincode : Text;
  };

  public type TrackingStep = {
    status : OrderStatus;
    timestamp : ?Common.Timestamp;
    note : Text;
  };

  public type Order = {
    id : Common.OrderId;
    userId : Common.UserId;
    items : [OrderItem];
    totalAmount : Nat;
    discountAmount : Nat;
    couponApplied : ?Text;
    status : OrderStatus;
    paymentMethod : PaymentMethod;
    paymentStatus : PaymentStatus;
    address : Address;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    trackingSteps : [TrackingStep];
  };

  public type PlaceOrderInput = {
    items : [OrderItem];
    totalAmount : Nat;
    discountAmount : Nat;
    couponApplied : ?Text;
    paymentMethod : PaymentMethod;
    address : Address;
  };
};
