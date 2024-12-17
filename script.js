let isViewAll = false;  // Declare once at the top of your script

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(-${index * 100}%)`;
    indicators[i].classList.toggle('active', i === index);
  });
}

indicators.forEach((indicator, i) => {
  indicator.addEventListener('click', () => {
    currentSlide = i;
    showSlide(currentSlide);
  });
});

showSlide(currentSlide);

document.addEventListener("DOMContentLoaded", function () {
  // Tab switch functionality
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Hide all tab contents and remove active class from all buttons
      tabContents.forEach((content) => content.classList.remove("active"));
      tabButtons.forEach((button) => button.classList.remove("active"));

      // Show the selected tab content and mark the button as active
      document.getElementById(targetTab).classList.add("active");
      this.classList.add("active");
    });
  });

  // Expandable promo card functionality
  const promoCards = document.querySelectorAll(".promo-card.expandable");

  promoCards.forEach((card) => {
    card.addEventListener("click", function (event) {
      // Prevent click event from propagating to child elements
      if (!event.target.closest(".expand-icon")) {
        card.classList.toggle("active");
      }
    });
  });
});



// Enable drag-and-snap scrolling with improved mobile/PC support
function enableDragScroll(containerSelector, itemSelector) {
  const container = document.querySelector(containerSelector);
  let isDragging = false;
  let startX, scrollLeft, lastPageX, velocity;

  // Pointer/Touch Down Event
  function onPointerDown(e) {
    isDragging = true;
    startX = (e.pageX || e.touches[0].pageX) - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    lastPageX = startX;
    velocity = 0; // Reset velocity
    container.style.cursor = 'grabbing';
    container.style.scrollBehavior = 'auto'; // Disable smooth scrolling during drag
  }

  // Pointer/Touch Move Event
  function onPointerMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = (e.pageX || e.touches[0].pageX) - container.offsetLeft;
    const walk = (pageX - startX) * 1.5; // Adjust scroll speed
    container.scrollLeft = scrollLeft - walk;

    // Calculate velocity for smooth snapping
    velocity = pageX - lastPageX;
    lastPageX = pageX;
  }

  // Pointer/Touch Up Event
  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';
    container.style.scrollBehavior = 'smooth'; // Re-enable smooth scrolling

    // Snap to the nearest item
    finishScroll(container, itemSelector, velocity);
  }

  // Smooth snapping function
  function finishScroll(container, itemSelector, velocity) {
    const items = container.querySelectorAll(itemSelector);
    if (!items.length) return;

    const itemWidth = items[0].offsetWidth + 10; // Item width including gap
    const currentScroll = container.scrollLeft;
    const index = Math.round((currentScroll - velocity * 5) / itemWidth); // Adjust index based on velocity
    const targetScroll = Math.max(0, index * itemWidth); // Prevent negative scroll

    smoothScroll(container, targetScroll, 300);
  }

  // Attach event listeners with cross-device support
  container.addEventListener('mousedown', onPointerDown);
  container.addEventListener('mousemove', onPointerMove);
  container.addEventListener('mouseup', onPointerUp);
  container.addEventListener('mouseleave', onPointerUp);

  container.addEventListener('touchstart', onPointerDown, { passive: true });
  container.addEventListener('touchmove', onPointerMove, { passive: false });
  container.addEventListener('touchend', onPointerUp);
  container.addEventListener('touchcancel', onPointerUp);

  container.style.cursor = 'grab';
}

// Smooth scroll function with easing
function smoothScroll(element, target, duration) {
  const start = element.scrollLeft;
  const change = target - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const ease = easeOutCubic(progress);
    element.scrollLeft = start + change * ease;

    if (progress < 1) requestAnimationFrame(animateScroll);
  }

  requestAnimationFrame(animateScroll);
}

// Easing function for smooth effect
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Toggle between grid view and horizontal scroll
function toggleView() {
  const categoryList = document.querySelector('.category-list');
  const viewAllBtn = document.querySelector('.view-all-btn');

  if (!isViewAll) {
    categoryList.classList.add('grid-view');
    viewAllBtn.textContent = 'Scroll View';
    categoryList.style.overflow = 'visible';
  } else {
    categoryList.classList.remove('grid-view');
    viewAllBtn.textContent = 'View All';
    categoryList.style.overflow = 'hidden';
  }
  isViewAll = !isViewAll;
}

// Initialize drag scrolling for categories and products
document.addEventListener('DOMContentLoaded', () => {
  enableDragScroll('.category-list', '.category-item');
  enableDragScroll('.product-list', '.product-item');
});





document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("product-modal");
  const closeModal = document.querySelector(".close-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImg = document.getElementById("modal-img");
  const ingredientContainer = document.getElementById("modal-ingredients");

  // Event listener untuk membuka modal produk
  document.querySelectorAll(".product-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      // Cegah aksi jika tombol dalam product-item ditekan
      if (e.target.closest("button")) return;

      // Ambil data dari atribut di product-item
      const title = item.dataset.title;
      const description = item.dataset.description;
      const imgSrc = item.dataset.img;
      const ingredients = item.dataset.ingredients.split(",");

      // Populasi modal dengan data
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalImg.src = imgSrc;

      // Tampilkan ingredients
      ingredientContainer.innerHTML = ingredients
        .map((ingredient) => `<span>${ingredient}</span>`)
        .join("");

      // Tampilkan modal
      modal.style.display = "flex";
    });
  });

  // Event listener untuk menutup modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});



// Menunggu DOM siap
document.addEventListener("DOMContentLoaded", function () {
  // Event Listener untuk tombol quantity
  const productList = document.querySelectorAll(".product-item");

  productList.forEach((item) => {
    const minusBtn = item.querySelector(".minus");
    const plusBtn = item.querySelector(".plus");
    const qtyInput = item.querySelector(".qty-input");

    // Fungsi menambah quantity
    plusBtn.addEventListener("click", function () {
      let currentValue = parseInt(qtyInput.value);
      qtyInput.value = currentValue + 1; // Menambah 1
    });

    // Fungsi mengurangi quantity
    minusBtn.addEventListener("click", function () {
      let currentValue = parseInt(qtyInput.value);
      if (currentValue > 1) {
        qtyInput.value = currentValue - 1; // Mengurangi 1, tetapi minimal 1
      }
    });

    // Pastikan input tidak menerima angka kurang dari 1
    qtyInput.addEventListener("change", function () {
      if (qtyInput.value < 1 || isNaN(qtyInput.value)) {
        qtyInput.value = 1; // Reset ke 1 jika invalid
      }
    });
  });
});














// SCRIPT UNTUK CART
document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const cartCountElement = document.querySelector(".cart-count");
  const cartIcon = document.querySelector(".cart-icon");

  // Update cart count
  const updateCartCount = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
  };

  // Hitung total harga keseluruhan
  const calculateTotalPrice = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("total-price").textContent = `Rp${total.toLocaleString()}`;
  };

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.title === product.title);
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    updateCartCount();
  };

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productItem = e.target.closest(".product-item");
      const product = {
        title: productItem.dataset.title,
        price: parseFloat(productItem.dataset.price.replace("Rp.", "").replace(".", "")),
        quantity: parseInt(productItem.querySelector(".qty-input").value, 10),
      };
      addToCart(product);
    });
  });

  // Display cart modal
  const displayCart = () => {
    const modal = document.createElement("div");
    modal.classList.add("cart-modal");

    // Generate modal HTML
    modal.innerHTML = `
      <div class="cart-modal-content">
        <h2>Keranjang Pesanan</h2>
        <div class="cart-items">
          ${cart
            .map(
              (item, index) => `
              <div class="cart-item" data-index="${index}">
                <span>${index + 1}. ${item.title}</span>
                <div class="quantity">
                  <button class="qty-btn minus">-</button>
                  <input type="number" class="qty-input" value="${item.quantity}" min="1" />
                  <button class="qty-btn plus">+</button>
                </div>
              </div>
              <hr />
            `
            )
            .join("")}
        </div>
        <div class="total-price">
          Total Price: <span id="total-price">Rp0</span>
        </div>
        <button class="checkout-btn">Checkout</button>
      </div>
    `;

    document.body.appendChild(modal);
    calculateTotalPrice(); // Hitung total harga saat modal ditampilkan

    // Quantity adjustment
    modal.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-item");
        const index = cartItem.dataset.index;
        const input = cartItem.querySelector(".qty-input");
        let value = parseInt(input.value, 10);

        if (e.target.classList.contains("minus") && value > 1) {
          value--;
        } else if (e.target.classList.contains("plus")) {
          value++;
        }

        input.value = value;
        cart[index].quantity = value;

        calculateTotalPrice(); // Update total harga
        updateCartCount();
      });
    });

    // Checkout button
    modal.querySelector(".checkout-btn").addEventListener("click", () => {
      alert("Pesanan berhasil dipesan!");
      cart.length = 0; // Clear cart
      updateCartCount();
      document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  };

  // Event listener for cart icon
  cartIcon.addEventListener("click", displayCart);
});



