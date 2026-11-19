const siteNav = document.querySelector(".site-nav");
const siteNavToggle = document.querySelector(".site-nav-toggle");

if (siteNav && siteNavToggle) {
    const mobileViewport = window.matchMedia("(max-width: 767px)");

    const syncNavigation = () => {
        siteNavToggle.setAttribute("aria-expanded", "false");
        siteNav.hidden = mobileViewport.matches;
    };

    siteNavToggle.hidden = false;
    syncNavigation();

    siteNavToggle.addEventListener("click", () => {
        const isExpanded = siteNavToggle.getAttribute("aria-expanded") === "true";
        siteNavToggle.setAttribute("aria-expanded", String(!isExpanded));
        siteNav.hidden = isExpanded;
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && siteNavToggle.getAttribute("aria-expanded") === "true") {
            syncNavigation();
            siteNavToggle.focus();
        }

    });

    mobileViewport.addEventListener("change", () => {
        const focusWasInNavigation = siteNav.contains(document.activeElement);
        syncNavigation();

        if (mobileViewport.matches && focusWasInNavigation) {
            siteNavToggle.focus();
        }
    });
}