import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950 dark:text-white">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
        <span className="font-mono text-lg font-bold">404</span>
      </div>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
        Page Not Found
      </h1>
      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
        The requested resource does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
      >
        Return to IRON DOME
      </Link>
    </div>
  );
}
