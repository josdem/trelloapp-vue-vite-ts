import { $, browser } from '@wdio/globals'

describe('Trello Application', () => {
    before(async () => {
      await browser.url('http://localhost:3000')
    })

    it('validates expected board', async () => {
      (await $('h1 data-v-73316130')).isExisting()
    })
})