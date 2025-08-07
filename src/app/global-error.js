"use client";

function GlobalErrorBoundary() {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl">Something went wrong.</h1>
          <button
            className="bg-primary mt-5 py-2 px-5 rounded"
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}

export default GlobalErrorBoundary;
