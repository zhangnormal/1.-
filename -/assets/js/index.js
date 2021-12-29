$(function () {
  var layer = layui.layer
  //获取用户基本信息
  getUserInfo()
  $('#indexOut').on('click', function () {
    layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index)
    })
  })
})
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      // console.log(res)
      if (res.status !== 0) return layer.msg(res.message)
      // 动态渲染头像的步骤封装在一个函数方法内
      renderAvatar(res.data)
    },
  })
}
// 动态渲染头像的步骤封装在一个函数方法内
function renderAvatar(user) {
  // 名字修改
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    var first = name[0].toUpperCase()
    $('.layui-nav-img').hide()
    $('.text-avatar').html(first).show()
  }
}
