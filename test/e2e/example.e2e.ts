import { browser, $, $$, expect } from '@wdio/globals'

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

describe('An application using Shadow DOM', () => {
    describe('using deep shadow selector (>>>)', () => {
        beforeEach(async () => {
            await browser.url('https://lit.dev/playground/#sample=docs%2Fwhat-is-lit&view-mode=preview')

            const iframe = await $('>>> iframe[title="Project preview"]')
            await browser.waitUntil(async () => (
                (await iframe.getAttribute('src')) !== ''))
            
            await browser.switchToFrame(iframe)
            await browser.waitUntil(async () => (await $('my-timer').getText()) !== '')
        })

        it('should check the timer components to work', async () => {
            for (const customElem of await $$('my-timer')) {
                const originalValue = await customElem.getText()
                await customElem.$('>>> footer').$('span:first-child').click()
                await sleep()
                await customElem.$('>>> footer').$('span:first-child').click()
                await expect(customElem).not.toHaveTextContaining(originalValue)

                await customElem.$('>>> footer').$('span:last-child').click()
                await expect(customElem).toHaveTextContaining(originalValue)
            }
        })
    })

    describe('using shadow$ selector', () => {
        beforeEach(async () => {
            await browser.url('https://lit.dev/playground/#sample=docs%2Fwhat-is-lit&view-mode=preview')

            const iframe = await $('playground-preview').shadow$('iframe[title="Project preview"]')
            await browser.waitUntil(async () => (
                (await iframe.getAttribute('src')) !== ''))
            
            await browser.switchToFrame(iframe)
            await $('my-timer').waitForExist()
        })

        it('should check the timer components to work', async () => {
            for (const customElem of await $$('my-timer')) {
                const originalValue = await customElem.getText()
                await customElem.shadow$('footer span:first-child').click()
                await sleep()
                await customElem.shadow$('footer span:first-child').click()
                await expect(customElem).not.toHaveText(originalValue)

                await customElem.shadow$('footer span:last-child').click()
                await expect(customElem).toHaveText(originalValue)
            }
        })
    })
})

