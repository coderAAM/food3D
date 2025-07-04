// Light/Dark mode toggle
const toggleMode = document.getElementById('toggleMode');
const modeIcon = document.getElementById('modeIcon');
const body = document.body;

function setMode(isDark) {
     if (isDark) {
          body.classList.add('dark');
          modeIcon.textContent = '☀️';
     } else {
          body.classList.remove('dark');
          modeIcon.textContent = '🌙';
     }
}

// Save mode in localStorage
function getSavedMode() {
     return localStorage.getItem('food3d-mode') === 'dark';
}
function saveMode(isDark) {
     localStorage.setItem('food3d-mode', isDark ? 'dark' : 'light');
}

// Initial mode
setMode(getSavedMode());

toggleMode.addEventListener('click', () => {
     const isDark = !body.classList.contains('dark');
     setMode(isDark);
     saveMode(isDark);
});

// Search bar functionality
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('searchInput');
searchForm.addEventListener('submit', (e) => {
     e.preventDefault();
     alert('You searched for: ' + searchInput.value);
});

// Banner Carousel (Loop)
const carouselTrack = document.getElementById('carouselTrack');
const slides = Array.from(carouselTrack.children);
let currentSlide = 0;
function showSlide(idx) {
     slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === idx);
     });
}
function nextSlide() {
     currentSlide = (currentSlide + 1) % slides.length;
     showSlide(currentSlide);
}
setInterval(nextSlide, 2500);
showSlide(currentSlide);

// Cart System
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsList = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
let cart = [];

function updateCart() {
     cartItemsList.innerHTML = '';
     cart.forEach((item, idx) => {
          const li = document.createElement('li');
          li.textContent = item;
          const removeBtn = document.createElement('button');
          removeBtn.className = 'remove-cart-item';
          removeBtn.innerHTML = '✖️';
          removeBtn.title = 'Remove';
          removeBtn.onclick = () => {
               cart.splice(idx, 1);
               updateCart();
          };
          li.appendChild(removeBtn);
          cartItemsList.appendChild(li);
     });
     cartCount.textContent = cart.length;
}

cartBtn.addEventListener('click', () => {
     cartModal.classList.add('active');
});
closeCart.addEventListener('click', () => {
     cartModal.classList.remove('active');
});
cartModal.addEventListener('click', (e) => {
     if (e.target === cartModal) cartModal.classList.remove('active');
});

// Add to Cart buttons (event delegation for robustness)
document.addEventListener('click', function (e) {
     if (e.target.classList.contains('add-cart-btn')) {
          const card = e.target.closest('.food-card');
          const name = card.getAttribute('data-name');
          cart.push(name);
          updateCart();
     }
});

// Order Now Button & Form
const orderNowBtn = document.getElementById('orderNowBtn');
const orderForm = document.getElementById('orderForm');
const congratsEffect = document.getElementById('congratsEffect');
const orderFoodName = document.getElementById('orderFoodName');

if (orderNowBtn && orderForm && orderFoodName) {
     orderNowBtn.addEventListener('click', () => {
          orderFoodName.textContent = 'Ordering: ' + orderNowBtn.getAttribute('data-name');
          orderFoodName.style.display = 'block';
          orderForm.style.display = 'flex';
          orderForm.scrollIntoView({ behavior: 'smooth' });
     });
}

// Order Form Success Message (for Formspree)
const formSuccessMsg = document.getElementById('formSuccessMsg');
if (window.location.hash === '#form-success') {
     formSuccessMsg.textContent = 'Your order has been received! Thank you!';
     formSuccessMsg.style.display = 'block';
     showCongratsEffect();
     // Optionally, hide after a few seconds
     setTimeout(() => { formSuccessMsg.style.display = 'none'; }, 4000);
}

// Confetti/Balloon Effect
function showCongratsEffect() {
     congratsEffect.innerHTML = '';
     for (let i = 0; i < 25; i++) {
          const balloon = document.createElement('div');
          balloon.style.position = 'absolute';
          balloon.style.left = Math.random() * 90 + 'vw';
          balloon.style.bottom = '-60px';
          balloon.style.width = '32px';
          balloon.style.height = '40px';
          balloon.style.borderRadius = '16px 16px 16px 16px/24px 24px 16px 16px';
          balloon.style.background = `hsl(${Math.random() * 360},90%,70%)`;
          balloon.style.boxShadow = '0 4px 16px #ffb34780';
          balloon.style.zIndex = 9999;
          balloon.style.opacity = 0.9;
          balloon.style.transition = 'transform 2.5s cubic-bezier(.77,0,.18,1), opacity 0.5s';
          congratsEffect.appendChild(balloon);
          setTimeout(() => {
               balloon.style.transform = `translateY(-${window.innerHeight * 0.8 + Math.random() * 100}px)`;
               balloon.style.opacity = 0;
          }, 50);
     }
     congratsEffect.style.display = 'block';
     setTimeout(() => {
          congratsEffect.style.display = 'none';
          congratsEffect.innerHTML = '';
          alert('Aapki request aa gayi hai!');
     }, 2500);
}

