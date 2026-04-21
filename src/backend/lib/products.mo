import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Types "../types/products";
import Common "../types/common";

module {
  public func listProducts(
    products : Map.Map<Common.ProductId, Types.Product>
  ) : [Types.Product] {
    products.values().toArray()
  };

  public func getProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
  ) : ?Types.Product {
    products.get(id)
  };

  public func getProductsByCategory(
    products : Map.Map<Common.ProductId, Types.Product>,
    category : Text,
  ) : [Types.Product] {
    let lower = category.toLower();
    products.values().filter(func(p : Types.Product) : Bool { return p.category.toLower() == lower }).toArray()
  };

  public func getFlashDeals(
    products : Map.Map<Common.ProductId, Types.Product>
  ) : [Types.Product] {
    products.values().filter(func(p : Types.Product) : Bool { return p.isFlashDeal }).toArray()
  };

  public func getTrendingProducts(
    products : Map.Map<Common.ProductId, Types.Product>
  ) : [Types.Product] {
    products.values().filter(func(p : Types.Product) : Bool { return p.isTrending }).toArray()
  };

  public func searchProducts(
    products : Map.Map<Common.ProductId, Types.Product>,
    searchTerm : Text,
  ) : [Types.Product] {
    let lower = searchTerm.toLower();
    products.values().filter(func(p : Types.Product) : Bool {
      return p.name.toLower().contains(#text lower) or
        p.category.toLower().contains(#text lower) or
        p.description.toLower().contains(#text lower)
    }).toArray()
  };

  public func addProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    nextId : Nat,
    input : Types.ProductInput,
  ) : Types.Product {
    let product : Types.Product = {
      id = nextId;
      name = input.name;
      description = input.description;
      price = input.price;
      originalPrice = input.originalPrice;
      images = input.images;
      category = input.category;
      stock = input.stock;
      rating = 0.0;
      reviewCount = 0;
      specifications = input.specifications;
      isFlashDeal = input.isFlashDeal;
      isTrending = input.isTrending;
      tags = input.tags;
      createdAt = Time.now();
    };
    products.add(nextId, product);
    product
  };

  public func updateProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
    input : Types.ProductInput,
  ) : ?Types.Product {
    switch (products.get(id)) {
      case null null;
      case (?existing) {
        let updated : Types.Product = {
          id = existing.id;
          name = input.name;
          description = input.description;
          price = input.price;
          originalPrice = input.originalPrice;
          images = input.images;
          category = input.category;
          stock = input.stock;
          rating = existing.rating;
          reviewCount = existing.reviewCount;
          specifications = input.specifications;
          isFlashDeal = input.isFlashDeal;
          isTrending = input.isTrending;
          tags = input.tags;
          createdAt = existing.createdAt;
        };
        products.add(id, updated);
        ?updated
      };
    }
  };

  public func deleteProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
  ) : Bool {
    switch (products.get(id)) {
      case null false;
      case (?_) {
        products.remove(id);
        true
      };
    }
  };

  public func listBanners(
    banners : Map.Map<Nat, Types.Banner>
  ) : [Types.Banner] {
    banners.values().toArray()
  };

  public func addBanner(
    banners : Map.Map<Nat, Types.Banner>,
    nextId : Nat,
    input : Types.BannerInput,
  ) : Types.Banner {
    let banner : Types.Banner = {
      id = nextId;
      image = input.image;
      title = input.title;
      subtitle = input.subtitle;
      linkUrl = input.linkUrl;
      order = input.order;
      isActive = input.isActive;
    };
    banners.add(nextId, banner);
    banner
  };

  public func updateBanner(
    banners : Map.Map<Nat, Types.Banner>,
    id : Nat,
    input : Types.BannerInput,
  ) : ?Types.Banner {
    switch (banners.get(id)) {
      case null null;
      case (?_) {
        let updated : Types.Banner = {
          id = id;
          image = input.image;
          title = input.title;
          subtitle = input.subtitle;
          linkUrl = input.linkUrl;
          order = input.order;
          isActive = input.isActive;
        };
        banners.add(id, updated);
        ?updated
      };
    }
  };

  public func deleteBanner(
    banners : Map.Map<Nat, Types.Banner>,
    id : Nat,
  ) : Bool {
    switch (banners.get(id)) {
      case null false;
      case (?_) {
        banners.remove(id);
        true
      };
    }
  };

  public func getCategories(
    products : Map.Map<Common.ProductId, Types.Product>
  ) : [Text] {
    let seen = Set.empty<Text>();
    for ((_, p) in products.entries()) {
      seen.add(p.category);
    };
    seen.values().toArray()
  };

  // Update product rating after new review added
  public func updateProductRating(
    products : Map.Map<Common.ProductId, Types.Product>,
    productId : Common.ProductId,
    totalRating : Nat,
    reviewCount : Nat,
  ) {
    switch (products.get(productId)) {
      case null {};
      case (?p) {
        let newRating : Float = if (reviewCount == 0) 0.0
          else totalRating.toInt().toFloat() / reviewCount.toInt().toFloat();
        let updated : Types.Product = {
          id = p.id;
          name = p.name;
          description = p.description;
          price = p.price;
          originalPrice = p.originalPrice;
          images = p.images;
          category = p.category;
          stock = p.stock;
          rating = newRating;
          reviewCount = reviewCount;
          specifications = p.specifications;
          isFlashDeal = p.isFlashDeal;
          isTrending = p.isTrending;
          tags = p.tags;
          createdAt = p.createdAt;
        };
        products.add(productId, updated);
      };
    }
  };

  // Reduce stock when order placed
  public func reduceStock(
    products : Map.Map<Common.ProductId, Types.Product>,
    productId : Common.ProductId,
    quantity : Nat,
  ) : Bool {
    switch (products.get(productId)) {
      case null false;
      case (?p) {
        if (p.stock < quantity) false
        else {
          let updated : Types.Product = {
            id = p.id;
            name = p.name;
            description = p.description;
            price = p.price;
            originalPrice = p.originalPrice;
            images = p.images;
            category = p.category;
            stock = p.stock - quantity;
            rating = p.rating;
            reviewCount = p.reviewCount;
            specifications = p.specifications;
            isFlashDeal = p.isFlashDeal;
            isTrending = p.isTrending;
            tags = p.tags;
            createdAt = p.createdAt;
          };
          products.add(productId, updated);
          true
        };
      };
    }
  };
};
