function productList() {

    let productsHTML = '';

    $.ajax({
        url: '/v1/products/',
        type: 'GET',
        dataType: 'json',
        cache: false, // Appends _={timestamp} to the request query string
        success: function(data) {
            // data is a json object.
            console.log(data);
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
    });

}

$(document).ready(function() {
    productList();
});