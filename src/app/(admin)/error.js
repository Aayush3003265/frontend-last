"use client";

function ErrorLayout({ error }) {
  return (
    <div className="text-center py-10 w-full text-red-500">
      {error.message}
    </div>
  );
}

export default ErrorLayout;
