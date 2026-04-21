import type { Banner, Category, Coupon, Product } from "../types";

export const sampleProducts: Product[] = [
  // Electronics
  {
    id: "prod-001",
    name: "iPhone 15 Pro Max",
    description:
      "The most powerful iPhone ever. Titanium design, A17 Pro chip, and revolutionary camera system with 5x optical zoom.",
    category: "Electronics",
    priceInPaise: 13490000,
    originalPriceInPaise: 14990000,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80",
    ],
    rating: 4.8,
    reviewCount: 2847,
    stock: 15,
    specifications: [
      { label: "Display", value: "6.7-inch Super Retina XDR" },
      { label: "Chip", value: "A17 Pro" },
      { label: "Storage", value: "256GB" },
      { label: "Camera", value: "48MP Main + 12MP Ultra Wide" },
      { label: "Battery", value: "4422 mAh" },
      { label: "OS", value: "iOS 17" },
    ],
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Arjun M.",
        rating: 5,
        comment: "Absolutely stunning! The camera quality is unreal.",
        date: "2024-03-15",
        verified: true,
      },
    ],
    tags: ["smartphone", "apple", "5g", "premium"],
    isFeatured: true,
    isFlashDeal: true,
    flashDealEndsAt: Date.now() + 3 * 3600000,
    discount: 10,
  },
  {
    id: "prod-002",
    name: "AirPods Pro 2nd Gen",
    description:
      "Active Noise Cancellation with Transparency mode. USB-C charging case with MagSafe compatibility.",
    category: "Electronics",
    priceInPaise: 2490000,
    originalPriceInPaise: 2690000,
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&q=80",
    ],
    rating: 4.7,
    reviewCount: 1623,
    stock: 30,
    specifications: [
      { label: "ANC", value: "Active Noise Cancellation" },
      { label: "Battery", value: "6h + 30h with case" },
      { label: "Chip", value: "H2" },
      { label: "Water Resistance", value: "IPX4" },
    ],
    reviews: [],
    tags: ["earbuds", "wireless", "apple", "anc"],
    discount: 7,
    isFeatured: true,
  },
  {
    id: "prod-003",
    name: 'Samsung 65" Neo QLED 8K',
    description:
      "Quantum Matrix Technology with Neural Quantum Processor 8K for breathtaking picture quality.",
    category: "Electronics",
    priceInPaise: 17990000,
    originalPriceInPaise: 22990000,
    images: [
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&q=80",
    ],
    rating: 4.6,
    reviewCount: 892,
    stock: 8,
    specifications: [
      { label: "Screen Size", value: "65 inches" },
      { label: "Resolution", value: "8K (7680×4320)" },
      { label: "Panel", value: "Neo QLED" },
      { label: "Smart TV", value: "Tizen OS" },
    ],
    reviews: [],
    tags: ["tv", "samsung", "8k", "smart-tv"],
    discount: 22,
    isFlashDeal: true,
    flashDealEndsAt: Date.now() + 5 * 3600000,
  },

  // Fashion
  {
    id: "prod-004",
    name: "Luxe Leather Bomber Jacket",
    description:
      "Premium full-grain leather bomber jacket with quilted satin lining. Timeless design, modern fit.",
    category: "Fashion",
    priceInPaise: 1899900,
    originalPriceInPaise: 2499900,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      "https://images.unsplash.com/photo-1542327897-d73f4005b533?w=400&q=80",
    ],
    rating: 4.5,
    reviewCount: 437,
    stock: 20,
    specifications: [
      { label: "Material", value: "Full-grain Leather" },
      { label: "Lining", value: "Satin Quilted" },
      { label: "Closure", value: "YKK Zipper" },
      { label: "Fit", value: "Regular" },
    ],
    reviews: [],
    tags: ["jacket", "leather", "luxury", "fashion"],
    discount: 24,
    isFeatured: true,
  },
  {
    id: "prod-005",
    name: "Silk Embroidered Anarkali",
    description:
      "Handcrafted pure silk Anarkali with intricate zari embroidery. Perfect for festive and wedding occasions.",
    category: "Fashion",
    priceInPaise: 1249900,
    originalPriceInPaise: 1699900,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80",
    ],
    rating: 4.9,
    reviewCount: 318,
    stock: 12,
    specifications: [
      { label: "Fabric", value: "Pure Silk" },
      { label: "Work", value: "Zari Embroidery" },
      { label: "Occasion", value: "Festive / Wedding" },
      { label: "Includes", value: "Kurta + Dupatta + Churidar" },
    ],
    reviews: [],
    tags: ["ethnic", "silk", "festive", "anarkali"],
    discount: 26,
  },
  {
    id: "prod-006",
    name: "Air Jordan 1 Retro High OG",
    description:
      "The iconic silhouette reborn. Premium leather upper with Air-Sole cushioning for all-day comfort.",
    category: "Fashion",
    priceInPaise: 1499900,
    originalPriceInPaise: 1799900,
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=400&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    ],
    rating: 4.7,
    reviewCount: 2156,
    stock: 25,
    specifications: [
      { label: "Upper", value: "Premium Leather" },
      { label: "Sole", value: "Rubber" },
      { label: "Cushioning", value: "Air-Sole" },
    ],
    reviews: [],
    tags: ["sneakers", "nike", "jordan", "streetwear"],
    discount: 17,
    isFeatured: true,
  },

  // Home
  {
    id: "prod-007",
    name: "Smart LED Pendant Lamp",
    description:
      "Minimalist designer pendant lamp with smart dimming. Compatible with Alexa and Google Home.",
    category: "Home",
    priceInPaise: 849900,
    originalPriceInPaise: 1199900,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35f1fc93?w=400&q=80",
    ],
    rating: 4.4,
    reviewCount: 567,
    stock: 40,
    specifications: [
      { label: "Power", value: "15W LED" },
      { label: "Color Temp", value: "2200K-6500K" },
      { label: "Smart", value: "WiFi + Bluetooth" },
    ],
    reviews: [],
    tags: ["lamp", "smart", "led", "home-decor"],
    discount: 29,
  },
  {
    id: "prod-008",
    name: "Barista Pro Espresso Machine",
    description:
      "Professional-grade espresso machine with integrated grinder. Brew café-quality coffee at home.",
    category: "Home",
    priceInPaise: 4999900,
    originalPriceInPaise: 6499900,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    ],
    rating: 4.8,
    reviewCount: 1089,
    stock: 18,
    specifications: [
      { label: "Pressure", value: "15 bar pump" },
      { label: "Grinder", value: "Integrated Conical Burr" },
      { label: "Boiler", value: "Dual" },
    ],
    reviews: [],
    tags: ["coffee", "espresso", "kitchen", "premium"],
    discount: 23,
    isFeatured: true,
  },

  // Beauty
  {
    id: "prod-009",
    name: "Tom Ford Noir Extreme EDP",
    description:
      "An oriental woody fragrance for men. Warm, sensual, and deeply sophisticated.",
    category: "Beauty",
    priceInPaise: 1950000,
    originalPriceInPaise: 2250000,
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80",
    ],
    rating: 4.9,
    reviewCount: 743,
    stock: 22,
    specifications: [
      { label: "Volume", value: "100ml" },
      { label: "Type", value: "Eau de Parfum" },
      { label: "Longevity", value: "8-12 hours" },
    ],
    reviews: [],
    tags: ["perfume", "tom-ford", "luxury", "fragrance"],
    discount: 13,
    isFlashDeal: true,
    flashDealEndsAt: Date.now() + 2 * 3600000,
  },
  {
    id: "prod-010",
    name: "La Mer Crème de la Mer",
    description:
      "The legendary moisturizing cream with Miracle Broth™. Transforms skin, visibly reducing lines.",
    category: "Beauty",
    priceInPaise: 3250000,
    originalPriceInPaise: 3500000,
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=80",
    ],
    rating: 4.7,
    reviewCount: 1234,
    stock: 35,
    specifications: [
      { label: "Size", value: "60ml" },
      { label: "Skin Type", value: "All Skin Types" },
      { label: "Key Ingredient", value: "Miracle Broth™" },
    ],
    reviews: [],
    tags: ["skincare", "luxury", "moisturizer", "la-mer"],
    discount: 7,
  },

  // Sports
  {
    id: "prod-011",
    name: "Pro Adjustable Dumbbell Set",
    description:
      "Replace 15 sets of weights. Quick-change dial selects from 5 to 52.5 lbs in 2.5 lb increments.",
    category: "Sports",
    priceInPaise: 2499900,
    originalPriceInPaise: 3299900,
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
    ],
    rating: 4.6,
    reviewCount: 876,
    stock: 14,
    specifications: [
      { label: "Weight Range", value: "2.5 kg - 24 kg" },
      { label: "Material", value: "Steel + Rubber" },
      { label: "Warranty", value: "3 Years" },
    ],
    reviews: [],
    tags: ["fitness", "weights", "home-gym", "adjustable"],
    discount: 24,
  },
  {
    id: "prod-012",
    name: "Luxury Non-Slip Yoga Mat",
    description:
      "6mm thick natural rubber mat with alignment lines. Premium moisture-wicking microfiber surface.",
    category: "Sports",
    priceInPaise: 499900,
    originalPriceInPaise: 749900,
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
    ],
    rating: 4.8,
    reviewCount: 2341,
    stock: 50,
    specifications: [
      { label: "Thickness", value: "6mm" },
      { label: "Material", value: "Natural Rubber + Microfiber" },
      { label: "Dimensions", value: "183cm × 61cm" },
    ],
    reviews: [],
    tags: ["yoga", "fitness", "mat", "eco-friendly"],
    discount: 33,
    isFeatured: true,
  },
];

