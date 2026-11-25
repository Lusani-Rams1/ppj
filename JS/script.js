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

    document.addEventListener("DOMContentLoaded", () => {

        /* PROJECT INFORMATION */
        const projects = {

            campussync: {

                title: "CampusSync",

                category: "FULLSTACK APPLICATION",

                description:
                    "A smart student productivity and reminder management platform.",

                overview:
                    "CampusSync is designed to help students organise academic tasks, manage deadlines and receive automated reminders. The application includes student and administrator dashboards, authentication and database integration.",

                features: [
                    "Student registration and authentication",
                    "JWT-based authentication",
                    "Task creation and management",
                    "Automated reminder scheduling",
                    "Notification management",
                    "Administrator dashboard",
                    "Student account management",
                    "Usage analytics and system monitoring"
                ],

                technologies: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Node.js",
                    "Express.js",
                    "MySQL",
                    "MariaDB",
                    "JWT",
                    "bcrypt",
                    "Railway"
                ],

                github:
                    "https://github.com/Lusani-Rams1/ReminderApp",

                demo: ""

            },

            queuecare: {

                title: "QueueCare",

                category: "MANAGEMENT SYSTEM",

                description:
                    "A digital patient and clinic queue management system.",

                overview:
                    "QueueCare is designed to improve clinic operations by digitising patient registration, queue management and communication between receptionists and doctors.",

                features: [
                    "Patient registration",
                    "Digital patient queue",
                    "Receptionist dashboard",
                    "Doctor dashboard",
                    "Patient queue display",
                    "Role-based access",
                    "Administrative dashboard"
                ],

                technologies: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Node.js",
                    "Express.js",
                    "MySQL"
                ],

                github: "",

                demo: ""

            },

            flourandco: {

                title: "Flour & Co.",

                category: "BUSINESS WEBSITE",

                description:
                    "A modern digital storefront for a bakery specialising in bread and pastries.",

                overview:
                    "Flour & Co. is an ongoing website development project focused on presenting bakery products, communicating brand identity and providing customers with collection information.",

                features: [
                    "Responsive landing page",
                    "Bakery product menu",
                    "Brand story page",
                    "Collection information",
                    "Customer enquiry integration"
                ],

                technologies: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Responsive Design"
                ],

                github: "",

                demo: ""

            },

            claims: {

                title: "Claims Management System",

                category: "ACADEMIC WEB APPLICATION",

                description:
                    "An ASP.NET MVC application for managing lecturer claims.",

                overview:
                    "The Claims Management System was developed as an academic project to demonstrate how digital systems can simplify claim submission, administrative reviews and claim status management.",

                features: [
                    "Lecturer claim submission",
                    "Coordinator dashboard",
                    "Claim review interface",
                    "Claim status management",
                    "Invoice interface"
                ],

                technologies: [
                    "C#",
                    "ASP.NET",
                    "MVC",
                    "Razor",
                    "HTML",
                    "CSS"
                ],

                github: "",

                demo: ""

            }

        };

        /* PROJECT CATEGORY FILTERS */
        const filterButtons =
            document.querySelectorAll(".filter-btn");

        const projectCards =
            document.querySelectorAll(".project-card");

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const selectedCategory =
                    button.dataset.filter;

                filterButtons.forEach(filter => {

                    const isActive = filter === button;

                    filter.classList.toggle(
                        "active",
                        isActive
                    );

                    filter.setAttribute(
                        "aria-pressed",
                        String(isActive)
                    );

                });

                projectCards.forEach(card => {

                    const categories =
                        card.dataset.category.split(" ");

                    const shouldShow =
                        selectedCategory === "all" ||
                        categories.includes(selectedCategory);

                    card.hidden = !shouldShow;

                });

            });

        });

        /* PROJECT IMAGE FALLBACK */
        const projectImages =
            document.querySelectorAll(".project-image img");

        projectImages.forEach(image => {

            function showPlaceholder() {

                image.hidden = true;

            }

            image.addEventListener(
                "error",
                showPlaceholder
            );

            if (
                image.complete &&
                image.naturalWidth === 0
            ) {

                showPlaceholder();

            }

        });

        /* PROJECT DETAILS MODAL */
        const modal =
            document.getElementById("projectModal");

        const modalClose =
            document.getElementById("modalClose");

        const detailsButtons =
            document.querySelectorAll(".project-details");

        if (!modal || !modalClose) return;

        let previousFocus = null;

        /* OPEN PROJECT */
        function openProject(projectId) {

            const project = projects[projectId];

            if (!project) return;

            previousFocus = document.activeElement;

            document.getElementById(
                "modalTitle"
            ).textContent = project.title;

            document.getElementById(
                "modalCategory"
            ).textContent = project.category;

            document.getElementById(
                "modalDescription"
            ).textContent = project.description;

            document.getElementById(
                "modalOverview"
            ).textContent = project.overview;

            /* PROJECT FEATURES */
            const featuresContainer =
                document.getElementById("modalFeatures");

            featuresContainer.replaceChildren();

            project.features.forEach(feature => {

                const item = document.createElement("li");

                item.textContent = feature;

                featuresContainer.appendChild(item);

            });

            /* PROJECT TECHNOLOGIES */
            const technologiesContainer =
                document.getElementById("modalTechnologies");

            technologiesContainer.replaceChildren();

            project.technologies.forEach(technology => {

                const tag = document.createElement("span");

                tag.textContent = technology;

                technologiesContainer.appendChild(tag);

            });

            /* GITHUB LINK */
            const githubLink =
                document.getElementById("modalGithub");

            if (project.github) {

                githubLink.href = project.github;
                githubLink.hidden = false;

            } else {

                githubLink.removeAttribute("href");
                githubLink.hidden = true;

            }

            /* LIVE DEMO LINK */
            const demoLink =
                document.getElementById("modalDemo");

            if (project.demo) {

                demoLink.href = project.demo;
                demoLink.hidden = false;

            } else {

                demoLink.removeAttribute("href");
                demoLink.hidden = true;

            }

            /* SHOW MODAL */
            modal.showModal();

            document.body.classList.add("modal-open");

            modalClose.focus();

        }

        /* PROJECT DETAILS BUTTONS */
        detailsButtons.forEach(button => {

            button.addEventListener("click", () => {

                openProject(button.dataset.project);

            });

        });

        /* CLOSE BUTTON */
        modalClose.addEventListener("click", () => {

            modal.close();

        });

        /* CLOSE WHEN CLICKING BACKDROP */
        modal.addEventListener("click", event => {

            const bounds = modal.getBoundingClientRect();

            const clickedOutside =
                event.clientX < bounds.left ||
                event.clientX > bounds.right ||
                event.clientY < bounds.top ||
                event.clientY > bounds.bottom;

            if (
                event.target === modal &&
                clickedOutside
            ) {

                modal.close();

            }

        });

        /* RESTORE SCROLL AND FOCUS */
        modal.addEventListener("close", () => {

            document.body.classList.remove("modal-open");

            if (previousFocus) {

                previousFocus.focus();

            }

        });

    });

});
