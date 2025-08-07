async function NewsLayout({ children }) {
  return (
    <div>
      {children}

      <div className="my-5 bg-slate-900 h-52">
        <h2 className="text-2xl">Related News</h2>
      </div>
    </div>
  );
}

export default NewsLayout;
