import React from "react"
import { graphql } from "gatsby"
import { Box, Stack, Typography, useMediaQuery, } from '@mui/material'
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

export default function toolPage({ data }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  console.log(data);
  const pageContext = data['allSitePage']['nodes'][0]['pageContext']
  const pageId = pageContext['id']
  const pageName = pageContext['name']
  const pageForm = pageContext['form']
  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Box>
          <Typography variant={isDesktop ? 'h1' : 'h3'}>{pageId}.name</Typography>
          <Typography variant="h6">{pageId}.shortDesc</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export const pageQuery = graphql`
query ToolPageQuery($pagePath: String!) {
    allSitePage(filter: {path: {eq: $pagePath}}) {
      nodes {
        pageContext
      }
    }
  }
`
