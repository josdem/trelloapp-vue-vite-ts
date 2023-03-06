import { config as baseConfig } from './wdio.conf'

import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import pluginEnv from 'vite-plugin-vue-env'
import tsconfigPaths from 'vite-tsconfig-paths'

import { createServer } from '../backend/index'
import constants from '../constants'

const { APP, SERVER } = constants

export const config = {
    ...baseConfig,
    specs: ['./unit/**/*.test.ts'],
    runner: ['browser', {
        viteConfig: () => ({
            define: {
                'process.env': {}
            },
            plugins: [
                vue(),
                svgLoader(),
                pluginEnv(),
                createServer(),
                tsconfigPaths({ extensions: ['.ts', '.d.ts'] })
            ],
            server: {
                port: APP,
                proxy: {
                    '^/api/.*': {
                        changeOrigin: true,
                        rewrite: path => path.replace(/^\/api/, ''),
                        target: `http://localhost:${SERVER}`
                    },
                    '^/socket.io/.*': {
                        changeOrigin: true,
                        target: `http://localhost:${SERVER}`,
                    }
                }
            }
        })
    }],
    mochaOpts: {
        ...baseConfig.mochaOpts,
        timeout: Infinity
    }
}