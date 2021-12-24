$(function () {
  var form = layui.form
  var layer = layui.layer
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })
  form.verify({
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePass: function(value) {
      if($('.pwd').val() !== value) return  value+'两次输入密码不同！'
      // if($('.pwd').val() === value) return  value+$('.pwd').val()
    }
  })
  // 注册请求
  $('#reg_form').on('submit',function(e) {
  // console.log($('.pwd').val());
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: $(this).serialize(),
      success: function(res) {
        // console.log(res);
        if(res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功！')
      }
    })
  })
  // 登录请求
  $('#login_form').on('submit',function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function(res) {
        // console.log(res);
        if(res.status !== 0) return layer.msg(res.message)
        localStorage.setItem('token',res.token)
        location.href = '/index.html'
      }
    })
  })
})
