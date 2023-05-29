import constants from '../../constants'

describe("should validate partial text", () => {
    it('validate footer text', async () => {
        await browser.url(`http://localhost:${constants.APP}`)
        const text = "...powered by coffee and love ❤️  Filip Hric"
        await expect($('*=coffee and love')).toHaveText(text)
    })
})