import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/reviews";
import Common "../types/common";

module {
  public func addReview(
    reviews : List.List<Types.Review>,
    nextId : Nat,
    userId : Common.UserId,
    input : Types.ReviewInput,
  ) : Types.Review {
    if (input.rating < 1 or input.rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let review : Types.Review = {
      id = nextId;
      productId = input.productId;
      userId = userId;
      rating = input.rating;
      comment = input.comment;
      createdAt = Time.now();
    };
    reviews.add(review);
    review
  };

  public func getReviews(
    reviews : List.List<Types.Review>,
    productId : Common.ProductId,
  ) : [Types.Review] {
    let pid = productId;
    reviews.filter(func(r : Types.Review) : Bool { return r.productId == pid }).toArray()
  };

  public func getUserReviews(
    reviews : List.List<Types.Review>,
    userId : Common.UserId,
  ) : [Types.Review] {
    let uid = userId;
    reviews.filter(func(r : Types.Review) : Bool { return r.userId == uid }).toArray()
  };

  public func deleteReview(
    reviews : List.List<Types.Review>,
    reviewId : Common.ReviewId,
    caller : Common.UserId,
  ) : Bool {
    let rid = reviewId;
    let existing = reviews.find(func(r : Types.Review) : Bool { return r.id == rid });
    switch (existing) {
      case null false;
      case (?r) {
        if (r.userId != caller) false
        else {
          let filtered = reviews.filter(func(rev : Types.Review) : Bool { return rev.id != rid });
          reviews.clear();
          reviews.append(filtered);
          true
        };
      };
    }
  };

  // Compute rating stats for a product
  public func getProductRatingStats(
    reviews : List.List<Types.Review>,
    productId : Common.ProductId,
  ) : { totalRating : Nat; count : Nat } {
    let pid = productId;
    let productReviews = reviews.filter(func(r : Types.Review) : Bool { return r.productId == pid });
    let count = productReviews.size();
    let totalRating = productReviews.foldLeft(0, func(acc : Nat, r : Types.Review) : Nat { acc + r.rating });
    { totalRating = totalRating; count = count }
  };
};
