import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 900})

        print("Navigating to dashboard...")
        page.goto("http://localhost:5173/dashboard", timeout=30000)
        time.sleep(2)

        # Scroll to ETF Net Flow header
        etf_header = page.locator("text=Crypto ETFs Net Flow")
        etf_header.scroll_into_view_if_needed()
        time.sleep(1)

        # Click 1Y tab
        tabs_1y = page.locator("button:has-text('1Y')")
        if tabs_1y.count() > 0:
            tabs_1y.first.click()
            time.sleep(1)

        page.screenshot(path="verification/dashboard_etf_flow.png", full_page=False)
        print("Captured verification/dashboard_etf_flow.png centered on ETF Net Flow")

        browser.close()

if __name__ == "__main__":
    run()
