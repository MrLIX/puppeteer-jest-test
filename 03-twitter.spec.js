const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');
require('dotenv').config()

let browser
let page
const TIMEOUT_INTERVAL = 1000000

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


describe('Twitter', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_INTERVAL;

    test('login', async () => {
        await page.goto('https://twitter.com/login')
        // await page.emulate(devices['iPhone 6'])
        // +100 devices

        // email
        await page.waitForSelector('input[name="session[username_or_email]"]');
        await page.type('input[name="session[username_or_email]"]', process.env.TWITTER_USERNAME);
        // password
        await page.keyboard.down("Tab");
        await page.keyboard.type(process.env.PASS);
        await page.keyboard.down("Tab");
        // submit
        await page.keyboard.press('Enter')
        await page.waitForNavigation()
        await page.waitFor(1000)
        const title = await page.title()
        expect(title).toBe("Твиттер")
        await page.close()
    })

    test('first tweet', async () => {
        page = await browser.newPage()
        await page.goto('https://twitter.com')
        await page.waitFor(1000)
        await page.type('#tweet-box-home-timeline', 'My first tweet on Puppeteer')
        await page.click('.tweet-action');
        await page.waitFor(1000)
        const tweet = await page.$eval('p.tweet-text', el => el.textContent);
        expect(tweet).toBe("My first tweet on Puppeteer")
        await page.close()
    })

    test('ckeck offline list', async () => {
        page = await browser.newPage()
        await page.goto('https://twitter.com')
        await page.setOfflineMode(true)
        const tweet = await page.waitForSelector('.tweet-text');
        expect(tweet).toBeTruthy()
        await page.close()
    })


    afterAll(async () => {
        await browser.close()
    })
})