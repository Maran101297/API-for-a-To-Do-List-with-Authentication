const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData.entries());
  // Client-side validation
  let errors = [];

  // Email validation (simple regex pattern)
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(data.email)) {
    errors.push("Please enter a valid email address.");
  }
  // Password validation (at least 6 characters)
  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  // Check if there are any validation errors
  if (errors.length > 0) {
    const errorDiv = document.getElementById("errorMessages");
    errorDiv.innerHTML = errors.join("<br>");
    errorDiv.style.display = "block";
    return; // Stop form submission
  }
  try {
    const result = await fetchRequest("/api/signup", "POST", data);

    localStorage.setItem("registerEmail", result.user.email);
    // Store the token in localStorage
    localStorage.setItem("token", result.token);

    // Redirect to the sign-in page after successful registration
    // window.location.href = '/signIn';
    window.location.href = "/api/OtpForm";
  } catch (error) {
    const errorDiv = document.getElementById("errorMessages");
    errorDiv.innerHTML = error.message;
    errorDiv.style.display = "block";
  }
});
