import type { backendInterface, Banner, Product, Cart, Order, UserProfile, UserRole, Review, Notification, Coupon, ApplyCouponResult, TrackingStep } from "../backend.d";
import { ExternalBlob, DiscountType, NotificationType, OrderStatus, PaymentStatus } from "../backend";

const sampleImageURL = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop";
const sampleImage = ExternalBlob.fromURL(sampleImageURL);

const sampleProduct1: Product = {
  id: BigInt(1),
  name: "Luxury Gold Watch",
  description: "Premium timepiece with teal and gold accents, sapphire crystal glass.",
  price: BigInt(299900),
  originalPrice: BigInt(399900),
  stock: BigInt(10),
  category: "Watches",
  rating: 4.8,
  reviewCount: BigInt(124),
  tags: ["luxury", "gold", "watch"],
  specifications: [
    { key: "Material", value: "Stainless Steel" },
    { key: "Water Resistance", value: "100m" },
    { key: "Movement", value: "Automatic" },
  ],
  isFlashDeal: true,
  isTrending: true,
  images: [sampleImage],
  createdAt: BigInt(Date.now() * 1_000_000),
};

const sampleProduct2: Product = {
  id: BigInt(2),
  name: "Premium Silk Kurta",
  description: "Handcrafted silk kurta with intricate embroidery, available in royal teal.",
  price: BigInt(149900),
  originalPrice: BigInt(199900),
  stock: BigInt(25),
  category: "Fashion",
  rating: 4.6,
  reviewCount: BigInt(87),
  tags: ["ethnic", "silk", "premium"],
  specifications: [
    { key: "Fabric", value: "Pure Silk" },
    { key: "Care", value: "Dry Clean Only" },
  ],
  isFlashDeal: false,
  isTrending: true,
  images: [ExternalBlob.fromURL("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop")],
  createdAt: BigInt(Date.now() * 1_000_000),
};

const sampleProduct3: Product = {
  id: BigInt(3),
  name: "Designer Leather Bag",
  description: "Handstitched genuine leather bag with gold hardware and teal lining.",
  price: BigInt(499900),
  originalPrice: BigInt(699900),
  stock: BigInt(0),
  category: "Bags",
  rating: 4.9,
  reviewCount: BigInt(56),
  tags: ["leather", "luxury", "bag"],
  specifications: [
    { key: "Material", value: "Full Grain Leather" },
    { key: "Dimensions", value: "35x25x12 cm" },
  ],
  isFlashDeal: true,
  isTrending: false,
  images: [ExternalBlob.fromURL("https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop")],
  createdAt: BigInt(Date.now() * 1_000_000),
};

const sampleBanner1: Banner = {
  id: BigInt(1),
  title: "Eid Special Collection",
  subtitle: "Up to 50% off on Premium Fashion",
  linkUrl: "/products",
  order: BigInt(1),
  isActive: true,
  image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop"),
};

const sampleBanner2: Banner = {
  id: BigInt(2),
  title: "Flash Sale Today",
  subtitle: "Luxury Watches from ₹2,999",
  linkUrl: "/products",
  order: BigInt(2),
  isActive: true,
  image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop"),
};

const sampleCart: Cart = {
  userId: { _isPrincipal: true, toString: () => "mock-user-id" } as any,
  items: [
    { productId: BigInt(1), quantity: BigInt(2) },
    { productId: BigInt(2), quantity: BigInt(1) },
  ],
  couponApplied: undefined,
};

const sampleTrackingSteps: TrackingStep[] = [
  { status: OrderStatus.ordered, note: "Order placed successfully", timestamp: BigInt(Date.now() * 1_000_000) },
  { status: OrderStatus.packed, note: "Your order is being packed", timestamp: BigInt(Date.now() * 1_000_000) },
  { status: OrderStatus.shipped, note: "Order shipped via BlueDart", timestamp: undefined },
  { status: OrderStatus.out_for_delivery, note: "Out for delivery", timestamp: undefined },
  { status: OrderStatus.delivered, note: "Delivered", timestamp: undefined },
];

const sampleOrder: Order = {
  id: BigInt(1001),
  status: OrderStatus.packed,
  paymentStatus: PaymentStatus.paid,
  paymentMethod: { __kind__: "upi", upi: null },
  userId: { _isPrincipal: true, toString: () => "mock-user-id" } as any,
  discountAmount: BigInt(5000),
  createdAt: BigInt(Date.now() * 1_000_000),
  updatedAt: BigInt(Date.now() * 1_000_000),
  totalAmount: BigInt(449800),
  address: {
    name: "Gulam Sarwar",
    phone: "+91 9334808340",
    line1: "House No 42, Main Bazaar",
    line2: "Near Rahbar Market",
    city: "Patna",
    state: "Bihar",
    pincode: "800001",
  },
  couponApplied: "RAHBAR10",
  items: [
    {
      productId: BigInt(1),
      name: "Luxury Gold Watch",
      price: BigInt(299900),
      quantity: BigInt(2),
      image: sampleImage,
    },
  ],
  trackingSteps: sampleTrackingSteps,
};

