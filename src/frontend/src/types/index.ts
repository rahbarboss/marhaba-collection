export type ProductCategory =
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Beauty"
  | "Sports"
  | "Jewelry";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  priceInPaise: number;
  originalPriceInPaise?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  specifications: ProductSpec[];
  reviews: Review[];
  tags: string[];
  isFeatured?: boolean;
  isFlashDeal?: boolean;
  flashDealEndsAt?: number;
  discount?: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaLabel: string;
  ctaLink: string;
  bgColor?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: number;
}

export type OrderStatus =
  | "ordered"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  product: Product;
  quantity: number;
  priceInPaise: number;
}

export interface OrderAddress {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalInPaise: number;
  discountInPaise: number;
  couponCode?: string;
  status: OrderStatus;
  address: OrderAddress;
  paymentMethod: string;
  createdAt: number;
  updatedAt: number;
  trackingSteps: TrackingStep[];
}

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  timestamp?: number;
  completed: boolean;
  current: boolean;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minOrderInPaise: number;
  maxDiscountInPaise?: number;
  validUntil: number;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isAdmin: boolean;
  rewardPoints: number;
  referralCode: string;
  language: "en" | "hi";
  savedAddresses: OrderAddress[];
}

export interface Notification {
  id: string;
  type: "order" | "deal" | "priceAlert" | "reward" | "general";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  link?: string;
}

export interface PaymentMethod {
  id: string;
  type: "upi" | "card" | "wallet" | "cod";
  label: string;
  icon: string;
}

export interface SplitPayment {
  method1: PaymentMethod;
  method2: PaymentMethod;
  amount1InPaise: number;
  amount2InPaise: number;
}

export type Language = "en" | "hi";

export interface Category {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface CompareProduct {
  product: Product;
  slot: 1 | 2 | 3 | 4;
}
