$(function () {
  var layer = layui.layer
  var form = layui.form
  initCate()
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        var htmlStr = template('tpl_select', res)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      },
    })
  }
  // 初始化富文本编辑器
  initEditor()
  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  $('#changeImg').on('click', function () {
    $('#file').click()
  })
  $('#file').on('change', function (e) {
    var fileList = e.target.files
    if (fileList.length === 0) return
    var newImgURL = URL.createObjectURL(fileList[0])
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  // 定义文章的发布状态
  var art_state = '已发布'
  // 为存为草稿按钮，绑定点击事件处理函数
  $('#btnSave').on('click', function () {
    art_state = '草稿'
  })
  // 为表单绑定 submit 提交事件
  $('#form-pub').on('submit', function (e) {
    e.preventDefault()
    var fd = new FormData($(this)[0])
    fd.append('state', art_state)
    // 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 在大事件项目中，将文件对象存储到
        // k键为 cover_img , 值为 blob
        fd.append('cover_img',blob)
        // 发起ajax数据请求
        publishArticle(fd)
      })
  })
  function publishArticle(fd) {
    $.ajax({
      method:'POST',
      url: '/my/article/add',
      data: fd,
      // 注意：若向服务器提交的是FormData格式的对象，必须添加
      contentType: false,
      processData: false,
      success: function(res) {
        if(res.status !== 0) return layer.msg(res.message)
        layer.msg('发布文章成功')
        location.href = '/article/art_list.html'
      }
    })
  }
})
