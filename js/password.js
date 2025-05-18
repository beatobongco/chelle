document.addEventListener('DOMContentLoaded', function () {
    const passwordGate = document.getElementById('password-gate');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const passwordError = document.getElementById('password-error');
    const mainContent = document.getElementById('main-content');

    // Password obfuscation functions
    function decodePassword(encoded) {
        // Step 1: Decode from base64
        const base64Decoded = atob(encoded);

        // Step 2: Shift characters back (simple Caesar cipher with varying shifts)
        let decoded = '';
        for (let i = 0; i < base64Decoded.length; i++) {
            // Get character code and shift it back by position + 3
            const charCode = base64Decoded.charCodeAt(i);
            const shiftedCharCode = charCode - (i % 5 + 3);
            decoded += String.fromCharCode(shiftedCharCode);
        }

        return decoded;
    }

    const obfuscatedPassword = 'dW13bzg1Nw==';

    // Decode at runtime (never stored in plain text)
    const correctPassword = decodePassword(obfuscatedPassword);

    if (passwordForm) {
        passwordForm.addEventListener('submit', function (event) {
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