// Floating Mascot follows scroll
const floatingMascot = document.getElementById('floatingMascot');
function updateMascotPosition() {
     const scrollY = window.scrollY;
     const vh = window.innerHeight;
     // Mascot stays 20vh from top, but moves with scroll
     floatingMascot.style.top = (20 + (scrollY / vh) * 40) + 'vh';
}
window.addEventListener('scroll', updateMascotPosition);
updateMascotPosition();

// Mobile Navbar Toggle
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
navbarToggle.addEventListener('click', () => {
     navbarMenu.classList.toggle('active');
});
// Close menu on link click (mobile)
document.querySelectorAll('.navbar-links a').forEach(link => {
     link.addEventListener('click', () => {
          if (window.innerWidth <= 900) {
               navbarMenu.classList.remove('active');
          }
     });
});

// Social Popup for Footer Icons
const socialLinks = document.querySelectorAll('.social-link');
const socialPopup = document.getElementById('socialPopup');
const popupAllow = document.getElementById('popupAllow');
const popupCancel = document.getElementById('popupCancel');
let pendingSocialHref = null;
socialLinks.forEach(link => {
     link.addEventListener('click', function (e) {
          e.preventDefault();
          pendingSocialHref = link.getAttribute('href');
          socialPopup.classList.add('active');
     });
});
function closeSocialPopup() {
     socialPopup.classList.remove('active');
     pendingSocialHref = null;
}
if (popupAllow) {
     popupAllow.onclick = function () {
          if (pendingSocialHref && pendingSocialHref !== '#') {
               window.open(pendingSocialHref, '_blank');
          }
          closeSocialPopup();
     };
}
if (popupCancel) {
     popupCancel.onclick = closeSocialPopup;
}
// Optional: close popup on outside click
socialPopup.addEventListener('click', function (e) {
     if (e.target === socialPopup) closeSocialPopup();
});

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
     const scrollTop = window.scrollY;
     const docHeight = document.body.scrollHeight - window.innerHeight;
     const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
     scrollProgress.style.width = percent + '%';
});