export const sampleBanners: Banner[] = [
  {
    id: "banner-001",
    title: "Featured Collection",
    subtitle: "Luxury watches & accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    ctaLabel: "Shop Now",
    ctaLink: "/search?category=Electronics",
    bgColor: "from-[#0f2a2a] to-[#0f172a]",
  },
  {
    id: "banner-002",
    title: "Fashion Week Sale",
    subtitle: "Up to 40% off premium brands",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ctaLabel: "Explore Styles",
    ctaLink: "/search?category=Fashion",
    bgColor: "from-[#2a1a0f] to-[#0f172a]",
  },
  {
    id: "banner-003",
    title: "Home Makeover",
    subtitle: "Transform your living space",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    ctaLabel: "Discover Now",
    ctaLink: "/search?category=Home",
    bgColor: "from-[#0f1a2a] to-[#0f172a]",
  },
  {
    id: "banner-004",
    title: "Beauty Essentials",
    subtitle: "Premium skincare & fragrances",
    imageUrl:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
    ctaLabel: "Shop Beauty",
    ctaLink: "/search?category=Beauty",
    bgColor: "from-[#2a0f1a] to-[#0f172a]",
  },
];

export const sampleCategories: Category[] = [
  {
    id: "cat-electronics",
    name: "Electronics",
    nameHi: "इलेक्ट्रॉनिक्स",
    icon: "📱",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&q=80",
    productCount: 3,
  },
  {
    id: "cat-fashion",
    name: "Fashion",
    nameHi: "फैशन",
    icon: "👗",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80",
    productCount: 3,
  },
  {
    id: "cat-home",
    name: "Home",
    nameHi: "होम",
    icon: "🏠",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80",
    productCount: 2,
  },
  {
    id: "cat-beauty",
    name: "Beauty",
    nameHi: "ब्यूटी",
    icon: "✨",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&q=80",
    productCount: 2,
  },
  {
    id: "cat-sports",
    name: "Sports",
    nameHi: "स्पोर्ट्स",
    icon: "🏋️",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&q=80",
    productCount: 2,
  },
  {
    id: "cat-jewelry",
    name: "Jewelry",
    nameHi: "ज्वेलरी",
    icon: "💎",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80",
    productCount: 0,
  },
  {
    id: "cat-bags",
    name: "Bags",
    nameHi: "बैग्स",
    icon: "👜",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80",
    productCount: 0,
  },
  {
    id: "cat-watches",
    name: "Watches",
    nameHi: "घड़ियाँ",
    icon: "⌚",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    productCount: 0,
  },
];

