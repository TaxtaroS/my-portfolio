import "../style.css";

const typingWords = [
  "Full-Stack Learner",
  "Web Publisher",
  "CAD Designer",
  "Solar Engineer",
  "Problem Solver"
];

function startTypingEffect() {
  const spanEl = document.querySelector<HTMLSpanElement>("main h2 span");
  if (!spanEl) return;
  const span = spanEl;

  let index = 0;
  let currentText = typingWords[index].split("");

  function writeText() {
    span.textContent += currentText.shift() ?? "";
    if (currentText.length !== 0) {
      window.setTimeout(writeText, Math.floor(Math.random() * 100));
      return;
    }

    currentText = (span.textContent ?? "").split("");
    window.setTimeout(deleteText, 2500);
  }

  function deleteText() {
    currentText.pop();
    span.textContent = currentText.join("");
    if (currentText.length !== 0) {
      window.setTimeout(deleteText, Math.floor(Math.random() * 100));
      return;
    }

    index = (index + 1) % typingWords.length;
    currentText = typingWords[index].split("");
    writeText();
  }

  writeText();
}

function setupHeaderScroll() {
  const headerEl = document.querySelector("header");
  if (!headerEl) return;

  const scrollCheck = () => {
    const browserScrollY = window.scrollY || window.pageYOffset;
    headerEl.classList.toggle("active", browserScrollY > 0);
  };

  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(scrollCheck);
  });
  scrollCheck();
}

function moveToSection(selector: string) {
  const targetEl = document.querySelector<HTMLElement>(selector);
  const headerEl = document.querySelector<HTMLElement>("header");
  if (!targetEl) return;

  const browserScrollY = window.pageYOffset;
  const targetScrollY = targetEl.getBoundingClientRect().top + browserScrollY;
  const headerHeight = headerEl?.offsetHeight ?? 0;

  window.scrollTo({
    top: targetScrollY - headerHeight,
    behavior: "smooth"
  });
}

function setupSmoothScroll() {
  const scrollMoveEls = document.querySelectorAll<HTMLElement>("[data-animation-scroll='true']");

  scrollMoveEls.forEach((element) => {
    element.addEventListener("click", () => {
      const target = element.dataset.target;
      if (target) moveToSection(target);
    });
  });
}

function setupPortfolioLinks() {
  const blogButtons = document.querySelectorAll<HTMLElement>("[data-blog-link]");

  blogButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const href = button.dataset.blogLink;
      if (href) window.open(href, "_blank", "noopener,noreferrer");
    });
  });
}

function setupInlineLinkButtons() {
  const linkButtons = document.querySelectorAll<HTMLButtonElement>(".add-link-btn");

  linkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString();

      if (!selection || selection.rangeCount === 0 || !selectedText) {
        window.alert("텍스트를 선택하세요.");
        return;
      }

      const url = window.prompt("추가할 링크 주소를 입력하세요.", "https://taxtaros.blogspot.com");
      if (!url) return;

      const range = selection.getRangeAt(0);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = selectedText;
      range.deleteContents();
      range.insertNode(link);
      selection.removeAllRanges();
    });
  });
}

import { setupPortfolioModals } from "./portfolioModals";

function setupContactForm() {
  const form = document.querySelector<HTMLFormElement>(".contact form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameInput = form.querySelector<HTMLInputElement>("#name");
    const emailInput = form.querySelector<HTMLInputElement>("#email");
    const msgInput = form.querySelector<HTMLTextAreaElement>("#msg");

    if (!nameInput || !emailInput || !msgInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg = msgInput.value.trim();

    if (!name || !email || !msg) {
      window.alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, msg }),
      });

      const data = await response.json();

      if (response.ok) {
        window.alert("메시지가 성공적으로 전송되었습니다!");
        form.reset();
      } else {
        window.alert(data.error || "메시지 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("전송 오류:", error);
      window.alert("네트워크 오류가 발생했습니다.");
    }
  });
}

startTypingEffect();
setupHeaderScroll();
setupSmoothScroll();
setupPortfolioLinks();
setupInlineLinkButtons();
setupContactForm();
setupPortfolioModals();
