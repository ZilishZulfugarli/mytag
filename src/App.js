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
import RegisterRoute from "./utils/RegisterRoute"
import AdminPanel from "./pages/AdminPanel";
import Update from "./pages/Update";
import HomePage from './pages/HomePage'
import AdminRoute from "./utils/AdminRoute";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={
            <RegisterRoute>
              <Login />
            </RegisterRoute>
          } />
          <Route path="register" element={
            <RegisterRoute>
              <Register />
            </RegisterRoute>
          } />
          <Route path="userpanel" element={
            <ProtectedRoute>
              <UserPanel />
            </ProtectedRoute>
          } />
          <Route path="profile" element={<Profile />} />
          <Route path="adminpanel" element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } />
          <Route path="userpanel/update" element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>

  );
}

export default App;
