// Global selections
let menuIcon = document.querySelector('.menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('.header');
const sectionOffsets = {};

let lastKnownScrollPosition = 0;
let ticking = false;

// Functions
function updateHeaderVisibility() {
    const hash = window.location.hash;
    header.classList.toggle('header-visible', !(hash === '#home' || hash === ''));
}

function setActiveSection(scrollPos) {
    let currentSection = '';

    for (const [id, offset] of Object.entries(sectionOffsets)) {
        if (scrollPos >= offset - 150) {
            currentSection = id;
        }
    }

    if (currentSection && window.location.hash !== `#${currentSection}`) {
        history.replaceState(null, null, `#${currentSection}`);
        updateHeaderVisibility();
    }
}

function calculateOffsets() {
    sections.forEach(section => {
        sectionOffsets[section.id] = section.offsetTop;
    });
}

function updateNavLinks(top) {
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            });
        }
    });
}

function updateExperience() {
    const startDate = new Date("2022-04-01");
    const currentDate = new Date();
    let yearsExperience = currentDate.getFullYear() - startDate.getFullYear();
    let monthsExperience = currentDate.getMonth() - startDate.getMonth();

    if (monthsExperience < 0 || (monthsExperience === 0 && currentDate.getDate() < startDate.getDate())) {
        monthsExperience += 12;
        yearsExperience--;
    }

    const experienceText = `${yearsExperience} year${yearsExperience !== 1 ? 's' : ''}` +
                           `${monthsExperience ? ` and ${monthsExperience} month${monthsExperience !== 1 ? 's' : ''}` : ''}`;

    document.getElementById("yearsExperience").textContent = experienceText;
}

function filterSkills() {
    const selectedCategory = document.getElementById('skillsFilter').value;
    const cards = document.querySelectorAll('.skill-card');

    cards.forEach(card => {
        card.style.display = selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory ? '' : 'none';
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    calculateOffsets();
    updateExperience();
    document.getElementById('skillsFilter').addEventListener('change', filterSkills);
    updateHeaderVisibility();

    // Menu icon toggle functionality
    menuIcon.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });

    // Click outside the navbar to close it
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && !menuIcon.contains(event.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
        }
    });
});

window.addEventListener('scroll', function() {
    const top = window.scrollY;
    updateNavLinks(top);

    if (!ticking) {
        window.requestAnimationFrame(function() {
            setActiveSection(top);
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('hashchange', updateHeaderVisibility);
window.addEventListener('resize', calculateOffsets);
