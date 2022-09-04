import * as React from "react"

import {
  Box,
  Typography
} from "@mui/material"

import { Link as GatsbyLink } from "gatsby-theme-material-ui"
import { graphql } from "gatsby"

// markup
const NotFoundPage = () => {
  return (
    <Box>
      <Typography variant="h1">404</Typography>
      <Typography variant='h4'>你似乎来到了空无一人的世界...</Typography>
      <Typography variant='h6'><GatsbyLink to='/'>回到主页</GatsbyLink></Typography>
    </Box>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
query NotFoundPageQuery($language: String!) {
    locales: allLocale(filter: {ns: {in: ["common"]}, language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    } 
  }
`