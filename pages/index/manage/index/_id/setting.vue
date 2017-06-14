<template>
  <form class="form-horizontal" autocomplete="off" v-on:submit.prevent="onSave">
    <h3>ตั้งค่าบทเรียน</h3>
    <div class="form-group">
      <label for="title" class="col-md-2 control-label">หัวข้อ</label>
      <div class="col-md-10">
        <input type="text" class="form-control" id="title" v-model="data.title" required>
      </div>
    </div>
    <div class="form-group">
      <label for="textArea" class="col-md-2 control-label">รายละเอียด</label>
      <div class="col-md-10">
        <textarea class="form-control" rows="5" id="textArea" v-model="data.detail" required></textarea>
      </div>
    </div>
  
    <div class="form-group">
      <div class="col-md-10 col-md-offset-2">
        <button type="submit" class="btn btn-raised btn-primary">บันทึกการตั้งค่า</button>
      </div>
    </div>
  </form>
</template>

<script>
import http from '~/utils/http'

export default {
  data: function () {
    return {
      id: this.$route.params.id,
      data: {}
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
        .get('/api/course/' + this.id)
        .then(function (response) {
          self.$set(self, 'data', response.data)
        })
        .catch(() => {
          self.$router.replace('/login')
        })
    },
    onSave: function () {
      var self = this
      http
        .post('/api/course', this.data)
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
