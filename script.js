// ============================================================
// VELORA - Shared Script
// ============================================================

// ─── Product Data ───────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1, name: "Linen Relaxed Blazer", price: 4999, category: "Women",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4a2b?w=600&q=80",
    description: "A relaxed-fit blazer crafted from premium linen. Perfect for effortless sophistication.",
    material: "100% Linen", fit: "Relaxed Fit", care: "Dry Clean Only",
    badge: "New"
  },
  {
    id: 2, name: "Structured Wool Coat", price: 8999, category: "Women",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    description: "A timeless structured coat in fine merino wool. An investment piece for every wardrobe.",
    material: "90% Merino Wool, 10% Cashmere", fit: "Tailored Fit", care: "Dry Clean Only",
    badge: "Bestseller"
  },
  {
    id: 3, name: "Slim Tapered Chinos", price: 2799, category: "Men",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    description: "Slim tapered chinos with a refined finish. Versatile enough for work and weekends.",
    material: "98% Cotton, 2% Elastane", fit: "Slim Tapered", care: "Machine Wash Cold",
    badge: ""
  },
  {
    id: 4, name: "Oxford Button-Down Shirt", price: 1999, category: "Men",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80",
    description: "A classic Oxford shirt, elevated with premium fabric and precise tailoring.",
    material: "100% Oxford Cotton", fit: "Regular Fit", care: "Machine Wash Warm",
    badge: ""
  },
  {
    id: 5, name: "Oversized Graphic Hoodie", price: 2499, category: "Streetwear",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    description: "Heavyweight oversized hoodie with a bold graphic print. Made for the streets.",
    material: "100% Heavyweight Cotton", fit: "Oversized Fit", care: "Machine Wash Cold",
    badge: "New"
  },
  {
    id: 6, name: "Cargo Utility Pants", price: 3299, category: "Streetwear",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    description: "Technical cargo pants with multiple pockets. Form meets function.",
    material: "100% Ripstop Cotton", fit: "Relaxed Fit", care: "Machine Wash Cold",
    badge: ""
  },
  {
    id: 7, name: "Leather Minimal Tote", price: 5499, category: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    description: "A clean-lined tote in full-grain leather. The only bag you'll ever need.",
    material: "Full-Grain Leather", fit: "One Size", care: "Spot Clean Only",
    badge: "Bestseller"
  },
  {
    id: 8, name: "Cashmere Knit Scarf", price: 1799, category: "Accessories",
    image: "https://images.unsplash.com/photo-1601924921557-45e6dea0a157?w=600&q=80",
    description: "Exceptionally soft pure cashmere scarf. Lightweight warmth in every season.",
    material: "100% Pure Cashmere", fit: "One Size", care: "Hand Wash Cold",
    badge: ""
  },
  {
    id: 9, name: "Silk Slip Dress", price: 6299, category: "Women",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    description: "A fluid silk slip dress that moves beautifully. Effortlessly elegant.",
    material: "100% Silk", fit: "Relaxed Slip", care: "Dry Clean Only",
    badge: "New"
  },
  {
    id: 10, name: "Premium Crewneck Sweater", price: 2999, category: "Men",
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80",
    description: "A wardrobe essential in fine Pima cotton. Soft, breathable and timeless.",
    material: "100% Pima Cotton", fit: "Regular Fit", care: "Machine Wash Cold",
    badge: ""
  },
  {
    id: 11, name: "Track Jacket", price: 2199, category: "Streetwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    description: "A clean track jacket with minimal branding. Athletic meets everyday.",
    material: "100% Recycled Polyester", fit: "Relaxed Fit", care: "Machine Wash Cold",
    badge: ""
  },
  {
    id: 12, name: "Suede Belt", price: 1299, category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    description: "A refined suede belt with brass hardware. The perfect finishing touch.",
    material: "Genuine Suede, Brass Hardware", fit: "Adjustable", care: "Spot Clean",
    badge: ""
  }
];

// ─── Cart Utilities ──────────────────────────────────────────
function getCart() {
  return JSON.parse(localStorage.getItem('velora_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('velora_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, size = 'M', qty = 1) {
  const cart = getCart();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, name: product.name, price: product.price, image: product.image, size, qty });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

// ─── Toast ───────────────────────────────────────────────────
function showToast(msg) {
  const existing = document.querySelector('.velora-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'velora-toast';
  toast.innerHTML = `<span>✓</span> ${msg}`;
  toast.style.cssText = `
    position:fixed;bottom:32px;right:32px;z-index:9999;
    background:#2D2D2D;color:#fff;padding:14px 22px;border-radius:8px;
    font-family:'Poppins',sans-serif;font-size:14px;
    display:flex;align-items:center;gap:10px;
    box-shadow:0 8px 32px rgba(0,0,0,0.18);
    animation:toastIn .3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'toastOut .3s ease forwards'; setTimeout(() => toast.remove(), 300); }, 2500);
}

// ─── Mobile Menu ─────────────────────────────────────────────
function initMobileMenu() {
  const btn = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('open'));
  }
}

// ─── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initMobileMenu();
});
