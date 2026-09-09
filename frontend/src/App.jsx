import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import OwnerDashboard from "./pages/owner/OwnerDashboard.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">🚫</div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Access Denied
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          You do not have permission to access this page.
        </p>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ==================== PUBLIC ROUTES ==================== */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* ==================== ADMIN ROUTES ==================== */}

          <Route
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]} />
            }
          >
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />
          </Route>


          {/* ==================== USER ROUTES ==================== */}

          <Route
            element={
              <ProtectedRoute allowedRoles={["USER"]} />
            }
          >
            <Route
              path="/user"
              element={<UserDashboard />}
            />
          </Route>


          {/* ==================== STORE OWNER ROUTES ==================== */}

          <Route
            element={
              <ProtectedRoute allowedRoles={["STORE_OWNER"]} />
            }
          >
            <Route
              path="/owner"
              element={<OwnerDashboard />}
            />
          </Route>


          {/* ==================== UNAUTHORIZED ==================== */}

          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />


          {/* ==================== DEFAULT ROUTE ==================== */}

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