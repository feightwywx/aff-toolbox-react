import * as React from "react"
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
  Stack,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import {
  Link,
  Button,
} from 'gatsby-theme-material-ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faBilibili } from '@fortawesome/free-brands-svg-icons'


// markup
const IndexPage = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  return (
    <Box>
      <Stack spacing={2} sx={{mb: 2}}>
        <Box>
          <Typography variant={isDesktop ? 'h1' : 'h3'}>AFF工具箱</Typography>
          <Typography variant="h6">一个Arcaea谱面段落生成工具</Typography>
        </Box>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5">这是什么？</Typography>
              <Typography variant="body1">
                AFF工具箱是一个用于生成Arcaea谱面段落的工具。
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
                这个<Link href='https://www.bilibili.com/video/BV1RR4y1J7sL' underline="hover" color='secondary'>介绍视频</Link>有各个工具的结果预览，
                请根据您的需要选用。同时，向您推荐这几个最受欢迎的工具：
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}
                justifyContent="flex-start"
                alignItems="stretch"
                sx={{ m: 0, pr: { xs: 2, md: 4 } }}>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
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
                      <Button size="small" to='/arc-cutter'>尝试一下</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
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
                      <Button size="small" to='/chart-offset'>尝试一下</Button>
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
                      <Button size="small" to='/timing-easing'>尝试一下</Button>
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
              <Stack spacing={1} direction={{xs: 'column', sm: 'row'}}>
                <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faGithub} />} href='https://github.com/feightwywx/aff-toolbox-react'>
                  GitHub（前端）
                </Button>
                <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faGithub} />} href='https://github.com/feightwywx/arcfapi'>
                  GitHub（后端）
                </Button>
                <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faBilibili} />} href='https://space.bilibili.com/2095080'>
                  Bilibili
                </Button>
                <Button variant="outlined" startIcon={<MailOutlineIcon />} href="mailto:canis@direcore.xyz">
                  canis@direcore.xyz
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

    </Box>
  )
}

export default IndexPage
