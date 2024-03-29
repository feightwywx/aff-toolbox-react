import {
  AppBar,
  Badge,
  Box,
  Collapse,
  Container,
  CssBaseline,
  Dialog,
  Drawer,
  Fade,
  List,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import { ArcToolModule, HistoryItemData, ToolCategoryData, ToolListItemData } from '../interface'
import {
  Button,
  IconButton,
  Link,
  ListItemButton
} from 'gatsby-theme-material-ui';
import { HistoryContext, HistoryDialogContent } from './history';
import { Link as I18Link, useI18next } from 'gatsby-plugin-react-i18next';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { category, newModuleList } from '../config/category';
import { graphql, useStaticQuery } from 'gatsby'

import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Helmet } from 'react-helmet';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import React from "react"
import { SnackbarProvider } from 'notistack';
import TranslateIcon from '@mui/icons-material/Translate';
import { getLangPrefix } from '../utils';
import { useLocation } from '@reach/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { version } from '../config/version';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...((open === true) && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


export default function Layout({ children }: { children: React.ReactChildren }) {
  const location = useLocation();
  const pathName = location.pathname.split('/')
  const currentPage = pathName[pathName.length - 1]
  const { originalPath, t, i18n } = useI18next();
  const currentLangPrefix = getLangPrefix(i18n.resolvedLanguage);

  const affModuleEdges = useStaticQuery(graphql`query StaticToolQuery {
    allFile (filter: { sourceInstanceName: { eq: "aff-modules" } }) {
      edges {
        node {
          relativePath
        }
      }
    }
  }`)['allFile']['edges']

  const moduleToCategory = new Map<string, string>();  // 维护一个由模块名到分类名的映射
  const toolListData = affModuleEdges.map((edge: { [x: string]: { [x: string]: any; }; }) => {
    const modulePath = edge['node']['relativePath'];
    const mod = require(`../modules/${modulePath}`) as ArcToolModule;
    moduleToCategory.set(mod.id, mod.type);
    return mod;
  }) as Array<ArcToolModule>
  const categoryData = category;  // 从config/category.ts读取所有的分类

  // 样式
  const theme = createTheme(
    {
      palette: {
        primary: {
          main: '#846cb3',
          light: '#e0d6f5',
          dark: '#59446f',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#4d57a9',
          light: '#dee0ff',
          dark: '#000965',
        },
        background: {
          default: '#f6f3fc',
          paper: '#fffbfe',
        },
        text: {
          primary: 'rgba(14,7,29,0.83)',
          secondary: 'rgba(14,7,29,0.54)',
          disabled: 'rgba(14,7,29,0.38)',
        },
        divider: 'rgba(124,116,125,0.37)',
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              MuiDialog: {
                borderRadius: 24
              }
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              color: '#4d57a9',
              textTransform: 'none',
              borderRadius: '50vh'
            }
          }
        },
        MuiLink: {
          styleOverrides: {
            root: {
              color: '#4d57a9'
            }
          }
        },
        MuiFab: {
          styleOverrides: {
            root: {
              borderRadius: '16px',
              padding: '28px 20px',
            }
          }
        }
      },
      typography: {
        fontFamily: [
          '"Exo 2"',
          '"Noto Sans SC"',
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
    }
  );

  const ListItemSx = {
    borderRadius: 2,
    p: 0.5,
    pl: 2,
    mt: 0.5,
    color: theme.palette.primary.main,
  }

  const MenuItemSx = {
    borderRadius: 1,
    p: 1,
    m: 0.5,
    ml: 1,
    mr: 1,
    // TODO 考虑覆盖ripple颜色的同时保持动画
    // 可以hack掉ripple颜色 但是会导致动画出现问题
    // [`& .MuiTouchRipple-root span`]: {
    //  backgroundColor: theme.palette.primary.main
    // }
  }

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  // 菜单
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [langAnchorEl, setLangAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setLangAnchorEl(null);
  };

  // 历史记录
  const [historyDialogOpen, setHistoryDialog] = React.useState(false);
  const [history, setHistory] = React.useState([] as Array<HistoryItemData>)


  // 抽屉
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // 初始化collapse状态
  let initDrawerCollapseState = {} as { [x: string]: boolean }
  categoryData.forEach((cid) => {
    initDrawerCollapseState = {
      [cid]: (cid === 'new' || cid === moduleToCategory.get(currentPage)) ? true : false,
      ...initDrawerCollapseState
    };
  })
  const [drawerCollapseState, setDrawerCollapseState] = React.useState(initDrawerCollapseState);
  // 跳转时维护collapse状态
  React.useEffect(() => {
    const currentCategory = moduleToCategory.get(currentPage)
    if (currentCategory !== undefined) {
      setDrawerCollapseState({ ...drawerCollapseState, [currentCategory]: true })
    }
  }, [currentPage]);

  const drawerContent = (
    <Box sx={{ p: 1 }}>
      <Box sx={{ overflow: 'auto' }}>
        <List dense>
          <Box>
            <ListItemButton sx={ListItemSx} to={`/${currentLangPrefix}`} selected={location.pathname === `/${currentLangPrefix}`}>
              <ListItemText primary={t('home')} sx={{
                color: theme.palette.text.primary,
              }} />
            </ListItemButton>
          </Box>

          {/* 生成分类 */}
          {categoryData.map((cid, index) => (
            <Box key={cid}>
              <ListItemButton onClick={() => { setDrawerCollapseState({ ...drawerCollapseState, [cid]: !drawerCollapseState[cid] }) }}>
                <ListItemText primary={t(`${cid}.name`)} />
                {drawerCollapseState[cid] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={drawerCollapseState[cid]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense sx={{ pl: 2 }}>
                  {/* 生成菜单项 */}
                  {toolListData.filter(
                    (data) => (cid === 'new' ? newModuleList.includes(data.id) : data.type === cid)
                  )
                    .map((data, index) => (
                      <ListItemButton
                        LinkComponent={I18Link}
                        key={index}
                        sx={ListItemSx}
                        to={`/${currentLangPrefix}${data.id}`}
                        selected={`${data.id}` === currentPage && cid !== 'new'}>
                        <ListItemText primary={t(`${data.id}.name`)} sx={{
                          color: theme.palette.text.primary,
                        }} />
                      </ListItemButton>
                    ))}
                </List>
              </Collapse>

            </Box>
          ))}

        </List>
      </Box>
    </Box>
  )

  // 只需要执行一次的东西
  React.useEffect(() => {
    console.log(`%cAFF Toolbox%c${version}%c\nBuild with React and Love :)`,
      'background: #e0d6f5; color: #59446f; padding: 2px',
      'background: #59446f; color: #fff; padding: 2px',
      'background: #fff; color: #000; margin-top: 2px');

  }, [])

  return (
    <Box>
      <Helmet>
        <link href="https://fonts.font.im/css?family=Exo+2:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.font.im/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={isDesktop ? 3 : 1}
          style={isDesktop ? {} : { marginTop: '48px' }}
          anchorOrigin={isDesktop ? { vertical: 'bottom', horizontal: 'left' } : { vertical: 'top', horizontal: 'center' }}
          TransitionComponent={Fade}
        >
          <HistoryContext.Provider value={{ history, setHistory }}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
              {/* appbar */}
              <AppBar
                position="fixed"
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  borderRadius: 0,
                  backgroundColor: theme.palette.primary.light,
                }}
                elevation={0}
              >
                <Toolbar sx={{
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.dark,
                  borderBottomStyle: 'none',
                  borderBottomColor: theme.palette.divider,
                  borderBottomWidth: '1px'
                }}
                >
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleDrawer}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Box sx={{ flexGrow: 1 }}>
                    <Badge badgeContent={'beta'} color="secondary">
                      <Typography variant="h6" component="div" sx={{ pr: 2 }}>
                        AFF工具箱
                      </Typography>
                    </Badge>
                  </Box>
                  <IconButton
                    size="large"
                    aria-label="language"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => setHistoryDialog(true)}
                    color="inherit"
                  >
                    <HistoryIcon />
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="language"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleLangMenu}
                    color="inherit"
                  >
                    <TranslateIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={langAnchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(langAnchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} sx={MenuItemSx} component={I18Link} to={originalPath} language='zh'>中文</MenuItem>
                    <MenuItem onClick={handleClose} sx={MenuItemSx} component={I18Link} to={originalPath} language='en'>English</MenuItem>
                  </Menu>

                  <IconButton
                    size="large"
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} sx={MenuItemSx}>Arc构造工具</MenuItem>
                    <MenuItem onClick={handleClose} sx={MenuItemSx}>时间细分计算器</MenuItem>
                  </Menu>
                </Toolbar>
              </AppBar>

              {/* drawer */}
              {
                isDesktop ? (
                  <Drawer
                    variant="persistent"
                    sx={{
                      width: drawerWidth,
                      flexShrink: 0,
                      [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRightColor: theme.palette.divider,
                        backgroundColor: theme.palette.background.default,
                        borderRadius: 0
                      },
                    }}
                    anchor="left"
                    open={drawerOpen}
                  >
                    <Toolbar sx={{ mb: 1 }} />
                    {drawerContent}
                  </Drawer>
                ) : (  // mobile
                  <Box>
                    <Drawer
                      variant="temporary"
                      open={!drawerOpen}  // 移动端的drawer默认逻辑和桌面端相反
                      onClose={handleDrawer}
                      ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                      }}
                      sx={{
                        '& .MuiDrawer-paper': {
                          boxSizing: 'border-box',
                          width: drawerWidth,
                          mt: { 'xs': 9, 'sm': 10 },
                          ml: 2,
                          height: '70%',
                          borderRadius: 4
                        },
                      }}
                      elevation={8}
                    >
                      {drawerContent}
                    </Drawer>
                  </Box>
                )
              }

              {/* 模板嵌入区域 */}
              {
                isDesktop ? (
                  <Main open={drawerOpen}>
                    <Container>
                      <Toolbar />
                      {children}
                    </Container>
                  </Main>
                ) : (
                  <Container>
                    <Toolbar sx={{ mt: 2 }} />
                    {children}
                  </Container>
                )
              }

              {/* 历史记录面板 */}
              <Dialog open={historyDialogOpen} onClose={() => { setHistoryDialog(false) }} fullWidth maxWidth={'lg'}
                sx={{
                  zIndex: 'modal',
                  '& .MuiDialog-paper': {
                    borderRadius: '24px'
                  }
                }}>
                <DialogTitle>
                  历史记录
                  <IconButton
                    onClick={() => { setHistoryDialog(false) }}
                    sx={{
                      position: 'absolute',
                      right: 12,
                      top: 12,
                      color: (theme) => theme.palette.primary.dark,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <HistoryDialogContent value={history} />
              </Dialog>
            </Box>
          </HistoryContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </Box>
  )
}