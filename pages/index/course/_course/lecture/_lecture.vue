<template>
  <div class="lecture">
    <div class="video-player-box" @ended="onPlayerEnded($event)" v-video-player:myVideoPlayer="playerOptions"></div>
  </div>
</template>

<script>
import http from '~/utils/http'
import PDFObject from 'pdfobject'

export default {
  data: function () {
    return {
      courseId: this.$route.params.course,
      data: {},
      playerOptions: {
        sources: [{
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: 'http://mpintegrity.mitrphol.com/vdo/8e47bb95738b090baf28d731fa8e3785/720p.m3u8'
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
  created: function () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function () {
      var self = this
      http
        .get('/api/course/' + this.courseId)
        .then(function (response) {
          self.$set(self, 'data', response.data)
          self.changeCourse(0, 0)
        })
    },
    changeCourse: function (index, subIndex) {
      var lecture = this.data.lessions[index].lectures[subIndex]
      if (lecture.contentType === 'VIDEO') {
        this.myVideoPlayer.src({
          type: 'application/x-mpegURL',
          src: 'http://mpintegrity.mitrphol.com/vdo/' + lecture.uuid + '/720p.m3u8'
        })
      } else {
        PDFObject.embed('http://localhost:3002/files/' + lecture.id + '-' + lecture.content, '#pdf')
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
