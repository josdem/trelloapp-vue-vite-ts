import * as path from 'node:path'
import * as cp from 'node:child_process'
import { BrowserType, ScreenOrientation, DeviceName } from '@applitools/eyes-webdriverio'

// @ts-expect-error
import * as EyesService from '@applitools/eyes-webdriverio/service'

import { config as baseConfig } from './wdio.conf'


let viteServerProcess: cp.ChildProcess

export const config = {
    ...baseConfig,
    specs: ['./e2e/**/*'],
    services: [
        ...baseConfig.services || [],
        [EyesService, {
            viewportSize: {width: 1200, height: 800},
            batch: {name: 'WebdriverIO Test'},
            useVisualGrid: true,
            browsersInfo: [
                {width: 1200, height: 800, name: 'chrome'},
                {width: 1200, height: 800, name: 'firefox'}
            ]
        }]
    ],
    /**
     * use this to start Vite server until https://github.com/vitejs/vite/issues/12313 is resolved
     */
    before: async () => {
        const { browser } = await import('@wdio/globals')
        browser.options.baseUrl = 'http://localhost:3000'
        
        viteServerProcess = cp.exec(
            'npx vite',
            { cwd: path.join(__dirname, '..') }
        )
        await browser.pause(1000)
    },
    after: () => {
        if (viteServerProcess) {
            viteServerProcess.kill()
        }
    }
}
