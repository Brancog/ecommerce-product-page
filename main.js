import "./sass/style.scss";

// SHOPPING CART FUNCTIONALITY

////////////////////////////////
// MOBILE MENU TOGGLE
const sandwichBtn = document.querySelector(".navbar__sandwich-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuCloseBtn = document.querySelector(".mobile-menu__closeBtn");
const fcOverlay = document.querySelector(".fullscreen-overlay");
const body = document.querySelector("body");
const sliderGallery = document.querySelector(".slider-gallery");
const lightboxModal = document.querySelector("#lightbox");
const lightboxCloseBtn = document.querySelector(".lightbox__close-btn");
// LIGHTBOX TRIGGER
sliderGallery.addEventListener("click", (e) => {
  lightboxModal.show();
  toggleLightboxOverlay();
});

// CLOSE LIGHTBOX BTN
lightboxCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  lightboxModal.close();
  toggleLightboxOverlay();
});

fcOverlay.addEventListener("click", (e) => {
  toggleOverlay();
  if (mobileMenu.classList.contains("mobile-menu--visible")) {
    mobileMenu.classList.toggle("mobile-menu--hidden");
    mobileMenu.classList.toggle("mobile-menu--visible");
  }

  lightboxModal.close();
});

sandwichBtn.addEventListener("click", (e) => {
  toggleOverlay();
  mobileMenu.classList.toggle("mobile-menu--hidden");
  mobileMenu.classList.toggle("mobile-menu--visible");
});

mobileMenuCloseBtn.addEventListener("click", (e) => {
  toggleOverlay();
  mobileMenu.classList.toggle("mobile-menu--hidden");
  mobileMenu.classList.toggle("mobile-menu--visible");
});

function toggleOverlay() {
  const fsOverlay = document.querySelector(".fullscreen-overlay");
  fsOverlay.classList.toggle("hidden");
}
function toggleLightboxOverlay() {
  const lightboxOverlay = document.querySelector(".lightbox-overlay");
  lightboxOverlay.classList.toggle("hidden");
}

// ALIGN CLOSE WITH SANDWICH MOBILE TOGGLE BUTTON
alignMobileToggleBtns();

window.addEventListener("resize", alignMobileToggleBtns);

function alignMobileToggleBtns() {
  const mainContainer = document.querySelector(".container");
  mobileMenu.style.paddingLeft = getComputedStyle(mainContainer).marginLeft;
  const navbarWrap = document.querySelector(".navbar__wrap");
  mobileMenuCloseBtn.style.height = getComputedStyle(navbarWrap).height;
}

