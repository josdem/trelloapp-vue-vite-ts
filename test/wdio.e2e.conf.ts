import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as cp from 'node:child_process'
import { SevereServiceError } from 'webdriverio'

const EyesService = require('@applitools/eyes-webdriverio/service')

import { config as baseConfig } from './wdio.conf'

let viteServerProcess: cp.ChildProcess

/**
 * extend browser object with custom commands added by Applitools service
 */
declare global {
    namespace WebdriverIO {
        interface Browser {
            eyesGetAllTestResults: () => Promise<any>
            eyesCheck: (name: string) => Promise<unknown>
        }
    }
}

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

        /**
         * reset database
         */
        await fs.writeFile(
            path.join(__dirname, '..', 'backend', 'data', 'database.json'),
            JSON.stringify({ boards: [], cards: [], lists: [], users: [] })
        )
    },
    after: () => {
        if (viteServerProcess) {
            viteServerProcess.kill()
        }
    }
}
