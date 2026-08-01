<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('landing').path('/').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

const stack = [
  'i-simple-icons-fastapi',
  'i-simple-icons-python',
  'i-simple-icons-postgresql',
  'i-simple-icons-pypi'
]

const ownershipFeatures = [
  {
    title: 'SQL is the contract',
    description: 'Claim, fencing, uniqueness, and retry budget live in PL/pgSQL — Python is a typed client.',
    icon: 'i-lucide-database'
  },
  {
    title: 'Safe settles',
    description: 'Attempt fencing and typed settle races mean a lost HTTP response never discards finished work.',
    icon: 'i-lucide-shield-check'
  },
  {
    title: 'Optional HTTP facade',
    description: 'Workers can stay credential-free. Auth is injected — outlabs-auth is optional, never required.',
    icon: 'i-lucide-globe'
  }
]

const capabilities = [
  {
    title: 'Typed enqueue',
    description: 'created / existed / replaced / skipped_locked — never silent null on conflict.',
    icon: 'i-lucide-plus-circle',
    to: '/api/enqueue'
  },
  {
    title: 'Fenced claims',
    description: 'SKIP LOCKED plus per-attempt UUIDs so stale workers cannot settle stolen jobs.',
    icon: 'i-lucide-hand',
    to: '/api/claim-and-heartbeat'
  },
  {
    title: 'Handler results',
    description: 'Complete, Snooze, Cancel, Retry — mapped to SQL without burning budget on snooze.',
    icon: 'i-lucide-list-checks',
    to: '/concepts/fencing-and-settles'
  },
  {
    title: 'HTTP facade',
    description: 'Mount FastAPI routes for fleets that must not hold database credentials.',
    icon: 'i-lucide-server',
    to: '/api/http-facade'
  },
  {
    title: 'Housekeeping',
    description: 'Tick, lease reaper, schedules — NOTIFY for latency, poll for correctness.',
    icon: 'i-lucide-timer',
    to: '/operations/housekeeping'
  },
  {
    title: 'Redrive',
    description: 'Failed rows are the DLQ. Inspect, then redrive without hand UPDATEs.',
    icon: 'i-lucide-rotate-ccw',
    to: '/operations/redrive-and-dlq'
  }
]

const docs = [
  {
    title: 'Read the introduction',
    description: 'Why a Postgres-native queue, and how it relates to outlabs-auth.',
    icon: 'i-lucide-book-open',
    to: '/getting-started/introduction'
  },
  {
    title: 'Install extras',
    description: 'Core, [http], and optional [outlabs] dependency tiers.',
    icon: 'i-lucide-download',
    to: '/getting-started/install'
  },
  {
    title: 'Quickstart',
    description: 'Define a task, enqueue with typed results, run a worker.',
    icon: 'i-lucide-zap',
    to: '/getting-started/quickstart'
  }
]

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Docs', {
  title,
  description,
  headline: 'Postgres-native task queue'
})
</script>

<template>
  <div>
    <UPageHero
      orientation="horizontal"
      class="overflow-hidden border-b border-default"
      :ui="{
        container: 'py-20 sm:py-28 lg:py-32',
        title: 'font-display text-5xl sm:text-6xl lg:text-7xl font-semibold',
        description: 'max-w-2xl',
        links: 'gap-3'
      }"
    >
      <template #top>
        <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,color-mix(in_oklab,var(--ui-primary)_14%,transparent),transparent_36%)]" />
        <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </template>

      <template #headline>
        <UBadge
          label="Pre-alpha · design-complete"
          icon="i-lucide-package"
          color="primary"
          variant="subtle"
          size="lg"
          class="rounded-full"
        />
      </template>

      <template #title>
        A task queue that lives in <span class="text-primary">your Postgres.</span>
      </template>

      <template #description>
        OutlabsTaskq is a SQL-first job queue for Python fleets: claim, fence, retry, and settle through PL/pgSQL — with a typed Python client and an optional FastAPI facade.
      </template>

      <template #links>
        <UButton
          label="Start reading"
          to="/getting-started/introduction"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
        />
        <UButton
          label="Explore on GitHub"
          to="https://github.com/outlabsio/outlabs-taskq"
          target="_blank"
          color="neutral"
          variant="outline"
          size="xl"
          icon="i-simple-icons-github"
        />
      </template>

      <UPageCard
        variant="outline"
        spotlight
        spotlight-color="primary"
        class="overflow-hidden shadow-2xl shadow-primary/10"
        :ui="{ container: 'p-0 sm:p-0 gap-0' }"
      >
        <div class="flex items-center justify-between border-b border-default bg-elevated/60 px-4 py-3">
          <div
            class="flex items-center gap-1.5"
            aria-hidden="true"
          >
            <span class="size-2.5 rounded-full bg-error" />
            <span class="size-2.5 rounded-full bg-warning" />
            <span class="size-2.5 rounded-full bg-success" />
          </div>
          <span class="font-mono text-xs text-muted">worker.py</span>
          <UBadge
            label="Postgres"
            color="neutral"
            variant="soft"
            size="sm"
          />
        </div>

        <div class="bg-default p-5 sm:p-7">
          <pre class="overflow-x-auto font-mono text-[13px] leading-6 text-toned"><code><span class="text-primary">from</span> taskq <span class="text-primary">import</span> TaskQ, Complete

