const puppeteer = require('puppeteer')

let browser
let page
let context
const TIMEOUT_INTERVAL = 10000

beforeAll(async () => {
    browser = await  puppeteer.launch()
    context = browser.createIncognitoBrowserContext();
})

describe('Geolocation', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_INTERVAL;

    test('Set another Location', async () => {
        await context.overridePermissions('https://joel.tools/', ['geolocation']);
        page = context.newPage()
        await page.setGeolocation({
            latitude: 51.50,
            longitude: -0.12
        })
        await page.goto('https://joel.tools/merch/')
        const price = await page.$eval('.price', div => div.textContent);
        expect(price).toBe("£40")
        await page.close()
    })

    afterAll(async () => {
        await browser.close()
    })
})