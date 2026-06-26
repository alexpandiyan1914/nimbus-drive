function Breadcrumbs({
    breadcrumbs,
    onNavigate,
}) {
    return (
        <div className="flex gap-2 mb-6">
            <span
                className="cursor-pointer text-slate-400 hover:text-white"
                onClick={() => onNavigate(null)}
            >
                My Drive
            </span>

            {breadcrumbs.map((crumb) => (
                <div
                    key={crumb.id}
                    className="flex gap-2"
                >
                    <span className="text-slate-500">
                        &gt;
                    </span>

                    <span
                        onClick={() =>
                            onNavigate(crumb.id)
                        }
                        className="
              cursor-pointer
              text-slate-400
              hover:text-white
            "
                    >
                        {crumb.name}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Breadcrumbs;