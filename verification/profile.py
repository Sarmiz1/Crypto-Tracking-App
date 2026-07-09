import asyncio
from playwright.async_api import async_playwright
import time

async def profile():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        render_logs = []

        def handle_console(msg):
            if msg.text.startswith("[RENDER]"):
                render_logs.append(msg.text)

        page.on("console", handle_console)

        try:
            print("Navigating to http://localhost:5173...")
            await page.goto("http://localhost:5173")
            await page.wait_for_selector("text=Market Cap", timeout=30000)
            print("--- Initial Load Done ---")

            await asyncio.sleep(5)
            render_logs.clear()

            trending_tab = page.get_by_role("tab", name="Trending")
            await trending_tab.click()

            await asyncio.sleep(2)

            print("--- After Tab Switch ---")
            print(f"Total Renders detected during tab switch: {len(render_logs)}")
            for log in render_logs:
                print(log)

            if any("MetricCardsContent" in log for log in render_logs):
                print("FAIL: MetricCardsContent re-rendered unnecessarily!")
            else:
                print("SUCCESS: MetricCardsContent did not re-render!")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(profile())
