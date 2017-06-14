export default (vc) => {
  var result = {}
  vc.req.headers.cookie.split('; ').forEach(function (sp) {
    var arr = sp.split('=')
    arr[1] && (result[arr[0]] = arr[1])
  })
  return result
}
