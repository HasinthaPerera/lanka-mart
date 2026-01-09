// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from './config.js'; 

// 1. Initialize Firebase ONE TIME
const app = initializeApp(firebaseConfig);

// 2. Initialize Services
const auth = getAuth(app);
const db = getFirestore(app); // This is correct!

// 3. Listen for Login/Logout State (Updates Navbar)
onAuthStateChanged(auth, (user) => {
  const authLink = document.getElementById('auth-link');
  const loginLink = document.querySelector('.login-link'); 

  if (user) {
    console.log("User is logged in:", user.email);
    
    // Update Navbar Link to "Logout"
    if (authLink) {
      authLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
      authLink.href = "#"; 
      
      // Remove old listeners to prevent duplicates (optional best practice)
      const newLink = authLink.cloneNode(true);
      authLink.parentNode.replaceChild(newLink, authLink);
      
      newLink.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
      });
    }
    
    if (loginLink) loginLink.innerHTML = '<i class="fas fa-user-check"></i> My Account';

    
  } else {
    console.log("User is logged out");
    if (authLink) {
      authLink.innerHTML = '<i class="fas fa-user"></i> Login';
      authLink.href = "login.html";
    }
  }
});

// 4. Logout Function
function handleLogout() {
  if (confirm("Are you sure you want to log out?")) {
    signOut(auth).then(() => {
      alert("Logged out successfully!");
      window.location.href = "index.html";
    }).catch((error) => console.error("Error logging out:", error));
  }
}

// 5. Export BOTH auth and db
export { auth, db };