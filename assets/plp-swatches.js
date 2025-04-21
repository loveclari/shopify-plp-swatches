document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); 
  
    const productCards = document.querySelectorAll('[data-product-card]');
  
    productCards.forEach(card => {
      const swatches = card.querySelectorAll('.swatch');
      const addToCartBtn = card.querySelector('.add-to-cart-btn');
      const productImg = card.querySelector('[data-product-image]');
      let selectedVariantId = null;
      let selectedVariantAvailable = false;
  
      const clonedAddToCartBtn = addToCartBtn.cloneNode(true);
      addToCartBtn.parentNode.replaceChild(clonedAddToCartBtn, addToCartBtn);
  
      swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
          swatches.forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
  
          selectedVariantId = swatch.dataset.variantId;
          selectedVariantAvailable = swatch.dataset.available === 'true';
  
          if (productImg && swatch.dataset.image) {
            const newImage = swatch.dataset.image + '?v=' + Date.now();
            productImg.src = newImage;
            productImg.srcset = '';
          }
  
          if (selectedVariantAvailable) {
            clonedAddToCartBtn.disabled = false;
            clonedAddToCartBtn.textContent = 'Add to Cart';
            clonedAddToCartBtn.classList.remove('hidden');
          } else {
            clonedAddToCartBtn.disabled = true;
            clonedAddToCartBtn.textContent = 'Sold Out';
            clonedAddToCartBtn.classList.remove('hidden');
          }
        });
      });
  
      clonedAddToCartBtn.addEventListener('click', async () => {
        if (!selectedVariantId || !selectedVariantAvailable) return;
  
        try {
          console.log('🛒 Adding to cart:', selectedVariantId);
          const res = await fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedVariantId, quantity: 1 })
          });
  
          if (!res.ok) {
            throw new Error(`failed to add to cart: ${res.statusText}`);
          }
  
          const data = await res.json();
          console.log('Added to cart:', data);
          showToast();
  
          setTimeout(async () => {
            await updateCartCount();
          }, 500);
        } catch (err) {
          console.error('Failed to add to cart:', err);
        }
      });
    });
  
  async function updateCartCount() {
    try {
      console.log('fetching cart data...');
      const res = await fetch('/cart.js');
      if (!res.ok) {
        throw new Error(`failed to fetch cart data: ${res.statusText}`);
      }
  
      const cart = await res.json();
      console.log('cart data fetched:', cart);
  
      const bubble = document.getElementById('cart-count-bubble');
      const number = document.getElementById('cart-count-number');
  
      if (!bubble || !number) {
        console.warn('cart count missing in the DOM.');
        return;
      }
  
      // Update the cart count number
      number.textContent = cart.item_count;
  
      bubble.style.display = cart.item_count > 0 ? 'block' : 'none';
      console.log('Update cart bubble display:', bubble.style.display);
    } catch (err) {
      console.error('Failed to update cart count:', err);
    }
  }
  
    function showToast() {
      const toast = document.getElementById('swatch-cart-success');
      if (toast) {
        toast.style.display = 'block';
        setTimeout(() => (toast.style.display = 'none'), 3000);
      }
    }
  });