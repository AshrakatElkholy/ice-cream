// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Product Data
const products = [
    {
        name: 'Chocolate Delight',
        price: 4.99,
        image: 'images/chocolate-delight.jpg',
        description: 'Rich Belgian chocolate with dark chocolate chunks',
        category: 'Classic'
    },
    {
        name: 'Vanilla Dream',
        price: 4.49,
        image: 'images/vanilla-dream.jpg',
        description: 'Madagascar vanilla bean with caramel swirls',
        category: 'Classic'
    },
    {
        name: 'Strawberry Bliss',
        price: 4.99,
        image: 'images/strawberry-bliss.jpg',
        description: 'Fresh strawberries with white chocolate chips',
        category: 'Fruit'
    },
    {
        name: 'Mint Chocolate',
        price: 5.49,
        image: 'images/mint-chocolate.jpg',
        description: 'Cool mint with dark chocolate chips',
        category: 'Special'
    }
];

// Categories Data
const categories = [
    {
        name: 'Sundaes',
        image: 'images/sundaes.jpg',
        description: 'Decadent sundaes with premium toppings'
    },
    {
        name: 'Ice Cream Cones',
        image: 'images/cones.jpg',
        description: 'Classic and waffle cones with your favorite scoops'
    },
    {
        name: 'Milkshakes',
        image: 'images/milkshakes.jpg',
        description: 'Creamy shakes in various flavors'
    },
    {
        name: 'Seasonal Flavors',
        image: 'images/seasonal.jpg',
        description: 'Limited time seasonal offerings'
    }
];

// Testimonials Data
const testimonials = [
    {
        name: 'Sarah Johnson',
        comment: 'The best ice cream I\'ve ever tasted! The flavors are amazing.',
        rating: 5
    },
    {
        name: 'Mike Thompson',
        comment: 'Great variety and excellent service. My kids love it!',
        rating: 5
    },
    {
        name: 'Emily Davis',
        comment: 'The premium selection is worth every penny. Absolutely delicious!',
        rating: 5
    }
];

// Function to populate favorites section
function populateFavorites() {
    const favoritesGrid = document.querySelector('#favorites .row');
    if (!favoritesGrid) return;
    
    favoritesGrid.innerHTML = products.map(product => `
        <div class="col-lg-3 col-md-6" data-aos="fade-up">
            <div class="ice-cream-card text-center">
                <img src="${product.image}" alt="${product.name}" class="img-fluid mb-3">
                <h3 class="h5">${product.name}</h3>
                <p class="text-muted">${product.description}</p>
                <p class="price fw-bold">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary add-to-cart">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Function to populate categories
function populateCategories() {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = categories.map(category => `
        <div class="col-lg-3 col-md-6" data-aos="fade-up">
            <div class="category-card">
                <img src="${category.image}" alt="${category.name}" class="img-fluid">
                <div class="overlay">
                    <h3 class="h5 mb-2">${category.name}</h3>
                    <p class="mb-0">${category.description}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to populate testimonials
function populateTestimonials() {
    const testimonialSlider = document.querySelector('.testimonials-slider');
    testimonialSlider.innerHTML = '';

    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.setAttribute('data-aos', 'fade-up');
        
        const stars = '⭐'.repeat(testimonial.rating);
        
        testimonialCard.innerHTML = `
            <p>${testimonial.comment}</p>
            <div class="rating">${stars}</div>
            <h4>${testimonial.name}</h4>
        `;
        
        testimonialSlider.appendChild(testimonialCard);
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your backend
        alert('Thank you for subscribing! We\'ll keep you updated with our latest offers.');
        this.reset();
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateFavorites();
    populateCategories();
    populateTestimonials();
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Get all indicators and product cards
    const indicators = document.querySelectorAll('.favorite-indicator');
    const productCards = document.querySelectorAll('.product-card');
    const cardsPerView = 4; // Number of cards shown at once
    
    // Set first indicator as active by default
    indicators[0].classList.add('active');

    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            // Remove active class from all indicators
            indicators.forEach(ind => ind.classList.remove('active'));
            
            // Add active class to clicked indicator
            indicator.classList.add('active');
            
            // Calculate the offset for the cards
            const offset = index * cardsPerView;
            
            // Hide all cards first
            productCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show only the cards for the current page
            for(let i = offset; i < offset + cardsPerView && i < productCards.length; i++) {
                if(productCards[i]) {
                    productCards[i].style.display = 'block';
                }
            }
        });
    });

    // Auto-rotate every 5 seconds
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % indicators.length;
        indicators[currentIndex].click();
    }, 5000);
});

// Add to cart functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest('.ice-cream-card');
        const productName = card.querySelector('h3').textContent;
        
        // Here you would typically add to cart logic
        const toast = new bootstrap.Toast(document.createElement('div'));
        toast.show();
        alert(`${productName} has been added to your cart!`);
    }
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});
