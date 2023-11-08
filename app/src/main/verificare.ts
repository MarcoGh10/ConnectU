document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
    const confirmPasswordInput = document.querySelector('input[name="conpassword"]') as HTMLInputElement;

    emailInput.addEventListener('input', () => {
        const email = emailInput.value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        if (emailPattern.test(email)) {
            emailInput.setCustomValidity('');
        } else {
            emailInput.setCustomValidity('Adresa de email nu este validă.');
        }
    });

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const uppercaseLetterPattern = /[A-Z]/;
        
        if (uppercaseLetterPattern.test(password)) {
            passwordInput.setCustomValidity('');
        } else {
            passwordInput.setCustomValidity('Parola trebuie să conțină cel puțin o literă mare.');
        }
        
        // Verificare dacă parola și confirmarea parolei coincid
        if (password !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Parola nu corespunde cu confirmarea parolei.');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    });

    confirmPasswordInput.addEventListener('input', () => {
        // Verificare dacă parola și confirmarea parolei coincid
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Parola nu corespunde cu confirmarea parolei.');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    });

    // Logica pentru autentificarea cu Google (adăugați aici)
    const googleLoginButton = document.getElementById('google-login') as HTMLButtonElement;
    googleLoginButton.addEventListener('click', () => {
        // Aici puteți adăuga logica pentru autentificarea cu Google
    });
});
