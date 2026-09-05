const ChangePassword = ({
  currentPassword,
  newPassword,
  confirmPassword,
  isUpdating,
  error,
  success,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Change Password
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your account password securely.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5 p-6">

          {/* Current Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                onCurrentPasswordChange(e.target.value)
              }
              placeholder="Enter current password"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                onNewPasswordChange(e.target.value)
              }
              placeholder="Enter new password"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                onConfirmPasswordChange(e.target.value)
              }
              placeholder="Confirm new password"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Password Rule */}
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-600">
              Password must be 8–16 characters and include an
              uppercase letter and a special character.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm font-medium text-green-600">
                ✓ {success}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Update Password"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;