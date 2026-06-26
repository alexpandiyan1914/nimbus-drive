function Breadcrumbs() {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
      <span className="cursor-pointer hover:text-white">
        My Drive
      </span>

      <span>›</span>

      <span className="text-white">
        Documents
      </span>
    </div>
  );
}

export default Breadcrumbs;