// Signature Badge Tooltip
const signatureBadge = document.getElementById('signatureBadge');
const signatureTooltip = document.getElementById('signatureTooltip');
let badgeActive = false;
function toggleSignatureTooltip() {
     badgeActive = !badgeActive;
     if (badgeActive) {
          signatureBadge.classList.add('active');
     } else {
          signatureBadge.classList.remove('active');
     }
}
signatureBadge.addEventListener('click', toggleSignatureTooltip);
document.addEventListener('click', (e) => {
     if (!signatureBadge.contains(e.target)) {
          signatureBadge.classList.remove('active');
          badgeActive = false;
     }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
     if (window.scrollY > 300) {
          backToTop.classList.add('show');
     } else {
          backToTop.classList.remove('show');
     }
});
backToTop.addEventListener('click', () => {
     window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Section Reveal Animation
const revealSections = document.querySelectorAll('[data-section]');
const observer = new window.IntersectionObserver((entries) => {
     entries.forEach(entry => {
          if (entry.isIntersecting) {
               entry.target.classList.add('visible');
          }
     });
}, { threshold: 0.15 });
revealSections.forEach(section => observer.observe(section));

// Food Card 'Order Now' Buttons
const orderCardBtns = document.querySelectorAll('.order-card-btn');
if (typeof orderCardBtns !== 'undefined' && orderCardBtns.length) {
     orderCardBtns.forEach(btn => {
          btn.addEventListener('click', function () {
               const card = btn.closest('.food-card');
               const foodName = card.getAttribute('data-name');
               orderFoodName.textContent = 'Ordering: ' + foodName;
               orderFoodName.style.display = 'block';
               orderForm.style.display = 'flex';
               orderForm.scrollIntoView({ behavior: 'smooth' });
          });
     });
}

// Food Menu Checkbox Selection
const menuCheckboxes = document.querySelectorAll('.menu-checkbox');
const selectedMenuList = document.getElementById('selectedMenuList');
if (typeof menuCheckboxes !== 'undefined' && menuCheckboxes.length && selectedMenuList) {
     function updateSelectedMenuList() {
          const selected = Array.from(menuCheckboxes)
               .filter(cb => cb.checked)
               .map(cb => cb.value);
          selectedMenuList.innerHTML = '';
          selected.forEach(item => {
               const li = document.createElement('li');
               li.textContent = item;
               selectedMenuList.appendChild(li);
          });
     }
     menuCheckboxes.forEach(cb => {
          cb.addEventListener('change', updateSelectedMenuList);
     });
     // Initial update
     updateSelectedMenuList();
}

// Loader Overlay Logic
const loaderOverlay = document.getElementById('loaderOverlay');
const modeButtons = document.getElementById('modeButtons');
const langSection = document.getElementById('langSection');
const chooseLight = document.getElementById('chooseLight');
const chooseDark = document.getElementById('chooseDark');
const chooseEnglish = document.getElementById('chooseEnglish');
const chooseUrdu = document.getElementById('chooseUrdu');

// Translation object
const translations = {
     en: {
          mainHeading: 'Welcome to 3D Food World!',
          orderNow: 'Order Now',
          foodMenu: 'Food Menu',
          fastFood: 'Fast Food',
          localFood: 'Local Food',
          selectedItems: 'Selected Items:',
          placeOrder: 'Place Your Order',
          yourName: 'Your Name',
          yourEmail: 'Your Email',
          phoneNumber: 'Phone Number',
          orderDetails: 'Order Details (e.g. 2x Pizza, 1x Burger)',
          sendOrder: 'Send Order',
          aboutHeading: 'About Our Food World',
          aboutText: 'We bring you the best fast food experience with a 3D twist! Enjoy delicious meals, quick service, and a vibrant atmosphere. Watch our story to know more about our passion for food.',
          contact: 'Contact',
          email: 'Email',
          phone: 'Phone',
          followUs: 'Follow Us',
          cart: 'Your Cart',
          pizza: 'Pizza',
          burger: 'Burger',
          fries: 'Fries',
          sandwich: 'Sandwich',
          hotdog: 'Hotdog',
          taco: 'Taco',
          chickenNuggets: 'Chicken Nuggets',
          donut: 'Donut',
          iceCream: 'Ice Cream',
          shawarma: 'Shawarma',
          biryani: 'Biryani',
          nihari: 'Nihari',
          karahi: 'Karahi',
          haleem: 'Haleem',
          qeema: 'Qeema',
          daalChawal: 'Daal Chawal',
          chapliKebab: 'Chapli Kebab',
          parathaRoll: 'Paratha Roll',
          samosa: 'Samosa',
          pakora: 'Pakora',
          // ...add more as needed
     },
     ur: {
          mainHeading: '3D فوڈ ورلڈ میں خوش آمدید!',
          orderNow: 'آرڈر کریں',
          foodMenu: 'فوڈ مینو',
          fastFood: 'فاسٹ فوڈ',
          localFood: 'مقامی کھانے',
          selectedItems: 'منتخب اشیاء:',
          placeOrder: 'اپنا آرڈر دیں',
          yourName: 'آپ کا نام',
          yourEmail: 'آپ کا ای میل',
          phoneNumber: 'فون نمبر',
          orderDetails: 'آرڈر کی تفصیل (مثلاً 2 پیزا، 1 برگر)',
          sendOrder: 'آرڈر بھیجیں',
          aboutHeading: 'ہمارے فوڈ ورلڈ کے بارے میں',
          aboutText: 'ہم آپ کو 3D انداز میں بہترین فاسٹ فوڈ تجربہ فراہم کرتے ہیں! مزیدار کھانے، تیز سروس اور شاندار ماحول سے لطف اٹھائیں۔ ہماری کہانی جاننے کے لیے ویڈیو دیکھیں۔',
          contact: 'رابطہ',
          email: 'ای میل',
          phone: 'فون',
          followUs: 'ہمیں فالو کریں',
          cart: 'آپ کی ٹوکری',
          pizza: 'پیزا',
          burger: 'برگر',
          fries: 'فرائز',
          sandwich: 'سینڈوچ',
          hotdog: 'ہاٹ ڈاگ',
          taco: 'ٹاکو',
          chickenNuggets: 'چکن نگٹس',
          donut: 'ڈونٹ',
          iceCream: 'آئس کریم',
          shawarma: 'شاورما',
          biryani: 'بریانی',
          nihari: 'نہاری',
          karahi: 'کڑاہی',
          haleem: 'حلیم',
          qeema: 'قیمہ',
          daalChawal: 'دال چاول',
          chapliKebab: 'چپلی کباب',
          parathaRoll: 'پراٹھا رول',
          samosa: 'سموسہ',
          pakora: 'پکوڑا',
          // ...add more as needed
     }
};

function updateLanguage(lang) {
     document.querySelectorAll('[data-translate]').forEach(el => {
          const key = el.getAttribute('data-translate');
          if (translations[lang][key]) {
               el.textContent = translations[lang][key];
          }
     });
}

window.addEventListener('DOMContentLoaded', () => {
     loaderOverlay.style.display = 'flex';
     document.body.style.overflow = 'hidden';
});

chooseLight.addEventListener('click', () => {
     setMode(false);
     modeButtons.style.display = 'none';
     langSection.style.display = 'block';
});
chooseDark.addEventListener('click', () => {
     setMode(true);
     modeButtons.style.display = 'none';
     langSection.style.display = 'block';
});
chooseEnglish.addEventListener('click', () => {
     document.body.classList.remove('rtl');
     updateLanguage('en');
     loaderOverlay.style.display = 'none';
     document.body.style.overflow = '';
});
chooseUrdu.addEventListener('click', () => {
     document.body.classList.add('rtl');
     updateLanguage('ur');
     loaderOverlay.style.display = 'none';
     document.body.style.overflow = '';
});

// PDF Download for Selected Menu
const menuDoneBtn = document.getElementById('menuDoneBtn');
if (typeof menuDoneBtn !== 'undefined' && menuDoneBtn) {
     menuDoneBtn.addEventListener('click', function () {
          const selected = Array.from(menuCheckboxes)
               .filter(cb => cb.checked)
               .map(cb => cb.value);
          if (selected.length === 0) {
               alert('Please select at least one item!');
               return;
          }
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(18);
          doc.text('Your Selected Food Menu', 15, 20);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(14);
          selected.forEach((item, i) => {
               doc.text(`• ${item}`, 20, 35 + i * 10);
          });
          doc.save('food3d-menu.pdf');
     });
}

// AJAX Formspree Submit for Order Form
orderForm.addEventListener('submit', function (e) {
     e.preventDefault();
     const formData = new FormData(orderForm);
     fetch(orderForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
     })
          .then(response => {
               if (response.ok) {
                    orderForm.style.display = 'none';
                    orderFoodName.style.display = 'none';
                    formSuccessMsg.textContent = 'Successfully! آپ کا آرڈر سبمٹ ہو گیا ہے.';
                    formSuccessMsg.style.display = 'block';
                    showCongratsEffect();
                    setTimeout(() => { formSuccessMsg.style.display = 'none'; }, 4000);
                    orderForm.reset();
               } else {
                    return response.json().then(data => {
                         throw new Error(data.error || 'Submission failed.');
                    });
               }
          })
          .catch(() => {
               formSuccessMsg.textContent = 'Sorry, there was a problem submitting your order.';
               formSuccessMsg.style.display = 'block';
               setTimeout(() => { formSuccessMsg.style.display = 'none'; }, 4000);
          });
});

// Button Ripple Effect
function addRipple(e) {
     const btn = e.currentTarget;
     const circle = document.createElement('span');
     circle.className = 'ripple';
     const rect = btn.getBoundingClientRect();
     const size = Math.max(rect.width, rect.height);
     circle.style.width = circle.style.height = size + 'px';
     circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
     circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
     btn.appendChild(circle);
     setTimeout(() => circle.remove(), 600);
}
['.btn-3d', '.order-card-btn', '.add-cart-btn', '.loader-btn', '#menuDoneBtn'].forEach(sel => {
     document.querySelectorAll(sel).forEach(btn => {
          btn.addEventListener('click', addRipple);
     });
});

// Mascot VIP Center Animation on Scroll
const mascot = document.getElementById('floatingMascot');
const footer = document.querySelector('footer');
function checkMascotVIP() {
     const mascotRect = mascot.getBoundingClientRect();
     const footerRect = footer.getBoundingClientRect();
     // If footer is visible in viewport (bottom of page)
     if (footerRect.top < window.innerHeight - 100) {
          mascot.classList.add('mascot-center');
     } else {
          mascot.classList.remove('mascot-center');
     }
}
window.addEventListener('scroll', checkMascotVIP);
window.addEventListener('resize', checkMascotVIP);
checkMascotVIP();

// Food Menu Selection Hold (localStorage)
const foodMenuSection = document.getElementById('foodMenuSection');
if (foodMenuSection) {
     const MENU_KEY = 'food3d-menu-selection';
     // Restore selection on load
     const saved = JSON.parse(localStorage.getItem(MENU_KEY) || '[]');
     menuCheckboxes.forEach(cb => {
          if (saved.includes(cb.value)) cb.checked = true;
     });
     if (typeof updateSelectedMenuList === 'function') updateSelectedMenuList();
     // Save selection on change
     menuCheckboxes.forEach(cb => {
          cb.addEventListener('change', () => {
               const selected = Array.from(menuCheckboxes)
                    .filter(c => c.checked)
                    .map(c => c.value);
               localStorage.setItem(MENU_KEY, JSON.stringify(selected));
          });
     });
}

// 70% OFF Offer Countdown Timer
const offerTimer = document.getElementById('offerTimer');
const timerCountdown = document.getElementById('timerCountdown');

// Set offer end time (e.g., 2 hours from now, or set a specific date/time)
const offerEnd = new Date();
offerEnd.setHours(offerEnd.getHours() + 2); // 2 hours from now

function updateOfferTimer() {
     const now = new Date();
     const diff = offerEnd - now;
     if (diff > 0) {
          const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
          const mins = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
          const secs = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
          timerCountdown.textContent = `${hours}:${mins}:${secs}`;
     } else {
          timerCountdown.textContent = '00:00:00';
          if (offerTimer) offerTimer.parentElement.style.display = 'none';
          clearInterval(timerInterval);
     }
}
const timerInterval = setInterval(updateOfferTimer, 1000);
updateOfferTimer();

// Ensure menu-checkboxes have correct structure for animated effect
window.addEventListener('DOMContentLoaded', function () {
     document.querySelectorAll('.menu-checkbox').forEach(function (checkbox) {
          const label = checkbox.closest('label');
          if (label) {
               // Move the span immediately after the checkbox if not already
               const span = label.querySelector('span');
               if (span && checkbox.nextSibling !== span) {
                    label.insertBefore(span, checkbox.nextSibling);
               }
          }
     });
});

// Customer Feedback/Review Carousel
const reviews = [
     {
          text: 'Yahan ka pizza zabardast hai! Service bhi fast hai.',
          stars: 5,
          author: 'Ali (Karachi)'
     },
     {
          text: 'Best fries in town, must try! 😋',
          stars: 5,
          author: 'Sara (Lahore)'
     },
     {
          text: 'Burger ki quality bohat achi hai, fresh aur juicy.',
          stars: 4,
          author: 'Usman (Islamabad)'
     },
     {
          text: 'Loved the 3D look and fast delivery!',
          stars: 5,
          author: 'Ayesha (Hyderabad)'
     },
     {
          text: 'Ice cream bohat creamy thi, bachon ko bohat pasand aayi.',
          stars: 5,
          author: 'Nida (Multan)'
     },
     {
          text: 'Great food, friendly staff, aur rates bhi reasonable hain.',
          stars: 4,
          author: 'Bilal (Faisalabad)'
     },
     {
          text: 'Amazing experience! Will order again.',
          stars: 5,
          author: 'Hina (Rawalpindi)'
     },
     {
          text: 'Order thora late aya tha, lekin taste lajawab tha.',
          stars: 3,
          author: 'Zeeshan (Sukkur)'
     },
     {
          text: 'Sandwich fresh tha aur packing bhi achi thi.',
          stars: 4,
          author: 'Farah (Peshawar)'
     },
     {
          text: 'Superb! Highly recommended for fast food lovers.',
          stars: 5,
          author: 'Imran (Quetta)'
     }
];

const reviewCarousel = document.getElementById('reviewCarousel');
let reviewIdx = 0;

function renderReview(idx) {
     if (!reviewCarousel) return;
     reviewCarousel.innerHTML = '';
     const review = reviews[idx];
     const card = document.createElement('div');
     card.className = 'review-card active';
     card.innerHTML = `
          <div class="review-stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
          <div class="review-text">${review.text}</div>
          <div class="review-author">- ${review.author}</div>
     `;
     reviewCarousel.appendChild(card);
}

function nextReview() {
     reviewIdx = (reviewIdx + 1) % reviews.length;
     renderReview(reviewIdx);
}

if (reviewCarousel) {
     renderReview(reviewIdx);
     setInterval(nextReview, 3000);
}
