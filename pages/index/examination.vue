<template>
  <div class="examination">
    <div class="ms-hero-page-override ms-hero-img-city ms-hero-bg-royal">
      <div class="container">
        <div class="text-center">
          <h1 class="no-m ms-site-title color-white center-block ms-site-title-lg mt-2 animated zoomInDown animation-delay-5">คลังข้อสอบ
          </h1>
          <form class="mw-500 center-block animated fadeInUp">
            <div class="form-group is-empty">
              <input type="text" placeholder="ค้นหาชุดข้อสอบจากคลังข้อสอบ" class="form-control color-white">
            </div>
            <button type="button" class="btn btn-raised btn-primary btn-block">
              <i class="zmdi zmdi-search"></i> ค้นหา</button>
          </form>
        </div>
      </div>
    </div>
  
    <div class="container">
      <div class="card card-hero animated slideInUp animation-delay-8 mb-6">
        <div class="card-block">
          <h2 class="right-line color-primary">ชุดแบบทดสอบ</h2>
          <div class="row">
            <div class="col-md-12">
              <ul class="list-line">
                <li>
                  <a href="#">Qui assumenda veniam impedit inventore blanditiis nulla? (100 ข้อ)</a>
                </li>
                <li>
                  <a href="#">Amet, sunt, harum. Fugiat, reprehenderit mollitia dolore?</a>
                </li>
                <li>
                  <a href="#">Ullam possimus sapiente ratione, nemo eum saepe?</a>
                </li>
                <li>
                  <a href="#">Eius adipisci obcaecati quidem dolorum, saepe maxime?</a>
                </li>
                <li>
                  <a href="#">Ratione pariatur omnis sed ea quos optio?</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- row -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.examination {
  min-height: calc(100vh - 100px);
}
</style>
