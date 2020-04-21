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
    $('#shopTable tbody').append(productsHTML);
}

function buildAdminTable(data) {
    let productsHTML = '';
    $.each(data, function(index) {
        productsHTML += '<tr>'
            +  '<td align="center">'
            +  '<button class="btn btn-sm btn-secondary edit-row" data-product-id="'+data[index]._id+'">Edit</button>'
            +  '</td>'
            +  '<td>'+data[index].title+'</td>'
            +  '<td>'+data[index].description+'</td>'
            +  '<td align="right">'+data[index].price+'</td>'
            +  '</tr>';
    });
    $('#adminTable tbody').append(productsHTML);
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
    
});