<template>
  <navbar>
  </navbar>
</template>

<script>
import Navbar from '~components/Navbar'

export default {
  name: 'index',
  middleware: 'auth',
  components: {
    Navbar
  }
}
</script>
