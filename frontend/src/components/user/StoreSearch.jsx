const StoreSearch = ({
  searchName,
  searchAddress,
  onNameChange,
  onAddressChange,
}) => {
  const hasSearch = searchName || searchAddress;

  const clearSearch = () => {
    onNameChange("");
    onAddressChange("");
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      {/* Search Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Find a Store
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search stores by name or address.
          </p>
        </div>

        {/* Clear Search */}
        {hasSearch && (
          <button
            type="button"
            onClick={clearSearch}
            className="w-fit rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Clear Search
          </button>
        )}

      </div>

      {/* Search Inputs */}
      <div className="grid gap-5 md:grid-cols-2">

        {/* Store Name */}
        <div>
          <label
            htmlFor="store-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Store Name
          </label>

          <div className="relative">

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base">
              🔍
            </span>

            <input
              id="store-name"
              type="text"
              value={searchName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Search by store name..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

          </div>
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="store-address"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Address
          </label>

          <div className="relative">

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base">
              📍
            </span>

            <input
              id="store-address"
              type="text"
              value={searchAddress}
              onChange={(e) => onAddressChange(e.target.value)}
              placeholder="Search by address..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

          </div>
        </div>

      </div>

    </section>
  );
};

export default StoreSearch;