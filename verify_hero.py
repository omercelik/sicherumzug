from playwright.sync_api import sync_playwright
import time
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # Desktop
    context = browser.new_context(viewport={"width": 1280, "height": 800})
    page = context.new_page()
    page.goto("http://127.0.0.1:4000")
    # Wait for the images and fonts to load
    page.wait_for_load_state("networkidle")
    time.sleep(2)
    page.screenshot(path="verification_desktop.png")
    context.close()

    # Mobile
    context = browser.new_context(viewport={"width": 375, "height": 667})
    page = context.new_page()
    page.goto("http://127.0.0.1:4000")
    # Wait for the images and fonts to load
    page.wait_for_load_state("networkidle")
    time.sleep(2)
    page.screenshot(path="verification_mobile.png")
    context.close()

    browser.close()
