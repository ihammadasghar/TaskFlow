import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui/slice';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Tooltip, List, ListItem, ListItemButton, ListItemText, ListItemIcon, SwipeableDrawer, Divider } from '@mui/material';
import { AccountBox, Person, Logout, Login } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListIcon from '@mui/icons-material/List';
import Notification from './Notification';
import { getTaskBoardDetails } from '../store/taskboards/actions';


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notification = useSelector((state) => state.ui.notification);
  const navbarToggle = useSelector((state) => state.ui.navbarToggle);
  const userMenuAnchorEl = useSelector((state) => state.ui.userMenuAnchorEl);
  const userMenuToggle = Boolean(userMenuAnchorEl);
  const taskboardMenuAnchorEl = useSelector((state) => state.ui.taskboardMenuAnchorEl);
  const taskboardMenuToggle = Boolean(taskboardMenuAnchorEl);
  const isLoggedIn = true;
  const taskboards = useSelector((state) => state.taskBoards.allTaskBoards);
  const userPermission = 2;
  const theme = useTheme();

  const changePage = (route) => {
    navigate(route);
    if (notification) {
      dispatch(uiActions.setState({ stateName: "notification", value: null }));
    }
  }
  // Navbar links
  const commonLinks = [
    // [page title, onClickFunction, icon, loginRequired],
    [
      "Manager",
      () => changePage("/manager"),
      HomeIcon,
      false
    ],
  ];

  // For permissions 1>
  const adminLinks = [];

  const userLinks = [
    [
      "Student login",
      () => {
        dispatch(uiActions.setState({ stateName: "isStudentLogin", value: true }));
        changePage("/login");
      },
      AccountBox
    ],
    [
      "Staff login",
      () => {
        dispatch(uiActions.setState({ stateName: "isStudentLogin", value: false }));
        changePage("/login");
      },
      Person
    ],

  ]

  const toggle = (menu) => dispatch(uiActions.toggle(menu));
  const setAnchorElement = (el, name) => dispatch(uiActions.setState({ stateName: name, value: el }));
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      color="primary"
      role="presentation"
    >
      <List>
        <ListItem key="closemenu" disablePadding>

          <ListItemButton onClick={() => toggle("navbarToggle")}>
            <ListItemIcon>
              <ChevronLeftIcon style={theme.styles.iconPrimary} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ color: "primary.main" }} primary="Close" />
          </ListItemButton>

        </ListItem>
      </List>

      <Divider />

      <List>
        {commonLinks.map(([name, onClickFunc, Icon, loginRequired]) => (
          (!loginRequired || (loginRequired && isLoggedIn)) &&
          (
            <ListItem key={name} disablePadding>

              <ListItemButton onClick={() => { onClickFunc(); toggle("navbarToggle"); }}>
                <ListItemIcon>
                  <Icon style={theme.styles.iconPrimary} />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ color: "primary.main" }} primary={name} />
              </ListItemButton>

            </ListItem>
          )
        ))}
        {isLoggedIn &&
          <ListItem key="chooseTaskboard" disablePadding>
            <ListItemButton
              id="taskboard-menu-button"
              aria-controls={taskboardMenuToggle ? 'taskboard-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={taskboardMenuToggle ? 'true' : undefined}
              onClick={(event) => setAnchorElement(event.currentTarget, "taskboardMenuAnchorEl")}
            >
              <ListItemIcon>
                <ListIcon style={theme.styles.iconPrimary} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ color: "primary.main" }} primary="Taskboards" />
            </ListItemButton>
            <Menu
              id="taskboard-menu"
              anchorEl={taskboardMenuAnchorEl}
              open={taskboardMenuToggle}
              onClose={() => setAnchorElement(null, "taskboardMenuAnchorEl")}
              onClick={() => setAnchorElement(null, "taskboardMenuAnchorEl")}
              MenuListProps={{
                'aria-labelledby': 'taskboard-menu-button',
              }}
            >
              {(taskboards && taskboards.length > 0) ? taskboards.map((item) => (
                <Link key={item.name} to="taskboard" className='navbar-link'>
                  <MenuItem
                    onClick={() => {
                      dispatch(getTaskBoardDetails(item._id));
                      toggle("navbarToggle");
                    }}
                  >
                    <ListIcon style={theme.styles.iconPrimary} />
                    <Typography textAlign="center" sx={{ color: "primary.main", ml: 1 }}>{item.name}</Typography>
                  </MenuItem>
                </Link>
              ))
                :
                <MenuItem key="noTaskboards" onClick={() => toggle("navbarToggle")}>
                  <Typography textAlign="center" sx={{ color: "primary.main", ml: 1 }}>No taskboards</Typography>
                </MenuItem>
              }
            </Menu>

          </ListItem>
        }
      </List>

      {(isLoggedIn && userPermission > 1) &&
        <List>
          <Divider />
          {adminLinks.map(([name, onClickFunc, Icon]) => (
            <ListItem key={name} disablePadding>

              <ListItemButton onClick={() => { onClickFunc(); toggle("navbarToggle"); }}>
                <ListItemIcon>
                  <Icon style={theme.styles.iconPrimary} />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ color: "primary.main" }} primary={name} />
              </ListItemButton>

            </ListItem>
          ))}
        </List>
      }
    </Box >
  );

  return (
    <React.Fragment>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Container maxWidth="xl" sx={{ bgcolor: "primary" }}>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>

              <IconButton
                color='inherit'
                aria-label="open drawer"
                onClick={() => toggle("navbarToggle")}
                edge="start"
                sx={{ mr: 2, }}
              >
                <MenuIcon style={theme.styles.iconSecondary} sx={{ mx: 2 }} />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  my: 3,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Hoefler Text',
                  fontWeight: 700,
                  color: 'secondary.main',
                  textDecoration: 'none',
                }}
                className="logo"
              >
                TaskFlow
              </Typography>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Hoefler Text',
                fontWeight: 700,
                color: 'secondary.main',
                textDecoration: 'none',
              }}
              className="logo"
            >
              Task Manager
            </Typography>

            <Box sx={{ flexGrow: 0 }}>

              {isLoggedIn ?
                (

                  <Tooltip title="Logout">
                    <IconButton sx={{ p: 0 }} onClick={() => {
                      //dispatch(authActions.logout({}));
                      dispatch(uiActions.resetState({}));
                      navigate('/home');
                    }}>
                      <Logout style={theme.styles.iconSecondary} />
                      <Typography textAlign="center" sx={{ color: "secondary.main" }}>Logout</Typography>
                    </IconButton>
                  </Tooltip>

                )
                :
                (
                  <Tooltip
                    title="Login"
                    onClick={(event) => setAnchorElement(event.currentTarget, "userMenuAnchorEl")}
                    id="user-menu-button"
                    aria-controls={userMenuToggle ? 'user-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={userMenuToggle ? 'true' : undefined}
                  >
                    <IconButton>
                      <Login style={theme.styles.iconSecondary} />
                      <Typography textAlign="center" sx={{ color: "secondary.main" }}>Login</Typography>
                    </IconButton>
                  </Tooltip>
                )
              }

              <Menu
                id="user-menu"
                sx={{ mt: '45px' }}
                PaperProps={{
                  sx: {
                    backgroundColor: "secondary.main"
                  }
                }}
                anchorEl={userMenuAnchorEl}
                open={userMenuToggle}
                onClose={() => setAnchorElement(null, "userMenuAnchorEl")}
                onClick={() => setAnchorElement(null, "userMenuAnchorEl")}
              >

                {userLinks.map(([name, onClickFunc, Icon]) => (
                  <MenuItem key={name} onClick={() => { onClickFunc(); toggle("userMenuToggle"); }}>
                    <Icon style={theme.styles.iconPrimary} />
                    <Typography textAlign="center" sx={{ color: "primary.main", ml: 1 }}>{name}</Typography>

                  </MenuItem>

                ))}

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <SwipeableDrawer
        anchor={"left"}
        open={navbarToggle}
        onClose={() => toggle("navbarToggle")}
        onOpen={() => toggle("navbarToggle")}
        PaperProps={{
          sx: {
            backgroundColor: "secondary.main"
          }
        }}
      >
        {list("left")}
      </SwipeableDrawer>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </React.Fragment>
  );
};
export default Navbar;