from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Navigate to local Vite dev server
    page.goto("http://localhost:5173")
    page.wait_for_timeout(3000)

    # Scroll down to bring the coin table and sparklines into view
    page.evaluate("window.scrollTo(0, 500)")
    page.wait_for_timeout(2000)

    # Take a screenshot of the table with optimized sparkline charts
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
