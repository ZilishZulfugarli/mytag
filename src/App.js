import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login"
import Register from './pages/Register'
import UserPanel from './pages/UserPanel'
import Profile from './pages/Profile'
import ProtectedRoute from "./utils/ProtectedRoute";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="userpanel" element={<UserPanel/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </>

  );
}

export default App;
