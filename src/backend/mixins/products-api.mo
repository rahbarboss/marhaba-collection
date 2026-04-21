import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductsLib "../lib/products";
import Types "../types/products";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, Types.Product>,
  banners : Map.Map<Nat, Types.Banner>,
  initialProductId : Nat,
  initialBannerId : Nat,
) {
  var nextProductId : Nat = initialProductId;
  var nextBannerId : Nat = initialBannerId;

  // --- Public read endpoints ---

  public query func getProducts() : async [Types.Product] {
    ProductsLib.listProducts(products)
  };

  public query func getProduct(id : Common.ProductId) : async ?Types.Product {
    ProductsLib.getProduct(products, id)
  };

  public query func getProductsByCategory(category : Text) : async [Types.Product] {
    ProductsLib.getProductsByCategory(products, category)
  };

  public query func getFlashDeals() : async [Types.Product] {
    ProductsLib.getFlashDeals(products)
  };

  public query func getTrendingProducts() : async [Types.Product] {
    ProductsLib.getTrendingProducts(products)
  };

  public query func searchProducts(searchQuery : Text) : async [Types.Product] {
    ProductsLib.searchProducts(products, searchQuery)
  };

  public query func getCategories() : async [Text] {
    ProductsLib.getCategories(products)
  };

  public query func getBanners() : async [Types.Banner] {
    ProductsLib.listBanners(banners)
  };

  // --- Admin write endpoints ---

  public shared ({ caller }) func addProduct(input : Types.ProductInput) : async Types.Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product = ProductsLib.addProduct(products, nextProductId, input);
    nextProductId += 1;
    product
  };

  public shared ({ caller }) func updateProduct(id : Common.ProductId, input : Types.ProductInput) : async ?Types.Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductsLib.updateProduct(products, id, input)
  };

  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductsLib.deleteProduct(products, id)
  };

  public shared ({ caller }) func addBanner(input : Types.BannerInput) : async Types.Banner {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add banners");
    };
    let banner = ProductsLib.addBanner(banners, nextBannerId, input);
    nextBannerId += 1;
    banner
  };

  public shared ({ caller }) func updateBanner(id : Nat, input : Types.BannerInput) : async ?Types.Banner {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update banners");
    };
    ProductsLib.updateBanner(banners, id, input)
  };

  public shared ({ caller }) func deleteBanner(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete banners");
    };
    ProductsLib.deleteBanner(banners, id)
  };
};
