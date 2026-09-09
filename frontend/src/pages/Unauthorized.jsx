import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">🚫</div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Access Denied
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          You do not have permission to access this page.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;