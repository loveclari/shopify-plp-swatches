#  Shopify PLP Swatches Enhancement

This project customizes the Shopify Dawn theme to enhance the Product Listing Page (PLP) with variant color swatches, dynamic image switching, and AJAX-based Add to Cart functionality — without page reloads.

---

## Setup 

### 1. Clone the repository
```bash
git clone https://github.com/your-username/shopify-plp-swatches.git
cd shopify-plp-swatches
```

### 2. Upload the theme
Upload the theme files using the Shopify Theme Editor or [Shopify CLI](https://shopify.dev/docs/themes/tools/cli):
```bash
shopify theme dev
```

### 3. Preview
Once uploaded, preview any collection page or the homepage's Featured Collection block to test swatches and cart behavior.

---

## Features Implemented

- **Color Swatches on PLP**
  - Dynamically renders color options from the "Color" variant
  - Highlights selected swatch
  - Updates the product image to match the variant

- **AJAX Add to Cart**
  - Adds selected variant to cart with no reload
  - Displays success toast message
  - Updates cart icon bubble in header

- **Sold Out Handling**
  - Shows "Sold Out" status per variant
  - Disables the Add to Cart button when variant is unavailable

---

## Files Changed

- `layout/theme.liquid`  
- `sections/header.liquid`  
- `snippets/cart-product.liquid`
- `smippets/variant-swatches.liquid`   
- `assets/components-card.css`   
- `assets/plp-swatches.js` 

---

## Live Demo

[ View it live](https://c5ktjr-vd.myshopify.com/)

---

## Notes

- Swatch logic is based on products with a variant named **"Color"**
- Make sure your products have color images assigned to each variant
- Cart updates require a visible cart icon container (`#cart-count-bubble` and `#cart-count-number`)

---

##  To Do
- Improve animation smoothness between image swaps
- Add fallback for products with no color option
