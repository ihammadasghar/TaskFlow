import './App.css';
import Main from './components/Main';
import {Routes, BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='*' element={<Main/>}/>
    </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;