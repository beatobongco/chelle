document.addEventListener('DOMContentLoaded', () => {
    // --- Countdown Timer --- //
    const countdownElement = document.getElementById('countdown');
    const weddingDateTimeObject = new Date('November 29, 2025 00:00:00'); // Date object for calculations
    const weddingDateTimestamp = weddingDateTimeObject.getTime(); // Timestamp for total distance

    function updateCountdown() {
        const now = new Date();
        const distance = weddingDateTimestamp - now.getTime();

        if (distance < 0) {
            if (countdownElement) countdownElement.innerHTML = "The day is here!";
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
            countdownElement.innerHTML = `${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    if (countdownElement) {
        updateCountdown(); // Initial call
        var countdownInterval = setInterval(updateCountdown, 1000);
    }

    // --- Smooth Scrolling --- //
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

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
    const navElement = document.querySelector('nav');
    if (navElement) {
        const scrollThreshold = 50; // Pixels to scroll before nav becomes sticky

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > scrollThreshold) {
                navElement.classList.add('nav-scrolled');
            } else {
                navElement.classList.remove('nav-scrolled');
            }
        });
    }

});
