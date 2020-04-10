import Typography from "typography"
import noriegaTheme from "typography-theme-noriega"
const CodePlugin = require("typography-plugin-code").default

noriegaTheme.plugins = [
    new CodePlugin()
]

noriegaTheme.overrideThemeStyles = ({ rhythm }) => ({
    "a.link-button": {
        paddingTop: rhythm(1 / 2),
        paddingBottom: rhythm(1 / 2),
        paddingLeft: rhythm(1),
        paddingRight: rhythm(1),
        cursor: "pointer",
        textDecoration: "none",
        textTransform: "uppercase",
        letterSpacing: "2px",      
        background: "black",
        color: "rgb(255, 255, 255)",
        fontSize: "15px",
        fontWeight: "600",
        borderRadius: rhythm(1 / 4)
    },
    "a.link-button:hover": {
        boxShadow: "inset 0 0 100px 100px rgba(255, 255, 255, 0.25)"
    },
    footer: {
        marginTop: rhythm(1),
        textAlign: "center"
    }
});

const typography = new Typography(noriegaTheme)

export const { scale, rhythm, options } = typography
export default typography
