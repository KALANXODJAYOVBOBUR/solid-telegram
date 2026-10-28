
const cars = [
  {
    id: 1,
    name: "Chevrolet Cobalt",
    category: "Sedan",
    year: 2025,
    engine: "1.5 L",
    transmission: "Mexanika / Avtomat",
    fuel: "Benzin",
    price: "120 mln so‘mdan",
    priceNumber: 120000000,
    badge: "Ommabop",
    description: "Kundalik foydalanish uchun qulay va tejamkor sedan.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    name: "Chevrolet Onix",
    category: "Sedan",
    year: 2025,
    engine: "1.2 Turbo",
    transmission: "Avtomat",
    fuel: "Benzin",
    price: "160 mln so‘mdan",
    priceNumber: 160000000,
    badge: "Zamonaviy",
    description: "Zamonaviy ko‘rinish va qulay texnologiyalarga ega sedan.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    name: "Chevrolet Malibu",
    category: "Sedan",
    year: 2024,
    engine: "2.0 Turbo",
    transmission: "Avtomat",
    fuel: "Benzin",
    price: "350 mln so‘mdan",
    priceNumber: 350000000,
    badge: "Premium",
    description: "Keng salonli va nafis ko‘rinishdagi sedan.",
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    name: "Chevrolet Tracker",
    category: "Krossover",
    year: 2025,
    engine: "1.2 Turbo",
    transmission: "Avtomat",
    fuel: "Benzin",
    price: "220 mln so‘mdan",
    priceNumber: 220000000,
    badge: "Shahar uchun",
    description: "Shahar va kundalik sayohatlar uchun ixcham krossover.",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    name: "Chevrolet Equinox",
    category: "Krossover",
    year: 2024,
    engine: "1.5 Turbo",
    transmission: "Avtomat",
    fuel: "Benzin",
    price: "400 mln so‘mdan",
    priceNumber: 400000000,
    badge: "Keng salon",
    description: "Oilaviy safarlar uchun keng va qulay krossover.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    name: "Chevrolet Damas",
    category: "Oilaviy",
    year: 2025,
    engine: "0.8 L",
    transmission: "Mexanika",
    fuel: "Benzin",
    price: "100 mln so‘mdan",
    priceNumber: 100000000,
    badge: "Amaliy",
    description: "Yuk tashish va kundalik ehtiyojlar uchun amaliy avtomobil.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 7,
    name: "Chevrolet Spark",
    category: "Sedan",
    year: 2022,
    engine: "1.25 L",
    transmission: "Mexanika / Avtomat",
    fuel: "Benzin",
    price: "95 mln so‘mdan",
    priceNumber: 95000000,
    badge: "Ixcham",
    description: "Shahar ko‘chalarida harakatlanish uchun ixcham avtomobil.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 8,
    name: "Chevrolet Camaro",
    category: "Sport",
    year: 2024,
    engine: "2.0 Turbo",
    transmission: "Avtomat",
    fuel: "Benzin",
    price: "500 mln so‘mdan",
    priceNumber: 500000000,
    badge: "Sport",
    description: "Sport uslubidagi kuchli va jozibali avtomobil.",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=900&q=80"
  }
];

const loginScreen = document.getElementById("loginScreen");
const mainSite = document.getElementById("mainSite");
const loginForm = document.getElementById("loginForm");
const phoneInput = document.getElementById("phone");
const loginError = document.getElementById("loginError");
const carGrid = document.getElementById("carGrid");
const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultsCount");
const favoriteCount = document.getElementById("favoriteCount");
const favoritesButton = document.getElementById("favoritesButton");
const detailModal = document.getElementById("detailModal");
const orderModal = document.getElementById("orderModal");
const detailContent = document.getElementById("detailContent");
const orderForm = document.getElementById("orderForm");
const selectedCar = document.getElementById("selectedCar");
const toast = document.getElementById("toast");

let activeCategory = "Barchasi";
let favorites = new Set();
let showFavoritesOnly = false;
let toastTimer;

// TOAST XABARI
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// TELEFON RAQAMINI TEKSHIRISH
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value
    .replace(/\D/g, "")
    .slice(0, 9);
  loginError.textContent = "";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const phone = phoneInput.value.replace(/\D/g, "");

  if (phone.length !== 9) {
    loginError.textContent =
      "Telefon raqamining 9 ta raqamini to‘liq kiriting.";
    return;
  }

  loginScreen.classList.add("hidden");
  mainSite.classList.remove("hidden");

  showToast("Xush kelibsiz! Saytga muvaffaqiyatli kirdingiz.");
  renderCars();
});

// RASMLAR YUKLANMAGANDA ZAXIRA RASM
function imageFallback(image) {
  image.onerror = null;
  image.src =
    "https://placehold.co/900x550/20242d/ffffff?text=Chevrolet+Auto";
}

