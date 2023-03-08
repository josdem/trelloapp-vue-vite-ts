import { expect, $, $$, browser } from '@wdio/globals'
import { Key } from 'webdriverio'

describe('Trello Application', () => {
  before(async () => {
    await browser.url('/')
  })

  it('can create an initial board', async () => {
    await $('aria/Name of your first board').setValue('Let the Engineers Speak')
    await browser.keys(Key.Enter)
    await expect(browser).toHaveUrlContaining('/board/1')
    
    await browser.eyesCheck('Empty board')
  })

  it('can add a list on the board', async () => {
    await $('aria/Enter list title...').setValue('Talking Points')
    await $('aria/Add list').click()

    /**
     * Select element by JS function as it is much more perfomant this way
     * (1 roundtrip vs nth roundtrips)
     */
    await expect($(() => (
      [...document.querySelectorAll('input')]
        .find((input) => input.value === 'Talking Points')
    )))
  })

  it('can add a card to the list', async () => {
    await $('aria/Add another card').click()
    await $('aria/Enter a title for this card...').addValue('Selectors')
    await browser.keys(Key.Enter)
    await expect($$('div[data-cy="card"]')).toBeElementsArrayOfSize(1)
    await $('aria/Enter a title for this card...').addValue('Shadow DOM')
    await browser.keys(Key.Enter)
    await $('aria/Enter a title for this card...').addValue('Visual Testing')
    await browser.keys(Key.Enter)
    await expect($$('div[data-cy="card"]')).toBeElementsArrayOfSize(3)

    await browser.eyesCheck('board with items')
  })

  it('can close adding more cards', async () => {
    await $('aria/Add card').nextElement().click()
    await expect($('aria/Add card')).not.toBePresent()
  })

  it('can star the board', async () => {
    const startBtn = $('aria/Let the Engineers Speak').parentElement().nextElement()
    await startBtn.click()
    await expect(startBtn).toHaveStyle({ color: 'rgba(253,224,71,1)' })
  })

  it('can delete a board', async () => {
    await $('aria/Let the Engineers Speak').parentElement().nextElement().nextElement().click()
    await $('aria/Delete board').click()
    await browser.refresh()
    await expect($('aria/Get started!')).toBePresent()
    
    await browser.eyesCheck('after board deletion')
  })

  it('can find links with partial or full text selector', async () => {
    const linkText = '...powered by coffee and love ❤️  Filip Hric'
    await expect($(`=${linkText}`)).toHaveText(linkText)
    await expect($('*=coffee and love')).toHaveText(linkText)
  })
})

after(async () => {
  const results = await browser.eyesGetAllTestResults()
  console.log(results)
})