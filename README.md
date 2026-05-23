# VISÃO — Build Guide

This is the build guide for `visao.html`. Drop this file in the same folder as the HTML so you (and Claude Code) can reference it.

---

## What's in the file

Single self-contained HTML with everything inline. The structure top-to-bottom:

1. **Announcement bar** — sticky drop launch / shipping notice
2. **Navigation** — desktop links + mobile hamburger + cart icon
3. **Hero** — full-viewport editorial section with VISÃO wordmark
4. **Latest Drop** — 3 product cards, each with a Shopify injection slot
5. **Craftsmanship** — "wearable art" positioning + stats
6. **Heritage** — Brazilian story section (subtle)
7. **Archive** — past drops grid
8. **Manifesto + Newsletter** — email capture
9. **Footer** — full nav, social, brand
10. **Cart drawer** — slides in from right when cart icon clicked
11. **Mobile menu** — slides in from right on small screens

All animations work. All buttons work. Cart drawer functions. Mobile nav functions. Newsletter form shows success state. Scroll-reveal animations trigger as user scrolls.

---

## Local development

1. Install **VS Code** if you haven't
2. Install the **Live Server** extension (search "Live Server" by Ritwick Dey)
3. Open the folder containing `visao.html` in VS Code
4. Right-click `visao.html` → "Open with Live Server"
5. Site opens at `localhost:5500` — every save auto-refreshes the browser

---

## Adding a new product

In `visao.html`, find the `LATEST DROP` section. Each product is one `<article class="product-card">` block.

**To add a 4th product:**

1. Copy this template:

```html
<article class="product-card" data-product-id="UNIQUE-ID-HERE">
  <div class="product-image" data-placeholder="Product name · description for placeholder">
    <span class="product-tag">1 of 100</span>
  </div>
  <div class="product-info">
    <h3 class="product-name">The [Name]</h3>
    <p class="product-subtitle">Material · construction · key detail</p>
    <div class="product-price">$XXX</div>
    <div class="buy-button-slot" id="buy-button-UNIQUE-ID-HERE">
      <button class="btn-fallback">Reserve · Pre-order</button>
    </div>
  </div>
</article>
```

2. Paste it inside `<div class="product-grid">` (after the existing cards)
3. Change `UNIQUE-ID-HERE` everywhere to your product slug (e.g. `koi-jacket`)
4. Update name, subtitle, price
5. Add a real image later by replacing the `.product-image` CSS background

**The grid auto-handles layout:** 3 columns on desktop, 2 on tablet, 1 on mobile. You can have 1, 3, 6, 9, or any number of products.

---

## Adding a new drop (new collection page)

For now, all products go on the homepage `#drops` section. When you ship multiple drops, structure it like this:

1. Duplicate `visao.html` → rename `drop-001-sakura.html`
2. Strip out everything except nav + drop section + footer
3. Update product cards for that drop's pieces
4. Link to it from the Archive section on the homepage

Or — simpler — keep adding sections to the homepage with different ids (`#drop-001`, `#drop-002`) and let people scroll through all drops on one long page.

---

## Wiring Shopify (when you have a product ready)

### One-time Shopify setup
1. Go to Shopify Admin → **Settings → Apps and sales channels**
2. Click **"Shopify App Store"** (top right) → search "Buy Button"
3. Install the **Buy Button channel** (free, official)
4. Settings → Domains → rename store URL from `byyfwj-ys.myshopify.com` to `visao.myshopify.com`
5. Settings → Payments → enable **Shopify Payments**

### Per-product
1. Shopify Admin → **Products → Add product**: create The Sakura Hoodie (or whichever piece)
2. Sales channels → **Buy Button → Create a Buy Button → Product**
3. Select the product
4. Customize: button color `#c9a961`, dark text, **uncheck Show title / image / price**
5. Click "Next" → Shopify generates a code snippet
6. In the generated code, find this line:
   ```js
   node: document.getElementById('product-component-XXXXX'),
   ```
7. Change `'product-component-XXXXX'` to match your slot: e.g. `'buy-button-sakura-hoodie'`
8. Open `visao.html` and find the comment `===== 5. SHOPIFY BUY BUTTON INIT =====`
9. Uncomment the example block and replace with your real Shopify code
10. Save. Test. The "Reserve · Pre-order" button is now a real Shopify checkout.

Repeat per product. Each product gets its own init block.

