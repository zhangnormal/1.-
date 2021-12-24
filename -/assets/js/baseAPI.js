// 每次调用$.ajax()会优先调用  ajaxPrefilter() 函数
$.ajaxPrefilter(function(options) {
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})