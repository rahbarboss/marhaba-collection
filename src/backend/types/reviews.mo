import Common "common";

module {
  public type Review = {
    id : Common.ReviewId;
    productId : Common.ProductId;
    userId : Common.UserId;
    rating : Nat;
    comment : Text;
    createdAt : Common.Timestamp;
  };

  public type ReviewInput = {
    productId : Common.ProductId;
    rating : Nat;
    comment : Text;
  };
};
