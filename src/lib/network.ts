import type { ObjectsResponse, SearchResponse } from "./api.types";
import { BASEURL } from "./constants";

export async function fetchObjectDetails(id: number): Promise<ObjectsResponse> {
  const res = await fetch(`${BASEURL}objects/${id}`);
  if (res.ok) {
    return res.json();
  } else {
    const errorMessage = `Data for object with id ${id} was unavailable`;
    console.error(errorMessage);
    // also throw it here so that the svelte error block catches it and renders
    // an error state
    throw new Error(errorMessage);
  }
}

export async function fetchSearch(input: string): Promise<SearchResponse> {
  const res = await fetch(`${BASEURL}search?${convertInputQuery(input)}`);
  if (res.ok) {
    return res.json();
  } else {
    const errorMessage = `Error retrieving search results for query "${input}"`;
    throw new Error(errorMessage);
  }
}

function convertInputQuery(input: string) {
  return new URLSearchParams({ q: input }).toString();
}
