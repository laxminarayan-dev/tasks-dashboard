function SkeletonCard() {
  return (
    <div
      className={`bg-linear-to-br from-slate-50 via-slate-200 to-slate-50 rounded-2xl animate-pulse`}
    >
      <div className={`p-5`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 flex flex-col gap-2">
            <div className="w-30 h-4 bg-gray-300 rounded-2xl"></div>
            <div className="w-42 h-4 bg-gray-300 rounded-2xl"></div>
          </div>
          <div className="w-6 h-3 bg-gray-300 rounded-2xl"></div>
        </div>

        <div className="relative flex gap-2 h-10">
          <div className={`bg-gray-300 px-3 py-2 flex-1 rounded-2xl`}></div>
          <div className={`bg-gray-300 px-3 py-2 flex-1 rounded-2xl`}></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
