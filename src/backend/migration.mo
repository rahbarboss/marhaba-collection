// Migration: drop stable var counters nextBannerId, nextNotificationId,
// nextOrderId, nextProductId, nextReviewId that were replaced by
// Map.maxEntry()+1 ID generation. All other stable state passes through
// unchanged (compatible implicit migration for maps and lists).
module {
  type OldActor = {
    var nextBannerId : Nat;
    var nextNotificationId : Nat;
    var nextOrderId : Nat;
    var nextProductId : Nat;
    var nextReviewId : Nat;
    var seeded : Bool;
  };

  type NewActor = {
    var seeded : Bool;
  };

  public func run(old : OldActor) : NewActor {
    // Intentionally discard the five counter fields; their role is now
    // fulfilled by Map.maxEntry()+1 at call-site.
    { var seeded = old.seeded };
  };
};
