import type { GatsbyConfig } from "gatsby"
import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `AFF Toolbox`,
    siteUrl: `https://aff.arcaea.icu`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    'gatsby-theme-material-ui',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: path.resolve(`./src/components/layout.tsx`),
      },
    },
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/config/`,
      },
    },
    // configuration for react-i18next
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`zh`, `en`],
        defaultLanguage: `zh`,
        // if you are using Helmet, you must include siteUrl, and make sure you add http:https
        siteUrl: `https://aff.arcaea.icu/`,
        // you can pass any i18next options
        i18nextOptions: {
          interpolation: {
            escapeValue: false // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false
        },
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `aff-modules`,
        path: `./src/modules`,
      },
    },
  ],
}

export default config;