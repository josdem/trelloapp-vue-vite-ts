import { $, browser } from '@wdio/globals'

describe('Trello Application', () => {
    before(async () => {
      await browser.url('http://localhost:3000')
    })

    it('validates expected board', async () => {
      //Select by component - Never: Too generic no context.
      //await $('input').setValue('My Board')

      //Select by class - Never: Coupled to syle.
      await $('.px-2.mt-4.w-full.h-8.bg-white.rounded-sm.border-2').setValue('My Board')
    })
})