export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center space-y-4">
        <p className="text-6xl md:text-7xl font-bold text-slate-500">404</p>
        <h1 className="text-3xl md:text-4xl font-bold">Page not found</h1>
        <p className="text-base md:text-lg text-slate-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
      </div>
    </div>
  );
}
