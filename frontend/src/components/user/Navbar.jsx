const Navbar = ({ onChangePassword, onLogout }) => {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg text-white shadow-sm">
            S
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              StoreReview
            </h2>

            <p className="hidden text-xs text-slate-400 sm:block">
              Store Rating Platform
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Change Password */}
          <button
            type="button"
            onClick={onChangePassword}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:px-4"
          >
            <span className="hidden sm:inline">
              Change Password
            </span>

            <span className="sm:hidden">
              Password
            </span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 sm:px-4"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;