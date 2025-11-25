# Vitality Fitness Tavistock

## API Key Setup

**IMPORTANT:** For security reasons, the API key is stored in `js/config.js` which is gitignored.

### Setup Instructions:

1. Get your Google Gemini API key from: https://aistudio.google.com/apikey
2. Update the API key in `js/config.js`:
   ```javascript
   const CONFIG = {
       GEMINI_API_KEY: 'your_api_key_here'
   };
   ```

### Note:
The `config.js` file is already created locally but won't be pushed to GitHub to prevent API key exposure.

For production deployment, use environment variables or a secure backend service instead of client-side API keys.
