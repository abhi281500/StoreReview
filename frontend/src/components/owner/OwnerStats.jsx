const OwnerStats = ({ averageRating, totalRatings }) => {
  return (
    <section className="mb-8 grid gap-5 sm:grid-cols-2">

      {/* Average Rating */}
      <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

        <div className="flex items-start justify-between">

          <div>
            <p className="text-sm font-medium text-slate-500">
              Average Rating
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {averageRating}/5
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Overall store rating
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-xl transition group-hover:scale-105">
            ⭐
          </div>

        </div>

      </div>


      {/* Total Ratings */}
      <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

        <div className="flex items-start justify-between">

          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Ratings
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {totalRatings}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Customers who rated your store
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl transition group-hover:scale-105">
            👥
          </div>

        </div>

      </div>

    </section>
  );
};

export default OwnerStats;