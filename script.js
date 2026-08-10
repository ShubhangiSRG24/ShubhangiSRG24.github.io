const yearElement = document.getElementById("year");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("is-open");
  });
}

const youtubeEmbeds = document.querySelectorAll(".youtube-embed[data-youtube-id]");

youtubeEmbeds.forEach((container) => {
  const videoId = container.dataset.youtubeId;
  const startTime = container.dataset.youtubeStart || "0";

  // YouTube now requires an HTTP Referer or equivalent client identity. Keep the
  // linked thumbnail when the portfolio is opened directly as a local file.
  if (!videoId || !["http:", "https:"].includes(window.location.protocol)) {
    return;
  }

  const playerUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
  playerUrl.searchParams.set("start", startTime);
  playerUrl.searchParams.set("playsinline", "1");
  playerUrl.searchParams.set("enablejsapi", "1");
  playerUrl.searchParams.set("origin", window.location.origin);
  playerUrl.searchParams.set("widget_referrer", window.location.href.split("#")[0]);

  const iframe = document.createElement("iframe");
  iframe.src = playerUrl.toString();
  iframe.title = "Research presentation by Shubhangi S. R. Garnaik";
  iframe.loading = "lazy";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;

  container.replaceChildren(iframe);
});

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  revealElements.forEach((element) => element.classList.add("is-hidden"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-hidden");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
}
