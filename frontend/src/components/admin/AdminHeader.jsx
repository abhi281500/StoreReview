const AdminHeader = () => {
  return (
    <section className="mb-8">
      <div className="max-w-3xl">

        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600" />

          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Admin Dashboard
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Manage StoreReview
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Manage users, stores, store owners, and platform activity from one place.
        </p>

      </div>
    </section>
  );
};

export default AdminHeader;