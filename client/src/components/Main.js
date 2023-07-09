import { useSelector } from 'react-redux';
import { React } from 'react';
import { Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider, alpha, CssBaseline } from '@mui/material';

import Footer from './Footer';
import TaskBoard from './taskboards/TaskBoard';
import Navbar from './Navbar';
import TaskBoardManager from './taskboards/TaskBoardManager';

const Main = () => {
  const { primary, secondary, backgroundLighter, backgroundDark, backgroundLight, onBackground } = useSelector((state) => state.ui.themeColors);
  const theme = createTheme({
    spacing: 5,
    palette: {
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      background: {
        default: secondary,
        main: backgroundDark,
        light: backgroundLight,
        lighter: backgroundLighter
      },
      onBackground: {
        main: onBackground,
        textField: alpha(onBackground, 0.4),
        box: alpha(onBackground, 0.1),
        dim: alpha(onBackground, 0.5),
      }
    },
    styles: {
      iconPrimary: { fill: primary },
      iconSecondary: { fill: secondary },
      iconOnBackground: { fill: onBackground, marginLeft: "5px", marginRight: "5px" },
    }
  },);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='content-wrap'>
        <Navbar />
        <Routes>
          <Route path='manager' element={<TaskBoardManager />} />
          <Route path='taskboard' element={<TaskBoard />} />
          <Route path='*' element={<TaskBoardManager />} />
        </Routes>

      </div>

      <Footer />
    </ThemeProvider>
  )
}

export default Main;