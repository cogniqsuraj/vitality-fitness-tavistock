// ========================================
// Dashboard JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
    initDashboardNavigation();
    loadDashboardData();
    updateDateTime();
    animateStats();
    
    // Update time every second
    setInterval(updateDateTime, 1000);
    
    // Update stats every 5 seconds (simulated real-time)
    setInterval(updateLiveStats, 5000);
});

// Initialize Dashboard
function initDashboard() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 968) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// Dashboard Navigation
function initDashboardNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            // Close mobile sidebar
            if (window.innerWidth <= 968) {
                document.querySelector('.dashboard-sidebar').classList.remove('active');
            }
        });
    });
}

// Load Dashboard Data
function loadDashboardData() {
    // Simulate loading data from API
    updateStats();
    loadTodaySchedule();
    loadRecentBookings();
}

// ========================================
// Date & Time Widget
// ========================================

function updateDateTime() {
    const now = new Date();
    
    // Update time display
    const timeDisplay = document.querySelector('.time-display');
    if (timeDisplay) {
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// ========================================
// Animate Stats on Load
// ========================================

function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// ========================================
// Live Stats Updates (Simulated)
// ========================================

function updateLiveStats() {
    // Simulate live data updates
    const activeMembers = 287 + Math.floor(Math.random() * 5 - 2);
    const classesBooked = 156 + Math.floor(Math.random() * 10 - 5);
    const revenue = 25400 + Math.floor(Math.random() * 1000 - 500);
    const attendance = 92 + Math.floor(Math.random() * 3 - 1);
    
    // Update stat values with animation
    updateStatValue('activeMembers', activeMembers);
    updateStatValue('classesBooked', classesBooked);
    updateStatValue('revenue', `£${revenue.toLocaleString()}`);
    updateStatValue('attendance', `${attendance}%`);
    
    // Update progress bars
    updateProgressBar('activeMembers', (activeMembers / 300) * 100);
    updateProgressBar('classesBooked', (classesBooked / 200) * 100);
    updateProgressBar('revenue', (revenue / 30000) * 100);
    updateProgressBar('attendance', attendance);
}

function updateStatValue(cardId, newValue) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    const valueElement = card.querySelector('.stat-value');
    if (valueElement) {
        valueElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            valueElement.textContent = newValue;
            valueElement.style.transform = 'scale(1)';
        }, 150);
    }
}

function updateProgressBar(cardId, percentage) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    const progressBar = card.querySelector('.stat-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${Math.min(percentage, 100)}%`;
    }
}

// Update Statistics
function updateStats() {
    // In a real application, this would fetch from an API
    const stats = {
        activeMembers: 287,
        bookingsToday: 156,
        revenue: 9847,
        attendanceRate: 92
    };
    
    // Animate numbers
    animateNumber('stat-members', stats.activeMembers);
    animateNumber('stat-bookings', stats.bookingsToday);
    animateNumber('stat-revenue', stats.revenue);
    animateNumber('stat-attendance', stats.attendanceRate);
}

function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Load Today's Schedule
function loadTodaySchedule() {
    // This would fetch from API in production
    const schedule = [
        { time: '09:00 AM', class: 'Yoga & Pilates', instructor: 'Sarah Johnson', spots: '12/20' },
        { time: '10:30 AM', class: 'HIIT Training', instructor: 'Mike Peters', spots: '15/20' },
        { time: '12:00 PM', class: 'Spin Cycle', instructor: 'Emma Davis', spots: '18/20' },
        { time: '05:00 PM', class: 'Strength Training', instructor: 'James Wilson', spots: '8/20' }
    ];
    
    // Populate schedule (already in HTML, but could be dynamic)
}

// Load Recent Bookings
function loadRecentBookings() {
    // This would fetch from API in production
    const bookings = [
        { name: 'James Davidson', avatar: 'JD', class: 'Yoga & Pilates', time: 'Tomorrow 9:00 AM', ago: '2 min ago' },
        { name: 'Sarah Mitchell', avatar: 'SM', class: 'PT Session with Mike', time: 'Friday 3:00 PM', ago: '15 min ago' },
        { name: 'Michael Peters', avatar: 'MP', class: 'HIIT Training', time: 'Today 10:30 AM', ago: '1 hour ago' }
    ];
    
    // Bookings already in HTML, but could be dynamically loaded
}

// Check-in Function
function checkInMember(classId) {
    // Simulate check-in
    showNotification('Member checked in successfully!', 'success');
}

