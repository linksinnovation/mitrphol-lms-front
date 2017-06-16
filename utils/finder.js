/* eslint-disable */
const findCourse = (courses, id) => {
  if (Object.keys(courses).length === 0) { return }
  return courses.find((course) => {
    return Number(course.id) === Number(id)
  })
}

const findLession = (courses, id) => {
  for (let course of courses) {
    var lession = course.lessions.find((lession) => { return Number(lession.id) === Number(id) })
    if (lession) {
      return lession
    }
  }
}

const findLecture = (courses, id) => {
  for (let course of courses) {
    for (let lession of course.lessions) {
      var lecture = lession.lectures.find((lecture) => { return Number(lecture.id) === Number(id) })
      if (lecture) {
        return lecture
      }
    }
  }
}

export default {
  findCourse,
  findLession,
  findLecture
}
