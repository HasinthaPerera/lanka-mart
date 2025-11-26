// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseConfig } from './config.js'; 
// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 2. Listen for Login/Logout State
// This runs automatically whenever the page loads
onAuthStateChanged(auth, (user) => {
  const authLink = document.getElementById('auth-link');

  if (user) {
    // --- USER IS LOGGED IN ---
    console.log("User is logged in:", user.email);

    if (authLink) {
      // Change "Login" button to "Logout"
      authLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
      authLink.href = "#"; // Stop it from going to login page
      
      // Add Click Event to Log Out
      authLink.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
      });
    }

    // Special Check: If user is on login page, redirect to home
    if (window.location.pathname.includes('login.html')) {
      window.location.href = 'index.html';
    }

  } else {
    // --- USER IS LOGGED OUT ---
    console.log("User is logged out");

    if (authLink) {
      // Change back to "Login"
      authLink.innerHTML = '<i class="fas fa-user"></i> Login';
      authLink.href = "login.html";
    }
  }
});

// 3. Logout Function
function handleLogout() {
  const confirmLogout = confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    signOut(auth).then(() => {
      alert("Logged out successfully!");
      window.location.href = "index.html"; // Redirect to home
    }).catch((error) => {
      console.error("Error logging out:", error);
    });
  }
}

// Export auth to be used in other scripts if needed
export { auth };