// AVTOMOBILLARNI CHIQARISH
function renderCars() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredCars = cars.filter((car) => {
    const matchesSearch = [
      car.name,
      car.category,
      car.description,
      car.engine
    ].join(" ").toLowerCase().includes(query);

    const matchesCategory =
      activeCategory === "Barchasi" ||
      car.category === activeCategory;

    const matchesFavorites =
      !showFavoritesOnly || favorites.has(car.id);

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  resultsCount.textContent =
    `${filteredCars.length} ta avtomobil topildi`;

  favoriteCount.textContent = favorites.size;

  if (filteredCars.length === 0) {
    carGrid.innerHTML = `
      <div class="empty-state">
        <h3>Mashina topilmadi 😕</h3>
        <p>Boshqa nom bilan qidirib ko‘ring.</p>
      </div>
    `;
    return;
  }

  carGrid.innerHTML = filteredCars.map((car) => `
    <article class="car-card">
      <div class="car-image-wrap">
        <img
          class="car-image"
          src="${car.image}"
          alt="${car.name}"
          loading="lazy"
          onerror="imageFallback(this)"
        >
        <span class="car-badge">${car.badge}</span>

        <button
          class="favorite-btn ${favorites.has(car.id) ? "liked" : ""}"
          data-favorite="${car.id}"
          aria-label="Saralanganlarga qo‘shish"
          title="Saralanganlarga qo‘shish"
        >${favorites.has(car.id) ? "♥" : "♡"}</button>
      </div>

      <div class="car-info">
        <span class="car-category">${car.category.toUpperCase()}</span>
        <h3>${car.name}</h3>
        <p class="car-description">${car.description}</p>

        <div class="car-specs">
          <span>⚙ ${car.engine}</span>
          <span>📅 ${car.year}</span>
          <span>⛽ ${car.fuel}</span>
        </div>

        <div class="car-bottom">
          <div class="car-price">
            ${car.price}
            <small>Taxminiy narx</small>
          </div>
          <div class="card-actions">
            <button class="btn-small" data-detail="${car.id}">
              Batafsil
            </button>
            <button class="btn-small gold" data-order="${car.id}">
              Tanlash ↗
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

// KATEGORIYA BO‘YICHA FILTRLASH
document.getElementById("filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;
  showFavoritesOnly = false;

  favoritesButton.classList.remove("selected");

  document.querySelectorAll(".filter").forEach((filter) => {
    filter.classList.toggle("active", filter === button);
  });

  renderCars();
});

// QIDIRUV
searchInput.addEventListener("input", renderCars);

// SARALANGANLAR RO‘YXATI
favoritesButton.addEventListener("click", () => {
  showFavoritesOnly = !showFavoritesOnly;

  favoritesButton.classList.toggle("selected", showFavoritesOnly);
  favoritesButton.style.background =
    showFavoritesOnly ? "#fff3d9" : "white";

  document.querySelectorAll(".filter").forEach((filter) => {
    filter.classList.toggle(
      "active",
      !showFavoritesOnly &&
      filter.dataset.category === activeCategory
    );
  });

  if (showFavoritesOnly) {
    showToast("Saralangan avtomobillar ro‘yxati.");
    document.getElementById("cars").scrollIntoView();
  }

  renderCars();
});

// KARTOCHKADAGI TUGMALAR
carGrid.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest("[data-favorite]");
  const detailButton = event.target.closest("[data-detail]");
  const orderButton = event.target.closest("[data-order]");

  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.favorite);

    if (favorites.has(id)) {
      favorites.delete(id);
      showToast("Saralanganlardan olib tashlandi.");
    } else {
      favorites.add(id);
      showToast("Saralanganlarga qo‘shildi ♥");
    }

    renderCars();
    return;
  }

  if (detailButton) {
    openDetails(Number(detailButton.dataset.detail));
    return;
  }

  if (orderButton) {
    openOrder(Number(orderButton.dataset.order));
  }
});

// BATAFSIL MA'LUMOT
function openDetails(id) {
  const car = cars.find((item) => item.id === id);
  if (!car) return;

  detailContent.innerHTML = `
    <p class="eyebrow">${car.category.toUpperCase()}</p>
    <h2>${car.name}</h2>
    <img
      class="detail-image"
      src="${car.image}"
      alt="${car.name}"
      onerror="imageFallback(this)"
    >
    <p class="muted">${car.description}</p>

    <div class="detail-specs">
      <div><span>Ishlab chiqarilgan yil</span><strong>${car.year}</strong></div>
      <div><span>Dvigatel</span><strong>${car.engine}</strong></div>
      <div><span>Uzatmalar qutisi</span><strong>${car.transmission}</strong></div>
      <div><span>Yoqilg‘i</span><strong>${car.fuel}</strong></div>
    </div>

    <h3>${car.price}</h3>
    <p class="muted">Narxlar namuna sifatida berilgan, rasmiy taklif emas.</p>
    <button class="btn btn-primary full" data-detail-order="${car.id}">
      Shu avtomobilni tanlash ↗
    </button>
  `;

  detailModal.classList.remove("hidden");
}

// BATAFSIL OYNASIDAN BUYURTMA
detailContent.addEventListener("click", (event) => {
  const button = event.target.closest("[data-detail-order]");
  if (!button) return;

  const id = Number(button.dataset.detailOrder);
  detailModal.classList.add("hidden");
  openOrder(id);
});

// BUYURTMA OYNASI
function openOrder(id) {
  const car = cars.find((item) => item.id === id);
  if (!car) return;

  selectedCar.value = car.name;
  document.getElementById("orderMessage").textContent = "";
  orderForm.reset();
  selectedCar.value = car.name;
  orderModal.classList.remove("hidden");
}

// BUYURTMA FORMASI
orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) {
    showToast("Ismingizni to‘g‘ri kiriting.");
    return;
  }

  if (digits.length !== 9 && digits.length !== 12) {
    showToast("Telefon raqamini to‘g‘ri kiriting.");
    return;
  }

  const carName = selectedCar.value;
  document.getElementById("orderMessage").textContent =
    `Rahmat, ${name}! ${carName} bo‘yicha so‘rovingiz demo rejimida qabul qilindi. Haqiqiy dilerga yuborilmadi.`;

  showToast("Demo buyurtma yaratildi.");
});

// OYNALARNI YOPISH
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.close)
      .classList.add("hidden");
  });
});

[detailModal, orderModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    detailModal.classList.add("hidden");
    orderModal.classList.add("hidden");
  }
});

// DASTLABKI HOLAT
renderCars();
