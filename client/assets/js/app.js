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

            if (param.indexOf('=') == -1 &&
                param.indexOf('>') == -1 &&
                param.indexOf('<') == -1) {

              alert('Invalid operator!. Use: = | < | >')
              return
            }

            var operator = null;

            if (param.indexOf('=') != -1) {
                operator = '='
            }
            else if (param.indexOf('<') != -1) {
                operator = '<'
            }
            else if (param.indexOf('>') != -1) {
                operator = '>'
            }

            var field = param.split(operator)[0].trim()
            var value = param.split(operator)[1].trim()
            query[field.toUpperCase()] = value
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



$('#form-select-files').submit(function(e) {

  if($("[name=files]:checked").length == 0) {
    alert('Select at least one file!')
    return false
  }
  
  return true
})

$('#form-analysis-config').submit(function(e) {
  var title = $("[name=title]").val();
  var min_maf = $("[name=min-maf]").val();
  var max_maf = $("[name=max-maf]").val();

  if(title == '') {
    alert('Title is mandatory')
    return false
  }

  if(min_maf != '' && !$.isNumeric(min_maf)) {
    alert('Min MAF must be numeric')
    return false
  }

  if(max_maf != '' && !$.isNumeric(max_maf)) {
    alert('Max MAF must be numeric')
    return false
  }

  return true
})
