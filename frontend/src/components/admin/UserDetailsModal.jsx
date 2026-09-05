const UserDetailsModal = ({
  user,
  loading,
  error,
  onClose,
}) => {
  if (!user && !loading && !error) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm">

      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              User Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View complete user information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>

        </div>

        {/* Content */}
        <div className="p-6">

          {loading && (
            <div className="py-10 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading user details...
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {user && !loading && (
            <div className="space-y-4">

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Name
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {user.name}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Email
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {user.email}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Address
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {user.address || "—"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Role
                </p>

                <p className="mt-1 text-sm font-semibold text-blue-600">
                  {user.role}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  User ID
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {user.id}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

export default UserDetailsModal;