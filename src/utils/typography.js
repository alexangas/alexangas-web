import Typography from "typography"
import noriegaTheme from "typography-theme-noriega"
const CodePlugin = require("typography-plugin-code").default

noriegaTheme.plugins = [
    new CodePlugin(),
]

const typography = new Typography(noriegaTheme)

export const { scale, rhythm, options } = typography
export default typography
