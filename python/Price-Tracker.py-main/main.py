import asyncio
from datetime import datetime
from dotenv import load_dotenv
import os
import pandas as pd
from telegram import Bot
from crypto_prices import get_crypto_prices
from currency_prices import get_currency_prices
from time_date import get_time_date

load_dotenv()
TOKEN = os.getenv("TOKEN")
CHAT_ID = os.getenv("CHAT_ID")

bot = Bot(token=TOKEN)


def build_message():
    crypto_prices = get_crypto_prices()
    currency_prices = get_currency_prices()
    time_date = get_time_date()
    all_prices = {**crypto_prices, **currency_prices}

    # -------------------------------------------------------------------------------------------
    data = {"DateTime": [time_date]}
    for name, price in all_prices.items():
        data[name] = [price]

    df = pd.DataFrame(data)

    file_path = "currencies.csv"
    if os.path.exists(file_path):
        df.to_csv(file_path, mode="a", index=False, header=False)
    else:
        df.to_csv(file_path, mode="w", index=False, header=True)
    # -------------------------------------------------------------------------------------------

    lines = [time_date, "_" * 21]
    for name in sorted(all_prices):
        lines.append(f"{name}: {all_prices[name]}")
    return "\n".join(lines)


async def send_message_once():
    message = build_message()
    try:
        await bot.send_message(chat_id=CHAT_ID, text=message)
        print(f"Message sent at {datetime.now()}")
    except Exception as e:
        print("Error sending message:", e)


if __name__ == "__main__":
    asyncio.run(send_message_once())
