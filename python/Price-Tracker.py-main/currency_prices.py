import requests
from bs4 import BeautifulSoup


def get_currency_prices():
    urls = {
        "US Dollar": "https://www.tgju.org/profile/price_dollar_rl",
        "CAD Dollar": "https://www.tgju.org/profile/price_cad",
        "Euro": "https://www.tgju.org/profile/price_eur",
        "Pound": "https://www.tgju.org/profile/price_gbp",
    }

    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    prices = {}
    for key, url in urls.items():
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, "html.parser")

        rows = soup.select("table tbody tr")
        for row in rows:
            cells = row.find_all("td")
            if len(cells) >= 2:
                title = cells[0].get_text(strip=True)
                value = cells[1].get_text(strip=True)
                if title == "نرخ فعلی":
                    value = value.replace(",", "")
                    if value.isdigit():
                        value = str(int(value) // 10)
                        value = "{:,}".format(int(value))
                    prices[key] = value
                    break
    return prices