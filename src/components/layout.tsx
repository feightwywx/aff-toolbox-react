import {
  AppBar,
  Badge,
  Box,
  Collapse,
  Container,
  CssBaseline,
  Drawer,
  List,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import {
  Button,
  IconButton,
  Link,
  ListItemButton
} from 'gatsby-theme-material-ui';
import { Link as I18Link, useI18next } from 'gatsby-plugin-react-i18next';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { ToolCategoryData, ToolListItemData } from './interface'
import { graphql, useStaticQuery } from 'gatsby'

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Helmet } from 'react-helmet';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import React from "react"
import TranslateIcon from '@mui/icons-material/Translate';
import { useLocation } from '@reach/router';
import useMediaQuery from '@mui/material/useMediaQuery';

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


export default function Layout({ children }) {
  const location = useLocation();
  const { languages, originalPath, t, i18n } = useI18next();

  const toolData = useStaticQuery(graphql`query ToolListQuery {
    allConfigJson {
      edges {
        node {
          toolList {
            name
            new
            id
            type
          }
          category {
            id
            name
          }
        }
      }
    }
  }`)['allConfigJson']['edges'][0]['node']

  const toolListData = toolData['toolList'] as Array<ToolListItemData>
  const categoryData = toolData['category'] as Array<ToolCategoryData>

  // 样式
  const theme = createTheme(
    {
      palette: {
        type: 'light',
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
          hint: 'rgba(14,7,29,0.38)',
        },
        divider: 'rgba(124,116,125,0.37)',
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 12
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
    // 可以hack掉ripple颜色 但是会导致动画出现问题
    // [`& .MuiTouchRipple-root span`]: {
    //  backgroundColor: theme.palette.primary.main
    // }
  }

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  console.log(`Desktop: ${isDesktop}`)
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

  // 抽屉
  // FIXME 暂时无效：noSsr会导致初次渲染错误，Ssr会导致初值false，无法打开抽屉
  const [drawerOpen, setDrawerOpen] = React.useState(isDesktop ? true : false);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [drawerCollapseState, setDrawerCollapseState] = React.useState({
    new: true,
    chart: false,
    arc: false,
    timing: false,
    gadget: false,
  });

  // FIXME 当前页面的标记有些问题 可能是路由导致
  const drawerContent = (
    <Box sx={{ p: 1 }}>
      <Box sx={{ overflow: 'auto' }}>
        <List dense>
          <Box>
            <ListItemButton sx={ListItemSx} to='/' selected={location.pathname === '/'}>
            <ListItemText primary={t('home')} sx={{
                        color: theme.palette.text.primary,
                      }} />
            </ListItemButton>
          </Box>
          {categoryData.map((cdata, index) => (
            <Box key={cdata.id}>
              <ListItemButton onClick={() => { setDrawerCollapseState({ ...drawerCollapseState, [cdata.id]: !drawerCollapseState[cdata.id] }) }}>
                <ListItemText primary={t(`${cdata.id}.name`)} />
                {drawerCollapseState[cdata.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={drawerCollapseState[cdata.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense sx={{ pl: 2 }}>
                  {toolListData.filter((data) => (((cdata.id) === 'new') ? data.new : (data.type === cdata.id))).map((data, index) => (
                    <ListItemButton key={index} sx={ListItemSx} to={data.id} selected={data.id === location.pathname && cdata.id !== 'new'} onClick={() => { setDrawerCollapseState({ ...drawerCollapseState, [data.type]: true }) }}>
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

  return (
    <Box>
      <Helmet>
        <link href="https://fonts.font.im/css?family=Exo+2:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.font.im/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
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
                  open={drawerOpen}
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

        </Box>
      </ThemeProvider>
    </Box>
  )
}