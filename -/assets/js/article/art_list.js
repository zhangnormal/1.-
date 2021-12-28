$(function() {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage;
  function addZ(n) {
    return n < 10? '0'+n : n;
  }
  template.defaults.imports.dataFormat = function (date) {
    var df = new Date(date)
    var yy = addZ(df.getFullYear())
    var mm = addZ(df.getMonth())
    var dd = addZ(df.getDate())
    var hh = addZ(df.getHours())
    var mn = addZ(df.getMinutes())
    var ss = addZ(df.getSeconds())
    return yy+'年'+mm+'月'+dd+'日'+ ' ' +hh+'时'+mn+'分'+ss+'秒'
  }
  // 定义一个查询参数对象，将来请求数据的时候，将请求对象提交到服务器
  var q = {
    pagenum: 1,   // 页码
    pagesize: 2,  // 数据条数
    cate_id: '',   // 类型对应的id
    state: '',    // 状态
  }
  initArticleList()
  initCate()
  // 获取文章列表数据
  function initArticleList() {
    $.ajax({
      method:'GET',
      url: '/my/article/list',
      data: q,
      success: function(res) {
        if(res.status !== 0) return layer.msg('文章列表获取失败')
        // layer.msg(res.message)
        // console.log(res);
        // 使用模板渲染页面的数据
        var htmlStr = template('tpl_list',res)
        $('tbody').html(htmlStr)
        // 列表渲染完成后，调用渲染分页的方法
        renderPage(res.total)
      }

    })
  }
  // 获取文章分类列表
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function(res) {
        if(res.status !== 0) return layer.msg(res.message)
        // layer.msg(res.message)
        // console.log(res);
        var htmlStr = template('tpl_cate',res)
        $('[name=cate_id]').html(htmlStr)
        // 网页一打开渲染时，没有被layui.all.js接收到，需要调用form.render()重新渲染下
        form.render()
      }
    })
  }
  //  实现筛选功能
  $('#list-form').on('submit',function(e) {
    e.preventDefault();
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state = state
    initArticleList()
  })

  // 声明渲染分页的函数,在获取到文章列表后调用
  // renderPage方法需要接收总数据条数，才能计算出总共渲染几个页码值
  function renderPage(total) {
    laypage.render({
      elem: 'pageBox',
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ['count','limit','prev','page','next','skip'],
      // 在切换条目的时候，本质上也会触发jump回调
      limits:[2,4,6],
      jump: function(obj,first) {
        // jump参数是实现跳转
        q.pagenum = obj.curr
        // limits 是实现自定义每页显示的数据条数，
        // 把最新的条目数赋值到q这个查询参数对象的 pagesize 属性中
        q.pagesize = obj.limit
        if(!first) {
          initArticleList()
        }
      }
    })
  }
  $('tbody').on('click','#delBtn',function() {
    // 获取删除按钮的个数
    var len = $('#delBtn').length
    var id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '/my/article/delete/' + id,
      success: function(res) {
        if(res.status !== 0) return layer.msg(res.message)
        // layer.msg(res.message)
        // 判断页面上是否还有按钮
        if(len === 1) {
          q.pagenum = q.pagenum === 1? 1 : q.pagenum -1
        }
        // 重新渲染页面
        initArticleList()
      }
    })
  })
})