<template>
  <div id="cover">
    <h3>ภาพหน้าปก</h3>
    <div class="panel panel-default">
      <div class="panel-body">
  
        <div class="form-group" v-if="data.cover">
          <img :src="'http://localhost:3002/images/'+data.cover" style="width: 100%">
        </div>
        <div class="form-group" v-if="files.file">
          <div class="col-md-12">
            <progressUpload :props="files.file" :url="files.url" :course="data.id"></progressUpload>
          </div>
        </div>
        <div class="form-group" v-if="!files.file">
          <div class="col-md-12 text-center is-fileinput">
            <input type="file" accept="image/gif,image/jpeg,image/png" v-on:change="onBrowse('http://localhost:3002/api/coverupload',$event)">
            <button type="button" class="btn btn-raised btn-success">เปลี่ยนภาพหน้าปก</button>
          </div>
        </div>
  
      </div>
    </div>
  </div>
</template>

<script>
import http from '~/utils/http'
import ProgressUpload from '~components/ProgressUpload'

export default {
  name: 'cover',
  components: {
    ProgressUpload
  },
  data: function () {
    return {
      id: this.$route.params.id,
      data: {},
      files: {}
    }
  },
  created: function () {
    this.fetchData()
    this.$on('onCompleteUpload', function (index) {
      var obj = {}
      obj[index] = undefined
      this.$set(this, 'files', obj)
      this.fetchData()
    })
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
    },
    onBrowse: function (url, e) {
      var obj = {}
      obj['file'] = e.target.files[0]
      obj['url'] = url
      this.$set(this, 'files', obj)
    }
  }
}
</script>
