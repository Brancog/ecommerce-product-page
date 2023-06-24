(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) a(l);
  new MutationObserver((l) => {
    for (const n of l)
      if (n.type === "childList")
        for (const _ of n.addedNodes)
          _.tagName === "LINK" && _.rel === "modulepreload" && a(_);
  }).observe(document, { childList: !0, subtree: !0 });
  function d(l) {
    const n = {};
    return (
      l.integrity && (n.integrity = l.integrity),
      l.referrerPolicy && (n.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : l.crossOrigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function a(l) {
    if (l.ep) return;
    l.ep = !0;
    const n = d(l);
    fetch(l.href, n);
  }
})();
const O = document.querySelector(".navbar__sandwich-btn"),
  u = document.querySelector(".mobile-menu"),
  q = document.querySelector(".mobile-menu__closeBtn"),
  Q = document.querySelector(".fullscreen-overlay");
document.querySelector("body");
const T = document.querySelector(".slider-gallery"),
  b = document.querySelector("#lightbox"),
  D = document.querySelector(".lightbox__close-btn");
T.addEventListener("click", (t) => {
  b.show(), E();
});
D.addEventListener("click", (t) => {
  t.preventDefault(), b.close(), E();
});
Q.addEventListener("click", (t) => {
  S(),
    u.classList.contains("mobile-menu--visible") &&
      (u.classList.toggle("mobile-menu--hidden"),
      u.classList.toggle("mobile-menu--visible")),
    b.close();
});
O.addEventListener("click", (t) => {
  S(),
    u.classList.toggle("mobile-menu--hidden"),
    u.classList.toggle("mobile-menu--visible");
});
q.addEventListener("click", (t) => {
  S(),
    u.classList.toggle("mobile-menu--hidden"),
    u.classList.toggle("mobile-menu--visible");
});
function S() {
  document.querySelector(".fullscreen-overlay").classList.toggle("hidden");
}
function E() {
  document.querySelector(".lightbox-overlay").classList.toggle("hidden");
}
w();
window.addEventListener("resize", w);
function w() {
  const t = document.querySelector(".container");
  u.style.paddingLeft = getComputedStyle(t).marginLeft;
  const r = document.querySelector(".navbar__wrap");
  q.style.height = getComputedStyle(r).height;
}
const N = function () {
  const t = document.querySelectorAll(".slider-gallery__img-wrap"),
    r = document.querySelectorAll(".lightbox__img-wrap"),
    d = document.querySelector(".slider-gallery__btn-prev"),
    a = document.querySelector(".slider-gallery__btn-next"),
    l = document.querySelector(".slider-gallery__dots"),
    n = document.querySelector(".slider-gallery__desktop-thumbnails"),
    _ = document.querySelector(".lightbox__thumbnails"),
    k = document.querySelector(".lightbox__btn--left"),
    C = document.querySelector(".lightbox__btn--right");
  let i = 0;
  const L = 4,
    g = function (e) {
      document.querySelectorAll(".slider-gallery__dots-dot").forEach((o) => {
        o.classList.remove("slider-gallery__dots-dot--active");
      }),
        document
          .querySelector(`.slider-gallery__dots-dot[data-slide="${e}"]`)
          .classList.add("slider-gallery__dots-dot--active");
    },
    y = function (e) {
      document
        .querySelectorAll(".slider-gallery__thumbnail-wrap")
        .forEach((o) => {
          o.classList.remove("slider-gallery__thumbnail-wrap--active");
        }),
        document.querySelectorAll(".lightbox__thumbnail-wrap").forEach((o) => {
          o.classList.remove("lightbox__thumbnail-wrap--active");
        }),
        document
          .querySelector(`.lightbox__thumbnail-wrap[data-slide="${e}"]`)
          .classList.add("lightbox__thumbnail-wrap--active"),
        document
          .querySelector(`.slider-gallery__thumbnail-wrap[data-slide="${e}"]`)
          .classList.add("slider-gallery__thumbnail-wrap--active");
    },
    p = function (e) {
      t.forEach((o, v) => {
        o.style.transform = `translateX(${100 * (v - e)}%)`;
      }),
        r.forEach((o, v) => {
          o.style.transform = `translateX(${100 * (v - e)}%)`;
        });
    },
    h = function (e) {
      e.preventDefault(), i === L - 1 ? (i = 0) : i++, p(i), g(i), y(i);
    },
    f = function (e) {
      e.preventDefault(), i === 0 ? (i = L - 1) : i--, p(i), g(i), y(i);
    },
    I = function () {
      p(0), g(0);
    };
  y(i),
    g(i),
    I(),
    d.addEventListener("click", f),
    a.addEventListener("click", h),
    k.addEventListener("click", f),
    C.addEventListener("click", h),
    document.addEventListener("keydown", (e) => {
      e.key === "ArrowLeft" && f(), e.key === "ArrowRight" && h();
    }),
    l.addEventListener("click", (e) => {
      if (e.target.classList.contains("slider-gallery__dots-dot")) {
        const o = e.target.dataset.slide;
        p(o), g(o);
      }
    }),
    n.addEventListener("click", (e) => {
      if (
        (e.preventDefault(),
        e.target.closest(".slider-gallery__thumbnail-wrap"))
      ) {
        const o = e.target.closest(".slider-gallery__thumbnail-wrap").dataset
          .slide;
        p(o), y(o);
      }
    }),
    _.addEventListener("click", (e) => {
      if ((e.preventDefault(), e.target.closest(".lightbox__thumbnail-wrap"))) {
        const o = e.target.closest(".lightbox__thumbnail-wrap").dataset.slide;
        p(o), y(o);
      }
    });
};
N();
const s = document.querySelector(".product__quantity-input"),
  $ = document.querySelector(".product__quantity");
s.addEventListener("input", (t) => {
  (s.value = Math.abs(s.value)),
    +s.value > 10
      ? ((s.value = 10), x())
      : document
          .querySelector(".product__input-warning")
          .classList.add("hidden");
});
$.addEventListener("click", (t) => {
  t.preventDefault(),
    t.target.closest(".product__quantity-btn--plus") &&
      (s.value < 10 ? s.value++ : x()),
    t.target.closest(".product__quantity-btn--minus") &&
      s.value > 1 &&
      s.value--;
});
function x() {
  document.querySelector(".product__input-warning").classList.remove("hidden"),
    setTimeout(function () {
      document.querySelector(".product__input-warning").classList.add("hidden");
    }, 2500);
}
let c = {
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
      for (let r of this.cart)
        this._productEl.innerHTML = `
        <div class="cart__product-img-wrap">
              <img src="assets/image-product-1-thumbnail.jpg" alt="sneakers" />
            </div>
            <div class="cart__product-details">
              <span class="cart__product-name"
                >${r.productName}</span
              >
              <span class="cart__product-price">$${r.productPrice} x ${
          r.productQt
        }</span>
              <span class="cart__product-total-price">$${
                r.productPrice * r.productQt
              }.00</span>
            </div>
            <a href="#" class="cart__delete">
              <img src="assets/icon-delete.svg" alt="" />
            </a>
        </div>
        `;
      c._parentEl.appendChild(c._productEl),
        c._productEl.classList.add("cart__product");
      const t = document.querySelector(".cart__delete");
      t &&
        t.addEventListener("click", (r) => {
          console.log("delete"), r.preventDefault();
          const d = r.target
            .closest(".cart__product")
            .querySelector(".cart__product-name").innerHTML;
          for (let a = 0; a < c.cart.length; a++)
            c.cart[a].productName === d && c.cart.splice(a, 1),
              localStorage.setItem("cart", JSON.stringify(c.cart));
          if (c.cart.length < 1) {
            (c._parentEl.innerHTML = ""),
              (this._emptyCart.style.display = "initial");
            for (let a of this.cart) this.total = 0;
            this._cartQt.remove();
          }
        }),
        this._checkoutBtn.classList.add("cart__checkout"),
        (this._checkoutBtn.innerHTML =
          '<a href="" class="cart__checkout-btn">Checkout</a>'),
        this._parentEl.appendChild(this._checkoutBtn),
        this._cartQt.classList.add("navbar__cart-qt");
      for (let r of this.cart) (this.total = 0), (this.total += +r.productQt);
      (this._cartQt.innerText = `${this.total}`),
        document.querySelector(".navbar__cart").appendChild(this._cartQt);
    }
  },
};
localStorage.getItem("cart")
  ? ((c.cart = JSON.parse(localStorage.getItem("cart"))), c.updateUI())
  : ((c.cart = []),
    localStorage.setItem("cart", JSON.stringify(c.cart)),
    c.updateUI());
const P = document.querySelector(".product__add-to-cart-btn");
P.addEventListener("click", (t) => {
  t.preventDefault();
  const r = {
    productQt: t.target
      .closest(".product__cta")
      .querySelector(".product__quantity-input").value,
    productName: t.target.closest(".product").dataset.productname,
    productId: t.target.closest(".product").dataset.productid,
    productPrice: t.target.closest(".product").dataset.productprice,
  };
  let d = c.cart.find((a) => a.productId === r.productId);
  if (d)
    for (let a of c.cart)
      a.productId === d.productId &&
        (a.productQt = +r.productQt + +a.productQt);
  else c.cart.push(r);
  localStorage.setItem("cart", JSON.stringify(c.cart)), c.updateUI();
});
const B = document.querySelector(".navbar__cart"),
  m = document.querySelector(".cart");
B.addEventListener("click", (t) => {
  t.preventDefault(),
    (m.style.opacity = "1"),
    (m.style.visibility = "visible"),
    (m.dataset.shown = !0),
    t.stopPropagation();
});
document.addEventListener("click", (t) => {
  !t.target.closest(".cart") &&
    m.dataset.shown === "true" &&
    ((m.style.opacity = "0"), (m.style.visibility = "hidden"));
});
