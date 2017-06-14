<template>
  <div class="login">
    <div class="middle-box text-center animated fadeInDown">
      <div>
        <div>
          <h1 class="logo-name">LEARNING</h1>
        </div>
        <h3>MANAGEMENT SYSTEM</h3>
        <form class="mt" role="form" v-on:submit.prevent="onSubmit" autocomplete="off">
          <div class="alert alert-danger alert-light alert-dismissible" role="alert" v-if="error != ''">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <i class="zmdi zmdi-close"></i>
            </button>
            <strong>
              <i class="zmdi zmdi-close-circle"></i> Error!
            </strong>
            {{error}}
          </div>
  
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" required="" v-model="credentials.username">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" required="" v-model="credentials.password">
          </div>
          <button type="submit" class="btn btn-raised btn-primary block full-width mb">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'login',
  data: function () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      this.$store.dispatch('login', this)
    }
  },
  computed: mapGetters({
    error: 'error'
  })
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  color: #676a6c;
  background-color: #f3f3f4;
  position: absolute;
  top: 0px;

  .middle-box {
    max-width: 300px;
    z-index: 100;
    margin: 0 auto;
    padding-top: 10%;
    h1 {
      &.logo-name {
        color: #039BE0;
        font-size: 35px;
        font-weight: 800;
        letter-spacing: -1px;
        margin-bottom: 0;
      }
    }
    h3 {
      margin-top: 5px;
      font-weight: 600;
      font-size: 16px;
    }
    .block {
      display: block;
    }
    .full-width {
      width: 100% !important;
    }
    .btn-white {
      color: inherit;
      background: white;
      border: 1px solid #e7eaec;
      &:focus,
      &:hover {
        color: inherit;
        border: 1px solid #d2d2d2;
      }
    }
    .mt {
      margin-top: 15px;
    }
    .mb {
      margin-bottom: 15px;
    }
  }
}
</style>
