<template>
  <div id="cardboard" class="container mt-2">
  
    <card v-for="item of courses" :props="item" :path="'/course/'+item.id" :key="item.id"></card>
  
  </div>
</template>

<script>
import Card from '~components/Card'
import { mapGetters } from 'vuex'

export default {
  components: {
    Card
  },
  computed: mapGetters({
    courses: 'courses'
  })
}
</script>

<style lang="scss">
#cardboard {
  min-height: calc(100vh - 160px);
}
</style>