tq = TaskQ(dsn=DATABASE_URL, queues=[<span class="text-primary">"courts"</span>])

<span class="text-primary">@</span>tq.task(queue=<span class="text-primary">"courts"</span>, retry=<span class="text-primary">5</span>)
<span class="text-primary">async def</span> scrape(ctx, payload: dict):
    data = <span class="text-primary">await</span> do_scrape(payload)
    <span class="text-primary">return</span> Complete(result={<span class="text-primary">"n"</span>: len(data)})

<span class="text-primary">await</span> tq.run()</code></pre>
        </div>

        <div class="grid gap-px border-t border-default bg-default sm:grid-cols-3">
          <div class="bg-elevated/40 p-4">
            <UIcon
              name="i-lucide-database"
              class="mb-2 size-5 text-primary"
            />
            <p class="text-sm font-semibold text-highlighted">
              SQL contract
            </p>
            <p class="mt-0.5 text-xs text-muted">
              taskq.* functions
            </p>
          </div>
          <div class="bg-elevated/40 p-4">
            <UIcon
              name="i-lucide-shield-check"
              class="mb-2 size-5 text-success"
            />
            <p class="text-sm font-semibold text-highlighted">
              Fenced
            </p>
            <p class="mt-0.5 text-xs text-muted">
              attempt_id CAS
            </p>
          </div>
          <div class="bg-elevated/40 p-4">
            <UIcon
              name="i-lucide-globe"
              class="mb-2 size-5 text-info"
            />
            <p class="text-sm font-semibold text-highlighted">
              Optional HTTP
            </p>
            <p class="mt-0.5 text-xs text-muted">
              Facade + auth inject
            </p>
          </div>
        </div>
      </UPageCard>
    </UPageHero>

    <UContainer class="py-10 sm:py-12">
      <UPageLogos
        title="Built for the Python stack you already operate"
        :items="stack"
        :ui="{
          title: 'text-sm font-medium text-muted',
          logos: 'mt-8 justify-center gap-x-10 sm:gap-x-16',
          logo: 'size-7 sm:size-8 opacity-60 hover:opacity-100 transition-opacity'
        }"
      />
    </UContainer>

    <UPageSection
      headline="Own the queue"
      title="Your jobs should feel like part of your database"
      description="OutlabsTaskq keeps the hot path inside Postgres. No second broker to back up, no client-clock lease math, and no silent unique-skip footguns."
      :features="ownershipFeatures"
      :ui="{ container: 'border-y border-default' }"
    />

    <UPageSection
      headline="Capabilities"
      title="What the protocol covers"
      description="The docs track the intended public surface as the package lands. Start with concepts, then API and operations."
    >
      <UPageGrid>
        <UPageCard
          v-for="item in capabilities"
          :key="item.title"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          :to="item.to"
          variant="subtle"
          spotlight
          spotlight-color="primary"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      headline="Documentation"
      title="Read in order"
      description="Design-complete today. Implementation is catching up — these pages are the contract."
    >
      <UPageGrid class="lg:grid-cols-3">
        <UPageCard
          v-for="item in docs"
          :key="item.title"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          :to="item.to"
          variant="outline"
        />
      </UPageGrid>
    </UPageSection>
  </div>
</template>
