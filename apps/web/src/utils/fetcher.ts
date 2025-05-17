async function apiFetcher(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: unknown = null,
  headers: HeadersInit = {},
): Promise<Response> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: data ? JSON.stringify(data) : null,
  };

  return await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${url}`, options);
}

export default apiFetcher;
