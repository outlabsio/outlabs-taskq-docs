export default defineAppConfig({
  ui: {
    colors: {
      // Semantic aliases → Tailwind palettes (Nuxt UI design system).
      // Orange brand accents; zinc for surfaces (slate reads too blue).
      primary: 'orange',
      neutral: 'zinc'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'OutlabsTaskq Docs'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: 'OutlabsTaskq',
      light: '/outlabsTaskqLogo.svg',
      dark: '/outlabsTaskqLogo-dark.svg'
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/outlabsio/outlabs-taskq',
      'target': '_blank',
      'aria-label': 'OutlabsTaskq on GitHub'
    }, {
      'icon': 'i-lucide-package',
      'to': 'https://github.com/outlabsio/outlabs-taskq/releases/tag/v0.1.0a19',
      'target': '_blank',
      'aria-label': 'outlabs-taskq releases'
    }]
  },
  footer: {
    credits: `© ${new Date().getFullYear()} OutLabs LLC`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/outlabsio/outlabs-taskq',
      'target': '_blank',
      'aria-label': 'GitHub'
    }, {
      'icon': 'i-lucide-package',
      'to': 'https://github.com/outlabsio/outlabs-taskq/releases',
      'target': '_blank',
      'aria-label': 'Releases'
    }]
  },
  toc: {
    title: 'On this page',
    bottom: {
      title: 'Resources',
      edit: 'https://github.com/outlabsio/outlabs-taskq-docs/edit/main/content',
      links: [{
        icon: 'i-lucide-package',
        label: 'GitHub release',
        to: 'https://github.com/outlabsio/outlabs-taskq/releases/tag/v0.1.0a19',
        target: '_blank'
      }, {
        icon: 'i-lucide-book-open',
        label: 'Design specs',
        to: 'https://github.com/outlabsio/outlabs-taskq/tree/main/docs',
        target: '_blank'
      }]
    }
  }
})
