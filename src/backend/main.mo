import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Storage "mo:caffeineai-object-storage/Storage";
import ProductsTypes "types/products";
import OrdersTypes "types/orders";
import UsersTypes "types/users";
import CouponsTypes "types/coupons";
import ReviewsTypes "types/reviews";
import ReferralsTypes "types/referrals";
import Common "types/common";
import ProductsApi "mixins/products-api";
import OrdersApi "mixins/orders-api";
import UsersApi "mixins/users-api";
import CouponsApi "mixins/coupons-api";
import ReviewsApi "mixins/reviews-api";
import ReferralsApi "mixins/referrals-api";
import ProductsLib "lib/products";
import CouponsLib "lib/coupons";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // Products & Banners state
  let products = Map.empty<Common.ProductId, ProductsTypes.Product>();
  let banners = Map.empty<Nat, ProductsTypes.Banner>();

  // Orders state
  let orders = Map.empty<Common.OrderId, OrdersTypes.Order>();

  // Users state
  let profiles = Map.empty<Common.UserId, UsersTypes.UserProfile>();

  // Coupons & Cart state
  let carts = Map.empty<Common.UserId, CouponsTypes.Cart>();
  let coupons = Map.empty<Common.CouponCode, CouponsTypes.Coupon>();

  // Reviews state
  let reviews = List.empty<ReviewsTypes.Review>();

  // Referrals & Notifications state
  let referrals = Map.empty<Common.ReferralCode, ReferralsTypes.Referral>();
  let notifications = List.empty<ReferralsTypes.Notification>();

  // Seed flag
  var seeded : Bool = false;

  // Mixin inclusions
  include ProductsApi(accessControlState, products, banners, 1, 1);
  include OrdersApi(accessControlState, orders, products, 1);
  include UsersApi(accessControlState, profiles, referrals);
  include CouponsApi(accessControlState, carts, coupons);
  include ReviewsApi(accessControlState, reviews, products, 1);
  include ReferralsApi(accessControlState, referrals, profiles, notifications, 1);

  // Seed sample data (idempotent — runs only once)
  public shared func seedSampleData() : async Text {
    if (seeded) return "Already seeded";

    // Empty blob for placeholder images
    let emptyBlob : Storage.ExternalBlob = "" : Blob;
    let far : Common.Timestamp = 9999999999000000000; // far future expiry

    // Seed 10 products across 5 categories
    let productSeeds : [ProductsTypes.ProductInput] = [
      // Electronics
      {
        name = "Samsung Galaxy S24 Ultra";
        description = "Latest flagship smartphone with 200MP camera, AI features, and S Pen.";
        price = 124999;
        originalPrice = 134999;
        images = [emptyBlob];
        category = "Electronics";
        stock = 50;
        specifications = [
          { key = "RAM"; value = "12GB" },
          { key = "Storage"; value = "256GB" },
          { key = "Display"; value = "6.8 inch Dynamic AMOLED" },
          { key = "Battery"; value = "5000mAh" },
        ];
        isFlashDeal = true;
        isTrending = true;
        tags = ["smartphone", "samsung", "5g", "android"];
      },
      {
        name = "Apple MacBook Pro M3";
        description = "Professional laptop with M3 chip, 18-hour battery life and Liquid Retina display.";
        price = 199999;
        originalPrice = 219999;
        images = [emptyBlob];
        category = "Electronics";
        stock = 30;
        specifications = [
          { key = "Chip"; value = "Apple M3 Pro" },
          { key = "RAM"; value = "18GB" },
          { key = "Storage"; value = "512GB SSD" },
          { key = "Display"; value = "14 inch Liquid Retina" },
        ];
        isFlashDeal = false;
        isTrending = true;
        tags = ["laptop", "apple", "macbook", "professional"];
      },
      // Fashion
      {
        name = "Luxury Silk Kurta Set";
        description = "Premium hand-embroidered silk kurta with matching palazzo pants. Perfect for festive occasions.";
        price = 8999;
        originalPrice = 14999;
        images = [emptyBlob];
        category = "Fashion";
        stock = 100;
        specifications = [
          { key = "Material"; value = "Pure Silk" },
          { key = "Sizes"; value = "S, M, L, XL, XXL" },
          { key = "Care"; value = "Dry Clean Only" },
        ];
        isFlashDeal = true;
        isTrending = false;
        tags = ["kurta", "silk", "ethnic", "festive"];
      },
      {
        name = "Designer Leather Handbag";
        description = "Italian leather handbag with gold-finish hardware. Spacious interior with multiple compartments.";
        price = 12999;
        originalPrice = 18999;
        images = [emptyBlob];
        category = "Fashion";
        stock = 75;
        specifications = [
          { key = "Material"; value = "Genuine Italian Leather" },
          { key = "Color"; value = "Tan Brown" },
          { key = "Dimensions"; value = "32 x 24 x 12 cm" },
        ];
        isFlashDeal = false;
        isTrending = true;
        tags = ["handbag", "leather", "luxury", "women"];
      },
      // Home
      {
        name = "Smart Home Hub - Rahbar Edition";
        description = "Control all your smart devices from one elegant hub. Compatible with Alexa, Google Home.";
        price = 4999;
        originalPrice = 6999;
        images = [emptyBlob];
        category = "Home";
        stock = 200;
        specifications = [
          { key = "Connectivity"; value = "WiFi, Zigbee, BLE" },
          { key = "Compatible"; value = "Alexa, Google, Apple HomeKit" },
          { key = "Ports"; value = "2x USB, 1x Ethernet" },
        ];
        isFlashDeal = false;
        isTrending = true;
        tags = ["smarthome", "hub", "automation", "gadget"];
      },
      {
        name = "Premium Bedding Set - 1000 Thread Count";
        description = "Egyptian cotton bedding set with 1000 thread count. Ultra-soft, breathable and luxurious.";
        price = 7499;
        originalPrice = 11999;
        images = [emptyBlob];
        category = "Home";
        stock = 150;
        specifications = [
          { key = "Material"; value = "100% Egyptian Cotton" },
          { key = "Thread Count"; value = "1000" },
          { key = "Includes"; value = "1 Bedsheet, 2 Pillowcases, 1 Duvet Cover" },
          { key = "Size"; value = "King" },
        ];
        isFlashDeal = true;
        isTrending = false;
        tags = ["bedding", "cotton", "luxury", "sleep"];
      },
      // Beauty
      {
        name = "SK-II Facial Treatment Essence";
        description = "Iconic facial essence with 90% Pitera. Transforms skin texture and radiance in 4 weeks.";
        price = 14999;
        originalPrice = 16999;
        images = [emptyBlob];
        category = "Beauty";
        stock = 80;
        specifications = [
          { key = "Volume"; value = "230ml" },
          { key = "Skin Type"; value = "All Skin Types" },
          { key = "Key Ingredient"; value = "90% Pitera" },
        ];
        isFlashDeal = false;
        isTrending = true;
        tags = ["skincare", "essence", "luxury", "women"];
      },
      {
        name = "Luxury Perfume Gift Set";
        description = "Exclusive collection of 5 premium fragrances in a beautifully crafted gift box.";
        price = 9999;
        originalPrice = 14999;
        images = [emptyBlob];
        category = "Beauty";
        stock = 60;
        specifications = [
          { key = "Pieces"; value = "5 x 15ml miniatures" },
          { key = "Notes"; value = "Floral, Woody, Oriental" },
          { key = "Longevity"; value = "8-10 hours" },
        ];
        isFlashDeal = true;
        isTrending = true;
        tags = ["perfume", "fragrance", "gift", "luxury"];
      },
      // Sports
      {
        name = "Premium Yoga Mat - Anti-slip Pro";
        description = "6mm thick premium TPE yoga mat with alignment lines, anti-slip surface and carry strap.";
        price = 2499;
        originalPrice = 3999;
        images = [emptyBlob];
        category = "Sports";
        stock = 300;
        specifications = [
          { key = "Material"; value = "TPE Eco-friendly" },
          { key = "Thickness"; value = "6mm" },
          { key = "Dimensions"; value = "183 x 61 cm" },
          { key = "Weight"; value = "1.3 kg" },
        ];
        isFlashDeal = false;
        isTrending = false;
        tags = ["yoga", "fitness", "mat", "exercise"];
      },
      {
        name = "Smart Fitness Watch Pro X";
        description = "Advanced fitness tracker with GPS, heart rate monitor, SpO2 sensor and 7-day battery life.";
        price = 15999;
        originalPrice = 19999;
        images = [emptyBlob];
        category = "Sports";
        stock = 120;
        specifications = [
          { key = "Display"; value = "1.4 inch AMOLED" },
          { key = "Battery"; value = "7 days" },
          { key = "Water Resistance"; value = "5ATM" },
          { key = "Sensors"; value = "HR, SpO2, GPS, Accelerometer" },
        ];
        isFlashDeal = true;
        isTrending = true;
        tags = ["smartwatch", "fitness", "gps", "sports"];
      },
    ];

    for (input in productSeeds.values()) {
      let _ = ProductsLib.addProduct(products, nextProductId, input);
      nextProductId += 1;
    };

    // Seed 3 banners
    let bannerSeeds : [ProductsTypes.BannerInput] = [
      {
        image = emptyBlob;
        title = "Luxury Awaits";
        subtitle = "Up to 50% off on Premium Electronics";
        linkUrl = "/category/electronics";
        order = 1;
        isActive = true;
      },
      {
        image = emptyBlob;
        title = "Flash Sale Live!";
        subtitle = "Exclusive deals for the next 24 hours";
        linkUrl = "/flash-deals";
        order = 2;
        isActive = true;
      },
      {
        image = emptyBlob;
        title = "New Arrivals";
        subtitle = "Discover the latest in Fashion & Beauty";
        linkUrl = "/category/fashion";
        order = 3;
        isActive = true;
      },
    ];

    for (input in bannerSeeds.values()) {
      let _ = ProductsLib.addBanner(banners, nextBannerId, input);
      nextBannerId += 1;
    };

    // Seed 5 coupons
    let couponSeeds : [CouponsTypes.CouponInput] = [
      {
        code = "SAVE10";
        discountType = #percent;
        discountValue = 10;
        minOrderValue = 500;
        maxDiscount = 500;
        isActive = true;
        expiresAt = far;
        maxUsage = 10000;
      },
      {
        code = "SAVE20";
        discountType = #percent;
        discountValue = 20;
        minOrderValue = 1000;
        maxDiscount = 1000;
        isActive = true;
        expiresAt = far;
        maxUsage = 5000;
      },
      {
        code = "FLAT50";
        discountType = #flat;
        discountValue = 50;
        minOrderValue = 300;
        maxDiscount = 50;
        isActive = true;
        expiresAt = far;
        maxUsage = 10000;
      },
      {
        code = "NEWUSER";
        discountType = #percent;
        discountValue = 15;
        minOrderValue = 200;
        maxDiscount = 300;
        isActive = true;
        expiresAt = far;
        maxUsage = 1;
      },
      {
        code = "WELCOME";
        discountType = #flat;
        discountValue = 100;
        minOrderValue = 500;
        maxDiscount = 100;
        isActive = true;
        expiresAt = far;
        maxUsage = 10000;
      },
    ];

    for (input in couponSeeds.values()) {
      CouponsLib.addCoupon(coupons, input);
    };

    seeded := true;
    "Seeded 10 products, 3 banners, 5 coupons successfully"
  };
};
