<script setup lang="ts">
const { seo } = useAppConfig()
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl.replace(/\/$/, '')
const canonicalUrl = computed(() => `${siteUrl}${route.path === '/' ? '' : `${route.path.replace(/\/$/, '')}/`}`)
const isStaging = siteUrl.includes('taskq-staging.')

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})

useHead(() => ({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/outlabsTaskqIcon-mark.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'shortcut icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'canonical', href: canonicalUrl.value }
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://outlabs.io/#organization',
          'name': 'OutLabs LLC',
          'url': 'https://outlabs.io',
          'logo': `${siteUrl}/outlabsTaskqIcon-mark.svg`,
          'sameAs': ['https://github.com/outlabsio']
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          'url': siteUrl,
          'name': 'OutlabsTaskq Documentation',
          'description': 'Documentation for OutlabsTaskq — a Postgres-native task queue for Python fleets.',
          'publisher': { '@id': 'https://outlabs.io/#organization' },
          'inLanguage': 'en'
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${siteUrl}/#software`,
          'name': 'OutlabsTaskq',
          'applicationCategory': 'DeveloperApplication',
          'operatingSystem': 'Cross-platform',
          'softwareVersion': '0.1.0a26',
          'url': siteUrl,
          'codeRepository': 'https://github.com/outlabsio/outlabs-taskq',
          'downloadUrl': 'https://pypi.org/project/outlabs-taskq/',
          'license': 'https://github.com/outlabsio/outlabs-taskq/blob/main/LICENSE',
          'programmingLanguage': 'Python',
          'author': { '@id': 'https://outlabs.io/#organization' },
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        }
      ]
    })
  }],
  htmlAttrs: {
    lang: 'en'
  }
}))

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  ogType: 'website',
  ogLocale: 'en_US',
  ogUrl: () => canonicalUrl.value,
  robots: isStaging ? 'noindex, nofollow' : 'index, follow',
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
