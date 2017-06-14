<template>
  <div class="managecourse">
    <h3>จัดการสื่อการสอน</h3>
    <section class="ms-component-section">
  
      <div v-for="(lession,index) in data.lessions">
  
        <div class="row">
          <div class="col-md-12">
            <div class="panel-group ms-collapse" :id="'accordion-'+index" role="tablist" aria-multiselectable="true">
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" :id="'heading-'+index">
                  <div class="btn-group pull-right" style="z-index: 1000">
                    <button class="btn btn-raised btn-primary btn-xs" v-on:click="addLecture(index)">เพิ่มสื่อการสอน</button>
                    <button class="btn btn-raised btn-warning btn-xs" v-on:click="removeLession(index)">ลบหมวดหมู่</button>
                  </div>
                  <h4 class="panel-title ms-rotate-icon">
                    <a class="collapsed" role="button" data-toggle="collapse" :data-parent="'#accordion-'+index" :href="'#collapse-'+index" aria-expanded="false" :aria-controls="'#collapse-'+index">
                      <i class="zmdi zmdi-attachment-alt"></i> {{lession.name}}</a>
                  </h4>
                </div>
                <div :id="'collapse-'+index" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="'heading-'+index" aria-expanded="false" style="height: 0px;">
                  <div class="panel-body">
                    <form class="form-horizontal" autocomplete="off" v-on:submit.prevent="onSave">
                      <div class="form-group">
                        <div class="input-group col-md-11  col-md-offset-1">
                          <input type="text" class="form-control" v-model="lession.name" required>
                          <span class="input-group-btn">
                            <button class="btn btn-raised btn-primary btn-sm" type="submit">บันทึก</button>
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div v-for="(lecture,subIndex) in lession.lectures" class="row">
          <div class="col-md-11 col-md-offset-1">
            <div class="panel-group ms-collapse" :id="'accordion-'+index+'-'+subIndex" role="tablist" aria-multiselectable="true">
              <div class="panel panel-default">
                <div class="panel-heading" role="tab" :id="'heading-'+index+'-'+subIndex">
                  <div class="btn-group pull-right" style="z-index: 1000">
                    <button class="btn btn-raised btn-warning btn-xs" v-on:click="removeLecture(index,subIndex,$event)">ลบสื่อการสอน</button>
                  </div>
                  <h4 class="panel-title ms-rotate-icon">
                    <a class="collapsed" role="button" data-toggle="collapse" :data-parent="'#accordion-'+index+'-'+subIndex" :href="'#collapse-'+index+'-'+subIndex" aria-expanded="false" :aria-controls="'#collapse-'+index+'-'+subIndex">
                      <i class="zmdi zmdi-attachment-alt"></i> {{lecture.name}}</a>
                  </h4>
                </div>
                <div :id="'collapse-'+index+'-'+subIndex" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="'heading-'+index+'-'+subIndex" aria-expanded="false" style="height: 0px;">
                  <div class="panel-body">
                    <form class="form-horizontal" autocomplete="off" v-on:submit.prevent="onSave">
                      <div class="form-group">
                        <div class=" col-md-11  col-md-offset-1">
                          <div class="input-group">
                            <input type="text" class="form-control" v-model="lecture.name" required>
                            <span class="input-group-btn">
                              <button class="btn btn-raised btn-primary btn-sm" type="submit">บันทึก</button>
                            </span>
                          </div>
                        </div>
                      </div>
  
                      <div class="alert alert-primary alert-light alert-dismissible" role="alert" v-if="lecture.content">
                        <i class="zmdi zmdi-notifications"></i> {{lecture.content}}
                      </div>
  
                      <div class="form-group" v-if="files['i'+index+'s'+subIndex] === undefined">
                        <div class="col-md-12">
                          <div class="col-md-6 text-center is-fileinput">
                            <input type="file" accept="video/*" v-on:change="onBrowse('http://localhost:3002/api/videoupload',index,subIndex,$event)">
                            <button type="button" class="btn btn-raised btn-info">VDO</button>
                          </div>
                          <div class="col-md-6 text-center is-fileinput">
                            <input type="file" accept="application/pdf, application/x-pdf, application/acrobat, applications/vnd.pdf, text/pdf, text/x-pdf" v-on:change="onBrowse('http://localhost:3002/api/pdfupload',index,subIndex,$event)">
                            <button type="button" class="btn btn-raised btn-info">PDF</button>
                          </div>
                        </div>
                      </div>
  
                      <div class="form-group" v-if="files['i'+index+'s'+subIndex] !== undefined">
                        <div class="col-md-12">
                          <progressUpload :props="files['i'+index+'s'+subIndex]" :url="files['url'+index+'s'+subIndex]" :course="lecture.id" :index="'i'+index+'s'+subIndex"></progressUpload>
                        </div>
                      </div>
  
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
      </div>
      <div class="form-group">
        <div class="col-md-12">
          <button type="button" class="btn btn-raised btn-success" v-on:click="addLession()">เพิ่มบทเรียน</button>
        </div>
      </div>
  
      <!-- panel-code -->
    </section>
  </div>
</template>

<script>
import http from '~/utils/http'
import ProgressUpload from '~components/ProgressUpload'

export default {
  name: 'managecourse',
  components: {
    ProgressUpload
  },
  data: function () {
    return {
      id: this.$route.params.id,
      data: {},
      files: {
      }
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
    onSave: function () {
      var self = this
      http.post('/api/course', this.data)
        .then(function (response) {
          self.$set(self, 'data', response.data)
        })
    },
    addLession: function () {
      var self = this
      this.data.lessions.push({
        name: 'บทเรียนใหม่',
        lectures: []
      })
      http.post('/api/course', this.data)
        .then(function (response) {
          self.$set(self, 'data', response.data)
        })
    },
    removeLession: function (index) {
      var self = this
      this.data.lessions.splice(index, 1)
      http.post('/api/course', this.data)
        .then(function (response) {
          self.$set(self, 'data', response.data)
        })
    },
    addLecture: function (index) {
      var self = this
      this.data.lessions[index].lectures.push({
        name: 'สื่อการสอนใหม่'
      })
      http.post('/api/course', this.data)
        .then(function (response) {
          self.$set(self, 'data', response.data)
        })
    },
    removeLecture: function (index, subIndex) {
      var self = this
      this.data.lessions[index].lectures.splice(subIndex, 1)
      http.post('/api/course', this.data)
        .then(function (response) {
          self.$set(self, 'data', response.data)
        })
    },
    onBrowse: function (url, index, subIndex, e) {
      var obj = {}
      obj['i' + index + 's' + subIndex] = e.target.files[0]
      obj['url' + index + 's' + subIndex] = url
      this.$set(this, 'files', obj)
    }
  }
}
</script>

<style lang="scss">
.managecourse {
  .btn-group,
  .btn-group-vertical {
    margin: 10px 20px;
  }
}
</style>
