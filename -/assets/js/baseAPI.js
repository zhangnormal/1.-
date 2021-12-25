// 每次调用$.ajax()会优先调用  ajaxPrefilter() 函数
$.ajaxPrefilter(function(options) {
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  if(options.url.indexOf('/my/') !== -1) {
    options.headers= {
      Authorization:localStorage.getItem('token') || ''
    }
  }
  options.complete = function(res) {
    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      localStorage.removeItem('token')
      location.href = '/login.html'
    }
  }
})