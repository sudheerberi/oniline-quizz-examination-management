const form = document.getElementById('registerForm');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const user = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            role: document.getElementById('role').value
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });

            const data = await response.json();
            document.getElementById('message').textContent = data.message;

            if (response.ok) form.reset();

        } catch (error) {
            document.getElementById('message').textContent = 'Server connection failed';
        }
    });
}