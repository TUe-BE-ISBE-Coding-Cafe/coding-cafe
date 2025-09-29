<script>
  import past from '$lib/data/past-events.json';
  import future from '$lib/data/future-events.json';

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatMonthShort = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
  };

  const getDay = (isoString) => new Date(isoString).getDate();
</script>

<section class="mx-auto max-w-screen-xl px-8 py-6">
  <h1 class="text-tue-red mb-8 text-3xl font-bold">Future Events</h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each future as event}
      <div class="group rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-xl transition block">
        <!-- Image (optional) -->
        {#if event.image}
          <div class="relative">
            <img src={event.image} alt={event.title} class="h-40 w-full object-cover" />
            <!-- Date Badge -->
            <div class="absolute top-3 left-3 bg-white rounded-lg shadow px-3 py-2 text-center">
              <div class="text-xl font-bold">{getDay(event.date)}</div>
              <div class="text-xs uppercase tracking-widest">{formatMonthShort(event.date)}</div>
            </div>
          </div>
        {/if}

        <div class="p-4 flex flex-col gap-2">
          <h2 class="text-lg font-semibold text-gray-800 group-hover:text-[#C8102E]">
            {event.title}
          </h2>
          {#if event.subtitle}
            <h3 class="text-md text-gray-600">{event.subtitle}</h3>
          {/if}
          {#if event.speaker}
            <p class="text-sm text-gray-600">🎤 {event.speaker}</p>
          {/if}
          <p class="text-sm text-gray-600">📅 {formatDate(event.date)}</p>

          <!-- Links -->
          <div class="flex flex-wrap gap-3 pt-1 text-sm">
            {#if event.repo}
              <a href={event.repo} target="_blank" class="text-blue-600 underline">
                💻 Exercises
              </a>
            {/if}
            {#if event.zenodo}
              <a href={event.zenodo} target="_blank" class="inline-flex items-center gap-2">
                <img src={`https://zenodo.org/badge/DOI/${event.zenodo}.svg`} alt="DOI badge" class="h-5" />
              </a>
            {/if}
          </div>

          <!-- Tags -->
          {#if event.tags}
            <div class="mt-2 flex flex-wrap gap-2">
              {#each event.tags as tag}
                <span class="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                  #{tag}
                </span>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</section>


<section class="mx-auto max-w-screen-xl px-8 py-6">
  <h1 class="text-tue-red mb-8 text-3xl font-bold">Past Events</h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each past as event}
      <a href={event.path} class="group rounded-2xl shadow-md overflow-hidden bg-gray-50 hover:shadow-xl transition block">
        {#if event.image}
          <div class="relative">
            <img src={event.image} alt={event.title} class="h-40 w-full object-cover grayscale" />
            <!-- Date Badge -->
            <div class="absolute top-3 left-3 bg-white rounded-lg shadow px-3 py-2 text-center">
              <div class="text-xl font-bold">{getDay(event.date)}</div>
              <div class="text-xs uppercase tracking-widest">{formatMonthShort(event.date)}</div>
            </div>
          </div>
        {/if}

        <div class="p-4 flex flex-col gap-2">
          <h2 class="text-lg font-semibold text-gray-800 group-hover:text-[#C8102E]">
            {event.title}
          </h2>
          {#if event.subtitle}
            <h3 class="text-md text-gray-600">{event.subtitle}</h3>
          {/if}
          {#if event.speaker}
            <p class="text-sm text-gray-600">🎤 {event.speaker}</p>
          {/if}
          <p class="text-sm text-gray-600">📅 {formatDate(event.date)}</p>

          <!-- Links -->
          <div class="flex flex-wrap gap-3 pt-1 text-sm">
            {#if event.repo}
        <button type="button" on:click={() => window.open(event.repo, "_blank")}
          class="text-blue-600 underline">💻 Exercises</button>
		              {/if}
            {#if event.zenodo}
       <button type="button" on:click={() => window.open(event.zenodo, "_blank")}
          class="flex items-center gap-2">
          <img src={`https://zenodo.org/badge/DOI/${event.zenodo}.svg`} alt="DOI badge" class="h-5" />
        </button>
            {/if}
          </div>

          <!-- Tags -->
          {#if event.tags}
            <div class="mt-2 flex flex-wrap gap-2">
              {#each event.tags as tag}
                <span class="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                  #{tag}
                </span>
              {/each}
            </div>
          {/if}
        </div>
      </a>
    {/each}
  </div>
</section>
