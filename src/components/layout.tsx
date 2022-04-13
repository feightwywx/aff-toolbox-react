import { Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import { graphql, useStaticQuery } from 'gatsby';

import Header from './header';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

export const LayoutContext = React.createContext({})

const Layout = ({ children }) => {
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

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  const drawerWidth = 240;
  const [drawerOpen, setDrawerOpen] = React.useState(isDesktop ? true : false);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  //   open?: boolean;
  // }>(({ theme, open }) => ({
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   marginLeft: `0px`,
  //   ...(open && {
  //     transition: theme.transitions.create('margin', {
  //       easing: theme.transitions.easing.easeOut,
  //       duration: theme.transitions.duration.enteringScreen,
  //     }),
  //     marginLeft: `${drawerWidth}px`,
  //   }),
  // }));

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => (
    open ? {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    } : {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `0px`,
    }
  ));

  return (
    <>
      <Helmet>
        <link href="https://fonts.font.im/css?family=Exo+2:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.font.im/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutContext.Provider
          value={{
            drawerOpen, setDrawerOpen, handleDrawer
          }}>
          <Header toolData={toolData} />
        </LayoutContext.Provider>
        <Container>
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
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </Container>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;