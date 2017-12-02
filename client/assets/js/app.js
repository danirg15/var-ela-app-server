$(function () {
  $('[data-toggle="popover"]').popover()
})




$("#test-connection").click(function() {
    var host = $('#host').val()
    var port = $('#port').val()
    var url = host + ':' + port

    var sendDate = (new Date()).getTime();

    $.ajax({
       type: 'HEAD',
       url: url,
       success: function(data) {
          var receiveDate = (new Date()).getTime();
          var responseTimeMs = receiveDate - sendDate

          alert(url + ': Success. Response Time: ' + responseTimeMs + 'ms')
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


$('#search-sites-results').on('click', '.show-site-detail', function() {
    var $modal_elem = $('#modal-site-detail')
      
    $.get('/sites/detail/' + $(this).data('site-id'), function(res) {
      $modal_elem.find('.modal-body').html(res)
      $modal_elem.modal('show')
    })

  
})



