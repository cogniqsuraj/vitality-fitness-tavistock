// ========================================
// Booking System JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initBookingTabs();
    initCalendar();
    initClassBooking();
    initPTBooking();
    initInductionBooking();
    initBookingModal();
});

// Tab Management
function initBookingTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Calendar Initialization
function initCalendar() {
    const calendarDates = document.getElementById('calendarDates');
    const calendarMonth = document.getElementById('calendarMonth');
    const prevBtn = document.querySelector('.calendar-prev');
    const nextBtn = document.querySelector('.calendar-next');
    
    if (!calendarDates) return;
    
    let currentDate = new Date();
    let selectedDate = null;
    
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Set month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        calendarMonth.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Clear calendar
        calendarDates.innerHTML = '';
        
        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-date other-month';
            dayDiv.textContent = daysInPrevMonth - i;
            calendarDates.appendChild(dayDiv);
        }
        
        // Current month days
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-date';
            dayDiv.textContent = day;
            
            const currentDay = new Date(year, month, day);
            
            // Mark today
            if (currentDay.toDateString() === today.toDateString()) {
                dayDiv.classList.add('today');
            }
            
            // Disable past dates
            if (currentDay < today && currentDay.toDateString() !== today.toDateString()) {
                dayDiv.classList.add('disabled');
            } else {
                dayDiv.addEventListener('click', function() {
                    document.querySelectorAll('.calendar-date').forEach(d => d.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedDate = new Date(year, month, day);
                    updateBookingSummary('date', formatDate(selectedDate));
                    loadClassesForDate(selectedDate);
                });
            }
            
            calendarDates.appendChild(dayDiv);
        }
        
        // Next month days
        const totalCells = calendarDates.children.length;
        const remainingCells = 42 - totalCells; // 6 rows * 7 days
        for (let i = 1; i <= remainingCells; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-date other-month';
            dayDiv.textContent = i;
            calendarDates.appendChild(dayDiv);
        }
    }
    
    prevBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });
    
    nextBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
    
    // Initial render
    renderCalendar(currentDate);
}

// Update Booking Summary
function updateBookingSummary(field, value) {
    const summaryElements = {
        date: document.getElementById('selectedDate'),
        class: document.getElementById('selectedClass'),
        time: document.getElementById('selectedTime'),
        spots: document.getElementById('availableSpots')
    };
    
    if (summaryElements[field]) {
        summaryElements[field].textContent = value;
        
        if (field === 'spots') {
            const spotsNum = parseInt(value);
            if (spotsNum <= 5) {
                summaryElements[field].classList.add('limited');
            } else {
                summaryElements[field].classList.remove('limited');
            }
        }
    }
}

// Load Classes for Selected Date
function loadClassesForDate(date) {
    const classesList = document.getElementById('classesList');
    const dayOfWeek = date.getDay();
    
    // Show all classes by default (in real app, would filter by date)
    const allSlots = classesList.querySelectorAll('.class-slot');
    allSlots.forEach(slot => {
        slot.style.display = 'grid';
    });
}

// Class Booking
function initClassBooking() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const classSlots = document.querySelectorAll('.class-slot');
    const bookBtns = document.querySelectorAll('.book-btn');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            classSlots.forEach(slot => {
                if (filter === 'all' || slot.dataset.class === filter) {
                    slot.style.display = 'grid';
                } else {
                    slot.style.display = 'none';
                }
            });
        });
    });
    
    // Book button functionality
    bookBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const classSlot = this.closest('.class-slot');
            const className = classSlot.querySelector('h4').textContent;
            const classTime = classSlot.dataset.time;
            const spots = classSlot.dataset.spots;
            
            updateBookingSummary('class', className);
            updateBookingSummary('time', formatTime(classTime));
            updateBookingSummary('spots', spots);
            
            openBookingModal({
                type: 'class',
                name: className,
                time: classTime,
                spots: spots
            });
        });
    });
}

// Personal Training Booking
function initPTBooking() {
    const trainerBtns = document.querySelectorAll('.select-trainer-btn');
    
    trainerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const trainerName = this.dataset.trainer;
            
            openBookingModal({
                type: 'personal-training',
                trainer: trainerName
            });
        });
    });
}

// Induction Booking
function initInductionBooking() {
    const timeBtns = document.querySelectorAll('.time-btn:not(.disabled)');
    
    timeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected from all buttons
            timeBtns.forEach(b => b.classList.remove('selected'));
            
            // Add selected to clicked button
            this.classList.add('selected');
            
            const day = this.dataset.day;
            const time = this.dataset.time;
            
            openBookingModal({
                type: 'induction',
                day: day,
                time: formatTime(time)
            });
        });
    });
}

