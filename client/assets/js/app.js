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


$('#search-sites').click(function() {
    var params = $("#searchfield-sites").val()

    var query = {}
    if (params) {
        $.each(params.split(','), function(i, param) {
            var field = param.split('=')[0].trim()
            var value = param.split('=')[1].trim()
            query[field] = value
        })
    }
        
    $.ajax({
        url: '/sites',
        type: 'GET',
        data: query,
        success: function(res) { 
          $('#search-sites-results').html(res)
        },
        error: function() { 
          alert('Failed!')
        },
    });
    
})




