// ========================================
// AI Chatbot - Google Gemini Integration
// ========================================

// Google Gemini API Configuration
const GEMINI_API_KEY = typeof CONFIG !== 'undefined' && CONFIG.GEMINI_API_KEY ? CONFIG.GEMINI_API_KEY : 'AIzaSyAKGld_muZ1e0vfs30WFkZr83Eu_cQ7isA';
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// Gym Context for AI
const GYM_CONTEXT = `You are a helpful AI assistant for Vitality Fitness Tavistock, a gym in Tavistock, UK. Here's important information about the gym:

CONTACT INFO:
- Phone: +44 1822 366335
- Email: hello@vitalityfitnesstavistock.com
- Location: Tavistock, UK
- Instagram: @vft.tavistock

HOURS:
- 24/7 gym access for all members
- Staffed hours: Monday-Friday 6am-10pm, Saturday-Sunday 8am-8pm

MEMBERSHIPS:
1. Basic (£19.99/month): 24/7 gym access, free induction, members app
2. Premium (£34.99/month): Everything in Basic + unlimited sauna + all group classes
3. Elite (£49.99/month): Everything in Premium + 2 PT sessions/month + nutrition consultation + guest passes

CLASSES:
- Yoga & Pilates
- HIIT Training
- Spin Cycle
- Strength Training
- Cardio Blast
All classes included in Premium and Elite memberships. Can be booked online or via members app.

FACILITIES:
- Cardio machines (treadmills, bikes, rowers)
- Free weights and barbells
- Resistance machines
- Functional training area
- Premium sauna (Premium/Elite members)
- Stretching zone

PERSONAL TRAINERS:
- Certified trainers available
- Specialists in: Strength & Conditioning, Yoga & Wellness, Weight Loss & Nutrition
- Elite members get 2 free PT sessions/month
- Additional sessions can be booked separately

FEATURES:
- Free comprehensive gym induction for all new members
- Bespoke members app (book classes, track progress, manage membership)
- No joining fees
- Flexible cancellation (30 days notice)
- Accept all major cards, direct debit, bank transfers

IMPORTANT: Format your responses clearly with proper structure. Use line breaks for readability. When listing prices or options, present them in an organized manner. Keep responses concise (2-4 sentences) but well-formatted. Be friendly and helpful.`;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing chatbot...');
    
    // Direct approach - more reliable
    const toggle = document.getElementById('chatbotToggle');
    const chatbot = document.getElementById('chatbot');
    
    console.log('Chatbot toggle button:', toggle);
    console.log('Chatbot container:', chatbot);
    
    if (toggle && chatbot) {
        // Direct click handler
        toggle.addEventListener('click', function(e) {
            console.log('Toggle clicked!');
            e.preventDefault();
            e.stopPropagation();
            chatbot.classList.add('active');
            toggle.style.display = 'none';
            
            // Remove badge
            const badge = toggle.querySelector('.chatbot-badge');
            if (badge) badge.style.display = 'none';
        });
        
        console.log('Direct click handler attached');
    } else {
        console.error('ERROR: Required elements not found!');
        return;
    }
    
    initChatbot();
});

// Initialize Chatbot
function initChatbot() {
    console.log('initChatbot function called');
    
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbot = document.getElementById('chatbot');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotClear = document.getElementById('chatbotClear');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotInput = document.getElementById('chatbotInputField');
    const quickReplies = document.querySelectorAll('.quick-reply');
    
    console.log('Setting up chatbot event listeners...');
    
    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            console.log('Close button clicked');
            chatbot.classList.remove('active');
            chatbotToggle.style.display = 'flex';
        });
    }
    
    // Clear chat
    if (chatbotClear) {
        chatbotClear.addEventListener('click', function() {
            console.log('Clear chat clicked');
            const messagesContainer = document.getElementById('chatbotMessages');
            // Keep only the initial welcome message
            const firstMessage = messagesContainer.querySelector('.bot-message');
            messagesContainer.innerHTML = '';
            if (firstMessage) {
                messagesContainer.appendChild(firstMessage.cloneNode(true));
                // Re-attach quick reply listeners
                const newQuickReplies = messagesContainer.querySelectorAll('.quick-reply');
                newQuickReplies.forEach(reply => {
                    reply.addEventListener('click', function() {
                        const message = this.dataset.message;
                        if (chatbotInput) chatbotInput.value = message;
                        sendMessage();
                    });
                });
            }
        });
    }
    
    // Send message
    if (chatbotSend) {
        chatbotSend.addEventListener('click', () => sendMessage());
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Quick replies
    quickReplies.forEach(reply => {
        reply.addEventListener('click', function() {
            const message = this.dataset.message;
            if (chatbotInput) chatbotInput.value = message;
            sendMessage();
        });
    });
    
    console.log('Chatbot initialization complete!');
}

// Send Message Function
async function sendMessage() {
    const input = document.getElementById('chatbotInputField');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get AI response from Google Gemini
    try {
        const response = await getGeminiResponse(message);
        hideTypingIndicator();
        addMessage(response, 'bot');
    } catch (error) {
        console.error('Chatbot error:', error);
        hideTypingIndicator();
        addMessage("Sorry, I'm having technical difficulties. Please refresh the page and try again, or contact us at +44 1822 366335.", 'bot');
    }
}

