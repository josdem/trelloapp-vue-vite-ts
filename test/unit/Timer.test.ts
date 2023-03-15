import { $, expect } from '@wdio/globals'
import './component/MyTimer'

function sleep (ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function setup () {
    const elem = document.createElement('my-timer')
    elem.setAttribute('duration', '7')
    document.body.appendChild(elem)
}

function teardown () {
    document.querySelector('my-timer')?.remove()
}

describe('Timer Shadow DOM Example', () => {
    beforeEach(setup)
    afterEach(teardown)

    /**
     * More docs for querying elements using the deep-selector can be found:
     * https://webdriver.io/docs/selectors#deep-selectors
     */
    it('should using deep shadow selector (>>>)', async () => {
        const timerClock = $('>>> span')

        const originalValue = await timerClock.getText()
        await $('>>> footer button:first-child').click()
        await sleep()
        await $('>>> footer button:first-child').click()
        await expect(timerClock).not.toHaveTextContaining(originalValue)
        await $('>>> footer button:last-child').click()
        await expect(timerClock).toHaveTextContaining(originalValue)
    })

    /**
     * More docs for querying elements using the shadow$ and shadow$$ command can be found:
     * https://webdriver.io/docs/api/element/shadow$
     * https://webdriver.io/docs/api/element/shadow$$
     */
    it('using shadow$ selector', async () => {
        const customElem = await $('my-timer')
        const originalValue = await customElem.getText()
        await customElem.shadow$('footer').$$('button')[0].click()
        await sleep()
        await customElem.shadow$('footer').$$('button')[0].click()
        await expect(customElem).not.toHaveText(originalValue)

        await customElem.shadow$('footer').$$('button')[1].click()
        await expect(customElem).toHaveText(originalValue)
    })
})
