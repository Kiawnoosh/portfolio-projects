# Price Tracker Bot

A Telegram bot that fetches and sends real-time currency and cryptocurrency prices.

## Features

- Live exchange rates (USD, EUR, GBP, CAD) via web scraping
- Crypto prices (Bitcoin, Tether) via Bitpin API
- Saves price history to CSV
- Sends formatted report to Telegram

## Tech Stack

- Python
- requests, BeautifulSoup, pandas, python-telegram-bot

## Setup

1. Install dependencies:

```bash
   python -m pip install requests beautifulsoup4 pandas python-telegram-bot python-dotenv
```

2. Create `.env` file:
   TOKEN=your_telegram_bot_token
   CHAT_ID=your_chat_id

3. Run:

```bash
   python main.py
```
