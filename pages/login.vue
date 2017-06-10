<template>
  <div class="login">
    <div class="middle-box text-center animated fadeInDown">
      <div>
        <div>
          <h1 class="logo-name">INTEGRITY</h1>
        </div>
        <h3>ASSESSMENT</h3>
        <form class="mt" role="form" v-on:submit.prevent="onSubmit" autocomplete="off">
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
export default {
  name: 'login',
  data: function () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  }
}
</script>
