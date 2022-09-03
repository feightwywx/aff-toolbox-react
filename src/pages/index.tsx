import * as React from "react"

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import {
  Button,
  Link as GatsbyLink,
} from 'gatsby-theme-material-ui';
import { Link as I18Link, Trans, useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { faBilibili, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { getLangPrefix } from "../utils";
import { graphql } from 'gatsby';
import { useTheme } from '@mui/material/styles';

const IndexPage = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const { i18n } = useI18next();
  const currentLangPrefix = getLangPrefix(i18n.resolvedLanguage)

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Box>
          <Typography variant={isDesktop ? 'h1' : 'h3'}>AFF工具箱</Typography>
          <Typography variant="h6">一个Arcaea谱面段落生成工具</Typography>
        </Box>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5">这是什么？</Typography>
              <Typography variant="body1">
                AFF工具箱是一个用于生成<GatsbyLink href='https://arcaea.lowiro.com/' underline="hover" color='secondary'>Arcaea</GatsbyLink>谱面段落的工具。
                Arcaea是一款由lowiro开发的<s>创新立体</s>节奏游戏。
              </Typography>
              <Typography />
              <Typography variant="h5">如何使用？</Typography>
              <Typography variant="body1">
                通过左上角的菜单按钮选择您想生成的段落种类。之后只需输入参数，再点击右下角的生成按钮就可以将生成好的谱面段落复制到剪贴板！
              </Typography>
              <Typography />
              <Typography variant="h5">我应该使用哪些工具呢？</Typography>
              <Typography variant="body1">
                这个<GatsbyLink href='https://www.bilibili.com/video/BV1RR4y1J7sL' underline="hover" color='secondary'>介绍视频</GatsbyLink>有各个工具的结果预览，
                请根据您的需要选用。同时，向您推荐这几个最受欢迎的工具：
              </Typography>
              <Grid container spacing={0}
                justifyContent="flex-start"
                alignItems="stretch"
                sx={{ m: 0, pr: 0 }}>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined" sx={{
                    mb: { xs: 2, md: 'auto' },
                    mr: { xs: 'auto', md: 2 }
                  }}>
                    <CardContent>
                      <Typography variant="h5">
                        Arc分割
                      </Typography>
                      <Box sx={{ minHeight: '3rem' }}>
                        <Typography variant="body1">
                          将一条完整的Arc切分成多个更短的Arc
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" to={`/${currentLangPrefix}arc-cutter`}>尝试一下</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined" sx={{
                    mb: { xs: 2, md: 'auto' },
                    mr: { xs: 'auto', md: 2 }
                  }}>
                    <CardContent>
                      <Typography variant="h5">
                        谱面偏移
                      </Typography>
                      <Box sx={{ minHeight: '3rem' }}>
                        <Typography variant="body1">
                          将整个谱面或者谱面片段偏移指定时间
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" to={`/${currentLangPrefix}chart-offset`}>尝试一下</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined" sx={{ minHeight: '160px' }}>
                    <CardContent>
                      <Typography variant="h5">
                        Timing缓动
                      </Typography>
                      <Box sx={{ minHeight: '3rem' }}>
                        <Typography variant="body1">
                          利用缓动函数生成一段Timing
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" to={`/${currentLangPrefix}timing-easing`}>尝试一下</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ pt: 3 }}>
            <Stack spacing={2}>
              <Grid container spacing={1}>
                <Grid item xs='auto'>
                  <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faGithub} />} href='https://github.com/feightwywx/aff-toolbox-react'>
                    前端
                  </Button>
                </Grid>
                <Grid item xs='auto'>
                  <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faGithub} />} href='https://github.com/feightwywx/arcfapi'>
                    API
                  </Button>
                </Grid>
                <Grid item xs='auto'>
                  <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faBilibili} />} href='https://space.bilibili.com/2095080'>
                    一只恐狼
                  </Button>
                </Grid>
                <Grid item xs='auto'>
                  <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faTwitter} />} href='https://twitter.com/0x00F8'>
                    @0x00F8
                  </Button>
                </Grid>
                <Grid item xs='auto'>
                  <Button variant="outlined" startIcon={<MailOutlineIcon />} href="mailto:canis@direcore.xyz">
                    canis@direcore.xyz
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

    </Box>
  )
}

export default IndexPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {ns: {in: ["common", "index"]}, language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
