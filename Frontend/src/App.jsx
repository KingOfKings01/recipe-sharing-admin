import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import UserRecipes from './pages/UserRecipes';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Default route */}  
        <Route path="/user/:userUuid/recipes" element={<UserRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<>404 Page not found</>} />

      </Routes>
    </Router>
  );
}

export default App;
