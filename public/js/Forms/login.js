const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const result = await fetchRequest('/api/login', 'POST', data);

        // Store the token in localStorage
        localStorage.setItem('token', result.token);

        // Redirect to the dashboard (protected route)
        await fetchDashboard();
    } catch (error) {
        const errorDiv = document.getElementById('errorMessages');
        errorDiv.innerHTML = error.message;
        errorDiv.style.display = 'block';
    }
});



    async function fetchDashboard() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found when fetching dashboard.');
            window.location.href = '/api/signIn';
            return;
        }
    
        try {
            const data = await fetchRequest('/api/protected-route', 'GET', null, token);
            console.log(data); // Handle your dashboard data here
            window.location.href = '/api/dashboard'; // Redirect after fetching data
        } catch (error) {
            console.error('Error fetching dashboard:', error);
            // Handle the error (e.g., show a message or redirect)
            window.location.href = '/api/signIn';
        }
    }
