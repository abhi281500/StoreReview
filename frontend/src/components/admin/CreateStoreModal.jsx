const CreateStoreModal = ({
  name,
  email,
  address,
  ownerId,
  owners,
  loading,
  error,
  onNameChange,
  onEmailChange,
  onAddressChange,
  onOwnerChange,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Add Store
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a store and assign a store owner.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5 p-6">

          {/* Store Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Store Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter store name"
              required
              minLength={20}
              maxLength={60}
              disabled={loading}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
            />
          </div>

          {/* Store Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Store Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="store@example.com"
              required
              disabled={loading}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
            />
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Store Address
            </label>

            <textarea
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              placeholder="Enter store address"
              required
              maxLength={400}
              rows={3}
              disabled={loading}
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
            />
          </div>

          {/* Store Owner */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Store Owner
            </label>

            <select
              value={ownerId}
              onChange={(e) => onOwnerChange(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
            >
              <option value="">
                Select a store owner
              </option>

              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} — {owner.email}
                </option>
              ))}
            </select>

            {owners.length === 0 && (
              <p className="mt-2 text-xs text-amber-600">
                No store owners available. Create a store owner first.
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || owners.length === 0}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Store"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStoreModal;