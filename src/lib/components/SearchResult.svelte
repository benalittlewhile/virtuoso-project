<script lang="ts">
  import type { SearchResponse } from "../api.types";
  import { fetchSearch } from "../network";
  import SearchResultItem from "./SearchResultItem.svelte";

  export let searchResult: SearchResponse;
  export let searchQuery: string = "Eyck";
  let inputValue = searchQuery;

  function getNewValues() {
    fetchSearch(inputValue)
      .then((val) => {
        searchResult = val;
      })
      .catch((err) => {
        console.error(err);
        alert(`Error: ${err}, please try again`);
      });
  }
</script>

<div
  class="flex max-h-[800px] w-full min-w-full max-w-[1440px]
flex-col items-center justify-center gap-4 px-4 pt-4"
>
  <div
    class="mt-0 flex h-14 w-4/5 max-w-full items-center justify-between rounded-full bg-[#001755] px-3 py-4 drop-shadow-lg"
  >
    <form
      class="max-w-1/2 mt-0 flex min-h-9 w-3/4"
      on:submit|preventDefault={() => {
        getNewValues();
      }}
    >
      <input
        class="w-full items-center justify-between rounded-full bg-gray-200 px-4
        drop-shadow-lg focus:outline-none"
        bind:value={inputValue}
        on:keyup|preventDefault={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
      />
    </form>
    <div
      class="mt-0 flex min-h-9 w-32 items-center justify-between rounded-full px-4 text-white"
    >
      Results: {searchResult.total}
    </div>
  </div>

  {#if searchResult.objectIDs && searchResult.objectIDs.length > 0}
    <div
      class="grid max-h-full w-full min-w-full max-w-full grid-cols-1 gap-4 overflow-y-scroll md:grid-cols-2 xl:grid-cols-3"
    >
      {#each searchResult.objectIDs as id}
        <SearchResultItem item={id}></SearchResultItem>
      {/each}
    </div>
  {:else}
    <div
      class="flex h-48 w-96 items-center justify-center overflow-hidden rounded-lg bg-gray-200 drop-shadow-lg"
    >
      <div
        class="flex h-full w-full items-center justify-center text-lg text-[#001141]"
      >
        No objects found for the given search term
      </div>
    </div>
  {/if}
</div>
