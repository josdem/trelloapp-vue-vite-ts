describe("should validate partial text", () => {
    it('validate footer text', async () => {
        browser.url('http://localhost:3000/')
        const text = "...powered by coffee and love ❤️  Filip Hric"
        await expect($('*=coffee and love')).toHaveText(text)
    })
})