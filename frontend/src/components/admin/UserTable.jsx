import { useState } from "react";

const UserTable = ({ users, onViewDetails }) => {
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

  const sortedUsers = [...users].sort((a, b) => {
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

  const getRoleStyle = (role) => {
    if (role === "ADMIN") {
      return "bg-purple-50 text-purple-700 border-purple-200";
    }

    if (role === "STORE_OWNER") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="text-4xl">👥</div>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          No users found
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Users
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {users.length} user{users.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">

          <thead className="bg-slate-50">
            <tr>

              <th className="px-5 py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Name
                  <span>{getSortIcon("name")}</span>
                </button>
              </th>

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

              <th className="px-5 py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("role")}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Role
                  <span>{getSortIcon("role")}</span>
                </button>
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {sortedUsers.map((user) => (
              <tr
                key={user.id}
                className="transition hover:bg-slate-50"
              >

                {/* Name */}
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-900">
                    {user.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    ID: {user.id}
                  </p>
                </td>

                {/* Email */}
                <td className="px-5 py-4 text-sm text-slate-600">
                  {user.email}
                </td>

                {/* Address */}
                <td className="max-w-xs px-5 py-4 text-sm text-slate-600">
                  <p className="truncate">
                    {user.address || "—"}
                  </p>
                </td>

                {/* Role */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getRoleStyle(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Action */}
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onViewDetails(user.id)}
                    className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                  >
                    View Details
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;