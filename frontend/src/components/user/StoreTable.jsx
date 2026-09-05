import { useState } from "react";

const StoreTable = ({ stores, onRate, onUpdate }) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedStores = [...stores].sort((a, b) => {
    if (!sortField) return 0;

    let valueA = a[sortField];
    let valueB = b[sortField];

    // Not rated stores
    if (valueA === null) valueA = -1;
    if (valueB === null) valueB = -1;

    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
    }

    if (typeof valueB === "string") {
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }

    return 0;
  });

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return "↕";
    }

    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      {/* Table Header */}
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Store Directory
            </h3>

            <p className="text-sm text-slate-500">
              View ratings and submit your review.
            </p>
          </div>

          <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {stores.length} {stores.length === 1 ? "Store" : "Stores"}
          </span>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="border-b border-slate-200 bg-slate-50">

            <tr>

              {/* Store Name */}
              <th className="px-6 py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 transition hover:text-slate-900"
                >
                  Store Name
                  <span className="text-sm">
                    {getSortIcon("name")}
                  </span>
                </button>
              </th>

              {/* Address */}
              <th className="px-6 py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("address")}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 transition hover:text-slate-900"
                >
                  Address
                  <span className="text-sm">
                    {getSortIcon("address")}
                  </span>
                </button>
              </th>

              {/* Overall Rating */}
              <th className="px-6 py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("overallRating")}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 transition hover:text-slate-900"
                >
                  Overall Rating
                  <span className="text-sm">
                    {getSortIcon("overallRating")}
                  </span>
                </button>
              </th>

              {/* User Rating */}
              <th className="px-6 py-4 text-left">
                <button
                  type="button"
                  onClick={() =>
                    handleSort("userSubmittedRating")
                  }
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 transition hover:text-slate-900"
                >
                  Your Rating
                  <span className="text-sm">
                    {getSortIcon("userSubmittedRating")}
                  </span>
                </button>
              </th>

              {/* Action */}
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {sortedStores.map((store) => (

              <tr
                key={store.id}
                className="transition-colors hover:bg-slate-50"
              >

                {/* Store Name */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-semibold text-blue-600">
                      {store.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {store.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Store #{store.id}
                      </p>
                    </div>

                  </div>
                </td>

                {/* Address */}
                <td className="px-6 py-5">
                  <div className="max-w-xs">

                    <p className="text-sm text-slate-600">
                      {store.address}
                    </p>

                  </div>
                </td>

                {/* Overall Rating */}
                <td className="px-6 py-5">

                  <div className="flex items-center gap-2">

                    <span className="text-base">
                      ⭐
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {store.overallRating}/5
                    </span>

                  </div>

                </td>

                {/* Your Rating */}
                <td className="px-6 py-5">

                  {store.userSubmittedRating !== null ? (

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                      ⭐ {store.userSubmittedRating}/5
                    </span>

                  ) : (

                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                      Not rated
                    </span>

                  )}

                </td>

                {/* Action */}
                <td className="px-6 py-5">

                  {store.userSubmittedRating === null ? (

                    <button
                      type="button"
                      onClick={() => onRate(store)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                      Rate Store
                    </button>

                  ) : (

                    <button
                      type="button"
                      onClick={() => onUpdate(store)}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
                    >
                      Update Rating
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default StoreTable;