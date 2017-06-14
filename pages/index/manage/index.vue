<template>
  <div class="course">
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
                    <a role="button" data-toggle="collapse" data-parent="#components-nav" href="#c1" aria-expanded="true" aria-controls="c1" class="collapsed withripple">
                      <i class="fa fa-bold"></i> บทเรียน</a>
                    <ul id="c1" role="tabpanel" aria-labelledby="e1" class="panel-collapse collapse">
                      <li>
                        <router-link :to="{path: '/manage/'+id+'/course'}" class="withripple">
                          <i class="fa fa-font"></i> จัดการบทเรียน</router-link>
                      </li>
                    </ul>
                  </li>
  
                  <li role="tab" id="e2" class="panel">
                    <a role="button" data-toggle="collapse" data-parent="#components-nav" href="#c2" aria-expanded="true" aria-controls="c2" class="withripple">
                      <i class="zmdi zmdi-tab"></i> ตั้งค่า</a>
                    <ul id="c2" role="tabpanel" aria-labelledby="e2" class="panel-collapse collapse in">
                      <li>
                        <router-link :to="{path: '/manage/'+id+'/setting'}" class="withripple">
                          <i class="zmdi zmdi-tab"></i> ตั้งค่าบทเรียน</router-link>
                      </li>
                      <li>
                        <router-link :to="{path: '/manage/'+id+'/cover'}" class="withripple">
                          <i class="zmdi zmdi-menu"></i> ภาพหน้าปก</router-link>
                      </li>
                    </ul>
                  </li>
  
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-9 ms-paper-content-container">
            <div class="ms-paper-content">
  
              <nuxt-child/>
  
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
      id: this.$route.params.id
    }
  }
}
</script>

<style lang="scss">
.course {
  min-height: calc(100vh - 140px);

  .material-background {
    height: 400px;
  }
  .ms-collapse-nav li.panel ul a.nuxt-link-active {
    background-color: rgba(0, 0, 0, .3);
    color: #fff;
  }
}
</style>
