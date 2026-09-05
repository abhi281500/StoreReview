import { useState } from "react";

const StoreTable = ({ stores }) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedStores = [...stores].sort((a, b) => {
    if (!sortField) return 0;

    let valueA = a[sortField] ?? "";
    let valueB = b[sortField] ?? "";

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
    if (sortField !== field) return "↕";

    return sortOrder === "asc" ? "↑" : "↓";
  };

  if (stores.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="text-4xl">🏪</div>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          No stores found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Stores
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {stores.length} store{stores.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">

          <thead className="bg-slate-50">
            <tr>

              {/* Store Name */}
              <th className="px-5 py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Store Name
                  <span>{getSortIcon("name")}</span>
                </button>
              </th>

              {/* Address */}
              <th className="px-5 py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("address")}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Address
                  <span>{getSortIcon("address")}</span>
                </button>
              </th>

              {/* Email */}
              <th className="px-5 py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("email")}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Email
                  <span>{getSortIcon("email")}</span>
                </button>
              </th>

              {/* Owner */}
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Owner
              </th>

              {/* Rating */}
              <th className="px-5 py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("overallRating")}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Rating
                  <span>{getSortIcon("overallRating")}</span>
                </button>
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {sortedStores.map((store) => (
              <tr
                key={store.id}
                className="transition hover:bg-slate-50"
              >

                {/* Store Name */}
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-900">
                    {store.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    ID: {store.id}
                  </p>
                </td>

                {/* Address */}
                <td className="max-w-xs px-5 py-4 text-sm text-slate-600">
                  <p className="truncate">
                    {store.address || "—"}
                  </p>
                </td>

                {/* Email */}
                <td className="px-5 py-4 text-sm text-slate-600">
                  {store.email || "—"}
                </td>

                {/* Owner */}
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-700">
                    {store.owner?.name || store.ownerName || "—"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {store.owner?.email || ""}
                  </p>
                </td>

                {/* Rating */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">
                      ⭐
                    </span>

                    <span className="font-semibold text-slate-900">
                      {store.overallRating ?? 0}
                    </span>

                    <span className="text-xs text-slate-400">
                      / 5
                    </span>
                  </div>
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