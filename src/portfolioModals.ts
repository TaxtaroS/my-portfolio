import { renderAiStudyBooks } from "./aiStudyBooks";

function setupResumeModal() {
  const modal = document.querySelector<HTMLElement>("#resume-modal");
  const openButton = document.querySelector<HTMLElement>("[data-resume-open='true']");
  const closeButtons = modal?.querySelectorAll<HTMLElement>("[data-resume-close='true']") ?? [];
  if (!modal || !openButton) return;

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("resume-modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("resume-modal-open");
  };

  openButton.addEventListener("click", openModal);
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function setupVideoModal() {
  const videoModal = document.querySelector<HTMLElement>("#video-modal");
  const contentEl = videoModal?.querySelector<HTMLElement>(".video-modal__content");
  const openBtns = document.querySelectorAll<HTMLElement>("[data-video]");
  if (!videoModal || !contentEl) return;

  const isYouTube = (url?: string) => /youtube\.com|youtu\.be/.test(url || "");

  const openVideo = (src?: string, poster?: string) => {
    if (!src) return;
    contentEl.innerHTML = "";

    if (isYouTube(src)) {
      const idMatch = src.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      const id = idMatch ? idMatch[1] : null;
      const iframe = document.createElement("iframe");
      iframe.className = "video-modal__iframe";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("frameborder", "0");
      iframe.src = id ? `https://www.youtube.com/embed/${id}?rel=0&autoplay=1` : src;
      contentEl.appendChild(iframe);
    } else {
      const video = document.createElement("video");
      video.className = "video-modal__video";
      video.controls = true;
      video.preload = "metadata";
      video.src = src;
      if (poster) video.poster = poster;
      contentEl.appendChild(video);
      video.play().catch(() => {});
    }

    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("video-modal-open");
  };

  const closeVideo = () => {
    const el = contentEl.firstElementChild;
    if (el?.tagName === "VIDEO") {
      try {
        const video = el as HTMLVideoElement;
        video.pause();
        video.removeAttribute("src");
        video.load();
      } catch {
        // ignore
      }
    }
    contentEl.innerHTML = "";
    videoModal.classList.remove("is-open");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("video-modal-open");
  };

  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.video;
      const poster = btn.dataset.poster;
      openVideo(src, poster);
    });
  });

  videoModal.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.dataset.videoClose === "true" || target.closest("[data-video-close]")) {
      closeVideo();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && videoModal.classList.contains("is-open")) {
      closeVideo();
    }
  });
}

function setupCertModal() {
  const modal = document.querySelector<HTMLElement>("#cert-modal");
  const openButton = document.querySelector<HTMLElement>("[data-cert-open='true']");
  const closeButtons = modal?.querySelectorAll<HTMLElement>("[data-cert-close='true']") ?? [];
  if (!modal || !openButton) return;

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("cert-modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cert-modal-open");
  };

  openButton.addEventListener("click", openModal);
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));

  modal.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.dataset.certClose === "true" || target.closest("[data-cert-close]")) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function setupAiStudyModal() {
  const modal = document.querySelector<HTMLElement>("#ai-study-modal");
  const openButton = document.querySelector<HTMLElement>(
    "[data-ai-study-open='true']",
  );
  const closeButtons =
    modal?.querySelectorAll<HTMLElement>("[data-ai-study-close='true']") ?? [];
  if (!modal || !openButton) return;

  const bookGrid = modal.querySelector<HTMLElement>("[data-study-books]");
  if (bookGrid) renderAiStudyBooks(bookGrid);

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("ai-study-modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("ai-study-modal-open");
  };

  openButton.addEventListener("click", openModal);
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));

  modal.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (
      target.dataset.aiStudyClose === "true" ||
      target.closest("[data-ai-study-close]")
    ) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function setupSmartFactoryModal() {
  const modal = document.querySelector<HTMLElement>("#smart-modal");
  const openButton = document.querySelector<HTMLElement>(
    "[data-smart-factory-open='true']",
  );
  const closeButtons =
    modal?.querySelectorAll<HTMLElement>("[data-smart-factory-close='true']") ??
    [];
  if (!modal || !openButton) return;

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("smart-modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("smart-modal-open");
  };

  openButton.addEventListener("click", openModal);
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));

  modal.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (
      target.dataset.smartFactoryClose === "true" ||
      target.closest("[data-smart-factory-close]")
    ) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

export function setupPortfolioModals() {
  setupResumeModal();
  setupVideoModal();
  setupCertModal();
  setupAiStudyModal();
  setupSmartFactoryModal();
}
