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
import Subscribe from "./pages/Subscribe";
import UserCard from "./pages/UserCard";
import AllProducts from "./pages/AllProducts";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {

  // const [language, setLanguage] = useState(null);

  // const [defaultLang, setdefaultLang] = useState(null);

  // const [basketProducts, setbasketProducts] = useState([]);


  // useEffect(() => {
  //   const lang = localStorage.getItem('language');
  //   if (lang) {
  //     setdefaultLang(lang);
  //   }
  //   else {
  //     setdefaultLang("En")
  //   }

  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const req = await axios.get(`https://localhost:7092/api/Home?language=${defaultLang}`);

  //       const response = await axios.get(`https://localhost:7092/api/Admin/GetLanguageByAbv?abv=${defaultLang}`);

  //       if (response.status == 200 && localStorage.getItem('language') == null) {
  //         const language = response.data.langAbv;
  //         localStorage.setItem("language", language);
  //       }
  //       if (req.status === 200) {
  //         setLanguage(req.data.language.value)
  //         const existingBasket = JSON.parse(localStorage.getItem("basket")) || "";
  //         setbasketProducts(existingBasket);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
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
          <Route path="subscribe" element={
            <ProtectedRoute>
              <Subscribe />
            </ProtectedRoute>
          } />

          <Route path="usercard/:cardPath" element={<UserCard />} />

          <Route path="products" element={<AllProducts />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
