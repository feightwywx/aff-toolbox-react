import * as React from "react"
import { Link } from "gatsby-theme-material-ui"
import {
  Box,
  Typography
} from "@mui/material"

// markup
const NotFoundPage = () => {
  return (
    <Box>
      <Typography variant="h1">404</Typography>
      <Typography variant='h4'>这里好像什么也没有...</Typography>
      <Typography variant='h6'><Link to='/'>回到主页</Link></Typography>
    </Box>
  )
}

export default NotFoundPage
