<template>
  <div class="col-md-3">
    <router-link class="card-link" :to="{path: path}">
      <div class="card card-info animated zoomInUp animation-delay-5">
        <div class="withripple zoom-img card-img">
          <img :src="'http://localhost:3002/images/'+props.cover" alt="..." class="img-responsive">
        </div>
        <div class="card-block">
          <strong class="color-primary">{{props.title}}</strong>
          <p>{{props.detail}}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: ['props', 'path']
}
</script>

<style lang="scss">
.card-img {
  height: 150px;
}

.card {
  min-height: 325px;
  .card-block {
    padding: 1rem;
  }
}

a.card-link,
a.card-link:hover,
a.card-link:focus,
a.card-link:active {
  text-decoration: none;
  color: #000;
}
</style>

