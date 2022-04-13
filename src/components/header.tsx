import { AppBar, Badge, Box, Collapse, Drawer, List, ListItemText, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from '@mui/material';
import {
  Button,
  IconButton,
  Link,
  ListItemButton
} from 'gatsby-theme-material-ui';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link as I18Link, useI18next } from 'gatsby-plugin-react-i18next';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import { ToolCategoryData, ToolListItemData } from './interface'

import { LayoutContext } from './layout';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby'

const Header = ({ toolData }) => {
  const { languages, originalPath, t } = useI18next();
  const theme = useTheme()

  const drawerWidth = 240;

  const toolListData = toolData['toolList'] as Array<ToolListItemData>
  const categoryData = toolData['category'] as Array<ToolCategoryData>

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

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  // 菜单
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 抽屉

  const {drawerOpen, setDrawerOpen, handleDrawer} = React.useContext(LayoutContext);
  
  const [drawerCollapseState, setDrawerCollapseState] = React.useState({
    new: true,
    chart: false,
    arc: false,
    timing: false,
    gadget: false,
  });

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
    <header className="main-header">
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            borderRadius: 0
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
              aria-label="account of current user"
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
      </Box>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}>
          {t('Welcome to {{siteTitle}}', { toolData })}
        </Link>
      </h1>
      <ul className="languages">
        {languages.map((lng) => (
          <li key={lng}>
            <I18Link to={originalPath} language={lng}>
              {lng}
            </I18Link>
          </li>
        ))}
      </ul>
    </header>
  );
};


export default Header;