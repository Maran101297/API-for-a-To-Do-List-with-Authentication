document.getElementById('otpVerificationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    // Retrieve email from localStorage
    const email = localStorage.getItem('registerEmail');
    const otp = document.getElementById('otp').value;

    try {
        // Use the fetchRequest helper function
        const result = await fetchRequest('/api/verifyOtp', 'POST', { email, otp });

        alert('OTP verified successfully');
        window.location.href = '/api/signIn'; // Redirect to the sign-in page after successful verification
    } catch (error) {
        // Handle the error thrown by fetchRequest
        alert(error.message || 'OTP verification failed');
        console.error('Error during OTP verification:', error);
    }
});

 