$(function() {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    samePwd: function(value) {
      if($('[name=oldPwd]').val() === value) return '密码不能相同！'
    },
    rePwd: function(value) {
      if($('[name=newPwd]').val() !== value) return '密码不同，请重新输入！'
    }
    ,pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
  })
  $('#lay-form').on('submit',function(e) {
    e.preventDefault();
    $.ajax({
      method:'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        $('#lay-form')[0].reset()
      }
    })
  })
})