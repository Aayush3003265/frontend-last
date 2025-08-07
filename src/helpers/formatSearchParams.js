function getFormattedParams(searchParams) {
  if (!searchParams) return "";

  let query = "";

  Object.entries(searchParams).map((params) => {
    const [key, value] = params;

    if (value) query = `${query == "" ? "" : query + "&"}${key}=${value}`;
  });

  return query;
}

export default getFormattedParams;
