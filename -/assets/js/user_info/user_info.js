$(function() {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    len: function(value) {
      if(value.length > 6) return '字符不得大于6'
    }
  })
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function(res) {
        // console.log(res);
        if(res.status !== 0) return layer.msg(res.message)
        form.val('formUserInfo',res.data)
      }
    })
  }
  // 重置行为
  $('#btnReset').on('click',function(e) {
    e.preventDefault();
    initUserInfo()
  })
  $('#index-form').on('submit',function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // initUserInfo()
        // 父元素重新渲染页面
        window.parent.getUserInfo()
      }
    })
  })
})
