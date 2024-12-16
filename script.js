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



// Enable drag-and-snap scrolling for categories
function enableDragScroll() {
  const categoryList = document.querySelector('.category-list');
  let isDragging = false;
  let startX;
  let scrollLeft;
  let velocity = 0;
  let isFlick = false;

  categoryList.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.pageX - categoryList.offsetLeft;
    scrollLeft = categoryList.scrollLeft;
    velocity = 0; // Reset velocity on new drag
    categoryList.style.cursor = 'grabbing';
  });

  categoryList.addEventListener('pointerleave', () => {
    if (isDragging) finishScroll();
    isDragging = false;
    categoryList.style.cursor = 'grab';
  });

  categoryList.addEventListener('pointerup', () => {
    if (isDragging) finishScroll();
    isDragging = false;
    categoryList.style.cursor = 'grab';
  });

  categoryList.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - categoryList.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scrolling speed
    velocity = x - startX; // Calculate velocity for snapping
    categoryList.scrollLeft = scrollLeft - walk;
  });

  // Smooth snapping to the nearest item
  function finishScroll() {
    const itemWidth = categoryList.querySelector('.category-item').offsetWidth + 10; // Include gap
    const currentScroll = categoryList.scrollLeft;
    const index = Math.round(currentScroll / itemWidth);
    const targetScroll = index * itemWidth;

    smoothScroll(categoryList, targetScroll, 300); // Smooth scroll to target
  }
}

// Smooth scroll function
function smoothScroll(element, target, duration) {
  const start = element.scrollLeft;
  const change = target - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const ease = easeOutCubic(progress);
    element.scrollLeft = start + change * ease;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

// Easing function for smoother scroll
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Toggle between horizontal scrolling and grid view
function toggleView() {
  const categoryList = document.querySelector('.category-list');
  const viewAllBtn = document.querySelector('.view-all-btn');

  if (!isViewAll) {
    // Change to Grid View
    categoryList.classList.add('grid-view');
    viewAllBtn.textContent = 'Scroll View';
    categoryList.style.overflow = 'visible';
  } else {
    // Change to Horizontal Scroll View
    categoryList.classList.remove('grid-view');
    viewAllBtn.textContent = 'View All';
    categoryList.style.overflow = 'hidden';
  }

  isViewAll = !isViewAll;
}

// Initialize drag scrolling on page load
document.addEventListener('DOMContentLoaded', enableDragScroll);

// Enable drag-and-snap scrolling for products
function enableDragScrollProducts() {
  const productList = document.querySelector('.product-list');
  let isDragging = false;
  let startX;
  let scrollLeft;

  productList.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.pageX - productList.offsetLeft;
    scrollLeft = productList.scrollLeft;
    productList.style.cursor = 'grabbing'; // Change cursor to grabbing
  });

  productList.addEventListener('pointerleave', () => {
    if (isDragging) finishScrollProducts();
    isDragging = false;
    productList.style.cursor = 'grab'; // Change cursor back to grab
  });

  productList.addEventListener('pointerup', () => {
    if (isDragging) finishScrollProducts();
    isDragging = false;
    productList.style.cursor = 'grab'; // Change cursor back to grab
  });

  productList.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - productList.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll speed
    productList.scrollLeft = scrollLeft - walk;
  });

  // Smooth snapping to the nearest item
  function finishScrollProducts() {
    const itemWidth = productList.querySelector('.product-item').offsetWidth + 15; // Include gap
    const currentScroll = productList.scrollLeft;
    const index = Math.round(currentScroll / itemWidth);
    const targetScroll = index * itemWidth;

    smoothScroll(productList, targetScroll, 300); // Smooth scroll to target position
  }
}

// Initialize drag scrolling for products on page load
document.addEventListener('DOMContentLoaded', enableDragScrollProducts);

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


