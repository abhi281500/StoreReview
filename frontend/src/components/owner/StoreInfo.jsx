const StoreInfo = ({ store }) => {
  if (!store) {
    return null;
  }

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
      
      {/* Section Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Store Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Details of your registered store.
        </p>
      </div>

      {/* Store Details */}
      <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">

        {/* Store Name */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Store Name
          </p>

          <p className="mt-2 break-words text-sm font-semibold text-slate-900 sm:text-base">
            {store.name}
          </p>
        </div>

        {/* Email */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Email
          </p>

          <p className="mt-2 break-all text-sm font-semibold text-slate-900 sm:text-base">
            {store.email}
          </p>
        </div>

        {/* Address */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Address
          </p>

          <p className="mt-2 break-words text-sm font-semibold text-slate-900 sm:text-base">
            {store.address}
          </p>
        </div>

      </div>
    </section>
  );
};

export default StoreInfo;