import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type OrderId = bigint;
export interface UserProfileInput {
    preferredLanguage: string;
    name: string;
    email: string;
    address?: {
        city: string;
        line1: string;
        line2: string;
        state: string;
        pincode: string;
    };
    phone: string;
}
export type Timestamp = bigint;
export interface CouponInput {
    discountValue: bigint;
    expiresAt: Timestamp;
    maxDiscount: bigint;
    code: CouponCode;
    discountType: DiscountType;
    maxUsage: bigint;
    minOrderValue: bigint;
    isActive: boolean;
}
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export type PaymentMethod = {
    __kind__: "cod";
    cod: null;
} | {
    __kind__: "upi";
    upi: null;
} | {
    __kind__: "card";
    card: null;
} | {
    __kind__: "split";
    split: {
        method1: string;
        method2: string;
        amount1: bigint;
        amount2: bigint;
    };
} | {
    __kind__: "wallet";
    wallet: null;
};
export interface Address {
    city: string;
    name: string;
    line1: string;
    line2: string;
    state: string;
    phone: string;
    pincode: string;
}
export interface OrderItem {
    name: string;
    productId: ProductId;
    quantity: bigint;
    image: ExternalBlob;
    price: bigint;
}
export interface ApplyCouponResult {
    discountAmount: bigint;
    message: string;
    isValid: boolean;
}
export type CouponCode = string;
export interface Cart {
    userId: UserId;
    couponApplied?: CouponCode;
    items: Array<CartItem>;
}
export type ReviewId = bigint;
export interface BannerInput {
    title: string;
    linkUrl: string;
    order: bigint;
    isActive: boolean;
    image: ExternalBlob;
    subtitle: string;
}
export interface Specification {
    key: string;
    value: string;
}
export interface Review {
    id: ReviewId;
    userId: UserId;
    createdAt: Timestamp;
    productId: ProductId;
    comment: string;
    rating: bigint;
}
export interface ProductInput {
    specifications: Array<Specification>;
    originalPrice: bigint;
    name: string;
    tags: Array<string>;
    description: string;
    stock: bigint;
    category: string;
    price: bigint;
    isFlashDeal: boolean;
    isTrending: boolean;
    images: Array<ExternalBlob>;
}
export interface PlaceOrderInput {
    paymentMethod: PaymentMethod;
    discountAmount: bigint;
    totalAmount: bigint;
    address: Address;
    couponApplied?: string;
    items: Array<OrderItem>;
}
export interface Coupon {
    discountValue: bigint;
    expiresAt: Timestamp;
    maxDiscount: bigint;
    code: CouponCode;
    discountType: DiscountType;
    usageCount: bigint;
    maxUsage: bigint;
    minOrderValue: bigint;
    isActive: boolean;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    userId: UserId;
    discountAmount: bigint;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    totalAmount: bigint;
    address: Address;
    couponApplied?: string;
    items: Array<OrderItem>;
    trackingSteps: Array<TrackingStep>;
}
export type UserId = Principal;
export interface Banner {
    id: bigint;
    title: string;
    linkUrl: string;
    order: bigint;
    isActive: boolean;
    image: ExternalBlob;
    subtitle: string;
}
export type NotificationId = bigint;
export interface Notification {
    id: NotificationId;
    title: string;
    body: string;
    userId: UserId;
    notificationType: NotificationType;
    createdAt: Timestamp;
    isRead: boolean;
}
export interface TrackingStep {
    status: OrderStatus;
    note: string;
    timestamp?: Timestamp;
}
export type ProductId = bigint;
export type ReferralCode = string;
export interface ReviewInput {
    productId: ProductId;
    comment: string;
    rating: bigint;
}
export interface UserProfile {
    referralCode: ReferralCode;
    preferredLanguage: string;
    name: string;
    rewardPoints: bigint;
    email: string;
    referredBy?: ReferralCode;
    recentlyViewed: Array<ProductId>;
    address?: {
        city: string;
        line1: string;
        line2: string;
        state: string;
        pincode: string;
    };
    phone: string;
    wishlist: Array<ProductId>;
}
export interface Product {
    id: ProductId;
    specifications: Array<Specification>;
    originalPrice: bigint;
    name: string;
    createdAt: Timestamp;
    tags: Array<string>;
    description: string;
    stock: bigint;
    category: string;
    rating: number;
    price: bigint;
    reviewCount: bigint;
    isFlashDeal: boolean;
    isTrending: boolean;
    images: Array<ExternalBlob>;
}
export enum DiscountType {
    flat = "flat",
    percent = "percent"
}
export enum NotificationType {
    reward = "reward",
    order = "order",
    deal = "deal",
    price_drop = "price_drop"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    out_for_delivery = "out_for_delivery",
    ordered = "ordered",
    delivered = "delivered",
    packed = "packed"
}
export enum PaymentStatus {
    pending = "pending",
    paid = "paid",
    refunded = "refunded",
    failed = "failed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBanner(input: BannerInput): Promise<Banner>;
    addCoupon(input: CouponInput): Promise<void>;
    addProduct(input: ProductInput): Promise<Product>;
    addReview(input: ReviewInput): Promise<Review>;
    addToCart(productId: ProductId, quantity: bigint): Promise<void>;
    addToWishlist(productId: ProductId): Promise<boolean>;
    applyCoupon(code: CouponCode, orderTotal: bigint): Promise<ApplyCouponResult>;
    applyReferralCode(code: ReferralCode): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    deleteBanner(id: bigint): Promise<boolean>;
    deleteCoupon(code: CouponCode): Promise<boolean>;
    deleteProduct(id: ProductId): Promise<boolean>;
    deleteReview(reviewId: ReviewId): Promise<boolean>;
    generateReferralCode(): Promise<ReferralCode>;
    getAllOrders(): Promise<Array<Order>>;
    getAllUsers(): Promise<Array<[UserId, UserProfile]>>;
    getAvailableCoupons(orderTotal: bigint): Promise<Array<Coupon>>;
    getBanners(): Promise<Array<Banner>>;
    getBestCoupon(orderTotal: bigint): Promise<Coupon | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Cart>;
    getCategories(): Promise<Array<string>>;
    getFlashDeals(): Promise<Array<Product>>;
    getMyOrders(): Promise<Array<Order>>;
    getMyReviews(): Promise<Array<Review>>;
    getNotifications(): Promise<Array<Notification>>;
    getOrder(orderId: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getRecentlyViewed(): Promise<Array<ProductId>>;
    getReviews(productId: ProductId): Promise<Array<Review>>;
    getRewards(): Promise<bigint>;
    getTrendingProducts(): Promise<Array<Product>>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    getWishlist(): Promise<Array<ProductId>>;
    isCallerAdmin(): Promise<boolean>;
    markNotificationRead(notificationId: NotificationId): Promise<boolean>;
    placeOrder(input: PlaceOrderInput): Promise<Order>;
    redeemRewards(points: bigint): Promise<boolean>;
    removeFromCart(productId: ProductId): Promise<void>;
    removeFromWishlist(productId: ProductId): Promise<boolean>;
    saveCallerUserProfile(input: UserProfileInput): Promise<UserProfile>;
    searchProducts(searchQuery: string): Promise<Array<Product>>;
    seedSampleData(): Promise<string>;
    sendNotification(userId: UserId, notificationType: NotificationType, title: string, body: string): Promise<Notification>;
    trackRecentlyViewed(productId: ProductId): Promise<void>;
    updateBanner(id: bigint, input: BannerInput): Promise<Banner | null>;
    updateCartItem(productId: ProductId, quantity: bigint): Promise<void>;
    updateCoupon(input: CouponInput): Promise<boolean>;
    updateOrderStatus(orderId: OrderId, newStatus: OrderStatus): Promise<Order | null>;
    updateProduct(id: ProductId, input: ProductInput): Promise<Product | null>;
}
