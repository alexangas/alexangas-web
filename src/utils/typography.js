import Typography from "typography"
import noriegaTheme from "typography-theme-noriega"
const CodePlugin = require("typography-plugin-code").default

noriegaTheme.plugins = [new CodePlugin()]

noriegaTheme.overrideThemeStyles = ({ rhythm }) => ({
  a: {
    color: "#007acc",
    textDecoration: "none",
  },
  "a.link-button": {
    paddingTop: rhythm(1 / 2),
    paddingBottom: rhythm(1 / 2),
    paddingLeft: rhythm(1),
    paddingRight: rhythm(1),
    display: "inline-block",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "2px",
    background: "black",
    color: "rgb(255, 255, 255)",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: rhythm(1 / 4),
  },
  "a:hover": {
    textDecoration: "underline",
  },
  "a.link-button:hover": {
    boxShadow: "inset 0 0 100px 100px rgba(255, 255, 255, 0.25)",
  },
  footer: {
    marginTop: rhythm(1),
    textAlign: "center",
  },
  ".bio": {
    display: `flex`,
    marginBottom: rhythm(1),
  },
  ".bio p": {
    marginBottom: 0,
  },
  ".tag-list": {
    margin: 0,
    listStyle: "none",
  },
  ".tag-list li": {
    display: "inline",
    margin: 0,
    padding: 0,
  },
  ".blog__post--summary": {
    marginBottom: rhythm(1),
  },
  ".blog__post--summary p": {
    marginBottom: 0,
  },
  ".blog__post--summary h3, .blog__post--article h1": {
    marginBottom: rhythm(1 / 8),
  },
  ".blog__post--article header": {
    marginBottom: rhythm(1),
  },
  ".blog__post--article small": {
    display: "block",
  },
  ".blog__post--article hr": {
    marginBottom: rhythm(1),
  },
  ".blog__post--nav ul": {
    display: `flex`,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    margin: 0,
    padding: 0,
    listStyle: `none`,
  },
  ".blog__post--nav ul li": {
    marginBottom: 0,
    fontSize: rhythm(3 / 5),
  },
})

delete noriegaTheme.googleFonts

const typography = new Typography(noriegaTheme)

export const { scale, rhythm, options } = typography
export default typography
