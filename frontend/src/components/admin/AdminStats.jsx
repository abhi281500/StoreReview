const AdminStats = ({
  totalUsers,
  totalStores,
  totalRatings,
}) => {
  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "Registered users",
      icon: "👥",
    },
    {
      title: "Total Stores",
      value: totalStores,
      description: "Stores on platform",
      icon: "🏪",
    },
    {
      title: "Total Ratings",
      value: totalRatings,
      description: "Ratings submitted",
      icon: "⭐",
    },
  ];

  return (
    <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {stats.map((stat) => (
        <div
          key={stat.title}
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl transition group-hover:scale-105">
              {stat.icon}
            </div>

          </div>
        </div>
      ))}

    </section>
  );
};

export default AdminStats;