document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle --- //
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBar = document.querySelector('nav'); // Renamed to avoid redeclaration
    
    if (mobileNavToggle && navMenu && navBar) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav-open');
            mobileNavToggle.classList.toggle('open');
            navBar.classList.toggle('nav-open');
        });
        
        // Close mobile menu when a nav link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-open');
                mobileNavToggle.classList.remove('open');
                navBar.classList.remove('nav-open');
            });
        });
        
        // Close when clicking outside the menu
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('nav-open') && 
                !e.target.closest('#nav-menu') && 
                !e.target.closest('.mobile-nav-toggle')) {
                navMenu.classList.remove('nav-open');
                mobileNavToggle.classList.remove('open');
                navBar.classList.remove('nav-open');
            }
        });
    }
    
    // --- Itinerary Toggle Functionality --- //
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const itineraryRows = document.querySelector('.itinerary-rows');
    const coreDescription = document.querySelector('.core-description');
    const fullDescription = document.querySelector('.full-description');
    
    if (toggleOptions.length && itineraryRows) {
        toggleOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Only proceed if this option isn't already active
                if (!option.classList.contains('toggle-active')) {
                    // Remove active class from all options
                    toggleOptions.forEach(opt => opt.classList.remove('toggle-active'));
                    
                    // Add active class to clicked option
                    option.classList.add('toggle-active');
                    
                    // Toggle full/core experience
                    const experience = option.dataset.experience;
                    const day3Core = document.querySelector('.day-3-core');
                    const day3Full = document.querySelector('.day-3-full');
                    
                    if (experience === 'full') {
                        itineraryRows.classList.add('show-full-itinerary');
                        coreDescription.style.display = 'none';
                        fullDescription.style.display = 'block';
                        
                        // Switch Day 3 content
                        if (day3Core && day3Full) {
                            day3Core.style.display = 'none';
                            day3Full.style.display = 'block';
                        }
                    } else {
                        itineraryRows.classList.remove('show-full-itinerary');
                        coreDescription.style.display = 'block';
                        fullDescription.style.display = 'none';
                        
                        // Switch Day 3 content
                        if (day3Core && day3Full) {
                            day3Core.style.display = 'block';
                            day3Full.style.display = 'none';
                        }
                    }
                    
                    // Add a subtle animation effect
                    itineraryRows.style.opacity = '0.8';
                    setTimeout(() => {
                        itineraryRows.style.opacity = '1';
                    }, 300);
                }
            });
        });
    }
    
    // --- Countdown Timer --- //
    const countdownElement = document.getElementById('countdown');
    const weddingDateTimeObject = new Date('November 29, 2025 00:00:00'); // Date object for calculations
    const weddingDateTimestamp = weddingDateTimeObject.getTime(); // Timestamp for total distance

    function updateCountdown() {
        const now = new Date();
        const distance = weddingDateTimestamp - now.getTime();

        if (distance < 0) {
            if (countdownElement) countdownElement.innerHTML = "<div class='countdown-complete'>The day is here!</div>";
            clearInterval(countdownInterval);
            return;
        }

        let months = 0;
        let dateAfterFullMonths = new Date(now); // Start with current date for month iteration

        // Calculate full months remaining
        while (true) {
            let nextMonthIteration = new Date(dateAfterFullMonths);
            nextMonthIteration.setMonth(nextMonthIteration.getMonth() + 1);

            if (nextMonthIteration <= weddingDateTimeObject) {
                months++;
                dateAfterFullMonths.setMonth(dateAfterFullMonths.getMonth() + 1);
            } else {
                break; // Next month iteration would pass the wedding date
            }
        }

        // Calculate remaining time components after full months are accounted for
        const remainingTimeAfterMonths = weddingDateTimeObject.getTime() - dateAfterFullMonths.getTime();

        const days = Math.floor(remainingTimeAfterMonths / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTimeAfterMonths % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTimeAfterMonths % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTimeAfterMonths % (1000 * 60)) / 1000);

        if (countdownElement) {
            // Create vintage poster style countdown with separate elements for each unit
            countdownElement.innerHTML = `
                <div class="countdown-item months-item">
                    <div class="countdown-number">${months}</div>
                    <div class="countdown-label">Months</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number">${days}</div>
                    <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number">${hours}</div>
                    <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number">${minutes}</div>
                    <div class="countdown-label">Mins</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number">${seconds}</div>
                    <div class="countdown-label">Secs</div>
                </div>
            `;
        }
    }

    if (countdownElement) {
        updateCountdown(); // Initial call
        var countdownInterval = setInterval(updateCountdown, 1000);
    }

    // --- Smooth Scrolling --- //
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    // Add an additional offset for mobile devices
    const isMobile = window.innerWidth <= 768;

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the top position of the target element
                let targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                // Get the height of the fixed navigation bar
                const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
                
                // Adjust the target position by subtracting the navigation bar height
                let adjustedPosition = targetPosition - navHeight;

                window.scrollTo({
                    top: adjustedPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Sticky Navigation on Scroll --- //
    // Use navBar variable that was defined earlier
    if (navBar) {
        const scrollThreshold = 50; // Pixels to scroll before nav becomes sticky

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > scrollThreshold) {
                navBar.classList.add('nav-scrolled');
            } else {
                navBar.classList.remove('nav-scrolled');
            }
        });
    }

});
