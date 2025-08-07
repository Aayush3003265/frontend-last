function ProfileLayout({ children }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700">
      <div className="max-w-screen-xl container mx-auto px-4 py-10">
        {children}
      </div>
    </div>
  );
}

export default ProfileLayout;
