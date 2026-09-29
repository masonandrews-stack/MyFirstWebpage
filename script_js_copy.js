const tabs = [...document.querySelectorAll(".tab-link")];
const sections = tabs
  .map((tab) => document.querySelector(tab.getAttribute("href")))
  .filter(Boolean);

const topButton = document.querySelector(".floating-top");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

function setActiveTab() {
  const offset = 180;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - offset) {
      currentId = section.id;
    }
  });

  tabs.forEach((tab) => {
    const isActive = tab.getAttribute("href") === `#${currentId}`;
    tab.classList.toggle("active", isActive);

    if (isActive) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });
}

function toggleTopButton() {
  if (!topButton) return;
  topButton.classList.toggle("visible", window.scrollY > 600);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
  });
});

topButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener(
  "scroll",
  () => {
    setActiveTab();
    toggleTopButton();
  },
  { passive: true }
);

setActiveTab();
toggleTopButton();
