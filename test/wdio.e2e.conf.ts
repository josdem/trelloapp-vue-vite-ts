import * as path from 'path'

import { config as baseConfig } from './wdio.conf'

export const config = {
    ...baseConfig,
    specs: ['./e2e/**/*'],
    services: [
        ...baseConfig.services || [],
        ['vite', {
            configFile: path.resolve(__dirname, '..', 'vite.config.ts'),
            configRoot: path.resolve(__dirname, '..')
        }]
    ]
}
