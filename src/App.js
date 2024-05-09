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
import AdminPanel from "./pages/AdminPanel";
import Update from "./pages/Update";
import HomePage from './pages/HomePage'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="userpanel" element={<UserPanel />} />
          <Route path="profile" element={<Profile />} />
          <Route path="adminpanel" element={<AdminPanel />} />
          <Route path="userpanel/update" element={<Update />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
