const puppeteer = require('puppeteer')

let browser
let page
let originalTimeout;
beforeAll(async () => {
    browser = await  puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false,
        slowMo: 60,
        defaultViewport: {
            width: 1024,
            height: 800
        }
    })
    page = await browser.newPage()
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1900000000;
})
afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

describe('Google Homepage', () => {
    test('has title "Google"', async () => {
        await page.goto('https://google.com', {waitUntil: 'networkidle0'})
        const title = await page.title()
        expect(title).toBe('Google')
    })

    afterAll(async () => {
        await browser.close()
    })
})
