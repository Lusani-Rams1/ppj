document.addEventListener("DOMContentLoaded", () => {

    /* TECHNOLOGY STACK */
    const firstRow = [
        { name: "HTML5", icon: "html5-plain" },
        { name: "CSS3", icon: "css3-plain" },
        { name: "JavaScript", icon: "javascript-plain" },
        { name: "Node.js", icon: "nodejs-plain" },
        { name: "Express.js", icon: "express-original" },
        { name: "MySQL", icon: "mysql-original" }
    ];

    const secondRow = [
        { name: "Git", icon: "git-plain" },
        { name: "GitHub", icon: "github-original" },
        { name: "PHP", icon: "php-plain" },
        { name: "C#", icon: "csharp-plain" },
        { name: "Bootstrap", icon: "bootstrap-plain" },
        { name: "MariaDB", icon: "mariadb-original" }
    ];

    /* CREATE INFINITE MARQUEE */
    function createMarquee(rowId, technologies) {

        const track = document.getElementById(rowId);

        if (!track || !technologies.length) return;

        const marquee = track.closest(".marquee");

        const cards = technologies.map(tech => `

            <div class="tech-card">

                <i class="devicon-${tech.icon}"
                    aria-hidden="true"></i>

                <span>${tech.name}</span>

            </div>

        `).join("");


        function buildGroups() {

            track.innerHTML = `

                <div class="marquee-group">
                    ${cards}
                </div>

            `;

            const firstGroup = track.firstElementChild;

            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reducedMotion) return;

            const originalWidth =
                firstGroup.getBoundingClientRect().width;

            if (originalWidth <= 0) return;

            const repetitions = Math.max(
                1,
                Math.ceil(
                    marquee.clientWidth / originalWidth
                )
            );

            // Ensure each group fills wide screens.
            for (let i = 1; i < repetitions; i++) {

                const duplicate = document.createElement("div");

                duplicate.innerHTML = cards;

                Array.from(duplicate.children).forEach(card => {

                    card.setAttribute("aria-hidden", "true");

                    firstGroup.appendChild(card);

                });

            }

            // Duplicate the complete group.
            const secondGroup = firstGroup.cloneNode(true);

            secondGroup.setAttribute("aria-hidden", "true");

            track.appendChild(secondGroup);

        }

        buildGroups();

        // Rebuild when the viewport changes.
        let resizeTimer;

        window.addEventListener("resize", () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(buildGroups, 150);

        });

        // Rebuild once fonts have finished loading.
        if (document.fonts) {

            document.fonts.ready.then(buildGroups);

        }

        // Respect changes to the user's motion preference.
        const motionPreference = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        motionPreference.addEventListener(
            "change",
            buildGroups
        );

    }

    createMarquee("row-one", firstRow);

    createMarquee("row-two", secondRow);

    /* MARQUEE PAUSE BUTTON */
    const motionToggle =
        document.getElementById("motionToggle");

    const techSection =
        document.getElementById("skills");

    if (motionToggle && techSection) {

        motionToggle.addEventListener("click", () => {

            const paused =
                techSection.classList.toggle("is-paused");

            motionToggle.textContent = paused
                ? "Resume animation"
                : "Pause animation";

            motionToggle.setAttribute(
                "aria-pressed",
                String(paused)
            );

        });

    }

    /* MOBILE NAVIGATION */
    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    function closeMenu() {

        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("open");

        menuToggle.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("open");

            menuToggle.classList.toggle(
                "open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        // Close menu after selecting a link.
        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        // Close menu when clicking outside.
        document.addEventListener("click", event => {

            const navbar =
                document.querySelector(".navbar");

            if (navbar && !navbar.contains(event.target)) {

                closeMenu();

            }

        });

        // Close menu using Escape.
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeMenu();

                if (window.innerWidth <= 768) {
                    menuToggle.focus();
                }

            }

        });

        // Reset mobile menu on desktop.
        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {

                closeMenu();

            }

        });

    }

    /* ACTIVE NAVIGATION LINKS */
    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    function updateActiveLink() {

        let currentSection = "home";

        sections.forEach(section => {

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 160) {

                currentSection = section.id;

            }

        });

        navigationLinks.forEach(link => {

            const isActive =
                link.getAttribute("href") ===
                `#${currentSection}`;

            link.classList.toggle(
                "active",
                isActive
            );

            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "location"
                );

            } else {

                link.removeAttribute("aria-current");

            }

        });

    }

    let scrollScheduled = false;

    window.addEventListener("scroll", () => {

        if (scrollScheduled) return;

        scrollScheduled = true;

        requestAnimationFrame(() => {

            updateActiveLink();

            scrollScheduled = false;

        });

    }, { passive: true });

    updateActiveLink();

    /* PROFILE IMAGE FALLBACK */
    const profileImage =
        document.getElementById("profileImage");

    const imagePlaceholder =
        document.getElementById("imagePlaceholder");

    if (profileImage && imagePlaceholder) {

        function showPlaceholder() {

            profileImage.hidden = true;

            imagePlaceholder.hidden = false;

        }

        profileImage.addEventListener(
            "error",
            showPlaceholder
        );

        // Handle an image that failed before JS loaded.
        if (
            profileImage.complete &&
            profileImage.naturalWidth === 0
        ) {

            showPlaceholder();

        }

    }

    /* AUTOMATIC COPYRIGHT YEAR */
    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

});
