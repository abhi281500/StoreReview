import { useEffect, useState } from "react";

import {
  getDashboard,
  createUser,
  createAdmin,
  createStoreOwner,
  createStore,
  getUsers,
  getUserById,
  getStores,
} from "../../services/admin.service.js";

import AdminHeader from "../../components/admin/AdminHeader.jsx";
import AdminStats from "../../components/admin/AdminStats.jsx";
import AdminActions from "../../components/admin/AdminActions.jsx";

import CreateUserModal from "../../components/admin/CreateUserModal.jsx";
import CreateAdminModal from "../../components/admin/CreateAdminModal.jsx";
import CreateStoreOwnerModal from "../../components/admin/CreateStoreOwnerModal.jsx";
import CreateStoreModal from "../../components/admin/CreateStoreModal.jsx";

import UserSearch from "../../components/admin/UserSearch.jsx";
import UserTable from "../../components/admin/UserTable.jsx";
import UserDetailsModal from "../../components/admin/UserDetailsModal.jsx";

const AdminDashboard = () => {

  // =========================
  // Dashboard State
  // =========================

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  // =========================
  // Users State
  // =========================

  const [users, setUsers] = useState([]);
  const [individual, setIndividual] = useState(null);


  // =========================
  // Stores State
  // =========================

  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);


  // =========================
  // Form State
  // =========================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [ownerId, setOwnerId] = useState("");


  // =========================
  // Modal State
  // =========================

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

