import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Eye,
  ImageIcon,
  IndianRupee,
  LayoutDashboard,
  Loader2,
  LogOut,
  MapPin,
  Navigation,
  Package,
  Pencil,
  PlusCircle,
  Shield,
  ShoppingBag,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { formatINR } from "../components/PriceTag";
import { useData } from "../context/DataContext";
import { useNotifications } from "../context/NotificationContext";
import { sampleBanners, sampleProducts } from "../data/sampleProducts";
import { useBackendActor } from "../hooks/useBackendActor";
import type { Banner, OrderStatus, Product, ProductCategory } from "../types";

// ─── Admin Credentials ────────────────────────────────────────────────────────
const ADMIN_USER = "gulamsarwar@786";
const ADMIN_PASS = "@gulamsarwar786";
const LS_KEY = "rahbar_admin_token";

// ─── City Coordinates Lookup ──────────────────────────────────────────────────
const CITY_COORDS: Record<string, [number, number]> = {
  Kishanganj: [26.0958, 87.9399],
  Patna: [25.5941, 85.1376],
  Kolkata: [22.5726, 88.3639],
  Mumbai: [19.076, 72.8777],
  Delhi: [28.6139, 77.209],
  Bengaluru: [12.9716, 77.5946],
  Chennai: [13.0827, 80.2707],
  Hyderabad: [17.385, 78.4867],
  Ahmedabad: [23.0225, 72.5714],
  Jaipur: [26.9124, 75.7873],
  Lucknow: [26.8467, 80.9462],
  Kanpur: [26.4499, 80.3319],
  Surat: [21.1702, 72.8311],
  Pune: [18.5204, 73.8567],
  Nagpur: [21.1458, 79.0882],
  Bhopal: [23.2599, 77.4126],
  Indore: [22.7196, 75.8577],
  Varanasi: [25.3176, 82.9739],
  Agra: [27.1767, 78.0081],
  Guwahati: [26.1445, 91.7362],
  Kochi: [9.9312, 76.2673],
  Siliguri: [26.7271, 88.3953],
  Ranchi: [23.3441, 85.3096],
  Gaya: [24.7955, 85.0002],
  Muzaffarpur: [26.1209, 85.3647],
  Bhagalpur: [25.2425, 86.9842],
  Purnia: [25.7771, 87.4753],
  Darbhanga: [26.1542, 85.8919],
  Araria: [26.1476, 87.4595],
  Katihar: [25.5375, 87.5773],
};

const DEFAULT_COORDS: [number, number] = [26.0958, 87.9399]; // Kishanganj

function getCityCoords(city: string): [number, number] {
  return CITY_COORDS[city] ?? DEFAULT_COORDS;
}

function buildOsmUrl(lat: number, lng: number): string {
  const delta = 0.8;
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

// ─── Sample Orders ─────────────────────────────────────────────────────────────
interface AdminOrder {
  id: string;
  date: string;
  customer: string;
  phone: string;
  items: number;
  totalInPaise: number;
  status: OrderStatus;
  city: string;
  state: string;
  address?: string;
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ORD-2024-001",
    date: "2024-03-15",
    customer: "Arjun Mehta",
    phone: "+91 9876543210",
    items: 3,
    totalInPaise: 1899900,
    status: "delivered",
    city: "Patna",
    state: "Bihar",
    address: "12, Gandhi Nagar, Patna",
  },
  {
    id: "ORD-2024-002",
    date: "2024-03-18",
    customer: "Priya Sharma",
    phone: "+91 8765432109",
    items: 1,
    totalInPaise: 13490000,
    status: "shipped",
    city: "Muzaffarpur",
    state: "Bihar",
    address: "45, Station Road, Muzaffarpur",
  },
  {
    id: "ORD-2024-003",
    date: "2024-03-20",
    customer: "Ravi Kumar",
    phone: "+91 7654321098",
    items: 2,
    totalInPaise: 2750000,
    status: "packed",
    city: "Gaya",
    state: "Bihar",
    address: "8, Bodh Gaya Road, Gaya",
  },
  {
    id: "ORD-2024-004",
    date: "2024-03-21",
    customer: "Sita Devi",
    phone: "+91 6543210987",
    items: 1,
    totalInPaise: 499900,
    status: "ordered",
    city: "Bhagalpur",
    state: "Bihar",
    address: "3, Silk City Colony, Bhagalpur",
  },
  {
    id: "ORD-2024-005",
    date: "2024-03-22",
    customer: "Anil Jha",
    phone: "+91 9988776655",
    items: 4,
    totalInPaise: 5490000,
    status: "out_for_delivery",
    city: "Kishanganj",
    state: "Bihar",
    address: "17, Court Road, Kishanganj",
  },
  {
    id: "ORD-2024-006",
    date: "2024-03-22",
    customer: "Meena Gupta",
    phone: "+91 9123456789",
    items: 2,
    totalInPaise: 3200000,
    status: "cancelled",
    city: "Darbhanga",
    state: "Bihar",
    address: "22, Lal Bagh, Darbhanga",
  },
];

const SAMPLE_USERS = [
  {
    id: "u001",
    name: "Arjun Mehta",
    phone: "+91 9876543210",
    email: "arjun@example.com",
    points: 450,
    joined: "2024-01-10",
  },
  {
    id: "u002",
    name: "Priya Sharma",
    phone: "+91 8765432109",
    email: "priya@example.com",
    points: 120,
    joined: "2024-02-03",
  },
  {
    id: "u003",
    name: "Ravi Kumar",
    phone: "+91 7654321098",
    email: "ravi@example.com",
    points: 890,
    joined: "2023-12-15",
  },
  {
    id: "u004",
    name: "Sita Devi",
    phone: "+91 6543210987",
    email: "sita@example.com",
    points: 30,
    joined: "2024-03-01",
  },
  {
    id: "u005",
    name: "Anil Jha",
    phone: "+91 9988776655",
    email: "anil@example.com",
    points: 1500,
    joined: "2023-11-20",
  },
];

