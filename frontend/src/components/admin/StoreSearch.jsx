const StoreSearch = ({
  searchName,
  searchAddress,
  onNameChange,
  onAddressChange,
  onClear,
}) => {
  const hasSearch = searchName || searchAddress;

  return (
    <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Search Stores
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Filter stores by name or address.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {/* Store Name */}
        <input
          type="text"
          value={searchName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Search by store name"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        {/* Address */}
        <input
          type="text"
          value={searchAddress}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="Search by address"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

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

export default StoreSearch;