const [searchName, setSearchName] = useState("");
const [searchEmail, setSearchEmail] = useState("");
const [searchAddress, setSearchAddress] = useState("");
const [searchRole, setSearchRole] = useState("");
  // =========================
  // Dashboard
  // =========================

  const handleDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const api = await getDashboard();

      console.log("DASHBOARD RESPONSE:", api);

      setData(api.data);

    } catch (error) {

      console.error("DASHBOARD ERROR:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch dashboard"
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // Create User
  // =========================

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const credentials = {
      name,
      email,
      address,
      password,
    };

    try {

      setLoading(true);
      setError(null);

      const api = await createUser(credentials);

      console.log("CREATE USER RESPONSE:", api);

      // Close modal
      setIsUserModalOpen(false);

      // Refresh users
      handlegetUsers();

      // Refresh dashboard stats
      handleDashboard();

    } catch (error) {

      console.error("CREATE USER ERROR:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to create user"
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // Create Admin
  // =========================

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    const credentials = {
      name,
      email,
      address,
      password,
    };

    try {

      setLoading(true);
      setError(null);

      const api = await createAdmin(credentials);

      console.log("CREATE ADMIN RESPONSE:", api);

      // Close modal
      setIsAdminModalOpen(false);

      // Refresh users because admin is also a user
      handlegetUsers();

      // Refresh dashboard
      handleDashboard();

    } catch (error) {

      console.error("CREATE ADMIN ERROR:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to create admin"
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // Create Store Owner
  // =========================

  const handleCreateStoreOwner = async (e) => {
    e.preventDefault();

    const credentials = {
      name,
      email,
      address,
      password,
    };

    try {

      setLoading(true);
      setError(null);

      const api = await createStoreOwner(credentials);

      console.log("CREATE STORE OWNER RESPONSE:", api);

      // Close modal
      setIsOwnerModalOpen(false);

      // Refresh users
      handlegetUsers();

      // Refresh owners dropdown
      handleGetOwners();

      // Refresh dashboard
      handleDashboard();

    } catch (error) {

      console.error("CREATE STORE OWNER ERROR:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to create store owner"
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // Create Store
  // =========================

  const handleCreateStore = async (e) => {
    e.preventDefault();

    const credentials = {
      name,
      email,
      address,
      ownerId,
    };

    try {

      setLoading(true);
      setError(null);

      const api = await createStore(credentials);

      console.log("CREATE STORE RESPONSE:", api);

      // Close modal
      setIsStoreModalOpen(false);

      // Refresh stores
      handlegetStores();

      // Refresh dashboard stats
      handleDashboard();

    } catch (error) {

      console.error("CREATE STORE ERROR:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to create store"
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // Get Users
  // =========================

  const handlegetUsers = async () => {

    try {

      setLoading(true);
      setError(null);

      const api = await getUsers();

      console.log("USERS RESPONSE:", api);

      setUsers(api.data);

    } catch (error) {

      console.error("GET USERS ERROR:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch users"
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // Get User By ID
  // =========================

  const handleGetUserById = async (id) => {

    try {

      setLoading(true);
      setError(null);

      const api = await getUserById(id);

      console.log("USER DETAILS:", api);

      setIndividual(api.data);

    } catch (error) {

      console.error("GET USER ERROR:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user"
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // Get Stores
  // =========================

  const handlegetStores = async () => {

    try {

      setLoading(true);
      setError(null);

      const api = await getStores();

      console.log("STORES RESPONSE:", api);

      setStores(api.data);

    } catch (error) {

      console.error("GET STORES ERROR:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch stores"
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // Get Store Owners
  // =========================

  const handleGetOwners = async () => {

    try {

      setError(null);

      const api = await getUsers();

      console.log("ALL USERS FOR OWNER FILTER:", api);

      const storeOwners = api.data.filter(
        (user) => user.role === "STORE_OWNER"
      );

      setOwners(storeOwners);

    } catch (error) {

      console.error("GET STORE OWNERS ERROR:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch store owners"
      );
    }
  };


  // =========================
  // Initial API Calls
  // =========================

  useEffect(() => {

    handleDashboard();
    handlegetStores();
    handlegetUsers();

  }, []);


  // =========================
  // Reset Form
  // =========================

  const resetForm = () => {

    setName("");
    setEmail("");
    setAddress("");
    setPassword("");
    setOwnerId("");
    setError(null);

  };


  // =========================
  // Close User Modal
  // =========================

  const closeUserModal = () => {

    setIsUserModalOpen(false);
    resetForm();

  };


  // =========================
  // Close Admin Modal
  // =========================

  const closeAdminModal = () => {

    setIsAdminModalOpen(false);
    resetForm();

  };


  // =========================
  // Close Owner Modal
  // =========================

  const closeOwnerModal = () => {

    setIsOwnerModalOpen(false);
    resetForm();

  };


  // =========================
  // Close Store Modal
  // =========================

  const closeStoreModal = () => {

    setIsStoreModalOpen(false);
    resetForm();

  };


  const filteredUsers = users.filter((user) => {
  const nameMatch = user.name
    ?.toLowerCase()
    .includes(searchName.toLowerCase());

  const emailMatch = user.email
    ?.toLowerCase()
    .includes(searchEmail.toLowerCase());

  const addressMatch = user.address
    ?.toLowerCase()
    .includes(searchAddress.toLowerCase());

  const roleMatch =
    !searchRole || user.role === searchRole;

  return (
    nameMatch &&
    emailMatch &&
    addressMatch &&
    roleMatch
  );
});


  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================
          Main Content
      ========================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">


        {/* =========================
            Header
        ========================= */}

        <AdminHeader />


        {/* =========================
            Stats
        ========================= */}

        <AdminStats
          totalUsers={data?.totalUsers || 0}
          totalStores={data?.totalStores || 0}
          totalRatings={data?.totalRatings || 0}
        />


        {/* =========================
            Quick Actions
        ========================= */}

        <AdminActions

          onAddUser={() => {
            resetForm();
            setIsUserModalOpen(true);
          }}

          onAddAdmin={() => {
            resetForm();
            setIsAdminModalOpen(true);
          }}

          onAddStoreOwner={() => {
            resetForm();
            setIsOwnerModalOpen(true);
          }}

          onAddStore={() => {
            resetForm();
            setIsStoreModalOpen(true);
            handleGetOwners();
          }}

        />


        {/* =========================
            Create User Modal
        ========================= */}

        {isUserModalOpen && (

          <CreateUserModal
            name={name}
            email={email}
            address={address}
            password={password}
            loading={loading}
            error={error}

            onNameChange={setName}
            onEmailChange={setEmail}
            onAddressChange={setAddress}
            onPasswordChange={setPassword}

            onSubmit={handleCreateUser}
            onClose={closeUserModal}
          />

        )}


        {/* =========================
            Create Admin Modal
        ========================= */}

        {isAdminModalOpen && (

          <CreateAdminModal
            name={name}
            email={email}
            address={address}
            password={password}
            loading={loading}
            error={error}

            onNameChange={setName}
            onEmailChange={setEmail}
            onAddressChange={setAddress}
            onPasswordChange={setPassword}

            onSubmit={handleCreateAdmin}
            onClose={closeAdminModal}
          />

        )}


        {/* =========================
            Create Store Owner Modal
        ========================= */}

        {isOwnerModalOpen && (

          <CreateStoreOwnerModal
            name={name}
            email={email}
            address={address}
            password={password}
            loading={loading}
            error={error}

            onNameChange={setName}
            onEmailChange={setEmail}
            onAddressChange={setAddress}
            onPasswordChange={setPassword}

            onSubmit={handleCreateStoreOwner}
            onClose={closeOwnerModal}
          />

        )}


        {/* =========================
            Create Store Modal
        ========================= */}

        {isStoreModalOpen && (

          <CreateStoreModal
            name={name}
            email={email}
            address={address}
            ownerId={ownerId}
            owners={owners}
            loading={loading}
            error={error}

            onNameChange={setName}
            onEmailChange={setEmail}
            onAddressChange={setAddress}
            onOwnerChange={setOwnerId}

            onSubmit={handleCreateStore}
            onClose={closeStoreModal}
          />

        )}

      </main>

    </div>
  );
};


export default AdminDashboard;