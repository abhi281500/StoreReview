import { useState } from "react";

const RatingModal = ({
  isOpen,
  selectedStore,
  rating,
  isUpdating,
  submitting,
  onChange,
  onSubmit,
  onClose,
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen || !selectedStore) {
    return null;
  }

  const ratings = [1, 2, 3, 4, 5];

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  const activeRating = hoveredRating || Number(rating);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {isUpdating ? "Update Rating" : "Rate Store"}
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {selectedStore.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {selectedStore.address}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6">

          {/* Overall Rating */}
          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-sm font-medium text-slate-600">
              Overall Store Rating
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              ⭐ {selectedStore.overallRating}/5
            </p>
          </div>

          {/* User Rating */}
          <div className="mt-7 text-center">

            <p className="text-sm font-semibold text-slate-700">
              {isUpdating
                ? "Update your rating"
                : "How would you rate this store?"}
            </p>

            {/* Stars */}
            <div
              className="mt-5 flex justify-center gap-2"
              onMouseLeave={() => setHoveredRating(0)}
            >
              {ratings.map((value) => {
                const selected = activeRating >= value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      onChange({
                        target: {
                          value: String(value),
                        },
                      })
                    }
                    onMouseEnter={() => setHoveredRating(value)}
                    disabled={submitting}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl transition-all duration-150 ${
                      selected
                        ? "scale-105 border-amber-300 bg-amber-50"
                        : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                    aria-label={`Rate ${value} out of 5`}
                  >
                    <span
                      className={
                        selected
                          ? "opacity-100"
                          : "grayscale opacity-40"
                      }
                    >
                      ⭐
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Rating Label */}
            <div className="mt-5 h-7">
              {activeRating > 0 && (
                <p className="text-sm font-semibold text-amber-600">
                  {activeRating}/5 — {ratingLabels[activeRating]}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!rating || submitting}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : isUpdating
                ? "Update Rating"
                : "Submit Rating"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;