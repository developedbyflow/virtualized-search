import { algoliasearch } from "algoliasearch";
const client = algoliasearch("LL89EYET9C", "5b81e52c6324bd78dbd61ff03cd87b4c");

interface Product {
  title: string;
  [key: string]: unknown;
}

interface APIResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface AlgoliaHit {
  title?: string;
  [key: string]: unknown;
}

export const getDataFromAPI = async (query: string): Promise<string[]> => {
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${encodedQuery}&limit=100`
  );

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  const data: APIResponse = await response.json();

  return data.products.map((p) => p.title);
};

export const getDataFromAlgolia = async (query: string): Promise<string[]> => {
  const response = await client.searchSingleIndex({
    indexName: "algolia_apparel_sample_dataset",
    searchParams: {
      query: query,
      hitsPerPage: 100,
    },
  });
  return response.hits.map((p: AlgoliaHit) => p.title || "");
};
