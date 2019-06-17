const puppeteer = require('puppeteer')

let browser
let page
const TIMEOUT_INTERVAL = 100000

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
})


describe('Google Homepage', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_INTERVAL;

    test('has title "Google"', async () => {
        await page.goto('https://google.com')
        const title = await page.title()
        expect(title).toBe('Google')
        await page.close()
    })

    test('Google search', async () => {
        page = await browser.newPage()
        await page.goto('https://google.com')
        await page.waitForSelector('input[name="q"]', { visible: true })
        await page.type('input[name="q"]', 'Uzbekistan')
        await page.keyboard.press('Enter')
        // await page.click('input[type="submit"]')
        await page.waitForNavigation()
        // await page.waitFor(1000)
        const title = await page.title()
        expect(title).toBe('Uzbekistan - Поиск в Google')
        await page.close()
    })

    afterAll(async () => {
        await browser.close()
    })
})
