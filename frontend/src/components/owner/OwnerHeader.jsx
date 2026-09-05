const OwnerHeader = ({ storeName }) => {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <p className="text-sm font-medium text-blue-600">
          Store Owner Dashboard
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Monitor your store performance and customer ratings.
        </p>

        <div className="mt-5 inline-flex max-w-full items-center rounded-xl bg-slate-50 px-4 py-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Your Store
            </p>

            <p className="mt-1 truncate text-base font-semibold text-slate-900 sm:text-lg">
              {storeName}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OwnerHeader;