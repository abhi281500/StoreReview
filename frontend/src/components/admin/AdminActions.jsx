const AdminActions = ({
  onAddUser,
  onAddAdmin,
  onAddStoreOwner,
  onAddStore,
}) => {
  const actions = [
    {
      label: "Add User",
      description: "Create a normal user account",
      icon: "👤",
      onClick: onAddUser,
    },
    {
      label: "Add Admin",
      description: "Create an administrator account",
      icon: "🛡️",
      onClick: onAddAdmin,
    },
    {
      label: "Add Store Owner",
      description: "Create a store owner account",
      icon: "👨‍💼",
      onClick: onAddStoreOwner,
    },
    {
      label: "Add Store",
      description: "Create and assign a store",
      icon: "🏪",
      onClick: onAddStore,
    },
  ];

  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage users, administrators, store owners, and stores.
        </p>
      </div>

      {/* Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <div className="flex items-start justify-between gap-4">
              
              <div>
                <h3 className="font-semibold text-slate-900">
                  {action.label}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {action.description}
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg transition group-hover:scale-105 group-hover:bg-blue-50">
                {action.icon}
              </div>

            </div>

            <div className="mt-4 text-xs font-semibold text-blue-600">
              Open →
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default AdminActions;