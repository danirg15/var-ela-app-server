$(function () {
  $('[data-toggle="popover"]').popover()
})


$("#test-connection").click(function() {
    var host = $('#host').val()
    var port = $('#port').val()
    var url = host + ':' + port

    $.ajax({
       type: 'HEAD',
       url: url,
        success: function(data) {
            alert(url + ': Success')
        },
       error: function() {
            alert(url + ': Fail')
       }
    });

}) 

