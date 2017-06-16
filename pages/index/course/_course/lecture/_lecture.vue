<template>
  <div class="lecture">
    <div class="video-player-box" @ended="onPlayerEnded($event)" v-video-player:video="playerOptions" v-show="lecture.contentType === 'VIDEO'"></div>
    <div id="pdf" v-show="lecture.contentType === 'PDF'"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PDFObject from 'pdfobject'
import finder from '~/utils/finder'

export default {
  data: function () {
    return {
      lecture: { id: 'haha' },
      playerOptions: {
        sources: [{
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: ''
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } }
      }
    }
  },
  computed: mapGetters({
    courses: 'course/courses'
  }),
  mounted: function () {
    this.$nextTick(function () {
      this.loadLecture()
    })
  },
  watch: {
    $route: function () {
      this.$nextTick(function () {
        this.loadLecture()
      })
    }
  },
  methods: {
    loadLecture: function () {
      this.lecture = finder.findLecture(this.courses, this.$route.params.lecture)
      if (this.lecture.contentType === 'VIDEO') {
        this.video.src({
          type: 'application/x-mpegURL',
          src: 'http://mpintegrity.mitrphol.com/vdo/' + this.lecture.uuid + '/720p.m3u8'
        })
      } else {
        PDFObject.embed('http://localhost:3002/files/' + this.lecture.id + '-' + this.lecture.content, '#pdf')
      }
    }
  }
}
</script>

<style lang="scss">
.lecture {

  .video-player-box {
    padding-bottom: 30px;
  }

  .pdfobject-container {
    height: 700px;
    padding-bottom: 30px;
  }
}
</style>
