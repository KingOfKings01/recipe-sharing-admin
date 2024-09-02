import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import LogIn from './pages/LogIn';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Default route */}  
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<>404 Page not found</>} />

      </Routes>
    </Router>
  );
}

export default App;
