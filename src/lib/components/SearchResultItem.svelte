<script lang="ts">
  import { inview } from "svelte-inview";
  import type { Options } from "svelte-inview";
  import type { ObjectsResponse } from "../api.types";
  import { fetchObjectDetails } from "../network";
  import Lightbox from "./Lightbox.svelte";

  export let item: number;
  let isInView = false;

  let lightbox: HTMLDialogElement;

  const inViewOptions: Options = {
    // trigger the handler 50px before the element enters the viewport to
    // minimize visible loading
    rootMargin: "50px",
    // we only need to trigger the load once, after that we can stop observing
    unobserveOnEnter: true,
  };

  function handleInviewChange({ detail }: CustomEvent<ObserverEventDetails>) {
    isInView = detail.inView;
  }

  function getHoverText(title: string): string {
    return (
      "Open full-size image of " +
      title +
      " in a modal. You can close the modal by clicking the x in the top right corner, or pressing escape."
    );
  }
</script>

<div
  class="flex h-[26rem] w-full items-center justify-center overflow-hidden
rounded-lg bg-gray-200 drop-shadow-lg hover:drop-shadow-xl"
  use:inview={inViewOptions}
  on:inview_change={handleInviewChange}
>
  {#if isInView}
    {#await fetchObjectDetails(item)}
      checking item details...
    {:then details}
      <!-- Card content -->
      <div
        class="flex h-full max-h-full min-h-full min-w-full flex-col
      justify-center"
      >
        {#if details?.primaryImageSmall}
          <button
            class="h-1/2 w-full object-cover focus:outline-none"
            on:click|stopPropagation={() => lightbox.showModal()}
            title={getHoverText(details.title)}
          >
            <img
              class="min-h-1/2 h-full w-full object-cover"
              loading="lazy"
              src={details?.primaryImageSmall
                ? details.primaryImageSmall
                : "https://raw.githubusercontent.com/julien-gargot/images-placeholder/master/placeholder-square.png"}
              alt={details.title}
              placeholder={details.title}
            />
          </button>
        {:else}
          <img
            class="min-h-1/2 h-1/2 w-full object-cover"
            loading="lazy"
            src={"https://raw.githubusercontent.com/julien-gargot/images-placeholder/master/placeholder-square.png"}
            alt={details.title}
            placeholder={details.title}
          />
        {/if}
        <a
          href={details.objectURL}
          target="_blank"
          class="h-1/2
        w-full focus:outline-none"
          title={`Open details for ${details.title} at metmuseum.org in new tab`}
        >
          <div
            class="flex h-full w-full flex-col justify-between rounded-b-lg py-2
        leading-4 shadow-lg"
          >
            <p class="text-lg font-semibold text-[#001141]">{details.title}</p>
            <div
              class="mx-4 grid grid-cols-2 gap-x-2 rounded-lg border-2 border-[#001141]
          py-2"
            >
              <div>
                {details.artistDisplayName
                  ? details.artistDisplayName
                  : "Artist Not Available"}
                <br />
                <span class="text-sm"
                  >{details.artistRole
                    ? details.artistRole
                    : "Role Not Available"}</span
                >
                <br />
                <span class="text-sm"
                  >{details.artistNationality
                    ? details.artistNationality
                    : "Nationality Not Available"}</span
                >
              </div>
              <div class="flex flex-col justify-center">
                {#if details.department}
                  {details.department}
                  <br />
                  <span class="text-sm">Department</span>
                {:else}
                  Department Not Available
                {/if}
              </div>
              <div></div>
            </div>
            <!-- tag bar -->
            {#if details.tags}
              <div class="mx-5 flex flex-row justify-between">
                <span class="text-left text-sm text-gray-600"> tags: </span>
                <div class="flex w-full flex-row items-center justify-evenly">
                  {#each details.tags.slice(0, 3) as tag}
                    <p
                      class="rounded-full bg-cyan-900 px-2 py-1 text-xs text-white"
                    >
                      {tag.term}
                    </p>
                  {/each}
                </div>
              </div>
            {/if}
            <p>{details.objectID}</p>
          </div>
        </a>
      </div>
      <Lightbox bind:dialog={lightbox}>
        <img
          loading="lazy"
          src={details?.primaryImage}
          alt={"Full size image of " + details.title}
          class="max-w-3/4 aspect-auto h-auto bg-opacity-0 focus:outline-none"
        />
        <button
          id="close"
          aria-label="close"
          formnovalidate
          on:click={() => lightbox.close()}
          class="absolute
        right-2 top-2 h-8 w-8 rounded-full bg-white text-xl text-black"
          >X</button
        >
      </Lightbox>
    {:catch err}
      {err}
    {/await}
  {:else}<div></div>{/if}
</div>
