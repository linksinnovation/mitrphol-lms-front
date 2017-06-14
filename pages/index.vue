<template>
  <div id="app">
    <navbar></navbar>
    <nuxt-child/>
    <footbar></footbar>
  </div>
</template>

<script>
import Navbar from '~components/Navbar'
import Footbar from '~components/Footbar'

export default {
  middleware: 'auth',
  components: {
    Navbar,
    Footbar
  }
}
</script>

<style lang="scss">
body {
  padding-top: 90px;
}
</style>
