import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import  {AuthProvider}  from "./context/AuthContext.jsx";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import OwnerDashboard from "./pages/owner/OwnerDashboard.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const Unauthorized = () => {
  return <h1>403 - Unauthorized</h1>;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Admin */}
          <Route element={
            <ProtectedRoute
              allowedRoles={["ADMIN"]}
            />
          }>
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />
          </Route>

          {/* Normal User */}
          <Route element={
            <ProtectedRoute
              allowedRoles={["USER"]}
            />
          }>
            <Route
              path="/user"
              element={<UserDashboard />}
            />
          </Route>

          {/* Store Owner */}
          <Route element={
            <ProtectedRoute
              allowedRoles={["STORE_OWNER"]}
            />
          }>
            <Route
              path="/owner"
              element={<OwnerDashboard />}
            />
          </Route>

          {/* Unauthorized */}
          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />

          {/* Default */}
          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;