// Booking Modal
let currentBookingData = {};

function initBookingModal() {
    const modal = document.getElementById('bookingModal');
    const successModal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBooking');
    const bookingForm = document.getElementById('bookingForm');
    const closeSuccess = document.getElementById('closeSuccess');
    const addToCalendar = document.getElementById('addToCalendar');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    cancelBtn.addEventListener('click', () => closeModal(modal));
    closeSuccess.addEventListener('click', () => closeModal(successModal));
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Form submission
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm(this)) {
            showNotification('Please fill in all required fields correctly', 'error');
            return;
        }
        
        const formData = {
            name: document.getElementById('bookingName').value,
            email: document.getElementById('bookingEmail').value,
            phone: document.getElementById('bookingPhone').value,
            memberId: document.getElementById('bookingMemberId').value,
            notes: document.getElementById('bookingNotes').value,
            reminder: document.getElementById('bookingReminder').checked,
            ...currentBookingData
        };
        
        // Show loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Processing...';
        submitBtn.disabled = true;
        
        try {
            const result = await API.bookClass(formData);
            
            if (result.success) {
                closeModal(modal);
                showSuccessModal(formData, result.bookingId);
                
                // Send reminder if requested
                if (formData.reminder) {
                    await API.sendReminder(result.bookingId, 'sms');
                }
                
                // Reset form
                bookingForm.reset();
            }
        } catch (error) {
            showNotification('Booking failed. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Add to calendar
    addToCalendar.addEventListener('click', function() {
        const booking = currentBookingData;
        const event = {
            title: booking.name || 'Gym Session',
            description: `Booking at Vitality Fitness Tavistock`,
            location: 'Vitality Fitness Tavistock, Tavistock, UK',
            start: new Date(), // Should be actual booking date/time
            duration: 60 // minutes
        };
        
        // Create iCal file
        const icsContent = generateICS(event);
        downloadICS(icsContent, 'vft-booking.ics');
    });
}

function openBookingModal(bookingData) {
    currentBookingData = bookingData;
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showSuccessModal(bookingData, bookingId) {
    const modal = document.getElementById('successModal');
    const detailsDiv = document.getElementById('successDetails');
    
    let bookingType = '';
    let bookingDetails = '';
    
    if (bookingData.type === 'class') {
        bookingType = 'Class Booking';
        bookingDetails = `
            <p><strong>Class:</strong> ${bookingData.name}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
        `;
    } else if (bookingData.type === 'personal-training') {
        bookingType = 'Personal Training Session';
        bookingDetails = `<p><strong>Trainer:</strong> ${bookingData.trainer}</p>`;
    } else if (bookingData.type === 'induction') {
        bookingType = 'Free Induction';
        bookingDetails = `
            <p><strong>Day:</strong> ${bookingData.day}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
        `;
    }
    
    detailsDiv.innerHTML = `
        <h4>${bookingType}</h4>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Name:</strong> ${bookingData.name}</p>
        <p><strong>Email:</strong> ${bookingData.email}</p>
        ${bookingDetails}
        ${bookingData.reminder ? '<p class="reminder-note"><i class="fas fa-bell"></i> You will receive a reminder 1 hour before your session</p>' : ''}
    `;
    
    modal.classList.add('active');
    
    // Store booking in localStorage
    const bookings = StorageHelper.get('bookings') || [];
    bookings.push({
        id: bookingId,
        date: new Date().toISOString(),
        ...bookingData
    });
    StorageHelper.set('bookings', bookings);
}

// Generate ICS file for calendar
function generateICS(event) {
    const startDate = new Date(event.start);
    const endDate = new Date(startDate.getTime() + event.duration * 60000);
    
    function formatICSDate(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }
    
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vitality Fitness Tavistock//Booking//EN
BEGIN:VEVENT
UID:${Date.now()}@vitalityfitnesstavistock.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
}

function downloadICS(content, filename) {
    const blob = new Blob([content], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Add reminder note style
const style = document.createElement('style');
style.textContent = `
    .reminder-note {
        margin-top: 1rem;
        padding: 0.75rem;
        background-color: #fff3cd;
        border-left: 4px solid #ffc107;
        border-radius: 4px;
        color: #856404;
    }
    
    .reminder-note i {
        margin-right: 0.5rem;
    }
`;
document.head.appendChild(style);
