const resolveConfig = require('tailwindcss/resolveConfig')
const tailwindConfig = require('../../tailwind.config.js')

const fullConfig = resolveConfig(tailwindConfig)

export const theme = fullConfig.theme 