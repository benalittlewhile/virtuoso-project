<script lang="ts">
  import "./app.css";
  import SearchResult from "./lib/components/SearchResult.svelte";
  import { mockEyckRes } from "./lib/mock/mockSearches";

  let testData = { label: "eyck", data: mockEyckRes };
</script>

<main class="w-full max-w-full p-2 sm:px-0">
  <SearchResult searchResult={testData.data} searchQuery={testData.label}
  ></SearchResult>
</main>

<style>
</style>