---

## Claude Code prompts (copy/paste these)

Open the folder in VS Code, open Claude Code, then paste any of these:

### Brand/copy tweaks
```
In visao.html, change the hero tagline to "[new tagline]". Keep the styling.
```
```
In visao.html, update the heritage section copy to mention my grandmother Lourdes by name and her town in Minas Gerais. Keep the structure but write it as if I'm telling the story to a friend.
```
```
In visao.html, change the craftsmanship stats. Replace "80k+ stitches per piece" with [new stat] and label it [new label]. Do the same for the other two stats.
```

### Adding products
```
In visao.html, in the .product-grid section, add three new product cards after the existing three. Use unique data-product-id and buy-button-slot ids for each. Name them: [Name 1], [Name 2], [Name 3]. Use the existing card template.
```

### Visual tweaks
```
In visao.html, change the accent gold color from #c9a961 to [new hex]. Update both --accent-gold and --accent-gold-dim variables.
```
```
In visao.html, replace the hero-bg gradient placeholder with a real image. Use this URL: [image URL]. Add background-size: cover and background-position: center.
```
```
In visao.html, make the product card images load from a /images folder. Each card should use a background-image of /images/[product-id].jpg matching the data-product-id.
```

### New sections
```
In visao.html, add a new section between Craftsmanship and Heritage called "Press" — three columns of magazine/blog quotes about VISÃO. Style it like the rest of the site.
```
```
In visao.html, add a sticky countdown timer at the top of the hero that counts down to the drop launch. Use vanilla JavaScript, no libraries.
```

### Switching brand modes per drop
```
In visao.html, create a "Brazil capsule" variant where the announcement bar, hero deco, and primary accent shift from gold to the emerald/terracotta brazil palette I defined in :root. Make it a CSS class I can add to <body> to toggle.
```

---

## Deployment

When ready to go live:

1. Push the folder to **GitHub** (create a repo)
2. Sign up for **Cloudflare Pages** (free)
3. Connect Cloudflare Pages to your GitHub repo
4. Set build command: leave empty. Output directory: `/` (it's just HTML)
5. Cloudflare gives you a `*.pages.dev` URL immediately
6. Point your real domain (shopvisao.com or shopvi3ion.com) at Cloudflare Pages in the DNS settings of your domain registrar
7. Done. Every git push auto-deploys.

Alternative hosts that work the same way: Vercel, Netlify.

---

## File structure when you scale

```
/visao-site
  /visao.html                ← current single-file build
  /README.md                 ← this file
  /images
    /hero.jpg
    /sakura-hoodie.jpg
    /sakura-tee.jpg
    ...
  /drops
    /drop-001-sakura.html    ← future per-drop pages
    /drop-002.html
```

Eventually you'll split CSS and JS into separate files but **not yet**. Single file = fastest iteration with Claude Code.

---

## What's NOT included (intentional)

- **No tracking pixels** — add your Meta/TikTok pixels when you're ready to run ads. Drop them in the `<head>`.
- **No analytics** — add Google Analytics 4 or Shopify analytics when you have traffic.
- **No real product images** — placeholder backgrounds with `data-placeholder` text show where they'll go. Replace when you have factory samples photographed.
- **No real cart logic** — the cart drawer is functional (slides open/closed) but empty. Shopify Buy Button replaces this entirely once wired.
- **No SEO meta tags beyond basics** — add proper OpenGraph tags when you're ready to share on social.

---

## Color reference (for design consistency)

| Token | Hex | Use |
|-------|-----|-----|
| `--bg-primary` | `#0a0a0a` | Main background |
| `--bg-secondary` | `#141414` | Alternate sections |
| `--bg-tertiary` | `#1c1c1c` | Card backgrounds |
| `--text-primary` | `#f0ebe0` | Main text (warm cream) |
| `--text-secondary` | `#8a8479` | Secondary text |
| `--accent-gold` | `#c9a961` | Signature accent |
| `--accent-emerald` | `#2d4f3d` | Brazil capsule only |
| `--accent-terracotta` | `#a85a3d` | Brazil capsule only |

---

## Questions for Claude / next steps

When you have factory samples and need to wire Shopify, just send a screenshot of the Shopify generated code and ask Claude to walk you through pasting it into the right slot. Same for adding tracking pixels, building per-drop pages, or designing the Brazil capsule.
