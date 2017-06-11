<template>
  <nav class="navbar yamm ms-navbar ms-navbar-primary shrink navbar-fixed-top">
    <div class="container container-full">
      <div class="navbar-header">
        <router-link :to="{path: '/'}" class="navbar-brand">
          <span class="ms-logo ms-logo-sm">M</span>
          <span class="ms-title">Mitrphol
            <strong>Groups</strong>
          </span>
        </router-link>
      </div>
  
      <div id="navbar" class="navbar-collapse collapse" v-if="authenticated">
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle animated fadeIn animation-delay-9" data-toggle="dropdown" data-hover="dropdown" role="button" aria-haspopup="true" aria-expanded="false" data-name="ecommerce">{{name}}
              <i class="zmdi zmdi-chevron-down"></i>
              <div class="ripple-container"></div>
            </a>
            <ul class="dropdown-menu">
              <li v-if="authority == 'Administrator'">
                <router-link :to="{path: '/assessment'}">
                  <i class="zmdi zmdi-view-compact"></i> เพิ่มแบบประเมิน</router-link>
              </li>
              <li v-if="authority == 'Administrator'">
                <router-link :to="{path: '/permission'}">
                  <i class="zmdi zmdi-view-compact"></i> กำหนดสิทธิ์การใช้งาน</router-link>
              </li>
              <li class="divider" v-if="authority == 'Administrator'"></li>
              <li>
                <a v-on:click="logout(this)">
                  <i class="zmdi zmdi-view-compact"></i> ออกจากระบบ</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  
      <div class="btn-navbar-menu" v-if="authenticated">
        <a href="#" class="dropdown-toggle white" data-toggle="dropdown" data-hover="dropdown" role="button" aria-haspopup="true" aria-expanded="false" data-name="ecommerce">
          <i class="zmdi zmdi-menu"></i>
        </a>
        <ul class="dropdown-menu">
          <li v-if="authority == 'Administrator'">
            <router-link :to="{path: '/assessment'}">
              <i class="zmdi zmdi-view-compact"></i> เพิ่มแบบประเมิน</router-link>
          </li>
          <li v-if="authority == 'Administrator'">
            <router-link :to="{path: '/permission'}">
              <i class="zmdi zmdi-view-compact"></i> กำหนดสิทธิ์การใช้งาน</router-link>
          </li>
          <li class="divider" v-if="authority == 'Administrator'"></li>
          <li>
            <a v-on:click="logout(this)">
              <i class="zmdi zmdi-view-compact"></i> ออกจากระบบ</a>
          </li>
        </ul>
      </div>
  
    </div>
    <!-- container -->
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'navbar',
  methods: {
    logout: function () {
      this.$store.dispatch('logout', this)
    }
  },
  computed: mapGetters({
    authenticated: 'authenticated',
    name: 'name',
    authority: 'authority'
  })
}
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .ms-navbar.shrink .btn-navbar-menu {
    display: none
  }
}

a.white,
a.white:hover,
a.white:focus,
a.white:active {
  text-decoration: none;
  color: #fff;
}

.dropdown-menu {
  right: 0 !important;
  left: auto !important;
  transform-origin: 100% 0 !important;
}
</style>