type AdminTab = "dashboard" | "products" | "banners" | "orders" | "users";

// Status color styles using CSS custom properties / inline styles to avoid banned raw Tailwind palette classes
const STATUS_STYLES: Record<
  OrderStatus,
  { background: string; color: string; borderColor: string }
> = {
  ordered: {
    background: "oklch(0.45 0.18 250 / 0.2)",
    color: "oklch(0.70 0.18 250)",
    borderColor: "oklch(0.45 0.18 250 / 0.4)",
  },
  packed: {
    background: "oklch(0.45 0.22 295 / 0.2)",
    color: "oklch(0.70 0.22 295)",
    borderColor: "oklch(0.45 0.22 295 / 0.4)",
  },
  shipped: {
    background: "oklch(0.60 0.18 75 / 0.2)",
    color: "oklch(0.78 0.18 75)",
    borderColor: "oklch(0.60 0.18 75 / 0.4)",
  },
  out_for_delivery: {
    background: "oklch(0.60 0.20 55 / 0.2)",
    color: "oklch(0.78 0.20 55)",
    borderColor: "oklch(0.60 0.20 55 / 0.4)",
  },
  delivered: {
    background: "oklch(0.52 0.17 150 / 0.2)",
    color: "oklch(0.72 0.17 150)",
    borderColor: "oklch(0.52 0.17 150 / 0.4)",
  },
  cancelled: {
    background: "oklch(0.50 0.22 25 / 0.2)",
    color: "oklch(0.68 0.22 25)",
    borderColor: "oklch(0.50 0.22 25 / 0.4)",
  },
};

const statusLabels: Record<OrderStatus, string> = {
  ordered: "Ordered",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

// ─── No-op legacy helper (kept for type safety, no longer writes localStorage) ──
// All mutations now go through the real backend canister via useBackendActor.

// ─── Upload Simulation ─────────────────────────────────────────────────────────
function useUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string[]>([]);

  const upload = useCallback(
    (files: FileList | null, onDone: (urls: string[]) => void) => {
      if (!files || files.length === 0) return;
      setUploading(true);
      setProgress(0);
      const readers: Promise<string>[] = Array.from(files).map(
        (f) =>
          new Promise<string>((res) => {
            const r = new FileReader();
            r.onload = () => res(r.result as string);
            r.readAsDataURL(f);
          }),
      );
      Promise.all(readers).then((dataUrls) => {
        setPreview(dataUrls);
        let p = 0;
        const iv = setInterval(() => {
          p += Math.random() * 18 + 5;
          if (p >= 100) {
            clearInterval(iv);
            setProgress(100);
            setUploading(false);
            onDone(dataUrls);
          } else {
            setProgress(Math.min(p, 99));
          }
        }, 120);
      });
    },
    [],
  );

  const reset = useCallback(() => {
    setProgress(0);
    setUploading(false);
    setPreview([]);
  }, []);

  return { progress, uploading, preview, upload, reset };
}

// ─── Product Form Modal ────────────────────────────────────────────────────────
const CATEGORIES: ProductCategory[] = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Jewelry",
];

interface ProductFormProps {
  product?: Product | null;
  open: boolean;
  onClose: () => void;
  onSave: (p: Product) => Promise<void>;
}

