import { Readable } from 'node:stream'
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: {
        browserName: 'chrome',
        'wdio:devtoolsOptions': {  headless: true }
    },
    // logLevel: 'silent'
})

await browser.url('http://localhost:3000/board/1')

// const screenshot = Buffer.from(await browser.takeScreenshot(), 'base64')
// const stream = Readable.from(screenshot)
// stream.pipe(process.stdout)

await browser.$('aria/foobar').waitForExist()
const drag = await browser.$('aria/foobar')
const drop = await browser.$('aria/Hello 2')
await browser.pause(5000)
await browser.performActions([
    {
        id: 'action1',
        type: 'pointer',
        parameters: {
            pointerType: 'mouse'
        },
        actions: [
            {
                type: 'pointerMove',
                x: 0,
                y: 0,
                duration: 10,
                origin: {
                    'element-6066-11e4-a52e-4f735466cecf': drag.elementId
                }
            },
            {
                type: 'pause',
                duration: 10
            },
            {
                type: 'pointerDown',
                pressure: 1,
                tangentialPressure: 1,
                button: 0,
            },
            {
                type: 'pause',
                duration: 100
            },
            {
                type: 'pointerMove',
                x: 435,
                y: 435,
                button: 0,
                duration: 10,
                origin: 'viewport'
            },
            {
                type: 'pointerUp',
                button: 0,
                pressure: 0,
                tangentialPressure: 0
            },
            
            {
                type: 'pause',
                duration: 100
            },
        ]
    }
])

await browser.pause(5000)
await browser.deleteSession()