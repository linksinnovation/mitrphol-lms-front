<template>
  <div id="cardboard" class="container mt-2">
  
    <card v-for="item of data" :props="item" :path="'/course/'+item.id" :key="item.id"></card>
  
  </div>
</template>

<script>
import http from '~/utils/http'
import Card from '~components/Card'

export default {
  components: {
    Card
  },
  data: function () {
    return {
      data: []
    }
  },
  created: function () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function () {
      var self = this
      http
        .get('/api/course')
        .then((response) => {
          self.$set(self, 'data', response.data)
        })
        .catch(() => {
          self.$router.replace('/login')
        })
    }
  }
}
</script>

<style lang="scss">
#cardboard {
  min-height: calc(100vh - 160px);
}
</style>
