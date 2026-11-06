import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131418] text-[#ECEEF2] p-6 font-lato">
      <div className="max-w-md w-full p-8 rounded-2xl border border-white/[0.08] bg-[#181A20] text-center shadow-2xl">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-indigo-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-xl font-black tracking-tight mb-2">Cohort Resource Not Found</h1>
        <p className="text-xs text-[#848CA2] mb-6 leading-relaxed">
          The requested analytical report, page, or telemetry stream does not exist or has been archived.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-sm"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