export const sampleCoupons: Coupon[] = [
  {
    code: "RAHBAR10",
    description: "10% off on orders above ₹999",
    discountType: "percentage",
    discountValue: 10,
    minOrderInPaise: 99900,
    maxDiscountInPaise: 50000,
    validUntil: Date.now() + 30 * 86400000,
  },
  {
    code: "WELCOME200",
    description: "Flat ₹200 off on your first order",
    discountType: "flat",
    discountValue: 20000,
    minOrderInPaise: 50000,
    validUntil: Date.now() + 7 * 86400000,
  },
  {
    code: "FLASH50",
    description: "50% off on Flash Deals (max ₹1000)",
    discountType: "percentage",
    discountValue: 50,
    minOrderInPaise: 199900,
    maxDiscountInPaise: 100000,
    validUntil: Date.now() + 1 * 86400000,
  },
  {
    code: "LUXURY15",
    description: "15% off on orders above ₹5000",
    discountType: "percentage",
    discountValue: 15,
    minOrderInPaise: 500000,
    maxDiscountInPaise: 200000,
    validUntil: Date.now() + 14 * 86400000,
  },
];

export function getFlashDeals(): Product[] {
  return sampleProducts.filter((p) => p.isFlashDeal);
}

export function getFeaturedProducts(): Product[] {
  return sampleProducts.filter((p) => p.isFeatured);
}

