import { Box, Card, CardContent, Fab, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import { Trans, useTranslation } from 'react-i18next'

import { FormData } from './interface';
import Paper from '@mui/material/Paper';
import { PlayArrow } from '@mui/icons-material';
import React from "react"
import { graphql } from "gatsby"
import { useFormik } from 'formik';

export default function toolPage({ data }) {
  const theme = useTheme();
  const { t } = useTranslation()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  console.log(data);
  const pageContext = data['allSitePage']['nodes'][0]['pageContext']
  const pageId = pageContext['id']
  const pageName = pageContext['name']
  const pageForm = pageContext['form']

  let formikInitValues = {}
  if (pageForm.hasOwnProperty('main')) {
    (pageForm.main).map(x => formikInitValues = { [x.id]: '', ...formikInitValues })
  }
  if ('opt' in pageForm) {
    (pageForm.main).map(x => formikInitValues = { [x.id]: '', ...formikInitValues })
  }
  console.log(pageForm);
  const formik = useFormik({
    initialValues: formikInitValues,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })


  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Box>
            <Typography variant={isDesktop ? 'h2' : 'h3'}><Trans>{pageId}.name</Trans></Typography>
            <Typography variant="h6"><Trans>{pageId}.shortDesc</Trans></Typography>
          </Box>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="aff"
                    name="aff"
                    label="AFF谱面"
                    onChange={formik.handleChange}
                    value={formik.values['aff']}
                    multiline
                    fullWidth
                    rows={10}
                    helperText='支持完整AFF或谱面片段'
                    placeholder={`AudioOffset:248\n-\ntiming(0,222.22,4.00);\n...`}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="offset"
                    name="offset"
                    label="谱面延迟"
                    onChange={formik.handleChange}
                    value={formik.values['offset']}
                    helperText='延迟量（ms）'
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Stack>
        <Fab variant="extended" type='submit' color='secondary' sx={{
          boxShadow: 2,
          zIndex: 'tooltip',
          position: 'fixed',
          bottom: (theme) => theme.spacing(4),
          right: (theme) => theme.spacing(4)
        }}>
          <PlayArrow sx={{ mr: 1 }} />
          生成并复制
        </Fab>
      </form>
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
