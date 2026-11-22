
function createMarquee(rowId, technologies) {
    const track = document.getElementById(rowId);

    if (!track || !technologies.length) return;

    const cards = technologies.map(tech => `
        <div class="tech-card">
            <i class="devicon-${tech.icon}-plain"
               aria-hidden="true"></i>
            <span>${tech.name}</span>
        </div>
    `).join("");

    const group = `
        <div class="marquee-group">
            ${cards}
        </div>
    `;

    // Two identical groups create a seamless loop.
    track.innerHTML = group + group;

    // The second group is decorative duplication.
    track.children[1].setAttribute("aria-hidden", "true");
}

createMarquee("row-one", firstRow);
createMarquee("row-two", secondRow);
