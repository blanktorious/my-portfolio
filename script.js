let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};
// This function will be executed when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Attach an event listener to the dropdown for the 'change' event
    document.getElementById('skillsFilter').addEventListener('change', function() {
        var selectedCategory = this.value; // Get the currently selected option's value
        var cards = document.querySelectorAll('.skill-card'); // Get all skill cards
        // Iterate over each card and determine whether it should be shown or hidden
        cards.forEach(card => {
            if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                card.style.display = ''; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });
});
