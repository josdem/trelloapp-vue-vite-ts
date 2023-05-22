import { $, browser } from '@wdio/globals'

describe('Trello Application create dashboard', () => {
    before(async () => {
      await browser.url('http://localhost:3000')
    })

    it('validates expected board', async () => {
      await $('[data-cy="first-board"]').setValue('Vetlog')
    })
})