// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Check if already logged in
    checkAuthStatus();
});

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-auth');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call (replace with actual API)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock successful login
        const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substr(2);
        localStorage.setItem('sharemali-token', mockToken);
        localStorage.setItem('sharemali-user', JSON.stringify({
            id: '123',
            email: email,
            name: 'John Doe',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email
        }));
        
        showNotification('Successfully logged in!', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
        
    } catch (error) {
        console.error('Login failed:', error);
        showNotification('Login failed. Please check your credentials.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Check Auth Status
function checkAuthStatus() {
    const token = localStorage.getItem('sharemali-token');
    const currentPage = window.location.pathname;
    
    // If logged in and on auth pages, redirect to dashboard
    if (token && (currentPage.includes('login.html') || currentPage.includes('register.html'))) {
        window.location.href = 'dashboard.html';
    }
    
    // If not logged in and on protected pages, redirect to login
    if (!token && (currentPage.includes('dashboard.html') || 
                   currentPage.includes('extensions.html') || 
                   currentPage.includes('settings.html'))) {
        window.location.href = 'login.html';
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('sharemali-token');
    localStorage.removeItem('sharemali-user');
    window.location.href = 'index.html';
}

// Discord Login
function loginWithDiscord() {
    const clientId = 'YOUR_DISCORD_CLIENT_ID';
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/discord/callback`);
    const scope = encodeURIComponent('identify email');
    
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    
    window.location.href = discordAuthUrl;
}

// GitHub Login
function loginWithGitHub() {
    const clientId = 'YOUR_GITHUB_CLIENT_ID';
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/github/callback`);
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
    
    window.location.href = githubAuthUrl;
}

// Add event listeners for social login buttons
document.addEventListener('DOMContentLoaded', function() {
    const discordBtn = document.querySelector('.auth-provider.discord');
    const githubBtn = document.querySelector('.auth-provider.github');
    
    if (discordBtn) {
        discordBtn.addEventListener('click', loginWithDiscord);
    }
    
    if (githubBtn) {
        githubBtn.addEventListener('click', loginWithGitHub);
    }
});
