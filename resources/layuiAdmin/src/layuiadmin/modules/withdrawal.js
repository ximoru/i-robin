/**

 @Name：layuiAdmin 工单系统
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：GPL-2

 */


layui.define(['table', 'form', 'element'], function(exports){
  var $ = layui.$
  ,table = layui.table
  ,form = layui.form
  ,element = layui.element;

  table.render({
    elem: '#withdrawal-table'
    ,url: layui.setter.base + 'json/withdrawal/demo.js' //模拟接口
    ,cols: [[
      {field: 'id', fixed: 'left',width: 50,title:'ID'}
      ,{field: 'number', width: 200, title: '订单号', sort: true}
      ,{field: 'name', title: '姓名', width: 100, align: 'center'}
      ,{field: 'bank_type', width: 100, title: '账户类型', width: 100}
      ,{field: 'balance', width: 100, title: '余额'}
      ,{field: 'amount', width: 100, title: '提现金额'}
      ,{field: 'time', width: 150, title: '提现时间'}
      ,{field: 'remark', width: 150, title: '备注信息'}
      ,{field: 'status', title: '提现状态', templet: '#buttonTpl', width: 100, align: 'center'}
      ,{title: '操作', align: 'center', fixed: 'right', toolbar: '#operation'}
    ]]
    ,page: true
    ,limit: 10
    ,limits: [1,10, 15, 20, 25, 30]
    ,text: '对不起，加载出现异常！'
    ,done: function(){
      element.render('progress')
    }
  });

  //监听工具条
  table.on('tool(withdrawal-table)', function(obj){
    var data = obj.data;
    if(obj.event === 'edit'){
      var tr = $(obj.tr);
      layer.open({
        type: 2
        ,title: '编辑码钱提现'
        ,content: '../../robin/codeMoney/editFrom.html'
        ,area: ['450px', '480px']
        ,btn: ['确定', '取消']
        ,yes: function(index, layero){
          var iframeWindow = window['layui-layer-iframe'+ index]
          ,submitID = 'withdrawal-submit'
          ,submit = layero.find('iframe').contents().find('#'+ submitID);

          //监听提交
          iframeWindow.layui.form.on('submit('+ submitID +')', function(data){
            var field = data.field; //获取提交的字段

            //提交 Ajax 成功后，静态更新表格中的数据
            //$.ajax({});
            table.reload('LAY-user-front-submit'); //数据刷新
            layer.close(index); //关闭弹层
          });

          submit.trigger('click');
        }
        ,success: function(layero, index){

        }
      });
    }
  });

  exports('withdrawal', {})
});
