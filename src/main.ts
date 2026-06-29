import "../style.css";

const typingWords = [
  "Full-Stack Learner",
  "Web Publisher",
  "CAD Designer",
  "Solar Engineer",
  "Problem Solver",
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
    behavior: "smooth",
  });
}

function setupSmoothScroll() {
  const scrollMoveEls = document.querySelectorAll<HTMLElement>(
    "[data-animation-scroll='true']",
  );

  scrollMoveEls.forEach((element) => {
    element.addEventListener("click", () => {
      const target = element.dataset.target;
      if (target) moveToSection(target);

      if (element.dataset.openSuccessCase === "true") {
        window.setTimeout(() => {
          document
            .querySelector<HTMLButtonElement>("[data-smart-factory-open='true']")
            ?.click();
        }, 450);
      }
    });
  });
}

function setupPortfolioLinks() {
  const blogButtons =
    document.querySelectorAll<HTMLElement>("[data-blog-link]");

  blogButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const href = button.dataset.blogLink;
      if (href) window.open(href, "_blank", "noopener,noreferrer");
    });
  });
}

function openPortfolioCase(caseId: string) {
  moveToSection("#portfolio");
  window.setTimeout(() => {
    document
      .querySelector<HTMLButtonElement>("[data-smart-factory-open='true']")
      ?.click();

    window.setTimeout(() => {
      document
        .querySelector<HTMLButtonElement>(
          `[data-smart-case-target='${caseId}']`,
        )
        ?.click();
    }, 80);
  }, 450);
}

function setupFeatureCards() {
  const caseButtons =
    document.querySelectorAll<HTMLButtonElement>("[data-feature-open-case]");
  const resumeButtons =
    document.querySelectorAll<HTMLButtonElement>("[data-feature-open-resume]");

  caseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const caseId = button.dataset.featureOpenCase;
      if (caseId) openPortfolioCase(caseId);
    });
  });

  resumeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      moveToSection("#portfolio");
      window.setTimeout(() => {
        document
          .querySelector<HTMLButtonElement>("[data-resume-open='true']")
          ?.click();
      }, 450);
    });
  });
}

function setupInlineLinkButtons() {
  const linkButtons =
    document.querySelectorAll<HTMLButtonElement>(".add-link-btn");

  linkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString();

      if (!selection || selection.rangeCount === 0 || !selectedText) {
        window.alert("텍스트를 선택하세요.");
        return;
      }

      const url = window.prompt(
        "추가할 링크 주소를 입력하세요.",
        "https://taxtaros.blogspot.com",
      );
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
function setupPortfolioTooltip() {
  const items = document.querySelectorAll<HTMLElement>(
    ".portfolio-inner[data-tooltip]",
  );
  if (items.length === 0) return;

  const tooltip = document.createElement("div");
  tooltip.className = "portfolio-tooltip";
  document.body.appendChild(tooltip);

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      tooltip.textContent = item.dataset.tooltip ?? "";
      tooltip.classList.add("show");
    });

    item.addEventListener("mousemove", (event) => {
      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${event.clientY}px`;
    });

    item.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show");
    });
  });
}

function setupPortfolioCarEffect() {
  const items = document.querySelectorAll<HTMLElement>(
    ".portfolio-inner[data-tooltip]",
  );
  if (items.length === 0) return;

  // 기본 방향: 오른쪽을 향해 날아가는 로켓
  const rocketSvg = `
    <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 25 L70 14 C82 12 92 18 96 25 C92 32 82 38 70 36 L20 25 Z"
            fill="#14532d" stroke="#0c3a1f" stroke-width="1.5"/>
      <path d="M70 14 C78 13 86 16 92 21 L92 29 C86 34 78 37 70 36 Z"
            fill="#cfe8d8" opacity="0.85"/>
      <circle cx="78" cy="25" r="5" fill="#fff7d6" stroke="#0c3a1f" stroke-width="1"/>
      <path d="M22 19 L8 14 L20 23 Z" fill="#0c3a1f"/>
      <path d="M22 31 L8 36 L20 27 Z" fill="#0c3a1f"/>
    </svg>
  `;

  const car = document.createElement("div");
  car.className = "portfolio-car";
  car.innerHTML = rocketSvg;
  document.body.appendChild(car);

  let lastX = 0;
  let smokeTimer = 0;
  let movingLeft = false;

  const spawnSmoke = (x: number, y: number) => {
    const puff = document.createElement("div");
    puff.className = "smoke-puff";
    const size = 6 + Math.random() * 6;
    puff.style.width = `${size}px`;
    puff.style.height = `${size}px`;
    puff.style.left = `${x - size / 2}px`;
    puff.style.top = `${y - size / 2}px`;
    document.body.appendChild(puff);
    window.setTimeout(() => puff.remove(), 650);
  };

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      car.classList.add("show");
    });

    item.addEventListener("mousemove", (event) => {
      const dx = event.clientX - lastX;
      if (Math.abs(dx) > 1) {
        movingLeft = dx < 0;
      }

      car.style.left = `${event.clientX}px`;
      car.style.top = `${event.clientY}px`;
      // 기본 SVG는 오른쪽을 향함 -> 왼쪽으로 이동할 때만 좌우 반전
      car.style.transform = `translate(-50%, -50%) scaleX(${movingLeft ? -1 : 1})`;

      lastX = event.clientX;

      const now = performance.now();
      if (now - smokeTimer > 70) {
        smokeTimer = now;
        // 진행 방향의 반대쪽(분사구)에서 연기/화염 발생
        const offset = movingLeft ? 18 : -18;
        spawnSmoke(event.clientX + offset, event.clientY);
      }
    });

    item.addEventListener("mouseleave", () => {
      car.classList.remove("show");
    });
  });
}

startTypingEffect();
setupHeaderScroll();
setupSmoothScroll();
setupPortfolioLinks();
setupFeatureCards();
setupInlineLinkButtons();
setupContactForm();
setupPortfolioModals();
setupPortfolioTooltip();
setupPortfolioCarEffect();