// Export Report
function exportReport(reportType) {
    // Simulate report generation
    showNotification('Report is being generated and will be downloaded shortly...', 'success');
    
    // In real application, would generate CSV/PDF
    setTimeout(() => {
        const csvContent = generateReportCSV(reportType);
        downloadCSV(csvContent, `vft-report-${reportType}-${new Date().toISOString().split('T')[0]}.csv`);
    }, 2000);
}

function generateReportCSV(type) {
    // Generate sample CSV data
    let content = 'Date,Member,Class,Status,Revenue\n';
    content += '2025-11-19,James Davidson,Yoga & Pilates,Confirmed,£34.99\n';
    content += '2025-11-19,Sarah Mitchell,HIIT Training,Completed,£34.99\n';
    content += '2025-11-19,Michael Peters,PT Session,Confirmed,£49.99\n';
    return content;
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Send Announcement
document.addEventListener('DOMContentLoaded', function() {
    const announcementForm = document.querySelector('.announcement-form');
    if (announcementForm) {
        announcementForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const title = this.querySelector('input').value;
            const message = this.querySelector('textarea').value;
            const sendEmail = this.querySelectorAll('input[type="checkbox"]')[0].checked;
            const sendSMS = this.querySelectorAll('input[type="checkbox"]')[1].checked;
            const showDashboard = this.querySelectorAll('input[type="checkbox"]')[2].checked;
            
            // Simulate sending announcement
            showNotification('Announcement sent successfully!', 'success');
            
            // In production, would call API
            const announcement = {
                title,
                message,
                channels: {
                    email: sendEmail,
                    sms: sendSMS,
                    dashboard: showDashboard
                },
                timestamp: new Date().toISOString()
            };
            
            console.log('Sending announcement:', announcement);
            
            // Reset form
            this.reset();
        });
    }
});

// Real-time Updates (using WebSocket in production)
function setupRealTimeUpdates() {
    // Simulate real-time updates
    setInterval(() => {
        // Update stats
        const randomChange = Math.floor(Math.random() * 5);
        // Update UI with new data
    }, 30000); // Every 30 seconds
}

// Initialize real-time updates
setupRealTimeUpdates();

// Member Management
function addNewMember() {
    // Would open a modal or redirect to member creation page
    showNotification('Opening member registration form...', 'success');
}

function editMember(memberId) {
    showNotification(`Editing member ${memberId}...`, 'success');
}

function deleteMember(memberId) {
    if (confirm('Are you sure you want to delete this member?')) {
        showNotification('Member deleted successfully', 'success');
    }
}

// Class Management
function createClass() {
    showNotification('Opening class creation form...', 'success');
}

function editClass(classId) {
    showNotification(`Editing class ${classId}...`, 'success');
}

function cancelClass(classId) {
    if (confirm('Are you sure you want to cancel this class? All booked members will be notified.')) {
        showNotification('Class cancelled. Notifications sent to all booked members.', 'success');
    }
}

// No-show Recovery
function handleNoShow(bookingId) {
    // Automated no-show recovery
    const recovery = {
        bookingId,
        actions: [
            'Send SMS reminder',
            'Offer rescheduling',
            'Add to waitlist for future classes'
        ]
    };
    
    showNotification('No-show recovery process initiated', 'success');
    console.log('No-show recovery:', recovery);
}

// Feedback Collection
function collectFeedback(memberId, classId) {
    // Automated feedback request
    const feedbackRequest = {
        memberId,
        classId,
        method: 'email',
        template: 'post-class-feedback'
    };
    
    console.log('Sending feedback request:', feedbackRequest);
    showNotification('Feedback request sent to member', 'success');
}

// ========================================
// Quick Action Functions
// ========================================

function newBooking() {
    window.location.href = 'booking.html';
}

function viewCalendar() {
    showNotification('Opening class calendar...', 'success');
    // Navigate to classes section
    document.querySelector('a[href="#classes"]').click();
}

function sendMessage() {
    showNotification('Opening messaging interface...', 'success');
    // Navigate to announcements section
    document.querySelector('a[href="#announcements"]').click();
}

function generateReports() {
    showNotification('Opening reports dashboard...', 'success');
    // Navigate to analytics section
    document.querySelector('a[href="#analytics"]').click();
}

function manageStaff() {
    showNotification('Opening staff management...', 'success');
}

function systemSettings() {
    showNotification('Opening system settings...', 'success');
    // Navigate to settings section
    document.querySelector('a[href="#settings"]').click();
}

// ========================================
// Select All Functionality for Tables
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.data-table tbody input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
});
