document.addEventListener('DOMContentLoaded', () => {
    const passwordGate = document.getElementById('password-gate');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const passwordError = document.getElementById('password-error');
    const mainContent = document.getElementById('main-content');

    // IMPORTANT: Replace 'yourChosenPassword' with the actual password you want to use.
    // For a real site, this is not secure. GitHub Pages are public.
    // This is a simple deterrent, not a robust security measure.
    const correctPassword = 'beachwedding2025'; // Example password

    if (passwordForm) {
        passwordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const enteredPassword = passwordInput.value;

            if (enteredPassword === correctPassword) {
                if (passwordGate) passwordGate.style.display = 'none';
                if (mainContent) mainContent.classList.remove('hidden-content');
                // Optionally, store a session token or flag so the user doesn't have to re-enter
                // For this simple setup, we'll just hide the gate.
                sessionStorage.setItem('site_accessed', 'true');
            } else {
                if (passwordError) passwordError.textContent = 'Incorrect password. Please try again.';
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }

    // Check if already accessed in this session
    if (sessionStorage.getItem('site_accessed') === 'true') {
        if (passwordGate) passwordGate.style.display = 'none';
        if (mainContent) mainContent.classList.remove('hidden-content');
    } else {
        if (mainContent) mainContent.classList.add('hidden-content');
        if (passwordGate) passwordGate.style.display = 'flex'; // Ensure it's visible if not accessed
    }
});
