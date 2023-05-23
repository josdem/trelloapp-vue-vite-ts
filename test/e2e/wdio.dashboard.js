import { $, browser } from '@wdio/globals'
import { Key } from 'webdriverio'

describe('Trello Application create dashboard', () => {
    before(async () => {
      await browser.url('http://localhost:3000')
    })

    it('creates initial board', async () => {
      await $('[data-cy="first-board"]').setValue('Vetlog')
      await browser.keys(Key.Enter)
      await expect(browser).toHaveUrlContaining('/board/1')
    })

    it('creates a list on the board', async () => {
      await $('[data-cy="add-list-input"]').setValue('Add a shopping list')
      await $('aria/Add list').click()
      //Validates this element is present on the page
      $('[data-cy="new-card"]')
    })
})