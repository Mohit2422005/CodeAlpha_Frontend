const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const imageCounter = document.getElementById("imageCounter");

const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const filterButtons = document.querySelectorAll(".filter-btn");

let currentIndex = 0;


/* -------------------------
   Get gallery information
------------------------- */

const images = Array.from(galleryItems).map((item) => {

    const image = item.querySelector("img");

    const title = item.querySelector("h3").textContent;

    const category = item.querySelector("p").textContent;

    return {
        src: image.src,
        alt: image.alt,
        title: title,
        category: category
    };
});


/* -------------------------
   Open Lightbox
------------------------- */

function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";
}


/* -------------------------
   Update Lightbox
------------------------- */

function updateLightbox() {

    const image = images[currentIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = image.title;
    lightboxCategory.textContent = image.category;

    imageCounter.textContent =
        `${currentIndex + 1} / ${images.length}`;
}


/* -------------------------
   Close Lightbox
------------------------- */

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";
}


/* -------------------------
   Next Image
------------------------- */

function nextImage() {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    updateLightbox();
}


/* -------------------------
   Previous Image
------------------------- */

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    updateLightbox();
}


/* -------------------------
   Gallery Click
------------------------- */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* -------------------------
   Button Events
------------------------- */

closeBtn.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", previousImage);


/* -------------------------
   Close when clicking
   outside image
------------------------- */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* -------------------------
   Keyboard Navigation
------------------------- */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

});


/* -------------------------
   Category Filters
------------------------- */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active state
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add active state
        button.classList.add("active");

        const category = button.dataset.category;

        galleryItems.forEach((item) => {

            const itemCategory = item.dataset.category;

            if (
                category === "all" ||
                itemCategory === category
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});
