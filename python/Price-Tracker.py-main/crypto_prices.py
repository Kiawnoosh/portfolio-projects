import requests


def get_crypto_prices():
    url = "https://api.bitpin.org/api/v1/mkt/tickers/"
    response = requests.get(url)
    data = response.json()
    prices = {}
    for index, currency in [(2, "Tether"), (0, "Bitcoin")]:
        price = int(float(data[index]["price"]))
        formatted_price = f"{price:,}"
        prices[currency] = formatted_price
    return prices
