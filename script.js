// Ортақ JavaScript: мобильді мәзір, жарық/қараңғы режим, форма тексеру.
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    }));
  }

  const themeButton = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("merey-theme");
  if (savedTheme === "dark") document.body.classList.add("dark");
  if (themeButton) {
    themeButton.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const dark = document.body.classList.contains("dark");
      localStorage.setItem("merey-theme", dark ? "dark" : "light");
      themeButton.textContent = dark ? "☀" : "☾";
    });
  }

  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const feedback = document.getElementById("formFeedback");
      if (!name.value.trim() || name.value.trim().length < 2) {
        feedback.textContent = "Атыңызды кемінде 2 таңбамен енгізіңіз."; name.focus(); return;
      }
      if (!email.checkValidity()) {
        feedback.textContent = "Электрондық пошта мекенжайын дұрыс енгізіңіз."; email.focus(); return;
      }
      if (message.value.trim().length < 5) {
        feedback.textContent = "Хабарлама кемінде 5 таңбадан тұруы керек."; message.focus(); return;
      }
      feedback.textContent = "Рақмет! Форма тексерілді. Бұл демонстрациялық форма, деректер серверге жіберілген жоқ.";
      form.reset();
    });
  }
});