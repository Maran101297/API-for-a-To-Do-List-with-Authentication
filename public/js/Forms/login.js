const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
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
    const result = await fetchRequest("/api/login", "POST", data);

    // Store the token in localStorage
    localStorage.setItem("token", result.token);

    // Redirect to the dashboard (protected route)
    await fetchDashboard();
  } catch (error) {
    const errorDiv = document.getElementById("errorMessages");
    errorDiv.innerHTML = error.message;
    errorDiv.style.display = "block";
  }
});

async function fetchDashboard() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found when fetching dashboard.");
    window.location.href = "/api/signIn";
    return;
  }

  try {
    const data = await fetchRequest("/api/protected-route", "GET", null, token);
    console.log(data); // Handle your dashboard data here
    window.location.href = "/api/dashboard"; // Redirect after fetching data
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    // Handle the error (e.g., show a message or redirect)
    window.location.href = "/api/signIn";
  }
}