/////////////////////////////////////
// SLIDER
const slider = function () {
  const slides = document.querySelectorAll(".slider-gallery__img-wrap");
  const lightboxSlides = document.querySelectorAll(".lightbox__img-wrap");
  const btnPrev = document.querySelector(".slider-gallery__btn-prev");
  const btnNext = document.querySelector(".slider-gallery__btn-next");
  const dotContainer = document.querySelector(".slider-gallery__dots");
  const thumbnailContainer = document.querySelector(
    ".slider-gallery__desktop-thumbnails"
  );
  const lightboxThumbnails = document.querySelector(".lightbox__thumbnails");
  const lightboxPrev = document.querySelector(".lightbox__btn--left");
  const lightboxNext = document.querySelector(".lightbox__btn--right");

  let curSlide = 0;
  const maxSlide = 4;

  const activateDot = function (slide) {
    document.querySelectorAll(".slider-gallery__dots-dot").forEach((dot) => {
      dot.classList.remove("slider-gallery__dots-dot--active");
    });

    document
      .querySelector(`.slider-gallery__dots-dot[data-slide="${slide}"]`)
      .classList.add("slider-gallery__dots-dot--active");
  };

  const activateThumbnail = function (slide) {
    document
      .querySelectorAll(".slider-gallery__thumbnail-wrap")
      .forEach((thumb) => {
        thumb.classList.remove("slider-gallery__thumbnail-wrap--active");
      });

    document.querySelectorAll(".lightbox__thumbnail-wrap").forEach((thumb) => {
      thumb.classList.remove("lightbox__thumbnail-wrap--active");
    });

    document
      .querySelector(`.lightbox__thumbnail-wrap[data-slide="${slide}"]`)
      .classList.add("lightbox__thumbnail-wrap--active");

    document
      .querySelector(`.slider-gallery__thumbnail-wrap[data-slide="${slide}"]`)
      .classList.add("slider-gallery__thumbnail-wrap--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
    lightboxSlides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function (e) {
    e.preventDefault();
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
    activateThumbnail(curSlide);
  };

  const prevSlide = function (e) {
    e.preventDefault();
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
    activateThumbnail(curSlide);
  };

  const init = function () {
    goToSlide(0);
    activateDot(0);
  };

  activateThumbnail(curSlide);
  activateDot(curSlide);
  init();

  //   EVENT HANDLERS
  // Prev/Next slide btns
  btnPrev.addEventListener("click", prevSlide);
  btnNext.addEventListener("click", nextSlide);
  lightboxPrev.addEventListener("click", prevSlide);
  lightboxNext.addEventListener("click", nextSlide);

  //   KEYBOARD CONTROLS FOR SLIDER
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  //   DOT CONTROLS FOR SLIDER
  dotContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("slider-gallery__dots-dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  // THUMBNAIL CONTROLS FOR SLIDER
  thumbnailContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.closest(".slider-gallery__thumbnail-wrap")) {
      const slide = e.target.closest(".slider-gallery__thumbnail-wrap").dataset
        .slide;
      goToSlide(slide);
      activateThumbnail(slide);
    }
  });
  lightboxThumbnails.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.closest(".lightbox__thumbnail-wrap")) {
      const slide = e.target.closest(".lightbox__thumbnail-wrap").dataset.slide;
      goToSlide(slide);
      activateThumbnail(slide);
    }
  });
};

slider();

///////////////////////////////////
// PRODUCT QUANTITY INPUT
const productQtInput = document.querySelector(".product__quantity-input");
const productQuantityContainer = document.querySelector(".product__quantity");

productQtInput.addEventListener("input", (e) => {
  productQtInput.value = Math.abs(productQtInput.value);

  if (+productQtInput.value > 10) {
    productQtInput.value = 10;

    displayInputLimitWarning();
  } else
    document.querySelector(".product__input-warning").classList.add("hidden");
});

productQuantityContainer.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.closest(".product__quantity-btn--plus")) {
    if (productQtInput.value < 10) productQtInput.value++;
    else displayInputLimitWarning();
  }
  if (e.target.closest(".product__quantity-btn--minus")) {
    if (productQtInput.value > 1) productQtInput.value--;
  }
});

function displayInputLimitWarning() {
  document.querySelector(".product__input-warning").classList.remove("hidden");

  setTimeout(function () {
    document.querySelector(".product__input-warning").classList.add("hidden");
  }, 2500);
}

////////////////////////////////
// CART FUNCTIONALITY

