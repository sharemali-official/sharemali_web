// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Chart
    initGrowthChart();
    
    // Load Stats
    loadDashboardStats();
    
    // Setup Event Listeners
    setupEventListeners();
    
    // Check Notifications
    checkNotifications();
    
    // Theme Toggle
    initThemeToggle();
});

// Initialize Growth Chart
function initGrowthChart() {
    const ctx = document.getElementById('growthChart').getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'User Growth',
            data: [500, 800, 1200, 1800, 2500, 3200, 4200],
            borderColor: '#5865F2',
            backgroundColor: 'rgba(88, 101, 242, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#8b949e'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#8b949e'
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

// Load Dashboard Stats
async function loadDashboardStats() {
    try {
        // In production, this would fetch from your API
        const stats = {
            totalUsers: '12,456',
            activeUsers: '1,234',
            extensions: '24',
            commandsUsed: '45.6K',
            revenue: '$45.67',
            uptime: '99.9%'
        };
        
        // Update UI elements
        document.querySelectorAll('.stat-value').forEach((el, index) => {
            const values = Object.values(stats);
            if (values[index]) {
                el.textContent = values[index];
            }
        });
        
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Time selector
    const timeSelect = document.querySelector('.time-select');
    if (timeSelect) {
        timeSelect.addEventListener('change', function(e) {
            updateChartTimeframe(e.target.value);
        });
    }
    
    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotifications);
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchExtensions, 300));
    }
}

// Update Chart Timeframe
function updateChartTimeframe(timeframe) {
    console.log('Updating chart for:', timeframe);
    // In production, fetch new data based on timeframe
}

// Show Notifications
function showNotifications() {
    const notifications = [
        { id: 1, text: 'New user registered', time: '2 min ago', type: 'info' },
        { id: 2, text: 'API rate limit warning', time: '1 hour ago', type: 'warning' },
        { id: 3, text: 'Payment received: $9.99', time: '5 hours ago', type: 'success' }
    ];
    
    // Create notification dropdown
    const dropdown = createNotificationDropdown(notifications);
    
    // Toggle dropdown
    const existingDropdown = document.querySelector('.notification-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    } else {
        document.body.appendChild(dropdown);
        
        // Position dropdown
        const btn = document.querySelector('.notification-btn');
        const rect = btn.getBoundingClientRect();
        dropdown.style.top = rect.bottom + 10 + 'px';
        dropdown.style.right = window.innerWidth - rect.right + 'px';
        
        // Close on click outside
        document.addEventListener('click', function closeDropdown(e) {
            if (!dropdown.contains(e.target) && e.target !== btn) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    }
}

// Create Notification Dropdown
function createNotificationDropdown(notifications) {
    const dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown';
    dropdown.style.cssText = `
        position: fixed;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 15px;
        width: 300px;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    let html = '<h4 style="margin-bottom: 15px; color: var(--text-primary);">Notifications</h4>';
    
    notifications.forEach(notif => {
        html += `
            <div class="notification-item" style="padding: 10px; border-bottom: 1px solid var(--border-color);">
                <p style="margin: 0; color: var(--text-primary);">${notif.text}</p>
                <small style="color: var(--text-secondary);">${notif.time}</small>
            </div>
        `;
    });
    
    html += `
        <div style="margin-top: 15px; text-align: center;">
            <button onclick="markAllAsRead()" style="
                background: transparent;
                border: 1px solid var(--primary-color);
                color: var(--primary-color);
                padding: 5px 15px;
                border-radius: 5px;
                cursor: pointer;
            ">Mark all as read</button>
        </div>
    `;
    
    dropdown.innerHTML = html;
    return dropdown;
}

// Check Notifications
async function checkNotifications() {
    try {
        // In production, fetch from API
        const hasUnread = true; // Simulated
        const count = 3; // Simulated
        
        if (hasUnread) {
            const badge = document.querySelector('.notification-count');
            if (badge) {
                badge.textContent = count;
                badge.style.display = 'flex';
            }
        }
    } catch (error) {
        console.error('Failed to check notifications:', error);
    }
}

// Mark All as Read
function markAllAsRead() {
    console.log('Marking all as read');
    const badge = document.querySelector('.notification-count');
    if (badge) {
        badge.style.display = 'none';
    }
    document.querySelector('.notification-dropdown')?.remove();
}

// Initialize Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Check saved theme
        const savedTheme = localStorage.getItem('sharemali-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// Toggle Theme
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('sharemali-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('sharemali-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Search Extensions
function searchExtensions(query) {
    console.log('Searching for:', query);
    // In production, this would filter extensions
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Action Button Functions
function createExtension() {
    alert('Redirecting to extension creation...');
    // In production: window.location.href = 'create-extension.html';
}

function openAPIKeys() {
    alert('Opening API Keys...');
    // In production: window.location.href = 'api-keys.html';
}

function openWebhooks() {
    alert('Opening Webhooks...');
    // In production: window.location.href = 'webhooks.html';
}

function openAnalytics() {
    alert('Opening Analytics...');
    // In production: window.location.href = 'analytics.html';
}

function openSettings() {
    alert('Opening Settings...');
    // In production: window.location.href = 'settings.html';
}

function openDocs() {
    window.open('https://docs.sharemali.com', '_blank');
}
