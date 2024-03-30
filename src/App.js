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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="login" element={<Login/>}/>
        </Routes>
      </Router>
    </>

  );
}

export default App;
