from playwright.sync_api import Page, expect, sync_playwright
import time
import os

def test_homepage(page: Page):
    # Navigate to localhost:5173
    page.goto("http://localhost:5173")

    # Wait for the main page elements to load
    page.wait_for_selector("text=CoinVerse", timeout=15000)

    # Scroll down to reveal the cards and the table mid-way
    page.evaluate("window.scrollTo(0, 400)")
    time.sleep(5)

    # Take screenshot of the scrolled page
    os.makedirs("/app/verification", exist_ok=True)
    page.screenshot(path="/app/verification/verification_scrolled_mid.png")
    print("Scrolled mid screenshot taken!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_homepage(page)
        except Exception as e:
            print("Error occurred:", e)
        finally:
            browser.close()
