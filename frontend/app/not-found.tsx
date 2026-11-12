import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas text-main p-6 font-lato">
      <div className="max-w-md w-full p-8 rounded-xl border border-subtle bg-panel text-center">
        <h1 className="text-xl font-bold tracking-tight mb-2 text-main">
          Page Not Found
        </h1>
        <p className="text-xs text-sub mb-6 leading-relaxed">
          The requested analytical view or customer cohort route does not exist.
        </p>
        <Link
          href="/dashboard"
          className="btn-primary w-full"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
