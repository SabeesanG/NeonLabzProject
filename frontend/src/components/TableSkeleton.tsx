export default function TableSkeleton() {
  return (
    <div className="animate-fade-in-up overflow-x-auto rounded-xl border border-slate-300 bg-white/88 shadow-sm backdrop-blur-[2px]">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-600">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-right">Price</th>
            <th className="px-6 py-3 text-left">Created At</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="bg-white">
              <td className="px-6 py-4">
                <div className="skeleton-shimmer h-4 w-32 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="skeleton-shimmer h-4 w-56 rounded" />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="ml-auto skeleton-shimmer h-4 w-24 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="skeleton-shimmer h-4 w-28 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="mx-auto flex w-28 gap-2">
                  <div className="skeleton-shimmer h-4 w-12 rounded" />
                  <div className="skeleton-shimmer h-4 w-14 rounded" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
