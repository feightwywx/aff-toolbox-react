import * as Yup from 'yup'

import { AffTextField, NumberField } from './input';
import { ArcToolPageData, FieldData, ToolListItemData } from '../interface';
import { Box, Card, CardContent, Fab, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import { Form, Formik, useField, useFormik, useFormikContext } from 'formik';
import { Trans, useTranslation } from 'react-i18next'
import { fieldParser, validationParser } from './formUtil';

import { HistoryContext } from './history';
import { PlayArrow } from '@mui/icons-material';
import React from "react"
import { graphql } from "gatsby"
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';

export default function toolPage({ data }: { data: { [x: string]: any } }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  const pageContext: ToolListItemData = data['allSitePage']['nodes'][0]['pageContext'];
  const pageId = pageContext['id'];
  const pageForm: Array<FieldData> = pageContext['form'];
  // 读取表单结构
  let formikInitValues = {};
  let validationSchema = {} as { [x: string]: any };
  if (pageForm) {
    pageForm.map((x: FieldData) => {
      formikInitValues = { ...formikInitValues, [x.id]: '' };
      validationSchema = { ...validationSchema, [x.id]: React.useMemo(() => validationParser(x), [x]) };
    })
  }
  // 渲染表单
  const formComponents = React.useMemo(() => pageForm.map(fieldParser), [pageForm])
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { history, setHistory } = React.useContext(HistoryContext)

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant={isDesktop ? 'h2' : 'h3'}><Trans>{pageId}.name</Trans></Typography>
        <Typography variant="h6"><Trans>{pageId}.shortDesc</Trans></Typography>
      </Box>
      <Formik
        initialValues={formikInitValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={values => {
          if (navigator.clipboard !== undefined) {
            navigator.clipboard.writeText(JSON.stringify(values, null, 2));
            if (history !== null) {
              setHistory([{
                value: JSON.stringify(values, null, 2),
                tool: pageId,
                time: Date.now()
              }, ...history])
            }

            enqueueSnackbar("生成结果已复制到剪贴板", { variant: 'success' });
          } else {
            console.warn('[AFF Toolbox] 无法访问剪贴板，这可能是因为权限不足，浏览器过旧或页面不来自一个安全的来源。')
            enqueueSnackbar("结果已生成，但是复制失败。请检查历史记录面板。", { variant: 'warning' });
          }
        }}>
        {({ errors, touched }) => (
          <Form>
            <Stack spacing={2} sx={{ mb: 2 }}>
              {/* 主要部分 */}
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    {formComponents}
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
            <Fab variant="extended" type='submit' color='secondary' sx={{
              boxShadow: 2,
              position: 'fixed',
              bottom: (theme) => theme.spacing(4),
              right: (theme) => theme.spacing(4)
            }}
              onClick={() => {
                const errKeys = Object.keys(errors);
                const touchedKeys = Object.keys(touched);
                if (touchedKeys.length === 0) {
                  enqueueSnackbar('在提交之前...至少动点什么吧？', { variant: 'default' })
                } else if (errKeys.length !== 0) {
                  enqueueSnackbar(`请检查以下字段：${errKeys.map(e => t(e))}`, { variant: 'error' })
                }
              }}
            >
              <PlayArrow sx={{ mr: 1 }} />
              生成并复制
            </Fab>
          </Form>
        )}

      </Formik>
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
