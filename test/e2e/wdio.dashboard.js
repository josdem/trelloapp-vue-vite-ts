import { $, browser, expect } from '@wdio/globals'
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
      await expect($('[data-cy="new-card"]')).toBePresent()
    })

    it('adds cards to the list', async () => {
      await $('[data-cy="new-card"]').click()
      await $('aria/Enter a title for this card...').setValue('Almond Milk')
      await browser.keys(Key.Enter)
      await expect($$('div[data-cy="card"]')).toBeElementsArrayOfSize(1)
      await $('aria/Enter a title for this card...').addValue('Brussel Sprouts')
      await browser.keys(Key.Enter)
      await $('aria/Enter a title for this card...').addValue('Asparagus')
      await browser.keys(Key.Enter)
      await expect($$('div[data-cy="card"]')).toBeElementsArrayOfSize(3)
    })

    it('can delete a board', async () => {
      await $('[data-cy="list-options"]').click()
      await $('[data-cy="delete-list"]').click()
      await expect($('[data-cy="create-list"]')).toBePresent()
    })
  
})