$(function () {
  var layer = layui.layer
  var form = layui.form
  // 获取文章类别列表
  getArticleCate()
  var addForm = null
  $('#add-cate').on('click', function () {
    addForm = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#tpl_open').html(),
    })
  })
  $('body').on('submit', '#open-form', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        // layer.msg(res.message)
        layer.close(addForm)
        getArticleCate()
      },
    })
    // console.log('ok');
  })
  var edit = null
  $('tbody').on('click', '#btnEdit', function () {
    edit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#tpl_edit').html(),
    })
    var id = $(this).attr('data-id')
    // console.log(id);
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        // console.log(res);
        form.val('edit-form', res.data)
      },
    })
  })
  $('body').on('submit', '#edit-form', function (e) {
    e.preventDefault()
    // console.log('ok');
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        // layer.msg(res.message)
        layer.close(edit)
        getArticleCate()
      },
    })
  })
  $('tbody').on('click', '#delBtn', function () {
    var id = $(this).attr('data-id')
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          // console.log('ok');
          if (res.status !== 0) return layer.msg(res.message)
          // 成功信息
          layer.msg(res.message)
          // 关闭弹出框
          layer.close(index)
          getArticleCate()
        },
      })
    })
  })
})
// 获取文章类别列表
function getArticleCate() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message)
      var htmlStr = template('tpl_cate', res)
      $('tbody').html(htmlStr)
    },
  })
}
