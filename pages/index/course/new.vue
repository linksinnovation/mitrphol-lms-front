<template>
  <div class="course-new">
    <div class="material-background"></div>
    <div class="container container-full">
      <div class="ms-paper">
        <div class="row">
          <div class="col-md-3 ms-paper-menu-left-container">
            <div class="ms-paper-menu-left">
              <h3 class="ms-paper-menu-title">
                <i class="zmdi zmdi-apps"></i> จัดการบทเรียน
                <a role="button" data-toggle="collapse" href="#collapseMenu" aria-expanded="false" aria-controls="collapseMenu" class="withripple">
                  <i class="zmdi zmdi-menu"></i>
                </a>
              </h3>
              <div id="collapseMenu" class="panel-menu collapse">
                <ul id="components-nav" role="tablist" aria-multiselectable="true" class="panel-group ms-collapse-nav">
                  <li role="tab" id="e1" class="panel">
                    <a role="button" data-toggle="collapse" data-parent="#components-nav" href="#c1" aria-expanded="true" aria-controls="c1" class="withripple">
                      <i class="fa fa-bold"></i> ตั้งค่า</a>
                    <ul id="c1" role="tabpanel" aria-labelledby="e1" class="panel-collapse collapse in">
                      <li>
                        <nuxt-link to="/course/new" class="withripple active">
                          <i class="fa fa-font"></i> ตั้งค่าบทเรียน</nuxt-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-9 ms-paper-content-container">
            <div class="ms-paper-content">
  
              <form class="form-horizontal" autocomplete="off" v-on:submit.prevent="onSave">
                <fieldset>
                  <legend>ตั้งค่าบทเรียน</legend>
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
                </fieldset>
              </form>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      data: {
        title: '',
        detail: ''
      }
    }
  },
  methods: {
    onSave: function () {
      this.$store.dispatch('course/add', this)
    }
  }
}
</script>

<style lang="scss">
.course-new {
  min-height: calc(100vh - 140px);

  .material-background {
    height: 400px;
  }
}
</style>
