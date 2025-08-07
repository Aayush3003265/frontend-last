async function AllNewsPage({ params, searchParams }) {
  const slug = (await params).slug;
  const query = await searchParams;

  return (
    <div>
      <h1 className="text-5xl">News page</h1>
      <h2 className="text-3xl">{slug[0]}</h2>
      <h2 className="text-2xl">{slug[1]}</h2>
      <p>{query?.level}</p>
      <p>{slug[2]}</p>
    </div>
  );
}

export default AllNewsPage;
