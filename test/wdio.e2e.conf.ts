import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as cp from 'node:child_process'

const EyesService = require('@applitools/eyes-webdriverio/service')

import { config as baseConfig } from './wdio.conf'

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

export const config = { ...baseConfig }

/**
 * apply configuration for Applitools example
 */
if (process.argv.find((arg) => arg.includes('applitools.e2e.ts'))) {
    config.services?.push([EyesService, {
        viewportSize: {width: 1200, height: 800},
        batch: {name: 'WebdriverIO Test'},
        useVisualGrid: true,
        browsersInfo: [
            {width: 1200, height: 800, name: 'chrome'},
            {width: 1200, height: 800, name: 'firefox'}
        ]
    }])

    let viteServerProcess: cp.ChildProcess
    config.before = async () => {
        const { browser } = await import('@wdio/globals')
        browser.options.baseUrl = 'http://localhost:3000'
        
        /**
         * use this to start Vite server until https://github.com/vitejs/vite/issues/12313 is resolved
         */
        viteServerProcess = cp.exec(
            'npx vite',
            { cwd: path.join(__dirname, '..') }
        )

        /**
         * reset database
         */
        await fs.writeFile(
            path.join(__dirname, '..', 'backend', 'data', 'database.json'),
            JSON.stringify({ boards: [], cards: [], lists: [], users: [] })
        )

        /**
         * wait for the Vite server to be started and
         * the website to be accessible
         */
        await browser.waitUntil(
            () => browser.url('/').then(() => true, () => false),
            { interval: 1000 }
        )
    }

    config.after = () => {
        if (viteServerProcess) {
            viteServerProcess.kill()
        }
    }
}