const sampleUserProfile: UserProfile = {
  name: "Gulam Sarwar",
  email: "gulamsarwar@786",
  phone: "+91 9334808340",
  preferredLanguage: "en",
  referralCode: "RAHBAR786",
  rewardPoints: BigInt(500),
  recentlyViewed: [BigInt(1), BigInt(2)],
  wishlist: [BigInt(3)],
  address: {
    line1: "House No 42, Main Bazaar",
    line2: "Near Rahbar Market",
    city: "Patna",
    state: "Bihar",
    pincode: "800001",
  },
};

const sampleReview: Review = {
  id: BigInt(1),
  userId: { _isPrincipal: true, toString: () => "mock-user-id" } as any,
  productId: BigInt(1),
  rating: BigInt(5),
  comment: "Absolutely stunning! The quality is exceptional and packaging was luxurious.",
  createdAt: BigInt(Date.now() * 1_000_000),
};

const sampleNotification: Notification = {
  id: BigInt(1),
  title: "Flash Sale Alert!",
  body: "50% off on Luxury Watches for the next 2 hours. Shop now!",
  userId: { _isPrincipal: true, toString: () => "mock-user-id" } as any,
  notificationType: NotificationType.deal,
  createdAt: BigInt(Date.now() * 1_000_000),
  isRead: false,
};

const sampleCoupon: Coupon = {
  code: "RAHBAR10",
  discountType: DiscountType.percent,
  discountValue: BigInt(10),
  maxDiscount: BigInt(50000),
  minOrderValue: BigInt(100000),
  maxUsage: BigInt(100),
  usageCount: BigInt(45),
  expiresAt: BigInt((Date.now() + 7 * 24 * 60 * 60 * 1000) * 1_000_000),
  isActive: true,
};

export const mockBackend: backendInterface = {
  // _immutableObjectStorageBlobsAreLive: async () => [],
  // _immutableObjectStorageBlobsToDelete: async () => [],
  // _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  // _immutableObjectStorageCreateCertificate: async () => ({ method: "PUT", blob_hash: "mock-hash" }),
  // _immutableObjectStorageRefillCashier: async () => ({ success: true, topped_up_amount: BigInt(0) }),
  // _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  // _initializeAccessControl: async () => undefined,

  addBanner: async () => sampleBanner1,
  addCoupon: async () => undefined,
  addProduct: async () => sampleProduct1,
  addReview: async () => sampleReview,
  addToCart: async () => undefined,
  addToWishlist: async () => true,
  applyCoupon: async (): Promise<ApplyCouponResult> => ({
    isValid: true,
    discountAmount: BigInt(30000),
    message: "Coupon RAHBAR10 applied! You save ₹300",
  }),
  applyReferralCode: async () => true,
  assignCallerUserRole: async () => undefined,
  clearCart: async () => undefined,
  deleteBanner: async () => true,
  deleteCoupon: async () => true,
  deleteProduct: async () => true,
  deleteReview: async () => true,
  generateReferralCode: async () => "RAHBAR786",
  getAllOrders: async () => [sampleOrder],
  getAllUsers: async () => [[sampleUserProfile.email as any, sampleUserProfile]],
  getAvailableCoupons: async () => [sampleCoupon],
  getBanners: async () => [sampleBanner1, sampleBanner2],
  getBestCoupon: async () => sampleCoupon,
  getCallerUserProfile: async () => sampleUserProfile,
  getCallerUserRole: async (): Promise<UserRole> => "user" as any,
  getCart: async () => sampleCart,
  getCategories: async () => ["Watches", "Fashion", "Bags", "Electronics", "Jewelry", "Home Decor"],
  getFlashDeals: async () => [sampleProduct1, sampleProduct3],
  getMyOrders: async () => [sampleOrder],
  getMyReviews: async () => [sampleReview],
  getNotifications: async () => [sampleNotification],
  getOrder: async () => sampleOrder,
  getProduct: async () => sampleProduct1,
  getProducts: async () => [sampleProduct1, sampleProduct2, sampleProduct3],
  getProductsByCategory: async () => [sampleProduct1, sampleProduct2],
  getRecentlyViewed: async () => [BigInt(1), BigInt(2)],
  getReviews: async () => [sampleReview],
  getRewards: async () => BigInt(500),
  getTrendingProducts: async () => [sampleProduct1, sampleProduct2],
  getUserProfile: async () => sampleUserProfile,
  getWishlist: async () => [BigInt(3)],
  isCallerAdmin: async () => false,
  markNotificationRead: async () => true,
  placeOrder: async () => sampleOrder,
  redeemRewards: async () => true,
  removeFromCart: async () => undefined,
  removeFromWishlist: async () => true,
  saveCallerUserProfile: async () => sampleUserProfile,
  searchProducts: async () => [sampleProduct1, sampleProduct2],
  seedSampleData: async () => "Sample data seeded successfully",
  sendNotification: async () => sampleNotification,
  trackRecentlyViewed: async () => undefined,
  updateBanner: async () => sampleBanner1,
  updateCartItem: async () => undefined,
  updateCoupon: async () => true,
  updateOrderStatus: async () => sampleOrder,
  updateProduct: async () => sampleProduct1,
};
