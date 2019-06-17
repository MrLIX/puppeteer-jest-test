const puppeteer = require('puppeteer')

let browser
let page
const TIMEOUT_INTERVAL = 10000

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


describe('Joel search', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_INTERVAL;

    test('get price', async () => {
        await page.goto('https://joel.tools/merch/')
        const price = await page.$eval('.price', div => div.textContent);
        expect(price).toBe("$50")
        await page.close()
    })

    test('chould pay', async () => {
        page = await browser.newPage()
        await page.goto('https://joel.tools/merch/')
        await page.click('select');
        await page.select('select', 'mug')
        await page.waitForNavigation()
        // await page.waitFor(1000)
        const h1 = await page.$eval('h1', div => div.textContent);
        const price = await page.$eval('.price', div => div.textContent);
        expect(h1).toBe("Mug")
        expect(price).toBe("$5")
        await page.close()
    })

    afterAll(async () => {
        await browser.close()
    })
})