function ProductFormModal({
  product,
  open,
  onClose,
  onSave,
}: ProductFormProps) {
  const isEdit = !!product;
  const up = useUpload();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    category: (product?.category ?? "Electronics") as ProductCategory,
    priceInPaise: product ? String(product.priceInPaise / 100) : "",
    originalPriceInPaise: product?.originalPriceInPaise
      ? String(product.originalPriceInPaise / 100)
      : "",
    stock: product ? String(product.stock) : "",
    tags: product?.tags.join(", ") ?? "",
    isFlashDeal: product?.isFlashDeal ?? false,
    isFeatured: product?.isFeatured ?? false,
    images: product?.images ?? ([] as string[]),
    specifications: product?.specifications ?? [{ label: "", value: "" }],
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const addSpec = () =>
    set("specifications", [...form.specifications, { label: "", value: "" }]);
  const removeSpec = (i: number) =>
    set(
      "specifications",
      form.specifications.filter((_, idx) => idx !== i),
    );
  const updateSpec = (i: number, field: "label" | "value", val: string) => {
    const updated = form.specifications.map((s, idx) =>
      idx === i ? { ...s, [field]: val } : s,
    );
    set("specifications", updated);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    up.upload(e.target.files, (urls) =>
      set("images", [...form.images, ...urls]),
    );
  };

  const handleSave = async () => {
    if (!form.name || !form.priceInPaise || !form.stock) {
      toast.error("Name, price and stock are required");
      return;
    }
    const origPrice = form.originalPriceInPaise
      ? Math.round(Number.parseFloat(form.originalPriceInPaise) * 100)
      : undefined;
    const price = Math.round(Number.parseFloat(form.priceInPaise) * 100);
    const saved: Product = {
      id: product?.id ?? `prod-${Date.now()}`,
      name: form.name,
      description: form.description,
      category: form.category,
      priceInPaise: price,
      originalPriceInPaise: origPrice,
      stock: Number.parseInt(form.stock, 10),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      isFlashDeal: form.isFlashDeal,
      isFeatured: form.isFeatured,
      images:
        form.images.length > 0
          ? form.images
          : [
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
            ],
      specifications: form.specifications.filter((s) => s.label && s.value),
      rating: product?.rating ?? 4.5,
      reviewCount: product?.reviewCount ?? 0,
      reviews: product?.reviews ?? [],
      discount:
        origPrice && origPrice > price
          ? Math.round(((origPrice - price) / origPrice) * 100)
          : undefined,
    };
    setSaving(true);
    try {
      await onSave(saved);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label className="text-muted-foreground text-xs mb-1 block">
                Product Name *
              </Label>
              <Input
                data-ocid="admin.product_form.name_input"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. iPhone 15 Pro Max"
                className="bg-muted/30"
              />
            </div>
            <div>
              <Label className="text-muted-foreground text-xs mb-1 block">
                Description
              </Label>
              <Textarea
                data-ocid="admin.product_form.desc_input"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                placeholder="Product description..."
                className="bg-muted/30 resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-muted-foreground text-xs mb-1 block">
                Category *
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => set("category", v as ProductCategory)}
              >
                <SelectTrigger
                  data-ocid="admin.product_form.category_select"
                  className="bg-muted/30"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs mb-1 block">
                Stock *
              </Label>
              <Input
                data-ocid="admin.product_form.stock_input"
                type="number"
                value={form.stock}
                onChange={(e) => set("stock", e.target.value)}
                placeholder="0"
                className="bg-muted/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-muted-foreground text-xs mb-1 block">
                Price (₹) *
              </Label>
              <Input
                data-ocid="admin.product_form.price_input"
                type="number"
                value={form.priceInPaise}
                onChange={(e) => set("priceInPaise", e.target.value)}
                placeholder="999"
                className="bg-muted/30"
              />
            </div>
            <div>
              <Label className="text-muted-foreground text-xs mb-1 block">
                Original Price (₹)
              </Label>
              <Input
                data-ocid="admin.product_form.original_price_input"
                type="number"
                value={form.originalPriceInPaise}
                onChange={(e) => set("originalPriceInPaise", e.target.value)}
                placeholder="1299"
                className="bg-muted/30"
              />
            </div>
          </div>

          <div>
            <Label className="text-muted-foreground text-xs mb-1 block">
              Tags (comma-separated)
            </Label>
            <Input
              data-ocid="admin.product_form.tags_input"
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="smartphone, apple, 5g"
              className="bg-muted/30"
            />
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Switch
                data-ocid="admin.product_form.flash_toggle"
                checked={form.isFlashDeal}
                onCheckedChange={(v) => set("isFlashDeal", v)}
              />
              <Label className="text-sm flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                Flash Deal
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                data-ocid="admin.product_form.trending_toggle"
                checked={form.isFeatured}
                onCheckedChange={(v) => set("isFeatured", v)}
              />
              <Label className="text-sm flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-primary" />
                Trending
              </Label>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-muted-foreground text-xs mb-2 block">
              Product Images
            </Label>
            <button
              type="button"
              data-ocid="admin.product_form.dropzone"
              className="w-full border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Click to upload images
              </p>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFiles}
              />
            </button>
            {up.uploading && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Uploading...</span>
                  <span>{Math.round(up.progress)}%</span>
                </div>
                <Progress value={up.progress} className="h-1.5" />
              </div>
            )}
            {form.images.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {form.images.map((img, i) => (
                  <div
                    key={`img-${img.slice(-8)}-${i}`}
                    className="relative group"
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-16 w-16 object-cover rounded-md border border-border"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        set(
                          "images",
                          form.images.filter((_, idx) => idx !== i),
                        )
                      }
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-2.5 w-2.5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-muted-foreground text-xs">
                Specifications
              </Label>
              <Button
                data-ocid="admin.product_form.add_spec_button"
                size="sm"
                variant="ghost"
                onClick={addSpec}
                className="h-7 text-xs text-primary"
              >
                <PlusCircle className="h-3.5 w-3.5 mr-1" />
                Add Row
              </Button>
            </div>
            <div className="space-y-2">
              {form.specifications.map((spec, i) => (
                <div
                  key={`spec-${spec.label || "empty"}-${i}`}
                  className="flex gap-2"
                >
                  <Input
                    value={spec.label}
                    onChange={(e) => updateSpec(i, "label", e.target.value)}
                    placeholder="Label"
                    className="bg-muted/30 text-sm h-8"
                  />
                  <Input
                    value={spec.value}
                    onChange={(e) => updateSpec(i, "value", e.target.value)}
                    placeholder="Value"
                    className="bg-muted/30 text-sm h-8"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeSpec(i)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            data-ocid="admin.product_form.cancel_button"
            variant="outline"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            data-ocid="admin.product_form.submit_button"
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-primary-foreground"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Saving...
              </>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Add Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Banner Form Modal ─────────────────────────────────────────────────────────
interface BannerFormProps {
  banner?: Banner | null;
  open: boolean;
  onClose: () => void;
  onSave: (b: Banner) => Promise<void>;
}

function BannerFormModal({ banner, open, onClose, onSave }: BannerFormProps) {
  const isEdit = !!banner;
  const up = useUpload();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: banner?.title ?? "",
    subtitle: banner?.subtitle ?? "",
    imageUrl: banner?.imageUrl ?? "",
    ctaLabel: banner?.ctaLabel ?? "Shop Now",
    ctaLink: banner?.ctaLink ?? "",
    active: true,
    order: 1,
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    up.upload(e.target.files, (urls) => set("imageUrl", urls[0] ?? ""));
  };

  const handleSave = async () => {
    if (!form.title || !form.imageUrl) {
      toast.error("Title and image are required");
      return;
    }
    setSaving(true);
    try {
      await onSave({
        id: banner?.id ?? `banner-${Date.now()}`,
        title: form.title,
        subtitle: form.subtitle,
        imageUrl: form.imageUrl,
        ctaLabel: form.ctaLabel,
        ctaLink: form.ctaLink,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-secondary" />
            {isEdit ? "Edit Banner" : "Add New Banner"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">
              Title *
            </Label>
            <Input
              data-ocid="admin.banner_form.title_input"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="bg-muted/30"
              placeholder="Sale Banner"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">
              Subtitle
            </Label>
            <Input
              data-ocid="admin.banner_form.subtitle_input"
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              className="bg-muted/30"
              placeholder="Up to 50% off"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                CTA Label
              </Label>
              <Input
                value={form.ctaLabel}
                onChange={(e) => set("ctaLabel", e.target.value)}
                className="bg-muted/30"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Link URL
              </Label>
              <Input
                value={form.ctaLink}
                onChange={(e) => set("ctaLink", e.target.value)}
                className="bg-muted/30"
                placeholder="/search?q=..."
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Position Order
              </Label>
              <Input
                type="number"
                value={form.order}
                onChange={(e) =>
                  set("order", Number.parseInt(e.target.value) || 1)
                }
                className="bg-muted/30 w-20"
              />
            </div>
            <div className="flex items-center gap-2 mt-5">
              <Switch
                data-ocid="admin.banner_form.active_toggle"
                checked={form.active}
                onCheckedChange={(v) => set("active", v)}
              />
              <Label className="text-sm">Active</Label>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Banner Image *
            </Label>
            <button
              type="button"
              data-ocid="admin.banner_form.dropzone"
              className="w-full border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-secondary/50 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {form.imageUrl ? (
                <img
                  src={form.imageUrl}
                  alt=""
                  className="h-24 w-full object-cover rounded"
                />
              ) : (
                <>
                  <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Click to upload
                  </p>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFiles}
              />
            </button>
            {up.uploading && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Uploading...</span>
                  <span>{Math.round(up.progress)}%</span>
                </div>
                <Progress value={up.progress} className="h-1.5" />
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            data-ocid="admin.banner_form.cancel_button"
            variant="outline"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            data-ocid="admin.banner_form.submit_button"
            onClick={handleSave}
            disabled={saving}
            style={{
              background: "oklch(0.72 0.26 90)",
              color: "var(--background)",
            }}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Saving...
              </>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Add Banner"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Order Detail Modal ────────────────────────────────────────────────────────
function OrderDetailModal({
  order,
  open,
  onClose,
}: {
  order: AdminOrder | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!order) return null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-foreground text-sm">
            Order {order.id}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Customer</span>
              <p className="font-semibold">{order.customer}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Phone</span>
              <p className="font-semibold">{order.phone}</p>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Address</span>
              <p className="font-semibold">
                {order.address ?? "—"}, {order.city}, {order.state}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Date</span>
              <p className="font-semibold">{order.date}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Items</span>
              <p className="font-semibold">{order.items} items</p>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Total</span>
              <p
                className="font-semibold"
                style={{ color: "oklch(0.675 0.25 178)" }}
              >
                {formatINR(order.totalInPaise)}
              </p>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Status</span>
            <span
              className="ml-2 px-2 py-0.5 rounded-full text-xs border"
              style={STATUS_STYLES[order.status]}
            >
              {statusLabels[order.status]}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            data-ocid="admin.order_detail.close_button"
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────
function DeleteConfirmDialog({
  open,
  label,
  loading,
  onConfirm,
  onClose,
}: {
  open: boolean;
  label: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Confirmation
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground py-2">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-foreground">{label}</span>? This
          action cannot be undone.
        </p>
        <DialogFooter>
          <Button
            data-ocid="admin.delete_dialog.cancel_button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            data-ocid="admin.delete_dialog.confirm_button"
            variant="destructive"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 mr-1" />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Admin Login ──────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const { showToast } = useNotifications();

  const handleLogin = () => {
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      localStorage.setItem(LS_KEY, "1");
      showToast("success", "Welcome Admin! You are now in the control panel.");
      onLogin();
    } else {
      setErr("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.72 0.26 90))",
            }}
          >
            <Shield className="h-8 w-8 text-background" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            Marhaba Collection Admin
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to manage your store
          </p>
        </div>

        <div className="rounded-2xl border border-border p-6 space-y-4 bg-card">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              Username
            </Label>
            <Input
              data-ocid="admin.login.username_input"
              value={u}
              onChange={(e) => {
                setU(e.target.value);
                setErr("");
              }}
              placeholder="gulamsarwar@786"
              className="bg-muted/30"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              Password
            </Label>
            <Input
              data-ocid="admin.login.password_input"
              type="password"
              value={p}
              onChange={(e) => {
                setP(e.target.value);
                setErr("");
              }}
              placeholder="••••••••"
              className="bg-muted/30"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          {err && (
            <p
              data-ocid="admin.login.error_state"
              className="text-xs text-destructive flex items-center gap-1"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              {err}
            </p>
          )}
          <Button
            data-ocid="admin.login.submit_button"
            className="w-full font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.72 0.26 90))",
              color: "var(--background)",
            }}
            onClick={handleLogin}
          >
            Sign In to Admin Panel
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Component ─────────────────────────────────────────────────────
export default function Admin() {
  const navigate = useNavigate();
  const { products: ctxProducts, banners: ctxBanners, refetch } = useData();
  const { actor } = useBackendActor();

  const [isAuthed, setIsAuthed] = useState(
    () => localStorage.getItem(LS_KEY) === "1",
  );
  const [tab, setTab] = useState<AdminTab>("dashboard");
  // Navigation history stack for back-button behaviour
  const [history, setHistory] = useState<AdminTab[]>([]);

  // Local products/banners — seeded from DataContext, kept in sync after mutations
  const [products, setProducts] = useState<Product[]>(() =>
    ctxProducts.length ? ctxProducts : sampleProducts,
  );
  const [banners, setBanners] = useState<Banner[]>(() =>
    ctxBanners.length ? ctxBanners : sampleBanners,
  );

  const [productModal, setProductModal] = useState<{
    open: boolean;
    product?: Product | null;
  }>({ open: false });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: "product" | "banner";
    id: string;
    label: string;
    loading: boolean;
  }>({ open: false, type: "product", id: "", label: "", loading: false });

  const [bannerModal, setBannerModal] = useState<{
    open: boolean;
    banner?: Banner | null;
  }>({ open: false });

  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [orderDetail, setOrderDetail] = useState<{
    open: boolean;
    order: AdminOrder | null;
  }>({ open: false, order: null });
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    INITIAL_ORDERS[0]?.id ?? "",
  );

  // ── Navigate between tabs with history tracking ──────────────────────────────
  const goToTab = (next: AdminTab) => {
    setHistory((prev) => [...prev, tab]);
    setTab(next);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setTab(prev);
    } else if (tab === "dashboard") {
      // On dashboard → exit admin to customer home
      localStorage.removeItem(LS_KEY);
      setIsAuthed(false);
      navigate({ to: "/" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(LS_KEY);
    setIsAuthed(false);
    navigate({ to: "/" });
  };

  if (!isAuthed) {
    return <AdminLogin onLogin={() => setIsAuthed(true)} />;
  }

  // ── CRUD helpers wired to real Motoko backend ─────────────────────────────
  const saveProduct = async (p: Product): Promise<void> => {
    const isEdit = products.some((x) => x.id === p.id);
    try {
      const images = p.images.map((url) => ExternalBlob.fromURL(url));
      const input = {
        name: p.name,
        description: p.description,
        category: p.category,
        price: BigInt(p.priceInPaise),
        originalPrice: BigInt(p.originalPriceInPaise ?? p.priceInPaise),
        stock: BigInt(p.stock),
        tags: p.tags,
        isFlashDeal: p.isFlashDeal ?? false,
        isTrending: p.isFeatured ?? false,
        images,
        specifications: p.specifications.map((s) => ({
          key: s.label,
          value: s.value,
        })),
      };

      if (isEdit && actor) {
        const updated = await actor.updateProduct(BigInt(p.id), input);
        if (updated) {
          const next = products.map((x) => (x.id === p.id ? p : x));
          setProducts(next);
          toast.success("Product updated!");
        } else {
          toast.error("Product not found in backend");
        }
      } else if (actor) {
        await actor.addProduct(input);
        const next = [p, ...products];
        setProducts(next);
        toast.success("Product added!");
      } else {
        toast.error("Backend not available. Please try again.");
        return;
      }
      refetch();
    } catch (err) {
      console.error("[Admin] saveProduct error:", err);
      toast.error(
        isEdit ? "Failed to update product" : "Failed to add product",
      );
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    try {
      if (actor) {
        await actor.deleteProduct(BigInt(id));
      }
      const next = products.filter((p) => p.id !== id);
      setProducts(next);
      refetch();
      toast.success("Product deleted");
    } catch (err) {
      console.error("[Admin] deleteProduct error:", err);
      toast.error("Failed to delete product");
    }
  };

  const saveBanner = async (b: Banner): Promise<void> => {
    const isEdit = banners.some((x) => x.id === b.id);
    try {
      const input = {
        title: b.title,
        subtitle: b.subtitle,
        image: ExternalBlob.fromURL(b.imageUrl),
        linkUrl: b.ctaLink,
        order: BigInt(
          isEdit
            ? banners.findIndex((x) => x.id === b.id) + 1
            : banners.length + 1,
        ),
        isActive: true,
      };

      if (isEdit && actor) {
        const updated = await actor.updateBanner(BigInt(b.id), input);
        if (updated) {
          const next = banners.map((x) => (x.id === b.id ? b : x));
          setBanners(next);
          toast.success("Banner updated!");
        } else {
          toast.error("Banner not found in backend");
        }
      } else if (actor) {
        await actor.addBanner(input);
        const next = [b, ...banners];
        setBanners(next);
        toast.success("Banner added!");
      } else {
        toast.error("Backend not available. Please try again.");
        return;
      }
      refetch();
    } catch (err) {
      console.error("[Admin] saveBanner error:", err);
      toast.error(isEdit ? "Failed to update banner" : "Failed to add banner");
    }
  };

  const deleteBanner = async (id: string): Promise<void> => {
    try {
      if (actor) {
        await actor.deleteBanner(BigInt(id));
      }
      const next = banners.filter((b) => b.id !== id);
      setBanners(next);
      refetch();
      toast.success("Banner deleted");
    } catch (err) {
      console.error("[Admin] deleteBanner error:", err);
      toast.error("Failed to delete banner");
    }
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success("Order status updated");
  };

  // Derived data
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.totalInPaise, 0);
  const selectedOrder =
    orders.find((o) => o.id === selectedOrderId) ?? orders[0];
  const mapCoords = selectedOrder
    ? getCityCoords(selectedOrder.city)
    : DEFAULT_COORDS;
  const osmUrl = buildOsmUrl(mapCoords[0], mapCoords[1]);

  const TABS: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "banners", label: "Banners", icon: ImageIcon },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            {/* Back / exit button */}
            <button
              type="button"
              data-ocid="admin.back_button"
              onClick={goBack}
              className="h-8 w-8 rounded-lg flex items-center justify-center transition-colors hover:bg-primary/15 mr-0.5"
              style={{ color: "#00d4c8" }}
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.72 0.26 90))",
              }}
            >
              <Shield className="h-4 w-4 text-background" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-display">
                Marhaba Collection Admin
              </h1>
              <p className="text-[10px] text-muted-foreground">Control Panel</p>
            </div>
          </div>
          <Button
            data-ocid="admin.logout_button"
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="h-8 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>

        {/* Tab Bar */}
        <div className="flex overflow-x-auto border-t border-border">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                data-ocid={`admin.nav.${t.id}_tab`}
                onClick={() => goToTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-screen-xl mx-auto">
        {/* ── Dashboard ── */}
        {tab === "dashboard" && (
          <div data-ocid="admin.dashboard.section" className="space-y-6">
            <div>
              <h2 className="text-lg font-bold font-display mb-1">Overview</h2>
              <p className="text-muted-foreground text-sm">
                Welcome back, Admin 👋
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Total Products",
                  value: products.length,
                  icon: Package,
                  trend: "+3 this week",
                  gradient: "from-primary/20 to-primary/5",
                  iconColor: "text-primary",
                },
                {
                  label: "Total Orders",
                  value: orders.length,
                  icon: ShoppingBag,
                  trend: "+12 this week",
                  gradient: "from-secondary/20 to-secondary/5",
                  iconColor: "text-secondary",
                },
                {
                  label: "Revenue",
                  value: formatINR(totalRevenue),
                  icon: IndianRupee,
                  trend: "+18% this month",
                  gradient: "from-emerald-500/20 to-emerald-500/5",
                  iconColor: "text-emerald-400",
                },
                {
                  label: "Total Users",
                  value: SAMPLE_USERS.length,
                  icon: Users,
                  trend: "+2 today",
                  gradient: "from-purple-500/20 to-purple-500/5",
                  iconColor: "text-purple-400",
                },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`rounded-xl border border-border bg-gradient-to-br ${stat.gradient} p-4`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                    </div>
                    <p className="text-xl font-bold text-foreground font-display">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {stat.label}
                    </p>
                    <p className="text-[10px] text-emerald-400 mt-1">
                      {stat.trend}
                    </p>
                  </div>
                );
              })}
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Recent Orders
              </h3>
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                {orders.slice(0, 4).map((o, i) => (
                  <div
                    key={o.id}
                    className={`flex items-center justify-between p-3 ${i < 3 ? "border-b border-border" : ""}`}
                  >
                    <div>
                      <p className="text-sm font-medium">{o.customer}</p>
                      <p className="text-xs text-muted-foreground">{o.id}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={STATUS_STYLES[o.status]}
                      >
                        {statusLabels[o.status]}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatINR(o.totalInPaise)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  data-ocid="admin.dashboard.add_product_button"
                  variant="outline"
                  className="h-12 flex-col gap-1 border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => {
                    goToTab("products");
                    setProductModal({ open: true });
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="text-xs">Add Product</span>
                </Button>
                <Button
                  data-ocid="admin.dashboard.add_banner_button"
                  variant="outline"
                  className="h-12 flex-col gap-1 border-secondary/30"
                  style={{ color: "oklch(0.72 0.26 90)" }}
                  onClick={() => {
                    goToTab("banners");
                    setBannerModal({ open: true });
                  }}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span className="text-xs">Add Banner</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Products ── */}
        {tab === "products" && (
          <div data-ocid="admin.products.section" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-display">Products</h2>
                <p className="text-xs text-muted-foreground">
                  {products.length} items
                </p>
              </div>
              <Button
                data-ocid="admin.products.add_button"
                size="sm"
                onClick={() => setProductModal({ open: true, product: null })}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.72 0.26 90))",
                  color: "var(--background)",
                }}
                className="font-semibold"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Product
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground text-xs w-12">
                        IMG
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs">
                        Name
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs">
                        Category
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs text-right">
                        Price
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs text-center">
                        Stock
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs text-center">
                        Flash
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs text-center">
                        Trend
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs text-center w-20">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((p, i) => (
                      <TableRow
                        key={p.id}
                        data-ocid={`admin.products.item.${i + 1}`}
                        className="border-border hover:bg-muted/20"
                      >
                        <TableCell>
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="h-10 w-10 object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium line-clamp-1 max-w-[140px]">
                            {p.name}
                          </p>
                          {p.stock === 0 && (
                            <span className="text-[10px] text-red-400">
                              Out of stock
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5"
                          >
                            {p.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "oklch(0.675 0.25 178)" }}
                          >
                            {formatINR(p.priceInPaise)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span
                            className={`text-xs font-medium ${p.stock === 0 ? "text-red-400" : p.stock < 10 ? "text-amber-400" : "text-emerald-400"}`}
                          >
                            {p.stock}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            data-ocid={`admin.products.flash_toggle.${i + 1}`}
                            checked={p.isFlashDeal ?? false}
                            onCheckedChange={async (v) => {
                              const updated = { ...p, isFlashDeal: v };
                              const next = products.map((x) =>
                                x.id === p.id ? updated : x,
                              );
                              setProducts(next);
                              try {
                                if (actor) {
                                  await actor.updateProduct(BigInt(p.id), {
                                    name: p.name,
                                    description: p.description,
                                    category: p.category,
                                    price: BigInt(p.priceInPaise),
                                    originalPrice: BigInt(
                                      p.originalPriceInPaise ?? p.priceInPaise,
                                    ),
                                    stock: BigInt(p.stock),
                                    tags: p.tags,
                                    isFlashDeal: v,
                                    isTrending: p.isFeatured ?? false,
                                    images: p.images.map((url) =>
                                      ExternalBlob.fromURL(url),
                                    ),
                                    specifications: p.specifications.map(
                                      (s) => ({ key: s.label, value: s.value }),
                                    ),
                                  });
                                  refetch();
                                }
                              } catch (err) {
                                console.error(
                                  "[Admin] flash toggle error:",
                                  err,
                                );
                                setProducts(products); // rollback
                              }
                            }}
                            className="scale-75"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            data-ocid={`admin.products.trending_toggle.${i + 1}`}
                            checked={p.isFeatured ?? false}
                            onCheckedChange={async (v) => {
                              const updated = { ...p, isFeatured: v };
                              const next = products.map((x) =>
                                x.id === p.id ? updated : x,
                              );
                              setProducts(next);
                              try {
                                if (actor) {
                                  await actor.updateProduct(BigInt(p.id), {
                                    name: p.name,
                                    description: p.description,
                                    category: p.category,
                                    price: BigInt(p.priceInPaise),
                                    originalPrice: BigInt(
                                      p.originalPriceInPaise ?? p.priceInPaise,
                                    ),
                                    stock: BigInt(p.stock),
                                    tags: p.tags,
                                    isFlashDeal: p.isFlashDeal ?? false,
                                    isTrending: v,
                                    images: p.images.map((url) =>
                                      ExternalBlob.fromURL(url),
                                    ),
                                    specifications: p.specifications.map(
                                      (s) => ({ key: s.label, value: s.value }),
                                    ),
                                  });
                                  refetch();
                                }
                              } catch (err) {
                                console.error(
                                  "[Admin] trending toggle error:",
                                  err,
                                );
                                setProducts(products); // rollback
                              }
                            }}
                            className="scale-75"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              data-ocid={`admin.products.edit_button.${i + 1}`}
                              onClick={() =>
                                setProductModal({ open: true, product: p })
                              }
                              className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              data-ocid={`admin.products.delete_button.${i + 1}`}
                              onClick={() =>
                                setDeleteDialog({
                                  open: true,
                                  type: "product",
                                  id: p.id,
                                  label: p.name,
                                  loading: false,
                                })
                              }
                              className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        )}

        {/* ── Banners ── */}
        {tab === "banners" && (
          <div data-ocid="admin.banners.section" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-display">Banners</h2>
                <p className="text-xs text-muted-foreground">
                  {banners.length} active banners
                </p>
              </div>
              <Button
                data-ocid="admin.banners.add_button"
                size="sm"
                onClick={() => setBannerModal({ open: true, banner: null })}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.72 0.26 90))",
                  color: "var(--background)",
                }}
                className="font-semibold"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Banner
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {banners.map((b, i) => (
                <div
                  key={b.id}
                  data-ocid={`admin.banners.item.${i + 1}`}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  <div className="relative h-36">
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex items-center px-4">
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {b.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {b.subtitle}
                        </p>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block"
                          style={{
                            background: "oklch(0.675 0.25 178 / 0.2)",
                            color: "oklch(0.675 0.25 178)",
                            border: "1px solid oklch(0.675 0.25 178 / 0.3)",
                          }}
                        >
                          {b.ctaLabel} → {b.ctaLink || "/"}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] bg-emerald-500/80 text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Check className="h-2.5 w-2.5" />
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Position #{i + 1}
                    </p>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        data-ocid={`admin.banners.edit_button.${i + 1}`}
                        onClick={() =>
                          setBannerModal({ open: true, banner: b })
                        }
                        className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        data-ocid={`admin.banners.delete_button.${i + 1}`}
                        onClick={() =>
                          setDeleteDialog({
                            open: true,
                            type: "banner",
                            id: b.id,
                            label: b.title,
                            loading: false,
                          })
                        }
                        className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Orders ── */}
        {tab === "orders" && (
          <div data-ocid="admin.orders.section" className="space-y-4">
            <div>
              <h2 className="text-lg font-bold font-display">Orders</h2>
              <p className="text-xs text-muted-foreground">
                {orders.length} total orders
              </p>
            </div>

            <div className="space-y-3">
              {orders.map((o, i) => (
                <div
                  key={o.id}
                  data-ocid={`admin.orders.item.${i + 1}`}
                  className="rounded-xl border border-border bg-card p-3"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold">{o.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {o.id} · {o.date}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-2.5 w-2.5 text-primary" />
                        {o.address ?? `${o.city}, ${o.state}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-sm font-bold"
                        style={{ color: "oklch(0.675 0.25 178)" }}
                      >
                        {formatINR(o.totalInPaise)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {o.items} item{o.items > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Select
                      value={o.status}
                      onValueChange={(v) =>
                        updateOrderStatus(o.id, v as OrderStatus)
                      }
                    >
                      <SelectTrigger
                        data-ocid={`admin.orders.status_select.${i + 1}`}
                        className="h-7 text-xs w-44 border rounded-full"
                        style={STATUS_STYLES[o.status]}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(statusLabels) as OrderStatus[]).map(
                          (s) => (
                            <SelectItem key={s} value={s} className="text-xs">
                              {statusLabels[s]}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>

                    <button
                      type="button"
                      data-ocid={`admin.orders.view_button.${i + 1}`}
                      onClick={() => setOrderDetail({ open: true, order: o })}
                      className="h-7 px-3 rounded-full text-xs border border-border hover:border-primary hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Delivery Map */}
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                Live Delivery Map
                <span
                  className="text-[10px] ml-auto px-2 py-0.5 rounded-full border font-normal"
                  style={{
                    background: "oklch(0.675 0.25 178 / 0.15)",
                    color: "oklch(0.675 0.25 178)",
                    borderColor: "oklch(0.675 0.25 178 / 0.3)",
                  }}
                >
                  Kishanganj Delivery Zone
                </span>
              </h3>

              <div className="rounded-xl border border-border overflow-hidden">
                {/* Map iframe — recenters on selected order's city */}
                <div className="bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground border-b border-border flex items-center gap-1.5">
                  <Navigation className="h-3 w-3 text-primary" />
                  {selectedOrder
                    ? `${selectedOrder.city}, ${selectedOrder.state} — ${mapCoords[0].toFixed(4)}°N, ${mapCoords[1].toFixed(4)}°E`
                    : "Kishanganj, Bihar"}
                </div>
                <iframe
                  key={osmUrl}
                  src={osmUrl}
                  width="100%"
                  height="240"
                  style={{ border: "none" }}
                  title="Delivery Location Map"
                  loading="lazy"
                />
              </div>

              {/* Order location cards */}
              <div className="mt-3 space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Select order to view on map
                </p>
                {orders.map((o, i) => {
                  const coords = getCityCoords(o.city);
                  const isSelected = o.id === selectedOrderId;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      data-ocid={`admin.orders.map_card.${i + 1}`}
                      onClick={() => setSelectedOrderId(o.id)}
                      className={`w-full text-left rounded-lg border p-2.5 transition-all ${
                        isSelected
                          ? "border-primary/60 bg-primary/10"
                          : "border-border bg-card hover:border-primary/30 hover:bg-muted/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: isSelected
                                ? "oklch(0.675 0.25 178)"
                                : "oklch(0.675 0.25 178 / 0.2)",
                            }}
                          >
                            <MapPin
                              className="h-3 w-3"
                              style={{
                                color: isSelected
                                  ? "var(--background)"
                                  : "oklch(0.675 0.25 178)",
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold truncate">
                              {o.customer}
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate">
                              {o.address ?? `${o.city}, ${o.state}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full border"
                            style={STATUS_STYLES[o.status]}
                          >
                            {statusLabels[o.status]}
                          </span>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {coords[0].toFixed(2)}°N, {coords[1].toFixed(2)}°E
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Users ── */}
        {tab === "users" && (
          <div data-ocid="admin.users.section" className="space-y-4">
            <div>
              <h2 className="text-lg font-bold font-display">Users</h2>
              <p className="text-xs text-muted-foreground">
                {SAMPLE_USERS.length} registered users
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground text-xs">
                        #
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs">
                        Name
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs">
                        Phone
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs">
                        Email
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs text-right">
                        Points
                      </TableHead>
                      <TableHead className="text-muted-foreground text-xs">
                        Joined
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {SAMPLE_USERS.map((u, i) => (
                      <TableRow
                        key={u.id}
                        data-ocid={`admin.users.item.${i + 1}`}
                        className="border-border hover:bg-muted/20"
                      >
                        <TableCell className="text-xs text-muted-foreground">
                          {i + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-background"
                              style={{
                                background:
                                  "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.72 0.26 90))",
                              }}
                            >
                              {u.name[0]}
                            </div>
                            <span className="text-sm font-medium">
                              {u.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {u.phone}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {u.email}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "oklch(0.72 0.26 90)" }}
                          >
                            {u.points}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {u.joined}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-sm font-semibold mb-3">Rewards Summary</h3>
              <Separator className="mb-3" />
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p
                    className="text-xl font-bold font-display"
                    style={{ color: "oklch(0.72 0.26 90)" }}
                  >
                    {SAMPLE_USERS.reduce(
                      (s, u) => s + u.points,
                      0,
                    ).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                </div>
                <div>
                  <p className="text-xl font-bold font-display text-emerald-400">
                    {SAMPLE_USERS.filter((u) => u.points > 200).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Power Users</p>
                </div>
                <div>
                  <p className="text-xl font-bold font-display text-primary">
                    {SAMPLE_USERS.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductFormModal
        open={productModal.open}
        product={productModal.product}
        onClose={() => setProductModal({ open: false })}
        onSave={saveProduct}
      />
      <BannerFormModal
        open={bannerModal.open}
        banner={bannerModal.banner}
        onClose={() => setBannerModal({ open: false })}
        onSave={saveBanner}
      />
      <OrderDetailModal
        open={orderDetail.open}
        order={orderDetail.order}
        onClose={() => setOrderDetail({ open: false, order: null })}
      />
      <DeleteConfirmDialog
        open={deleteDialog.open}
        label={deleteDialog.label}
        loading={deleteDialog.loading}
        onConfirm={async () => {
          setDeleteDialog((d) => ({ ...d, loading: true }));
          if (deleteDialog.type === "product")
            await deleteProduct(deleteDialog.id);
          else await deleteBanner(deleteDialog.id);
          setDeleteDialog({
            open: false,
            type: "product",
            id: "",
            label: "",
            loading: false,
          });
        }}
        onClose={() =>
          setDeleteDialog({
            open: false,
            type: "product",
            id: "",
            label: "",
            loading: false,
          })
        }
      />
    </div>
  );
}
