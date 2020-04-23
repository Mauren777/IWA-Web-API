function productList() {
    $.ajax({
        url: '/v1/products/',
        type: 'GET',
        dataType: 'json',
        cache: false, // Appends _={timestamp} to the request query string
        success: function(data) {
            // data is a json object.
            buildProductTable(data);
        }
    });
}

function adminTable() {
     $.ajax({
        url: '/v1/products/',
        type: 'GET',
        dataType: 'json',
        cache: false, // Appends _={timestamp} to the request query string
        success: function(data) {
            // data is a json object.
            buildAdminTable(data);
        }
    });   
}

function buildProductTable(data) {
    let productsHTML = '';
    $.each(data, function(index) {
        productsHTML += '<tr id="'+data[index]._id+'">'
            +  '<td align="center">'
            +  '<img src="'+data[index].image+'" class="image-fluid image-product"/>'
            +  '</td>'
            +  '<td align="left">'
            +  '<h5>'+data[index].title+'</h5>'
            +  '<p>'+data[index].description+'</p>'
            +  '</td>'
            +  '<td align="right">'+data[index].price+'</td>'
            +  '<td>'
            +  '<button class="btn btn-sm btn-primary add-to-cart" data-product-title="'+data[index].title+'" data-product-price="'+data[index].price+'">Add to cart</button>'
            +  '</td></tr>';
    });
    $('#shopTable tbody').html(productsHTML);
}

function buildAdminTable(data) {
    let productsHTML = '';
    $.each(data, function(index) {
        productsHTML += '<tr id="'+data[index]._id+'">'
            +  '<td align="center">'
            +  '<button class="btn btn-sm btn-secondary edit-row" data-product-id="'+data[index]._id+'">Edit</button>'
            +  '</td>'
            +  '<td>'+data[index].title+'</td>'
            +  '<td>'+data[index].description+'</td>'
            +  '<td align="right">'+data[index].price+'</td>'
            +  '</tr>';
    });
    $('#adminTable tbody').html(productsHTML);
}

$(document).ready(function() {
    
    // If on Shop page
    if ( $( "#shopTable" ).length ) {
        productList();
    }

    // If on Admin page
    if ( $( "#adminTable" ).length ) {
        adminTable();
    }

    // Add to cart buttons
    $('body').on('click', '.add-to-cart', function() {
        productTitle = $(this).data('product-title');
        productPrice = parseFloat($(this).data('product-price'));
        total = parseFloat($('#total').text());

        // Update Total
        total = parseFloat(productPrice + total).toFixed(2);
        $('#total').text( total );

        // Add Product to list
        $('#product-list').append('<div class="col-md-12"><h6>'+ productTitle +'</h6><hr/></div>');
    });

    // Select Row for Edit/Delete
    $('body').on('click', '.edit-row', function() {
        productId = $(this).data('product-id');

        $.ajax({
            url: '/v1/products/' + productId,
            type: 'GET',
            dataType: 'json',
            cache: false, // Appends _={timestamp} to the request query string
            success: function(data) {
                // data is a json object.
                $("input[name='product_id']").val(data._id);
                $("input[name='title']").val(data.title);
                $("#description").val(data.description);
                $("input[name='price']").val(data.price);
            }
        });

        $('#createBtn').hide();
        $('#editBtns').show();
    });

    // Create new Product
    $('body').on('click', '#create', function() {
        $.ajax({
            url: '/v1/products/',
            type: 'POST',
            data: { 
                title: $("input[name='title']").val(),  
                description: $("#description").text(), 
                price: $("input[name='price']").val()
            },
            dataType: 'json',
            success: function(data) {
                // Reinit updated admin table
                adminTable();
            }
        });
    });

    // Edit Product
    $('body').on('click', '#edit', function() {
        // If we have our product id
        if($('#product_id').val()) {
            $.ajax({
                url: '/v1/products/' + $('#product_id').val(),
                type: 'POST',
                data: { 
                    title: $("input[name='title']").val(),  
                    description: $("#description").val(), 
                    price: $("input[name='price']").val()
                },
                dataType: 'json',
                success: function(data) {
                    // Reload updated admin table
                    adminTable();
                }
            });
        }
    });

    // Delete Product
    $('body').on('click', '#delete', function() {
        // If we have our product id
        if($('#product_id').val()) {
            $.ajax({
                url: '/v1/products/' + $('#product_id').val(),
                type: 'DELETE',
                dataType: 'json',
                success: function(data) {
                    // Reload updated admin table
                    adminTable();
                }
            });
        }
    });

    // Cancel Edit 
    $('body').on('click', '#cancel', function() {
        $('#adminForm')[0].reset()
        $('#createBtn').show();
        $('#editBtns').hide();
    });

    // prevent default form submit
    $(document).on('submit','#adminForm',function(e){
        e.preventDefault();
    })
    
});