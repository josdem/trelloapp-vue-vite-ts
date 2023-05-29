import { $, browser } from '@wdio/globals'

describe('Trello Application show selectors', () => {
    before(async () => {
      await browser.url('http://localhost:3000')
    })

    it('validates different selector types', async () => {
      //Select by component - Never: Too generic no context.
      //await $('input').setValue('My Board')

      //Select by class - Never: Coupled to syle.
      //await $('.px-2.mt-4.w-full.h-8.bg-white.rounded-sm.border-2').setValue('My Board')

      //Select by query selector - Sparingly: Difficult to write.
      //await $(() => document.querySelector('input')).setValue('My Board')

      //Select by id - Sparingly: Better than class but still coupled to style or JS events.
      //await $('#board-input').setValue('My Board')

      //Select by name - Sparingly: Coupled to the name attribute which has HTML semantics.
      //await $('[name="newBoard"]').setValue('My Board')

      //Select by custom data attribute - Good: Decoupled and not connected to a11y
      //await $('[data-cy="first-board"]').setValue('My Board')

      //Select by a11y selector - Best: Resembles how the user interacts with the page
      (await $('aria/Name of your first board')).setValue('My Board')
    })
})