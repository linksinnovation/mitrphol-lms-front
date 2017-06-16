<template>
  <div class="course" v-if="getCourse()">
    <div class="material-background"></div>
    <div class="container container-full">
      <div class="ms-paper">
        <div class="row">
          <div class="col-md-3 ms-paper-menu-left-container">
            <div class="ms-paper-menu-left">
              <h3 class="ms-paper-menu-title">
                <i class="zmdi zmdi-apps"></i> เนื้อหาบทเรียน
                <a role="button" data-toggle="collapse" href="#collapseMenu" aria-expanded="false" aria-controls="collapseMenu" class="withripple">
                  <i class="zmdi zmdi-menu"></i>
                </a>
              </h3>
              <div id="collapseMenu" class="panel-menu collapse">
                <ul id="components-nav" role="tablist" aria-multiselectable="true" class="panel-group ms-collapse-nav">
                  <li role="tab" :id="'e'+index" class="panel" v-for="(lession,index) of getCourse().lessions">
                    <a role="button" data-toggle="collapse" data-parent="#components-nav" :href="'#c'+index" aria-expanded="false" :aria-controls="'c'+index" class="collapsed withripple">
                      <i class="fa fa-bold"></i> {{lession.name}}</a>
                    <ul :id="'c'+index" role="tabpanel" :aria-labelledby="'e'+index" class="panel-collapse collapse">
                      <li v-for="(lecture,subIndex) of lession.lectures">
                        <nuxt-link :to="'/course/'+courseId+'/lecture/'+lecture.id" class="withripple">
                          <i class="fa fa-font"></i> {{lecture.name}}</nuxt-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-9 ms-paper-content-container">
            <div class="ms-paper-content">
  
              <nuxt-child />
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import finder from '~/utils/finder'

export default {
  data: function () {
    return {
      courseId: this.$route.params.course,
      lectureId: this.$route.params.lecture
    }
  },
  computed: mapGetters({
    courses: 'course/courses'
  }),
  methods: {
    getCourse: function () {
      return finder.findCourse(this.courses, this.$route.params.course)
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
