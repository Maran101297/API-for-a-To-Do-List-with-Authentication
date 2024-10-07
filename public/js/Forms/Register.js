const phoneInputField = document.querySelector("#phone");
      const phoneCodeInputField = document.querySelector("#phoneCode");
    
      // Initialize intl-tel-input plugin
      const iti = window.intlTelInput(phoneInputField, {
        initialCountry: "auto",
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js",
      });
    
      // Update the hidden input field with the selected country code
      phoneInputField.addEventListener("countrychange", function() {
        const selectedCountryData = iti.getSelectedCountryData();
        phoneCodeInputField.value = selectedCountryData.dialCode;
      });


      const signupForm = document.getElementById('signupForm');
      signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData.entries());
    
        try {
            const result = await fetchRequest('/api/signup', 'POST', data);
            
              localStorage.setItem('registerEmail', result.user.email);
            // Store the token in localStorage
            localStorage.setItem('token', result.token);
    
            // Redirect to the sign-in page after successful registration
            // window.location.href = '/signIn';
            window.location.href = '/api/OtpForm';
            
        } catch (error) {
            const errorDiv = document.getElementById('errorMessages');
            errorDiv.innerHTML = error.message;
            errorDiv.style.display = 'block';
        }
    });
  