# Vitality Fitness Tavistock - Website Project

## Overview
A modern, fully-featured gym website built with plain HTML, CSS, and JavaScript for Vitality Fitness Tavistock. This project includes comprehensive booking systems, AI chatbot, admin dashboard, and automated member management features.

## Business Information
- **Name:** Vitality Fitness Tavistock
- **Website:** https://vft.clubright.co.uk/Account/LogIn?ReturnUrl=%2FMemberArea%2FIndex
- **Email:** hello@vitalityfitnesstavistock.com
- **Phone:** +44 1822 366335
- **Instagram:** @vft.tavistock
- **Location:** Tavistock, UK

## Features Implemented

### A. Website & Reservation Automation
✅ Modern, responsive design spotlighting services and membership tiers
✅ Clear CTAs ("Join Now," "Book Class," "Book Free Induction")
✅ Online booking system for classes, personal training, and inductions
✅ Real-time availability display for all sessions
✅ Member reviews and success stories showcase
✅ Mobile-first responsive design

### B. AI & Automation
✅ **AI Chatbot** - Instant answers for:
  - Opening hours (24/7 access)
  - Membership pricing and packages
  - Class schedules and descriptions
  - Personal trainer availability
  - General inquiries
  - Contact information

✅ **Automated Booking System**
  - Confirmation emails (simulated)
  - SMS/WhatsApp reminders (simulated)
  - No-show recovery system
  - Calendar integration (.ics file download)

✅ **Admin Dashboard**
  - Class check-in management
  - Staff announcements system
  - Booking analytics and reporting
  - Member management
  - Real-time statistics
  - Peak hours analysis

✅ **Feedback Collection**
  - Post-class review prompts
  - Automated feedback requests

## Project Structure

```
Vitality Fitness Tavistock/
├── index.html              # Homepage
├── booking.html            # Booking system (classes, PT, inductions)
├── memberships.html        # Membership plans
├── contact.html            # Contact page
├── member-area.html        # Member dashboard
├── admin-dashboard.html    # Staff operations dashboard
├── css/
│   ├── styles.css         # Main stylesheet
│   ├── booking.css        # Booking page styles
│   └── dashboard.css      # Dashboard styles
└── js/
    ├── main.js            # Core functionality
    ├── booking.js         # Booking system logic
    ├── chatbot.js         # AI chatbot functionality
    └── dashboard.js       # Dashboard functionality
```

## Key Pages

### 1. Homepage (index.html)
- Hero section with key features
- About section
- Features showcase (24/7 access, sauna, classes, app)
- Class previews
- Membership tiers
- Member reviews
- CTA sections

### 2. Booking System (booking.html)
- **Three booking types:**
  - Group Classes (with calendar and real-time availability)
  - Personal Training (trainer selection)
  - Free Induction (time slot selection)
- Interactive calendar
- Class filtering
- Booking confirmation modal
- Automated reminders option
- Add to calendar functionality

### 3. Admin Dashboard (admin-dashboard.html)
- Overview with key statistics
- Today's class schedule with check-in
- Booking management
- Member management
- Analytics and reports
- Announcement system
- Quick actions

### 4. Member Area (member-area.html)
- Personal dashboard
- Upcoming bookings
- Membership details
- Activity history
- Quick booking access

## AI Chatbot Features
The chatbot can answer questions about:
- Opening hours
- Membership prices and features
- Available classes
- Personal training
- Sauna access
- Member app
- Booking procedures
- Contact information
- Equipment and facilities

## Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Custom styles (no frameworks like Tailwind)
  - CSS Variables for theming
  - Flexbox & Grid layouts
  - Animations and transitions
  - Fully responsive design
- **JavaScript (Vanilla)** - No external dependencies
  - DOM manipulation
  - Event handling
  - Form validation
  - Local storage
  - Modal management
  - Dynamic content

## Installation & Setup

1. **Clone or download the project**
   ```bash
   git clone [repository-url]
   ```

2. **Open in a web browser**
   - Simply open `index.html` in any modern web browser
   - No build process required
   - No server needed (static files)

3. **For development**
   - Use VS Code with Live Server extension, or
   - Use any local web server (Python, Node.js, etc.)

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints
- Desktop: > 968px
- Tablet: 641px - 968px
- Mobile: < 640px

## Future Enhancements (Production Ready)
To make this production-ready, you would need to:

1. **Backend Integration**
   - Replace API mock functions with real endpoints
   - Database for members, bookings, classes
   - Authentication system
   - Payment gateway integration

2. **Email/SMS Integration**
   - SendGrid or similar for emails
   - Twilio for SMS notifications
   - WhatsApp Business API

3. **Analytics**
   - Google Analytics integration
   - Custom tracking dashboard
   - Conversion tracking

4. **Security**
   - SSL certificate
   - User authentication
   - Data encryption
   - GDPR compliance

5. **CMS Integration**
   - WordPress, Strapi, or custom CMS
   - Content management for classes
   - Blog functionality

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #ff6b35;
    --secondary-color: #004e89;
    --accent-color: #f77f00;
    /* ... */
}
```

### Content
- Edit HTML files directly
- Update chatbot responses in `js/chatbot.js`
- Modify class schedules in `booking.html`

### Images
- Replace placeholder images in HTML
- Add images to `assets/images/` folder (create if needed)

## Support
For questions or issues:
- Email: hello@vitalityfitnesstavistock.com
- Phone: +44 1822 366335

## License
© 2025 Vitality Fitness Tavistock. All rights reserved.
Powered by Cogniq

---

**Note:** This is a demonstration website. API calls are simulated. For production use, integrate with real backend services, payment processors, and notification systems.
