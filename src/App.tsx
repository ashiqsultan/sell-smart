import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AppBar from './components/AppBar';

function App() {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<div>404 Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
