// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = process.env.NUXT_SITE_URL || 'https://taskq.outlabs.io'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    '@nuxtjs/mcp-toolkit'
  ],

  devtools: {
    enabled: true
  },

  // Umami (self-hosted). Only inject on production builds so local `nuxt dev`
  // does not pollute taskq.outlabs.io analytics. SPA navigations are tracked
  // automatically by the Umami script via the History API.
  // Dedicated taskq website id — do not reuse the auth.outlabs.io website id.
  app: {
    head: {
      script: process.env.NODE_ENV === 'production'
        ? [{
            'src': 'https://analytics.outlabs.io/script.js',
            'defer': true,
            'data-website-id': '06a3855e-d074-40bd-bcbd-c1f7dbc03139'
          }]
        : []
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: siteUrl,
    name: 'OutlabsTaskq Docs'
  },

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  runtimeConfig: {
    public: {
      siteUrl
    }
  },

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'static',
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // Fonts via @nuxt/fonts (registered by Nuxt UI) — families referenced in CSS
  fonts: {
    families: [
      { name: 'DM Sans', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Fraunces', provider: 'google', weights: [500, 600, 700] }
    ]
  },

  llms: {
    domain: siteUrl,
    title: 'OutlabsTaskq',
    description: 'Library-first Postgres task queue for Python fleets — SQL contract, typed client, optional FastAPI facade.',
    full: {
      title: 'OutlabsTaskq — Full Documentation',
      description: 'Complete OutlabsTaskq implementer documentation.'
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' }
        ]
      },
      {
        title: 'Concepts',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/concepts%' }
        ]
      },
      {
        title: 'API',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/api%' }
        ]
      },
      {
        title: 'Operations',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/operations%' }
        ]
      },
      {
        title: 'Reference',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/reference%' }
        ]
      }
    ]
  },

  mcp: {
    name: 'OutlabsTaskq Docs'
  },

  ogImage: {
    zeroRuntime: true
  }
})
