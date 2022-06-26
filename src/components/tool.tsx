import * as Yup from 'yup'

import { AffTextField, NumberField } from './input';
import { Box, Card, CardContent, Fab, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import { Form, Formik, useFormik } from 'formik';
import { FormData, ToolListItemData } from '../interface';
import { Trans, useTranslation } from 'react-i18next'

import { PlayArrow } from '@mui/icons-material';
import React from "react"
import { graphql } from "gatsby"
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';

export default function toolPage({ data }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  const pageContext: ToolListItemData = data['allSitePage']['nodes'][0]['pageContext'];
  const pageId = pageContext['id'];
  const pageForm: Array<FormData> = pageContext['form'];
  // 读取表单结构
  let formikInitValues = {};
  let validationSchema = {};
  if (pageForm) {
    (pageForm).map((x: FormData) => {
      formikInitValues = { ...formikInitValues, [x.id]: '' }

      if (x.type === 'number') {
        validationSchema[x.id] = Yup.number().typeError('请输入一个数值')
        if (x.format && 'int' in x.format) {
          validationSchema[x.id] = validationSchema[x.id].integer('值不能为小数');
        }

        if (x.format && 'nonNegative' in x.format) {
          validationSchema[x.id] = validationSchema[x.id].min(0, '值不能为负数');
        }

      } else if (x.type === 'aff') {
        validationSchema[x.id] = Yup.string()
      } else {
        console.warn(`[AFF Toolbox] 表单生成工具未生成以下验证：不支持${x.type}类型\n页面ID：${pageId}\n控件声明：\n${JSON.stringify(x, null, 2)}`);
      }

      if (x.required) {
        validationSchema[x.id] = validationSchema[x.id].required('不能为空');
      }
    })
  }

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

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
            enqueueSnackbar("生成结果已复制到剪贴板", { variant: 'success' });
          } else {
            console.warn('[AFF Toolbox] 无法访问剪贴板，这可能是因为浏览器过旧或页面不来自一个安全的来源。')
            enqueueSnackbar("结果已生成，但是复制失败。请检查历史记录面板。", { variant: 'warning' });
          }
        }}>
        <Form>
          <Stack spacing={2} sx={{ mb: 2 }}>
            {/* 主要部分 */}
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  {pageForm.map((x: FormData) => {
                    if (x.type === 'aff') {
                      return (
                        <Grid key={x.id} item xs={12}>
                          <AffTextField
                            name={x.id}
                            id={x.id}
                            type='text'
                          />
                        </Grid>
                      )
                    } else if (x.type === 'number') {
                      return (
                        <Grid key={x.id} item xs={12} sm={6} md={4}>
                          <NumberField
                            name={x.id}
                            id={x.id}
                            type='text'
                          />
                        </Grid>
                      )
                    } else {
                      console.warn(`[AFF Toolbox] 表单生成工具未生成以下控件：不支持${x.type}类型\n页面ID：${pageId}\n控件声明：\n${JSON.stringify(x, null, 2)}`);
                    }
                  })}
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
          >
            <PlayArrow sx={{ mr: 1 }} />
            生成并复制
          </Fab>
        </Form>
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
