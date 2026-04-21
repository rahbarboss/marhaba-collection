import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrdersLib "../lib/orders";
import ProductsLib "../lib/products";
import Types "../types/orders";
import ProductsTypes "../types/products";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Common.OrderId, Types.Order>,
  products : Map.Map<Common.ProductId, ProductsTypes.Product>,
  initialOrderId : Nat,
) {
  var nextOrderId : Nat = initialOrderId;

  public shared ({ caller }) func placeOrder(input : Types.PlaceOrderInput) : async Types.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to place orders");
    };
    // Reduce stock for each item
    for (item in input.items.values()) {
      let ok = ProductsLib.reduceStock(products, item.productId, item.quantity);
      if (not ok) {
        Runtime.trap("Insufficient stock for product " # item.productId.toText());
      };
    };
    let order = OrdersLib.placeOrder(orders, nextOrderId, caller, input);
    nextOrderId += 1;
    order
  };

  public query ({ caller }) func getOrder(orderId : Common.OrderId) : async ?Types.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Admins can see any order
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return orders.get(orderId);
    };
    OrdersLib.getOrder(orders, orderId, caller)
  };

  public query ({ caller }) func getMyOrders() : async [Types.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    OrdersLib.getUserOrders(orders, caller)
  };

  public query ({ caller }) func getAllOrders() : async [Types.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrdersLib.getAllOrders(orders)
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Common.OrderId, newStatus : Types.OrderStatus) : async ?Types.Order {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrdersLib.updateOrderStatus(orders, orderId, newStatus)
  };
};