export function getProductsByCategory(category: string): Product[] {
  return sampleProducts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getProductById(id: string): Product | undefined {
  return sampleProducts.find((p) => p.id === id);
}

export function applyCoupon(
  code: string,
  subtotalInPaise: number,
): {
  valid: boolean;
  discountInPaise: number;
  coupon?: Coupon;
  message?: string;
} {
  const coupon = sampleCoupons.find(
    (c) => c.code.toUpperCase() === code.toUpperCase(),
  );

  if (!coupon) {
    return { valid: false, discountInPaise: 0, message: "Invalid coupon code" };
  }

  if (coupon.validUntil < Date.now()) {
    return { valid: false, discountInPaise: 0, message: "Coupon has expired" };
  }

  if (subtotalInPaise < coupon.minOrderInPaise) {
    const minRupees = coupon.minOrderInPaise / 100;
    return {
      valid: false,
      discountInPaise: 0,
      message: `Minimum order value of ₹${minRupees} required`,
    };
  }

  let discount =
    coupon.discountType === "percentage"
      ? Math.round((subtotalInPaise * coupon.discountValue) / 100)
      : coupon.discountValue;

  if (coupon.maxDiscountInPaise && discount > coupon.maxDiscountInPaise) {
    discount = coupon.maxDiscountInPaise;
  }

  return { valid: true, discountInPaise: discount, coupon };
}

export function getBestCoupon(subtotalInPaise: number): Coupon | null {
  let bestCoupon: Coupon | null = null;
  let bestDiscount = 0;

  for (const coupon of sampleCoupons) {
    if (coupon.validUntil < Date.now()) continue;
    if (subtotalInPaise < coupon.minOrderInPaise) continue;

    let discount =
      coupon.discountType === "percentage"
        ? Math.round((subtotalInPaise * coupon.discountValue) / 100)
        : coupon.discountValue;

    if (coupon.maxDiscountInPaise && discount > coupon.maxDiscountInPaise) {
      discount = coupon.maxDiscountInPaise;
    }

    if (discount > bestDiscount) {
      bestDiscount = discount;
      bestCoupon = coupon;
    }
  }

  return bestCoupon;
}
