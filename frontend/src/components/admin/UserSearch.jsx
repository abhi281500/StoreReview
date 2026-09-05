const UserSearch = ({
  searchName,
  searchEmail,
  searchAddress,
  searchRole,
  onNameChange,
  onEmailChange,
  onAddressChange,
  onRoleChange,
  onClear,
}) => {
  const hasSearch =
    searchName ||
    searchEmail ||
    searchAddress ||
    searchRole;

  return (
    <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Search Users
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Filter users by name, email, address, or role.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        {/* Name */}
        <input
          type="text"
          value={searchName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Search by name"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        {/* Email */}
        <input
          type="email"
          value={searchEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Search by email"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        {/* Address */}
        <input
          type="text"
          value={searchAddress}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="Search by address"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        {/* Role */}
        <select
          value={searchRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>

      </div>

      {hasSearch && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClear}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Clear Search
          </button>
        </div>
      )}
    </section>
  );
};

export default UserSearch;