// Get Response from Google Gemini AI
async function getGeminiResponse(userMessage) {
    const apiKey = typeof CONFIG !== 'undefined' && CONFIG.GEMINI_API_KEY ? CONFIG.GEMINI_API_KEY : GEMINI_API_KEY;
    const url = `${GEMINI_API_URL}?key=${apiKey}`;
    
    console.log('Using API key:', apiKey ? 'Key loaded' : 'No key found');
    console.log('API URL:', GEMINI_API_URL);
    
    const payload = {
        contents: [{
            parts: [{
                text: `${GYM_CONTEXT}\n\nUser question: ${userMessage}\n\nProvide a brief, helpful response (max 2-3 sentences). Be friendly and concise.`
            }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('❌ Gemini API Error:', error);
            throw new Error(`API failed: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ API Response:', data);
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid API response structure');
        }
    } catch (error) {
        console.error('Full error:', error);
        throw error;
    }
}

// Add Message to Chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const messageText = document.createElement('p');
    // Clean up text formatting and preserve line breaks
    const cleanText = text
        .replace(/\*\*/g, '') // Remove bold markdown
        .replace(/\*/g, '') // Remove italic markdown
        .replace(/\n\n/g, '\n') // Remove double line breaks
        .trim();
    
    // Split by newlines and create proper formatting
    const lines = cleanText.split('\n');
    messageText.innerHTML = lines.map(line => {
        line = line.trim();
        if (!line) return '';
        // Check if line is a list item or important info
        if (line.startsWith('-') || line.startsWith('•')) {
            return `<span style="display: block; margin: 2px 0;">${line}</span>`;
        }
        return `<span style="display: block; margin: 4px 0;">${line}</span>`;
    }).join('');
    
    content.appendChild(messageText);
    
    // Add action buttons for bot messages based on content
    if (sender === 'bot') {
        const lowerText = cleanText.toLowerCase();
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'chatbot-action-buttons';
        buttonsContainer.style.cssText = 'display: flex; gap: 0.5rem; margin-top: 0.75rem; flex-wrap: wrap;';
        
        let hasButtons = false;
        
        // Check for membership/pricing related content
        if (lowerText.includes('membership') || lowerText.includes('£') || lowerText.includes('price') || 
            lowerText.includes('basic') || lowerText.includes('premium') || lowerText.includes('elite') ||
            lowerText.includes('plan')) {
            const membershipBtn = createActionButton('View Plans', 'memberships.html');
            buttonsContainer.appendChild(membershipBtn);
            hasButtons = true;
        }
        
        // Check for classes related content
        if (lowerText.includes('class') || lowerText.includes('yoga') || lowerText.includes('hiit') || 
            lowerText.includes('spin') || lowerText.includes('training')) {
            const classesBtn = createActionButton('View Classes', '#classes');
            buttonsContainer.appendChild(classesBtn);
            hasButtons = true;
        }
        
        // Check for booking related content
        if (lowerText.includes('book') || lowerText.includes('schedule') || lowerText.includes('reserve')) {
            const bookBtn = createActionButton('Book Now', 'booking.html');
            buttonsContainer.appendChild(bookBtn);
            hasButtons = true;
        }
        
        // Check for contact related content
        if (lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('email') || 
            lowerText.includes('location') || lowerText.includes('hours')) {
            const contactBtn = createActionButton('Contact Us', '#contact');
            buttonsContainer.appendChild(contactBtn);
            hasButtons = true;
        }
        
        if (hasButtons) {
            content.appendChild(buttonsContainer);
        }
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Create action button
function createActionButton(text, link) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.cssText = `
        background: linear-gradient(135deg, #ff6b35, #f77f00);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    `;
    
    button.onmouseover = () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
    };
    
    button.onmouseout = () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    };
    
    button.onclick = () => {
        if (link.startsWith('#')) {
            // Close chatbot
            document.getElementById('chatbot').classList.remove('active');
            document.getElementById('chatbotToggle').style.display = 'flex';
            
            // Scroll to section
            setTimeout(() => {
                const target = document.querySelector(link);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        } else {
            // Navigate to page
            window.location.href = link;
        }
    };
    
    return button;
}

// Show Typing Indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// Add typing indicator styles
const chatbotStyle = document.createElement('style');
chatbotStyle.textContent = `
    .typing-dots {
        display: flex;
        gap: 4px;
        padding: 1rem;
        background-color: var(--text-white);
        border-radius: var(--radius-md);
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        background-color: var(--primary-color);
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
        }
        30% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(chatbotStyle);

// Backup - ensure chatbot opens even if other code fails
setTimeout(function() {
    const toggle = document.getElementById('chatbotToggle');
    const chatbot = document.getElementById('chatbot');
    
    if (toggle && chatbot && !toggle.dataset.handlerAttached) {
        console.log('Attaching backup handler');
        toggle.addEventListener('click', function() {
            console.log('Backup handler triggered!');
            chatbot.classList.add('active');
            toggle.style.display = 'none';
        });
        toggle.dataset.handlerAttached = 'true';
    }
}, 1000);