// Cart object
let shoppingCart = {
  _parentEl: document.querySelector(".cart__product-wrap"),
  _emptyCart: document.querySelector(".cart__empty"),
  _checkoutBtn: document.createElement("div"),
  _cartQt: document.createElement("span"),
  _productEl: document.createElement("div"),
  total: 0,
  sum: 0,
  prodCount: 0,
  updateUI: function () {
    if (this.cart.length > 0) {
      this._emptyCart.style.display = "none";

      for (let item of this.cart) {
        this._productEl.innerHTML = `
        <div class="cart__product-img-wrap">
              <img src="images/image-product-1-thumbnail.jpg" alt="sneakers" />
            </div>
            <div class="cart__product-details">
              <span class="cart__product-name"
                >${item.productName}</span
              >
              <span class="cart__product-price">$${item.productPrice} x ${
          item.productQt
        }</span>
              <span class="cart__product-total-price">$${
                item.productPrice * item.productQt
              }.00</span>
            </div>
            <a href="#" class="cart__delete">
              <img src="images/icon-delete.svg" alt="" />
            </a>
        </div>
        `;
      }

      shoppingCart._parentEl.appendChild(shoppingCart._productEl);
      shoppingCart._productEl.classList.add("cart__product");

      const cartDelete = document.querySelector(".cart__delete");

      // CART ITEM DELETE BTN
      if (cartDelete) {
        cartDelete.addEventListener("click", (e) => {
          console.log("delete");
          e.preventDefault();
          const itemToDelete = e.target
            .closest(".cart__product")
            .querySelector(".cart__product-name").innerHTML;

          for (let i = 0; i < shoppingCart.cart.length; i++) {
            if (shoppingCart.cart[i].productName === itemToDelete) {
              shoppingCart.cart.splice(i, 1);
            }
            localStorage.setItem("cart", JSON.stringify(shoppingCart.cart));
          }
          if (shoppingCart.cart.length < 1) {
            shoppingCart._parentEl.innerHTML = "";
            this._emptyCart.style.display = "initial";
            // Calculate total number of cart items
            for (let item of this.cart) {
              this.total = 0;
            }
            this._cartQt.remove();
          }
        });
      }

      this._checkoutBtn.classList.add("cart__checkout");
      this._checkoutBtn.innerHTML = `<a href="" class="cart__checkout-btn">Checkout</a>`;
      this._parentEl.appendChild(this._checkoutBtn);
      this._cartQt.classList.add("navbar__cart-qt");
      // Calculate total number of cart items
      for (let item of this.cart) {
        this.total = 0;
        this.total += +item.productQt;
      }

      this._cartQt.innerText = `${this.total}`;
      document.querySelector(".navbar__cart").appendChild(this._cartQt);
    }
  },
};

// Checking local storage for stored cart data
if (!localStorage.getItem("cart")) {
  shoppingCart.cart = [];
  localStorage.setItem("cart", JSON.stringify(shoppingCart.cart));
  shoppingCart.updateUI();
} else {
  shoppingCart.cart = JSON.parse(localStorage.getItem("cart"));
  shoppingCart.updateUI();
}

// LISTENING FOR A CLICK EVENT ON ADD TO CART BUTTON,ADDING THE SELECTED PRODUCT TO CART OR INCREASING THE PRODUCT AMOUNT IF PRODUCT ALREADY PRESENT IN THE CART
const addToCartBtn = document.querySelector(".product__add-to-cart-btn");
addToCartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const product = {
    productQt: e.target
      .closest(".product__cta")
      .querySelector(".product__quantity-input").value,
    productName: e.target.closest(".product").dataset.productname,
    productId: e.target.closest(".product").dataset.productid,
    productPrice: e.target.closest(".product").dataset.productprice,
  };
  // IF PRODUCT ALREADY PRESENT IN THE CART,ONLY INCREASE THE PRODUCT COUNT
  let prodPresent = shoppingCart.cart.find((prod) => {
    return prod.productId === product.productId;
  });
  if (prodPresent) {
    for (let prod of shoppingCart.cart) {
      if (prod.productId === prodPresent.productId) {
        prod.productQt = +product.productQt + +prod.productQt;
      }
    }
  } else {
    shoppingCart.cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(shoppingCart.cart));

  shoppingCart.updateUI();
});

// CART ICON EVENT HANDLER
const cartToggle = document.querySelector(".navbar__cart");
const cart = document.querySelector(".cart");

cartToggle.addEventListener("click", (e) => {
  e.preventDefault();
  cart.style.opacity = "1";
  cart.style.visibility = "visible";

  cart.dataset.shown = true;

  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".cart") && cart.dataset.shown === "true") {
    cart.style.opacity = "0";
    cart.style.visibility = "hidden";
  }
});
