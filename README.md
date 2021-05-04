Signs up to Yoga classes in the Tazman app. Also sends a telegram message (if chatId is configured as an env var).
This works for multiple users, which are separated by `;` in the env vars. 

## Environment Variables

DAYS // 0,2 (Will sign up to sunday, tuesday)
START_TIMES // 08:30,17:30
USERNAMES // ; separated tazman usernames
PASSWORDS // ; separated tazman password
CLIENT_NAMES // ; separated client names as appear in tazman
CLIENT_IDS // ; separated clientIds as configured in tazman
TELEGRAM_TOKEN // telegram token
TELEGRAM_CHAT_IDS // ; separated chatIds to send messages to