import * as React from "react"

import {
  Box,
  Typography
} from "@mui/material"

import { Link as GatsbyLink } from "gatsby-theme-material-ui"

// markup
const NotFoundPage = () => {
  return (
    <Box>
      <Typography variant="h1">404</Typography>
      <Typography variant='h4'>这里好像什么也没有...</Typography>
      <Typography variant='h6'><GatsbyLink to='/'>回到主页</GatsbyLink></Typography>
    </Box>
  )
}

export default NotFoundPage
