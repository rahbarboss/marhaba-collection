import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReviewsLib "../lib/reviews";
import ProductsLib "../lib/products";
import Map "mo:core/Map";
import Types "../types/reviews";
import ProductsTypes "../types/products";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reviews : List.List<Types.Review>,
  products : Map.Map<Common.ProductId, ProductsTypes.Product>,
  initialReviewId : Nat,
) {
  var nextReviewId : Nat = initialReviewId;

  public shared ({ caller }) func addReview(input : Types.ReviewInput) : async Types.Review {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to review");
    };
    let review = ReviewsLib.addReview(reviews, nextReviewId, caller, input);
    nextReviewId += 1;
    // Update product rating
    let stats = ReviewsLib.getProductRatingStats(reviews, input.productId);
    ProductsLib.updateProductRating(products, input.productId, stats.totalRating, stats.count);
    review
  };

  public query func getReviews(productId : Common.ProductId) : async [Types.Review] {
    ReviewsLib.getReviews(reviews, productId)
  };

  public query ({ caller }) func getMyReviews() : async [Types.Review] {
    ReviewsLib.getUserReviews(reviews, caller)
  };

  public shared ({ caller }) func deleteReview(reviewId : Common.ReviewId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let deleted = ReviewsLib.deleteReview(reviews, reviewId, caller);
    deleted
  };
};
