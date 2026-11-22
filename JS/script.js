
document.addEventListener("DOMContentLoaded", () => {

    // FIRST ROW - MOVES LEFT
    const firstRow = [
        { name: "HTML5", icon: "html5" },
        { name: "CSS3", icon: "css3" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Node.js", icon: "nodejs" },
        { name: "Express.js", icon: "express" },
        { name: "MySQL", icon: "mysql" }
    ];

    // SECOND ROW - MOVES RIGHT
    const secondRow = [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "PHP", icon: "php" },
        { name: "C#", icon: "csharp" },
        { name: "Bootstrap", icon: "bootstrap" },
        { name: "MariaDB", icon: "mariadb" }
    ];

    // GENERATE TECHNOLOGY CARDS
    function createMarquee(rowId, technologies) {

        const track = document.getElementById(rowId);

        if (!track || technologies.length === 0) {
            return;
        }

        const cards = technologies.map(tech => `
            <div class="tech-card">
                <i class="devicon-${tech.icon}-plain"
                   aria-hidden="true"></i>
                <span>${tech.name}</span>
            </div>
        `).join("");

        // Create two identical groups
        const group = `
            <div class="marquee-group">
                ${cards}
            </div>
        `;

        track.innerHTML = group + group;

        // Hide duplicate group from screen readers
        track.children[1].setAttribute(
            "aria-hidden",
            "true"
        );
    }

    // INITIALISE MARQUEES
    createMarquee("row-one", firstRow);
    createMarquee("row-two", secondRow);

});
