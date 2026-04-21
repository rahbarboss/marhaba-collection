import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/orders";
import Common "../types/common";

module {
  public func placeOrder(
    orders : Map.Map<Common.OrderId, Types.Order>,
    nextId : Nat,
    userId : Common.UserId,
    input : Types.PlaceOrderInput,
  ) : Types.Order {
    let initialStep : Types.TrackingStep = {
      status = #ordered;
      timestamp = ?Time.now();
      note = "Order placed successfully";
    };
    let order : Types.Order = {
      id = nextId;
      userId = userId;
      items = input.items;
      totalAmount = input.totalAmount;
      discountAmount = input.discountAmount;
      couponApplied = input.couponApplied;
      status = #ordered;
      paymentMethod = input.paymentMethod;
      paymentStatus = #paid;
      address = input.address;
      createdAt = Time.now();
      updatedAt = Time.now();
      trackingSteps = [initialStep];
    };
    orders.add(nextId, order);
    order
  };

  public func getOrder(
    orders : Map.Map<Common.OrderId, Types.Order>,
    orderId : Common.OrderId,
    caller : Common.UserId,
  ) : ?Types.Order {
    switch (orders.get(orderId)) {
      case null null;
      case (?o) {
        if (o.userId == caller) ?o else null
      };
    }
  };

  public func getUserOrders(
    orders : Map.Map<Common.OrderId, Types.Order>,
    userId : Common.UserId,
  ) : [Types.Order] {
    let uid = userId;
    orders.values().filter(func(o : Types.Order) : Bool { return o.userId == uid }).toArray()
  };

  public func getAllOrders(
    orders : Map.Map<Common.OrderId, Types.Order>
  ) : [Types.Order] {
    orders.values().toArray()
  };

  public func updateOrderStatus(
    orders : Map.Map<Common.OrderId, Types.Order>,
    orderId : Common.OrderId,
    newStatus : Types.OrderStatus,
  ) : ?Types.Order {
    switch (orders.get(orderId)) {
      case null null;
      case (?o) {
        let newStep : Types.TrackingStep = {
          status = newStatus;
          timestamp = ?Time.now();
          note = statusNote(newStatus);
        };
        let updatedSteps = o.trackingSteps.concat([newStep]);
        let updated : Types.Order = {
          id = o.id;
          userId = o.userId;
          items = o.items;
          totalAmount = o.totalAmount;
          discountAmount = o.discountAmount;
          couponApplied = o.couponApplied;
          status = newStatus;
          paymentMethod = o.paymentMethod;
          paymentStatus = o.paymentStatus;
          address = o.address;
          createdAt = o.createdAt;
          updatedAt = Time.now();
          trackingSteps = updatedSteps;
        };
        orders.add(orderId, updated);
        ?updated
      };
    }
  };

  private func statusNote(status : Types.OrderStatus) : Text {
    switch (status) {
      case (#ordered) "Order placed";
      case (#packed) "Order has been packed";
      case (#shipped) "Order has been shipped";
      case (#out_for_delivery) "Out for delivery";
      case (#delivered) "Order delivered";
      case (#cancelled) "Order cancelled";
    }
  };
};
