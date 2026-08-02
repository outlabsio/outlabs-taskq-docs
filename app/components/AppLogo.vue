<script setup lang="ts">
const colorMode = useColorMode()
const { header } = useAppConfig()

const src = computed(() => {
  const logo = header?.logo
  if (!logo) {
    return '/outlabsTaskqLogo.svg'
  }
  return colorMode.value === 'dark' ? (logo.dark || logo.light) : logo.light
})
</script>

<template>
  <img
    :src="src"
    :alt="header?.logo?.alt || 'OutlabsTaskq'"
    class="h-7 w-auto"
  >
</template>
