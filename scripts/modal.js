const modal = document.querySelector(".modal");
const previews = document.querySelectorAll(".gallery-grid img");
const original = document.querySelector(".full-img");
const caption = document.querySelector(".caption");

previews.forEach((preview) => {
    preview.addEventListener("click", () => {
        modal.classList.add("open");
        original.classList.add("open");
         //Dynamic text
        const originalSrc = preview.getAttribute("src");
        original.src = originalSrc;
        const altText = preview.alt;
        caption.textContent = altText;
    });
});



modal.addEventListener("click", (e) => {
    if(e.target.classList.contains("open")) {
        modal.classList.remove("open");
        original.classList.remove("open");
    }
});