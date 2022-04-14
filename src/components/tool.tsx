import { Box, Stack, Typography, useMediaQuery, } from '@mui/material'
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import { Trans, useTranslation } from 'react-i18next'

import React from "react"
import { graphql } from "gatsby"

export default function toolPage({ data }) {
  const theme = useTheme();
  const { t } = useTranslation()
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
          <Typography variant={isDesktop ? 'h1' : 'h3'}><Trans>{pageId}.name</Trans></Typography>
          <Typography variant="h6"><Trans>{pageId}.shortDesc</Trans></Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export const pageQuery = graphql`
query ToolPageQuery($pagePath: String!, $language: String!) {
    allSitePage(filter: {path: {eq: $pagePath}}) {
      nodes {
        pageContext
      }
    }
    locales: allLocale(filter: {ns: {in: ["common", "kit"]}, language: {eq: $language}}) {
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
