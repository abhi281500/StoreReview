const RatingTable = ({ ratings }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Customer Ratings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Users who have rated your store.
          </p>
        </div>

        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {ratings.length} ratings
        </span>

      </div>


      {/* Empty State */}
      {ratings.length === 0 ? (
        <div className="px-6 py-16 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
            ⭐
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-900">
            No ratings yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Customers have not rated your store yet.
          </p>

        </div>
      ) : (

        /* Table */
        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  User
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Email
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Address
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Rating
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Submitted
                </th>

              </tr>
            </thead>


            <tbody className="divide-y divide-slate-100">

              {ratings.map((rating) => (

                <tr
                  key={rating.ratingId}
                  className="transition hover:bg-slate-50"
                >

                  {/* User */}
                  <td className="px-5 py-4 sm:px-6">
                    <p className="font-medium text-slate-900">
                      {rating.user.name}
                    </p>
                  </td>


                  {/* Email */}
                  <td className="px-5 py-4 text-sm text-slate-600 sm:px-6">
                    {rating.user.email}
                  </td>


                  {/* Address */}
                  <td className="max-w-xs px-5 py-4 text-sm text-slate-600 sm:px-6">
                    <p className="break-words">
                      {rating.user.address}
                    </p>
                  </td>


                  {/* Rating */}
                  <td className="px-5 py-4 sm:px-6">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5">

                      <span>
                        ⭐
                      </span>

                      <span className="font-semibold text-slate-900">
                        {rating.rating}/5
                      </span>

                    </div>
                  </td>


                  {/* Date */}
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500 sm:px-6">
                    {new Date(rating.submittedAt).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </section>
  );
};

export default RatingTable;