// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function(){
  function createProduct() {
    $("#create_product").submit(function(){
      $(this).ajaxSubmit({
        target: '#products_list',
        clearForm: true,
        success: function(){
          editProduct(),
          deleteProduct()
        },
        error: displayError
      });
      return false;
    });
  }

  function deleteProduct() {
    $("#products_list a.delete").bind('click', function(){
      var deleteLink = $(this);
      $.ajax({
        type:'delete',
        url: deleteLink.attr('href'),
        success: function(){deleteLink.parent().parent().remove()}
      });
      return false;
    });
  }

  var origin = [];
  function editProduct() {
    $('#products_list a.edit').bind('click', function(){
      var editLink = $(this);
      origin = editLink.parent().parent().children('td').eq(0).text();
      editLink.parent().parent().children('td').eq(0).html('<input type="text" name="product" value="'+origin+'" />');
      editLink.hide();
      var id = editLink.attr('rel');
      editLink.after('<span>&nbsp;<a href="/products/update/'+id+'" class="update_link">Save</a>&nbsp;<a href="javascript:void(0);" class="cancel">Cancel</a></span>');
      cancelEdit();
      updateProduct();
    });
    return false;
  }

  function cancelEdit() {
    $('#products_list a.cancel').bind('click', function(){
      var cancelLink = $(this);
      cancelLink.parent().hide();
      cancelLink.parent().prev('a.edit').show();
      cancelLink.parent().parent().parent().children('td').eq(0).html(origin);
    });
  }

  function updateProduct() {
   $("#products_list a.update_link").bind('click', function(){
    var updateLink = $(this);
    var product = updateLink.parent().parent().parent().find('input').val();
    $.ajax({
      type: 'post',
      data: {product: product},
      url: updateLink.attr('href'),
      success: function(){
        updateLink.parent().hide();
        updateLink.parent().prev('a.edit').show();
        updateLink.parent().parent().parent().children('td').eq(0).html(product);
      }
    });
    return false;
   }); 
  }

  function displayError(request, errorType){
    var msg = '<div class="error">'+request.responseText+'(click to close)</div>';
    $('#products_list').append(msg);
    $('.error').click(function(){$(this).hide();});
  }

  $(function(){
    deleteProduct();
    createProduct();
    editProduct();
    cancelEdit();
    updateProduct();
  });
});
