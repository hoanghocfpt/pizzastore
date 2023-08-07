
// PHẦN LINK GIỎ HÀNG 
var cart = document.querySelectorAll(".cart");
    document.querySelector('.buy').addEventListener('click', function(){
        window.location.assign('/cart.html');
    })
    for (let i = 0; i < cart.length; i++) {
        cart[i].addEventListener('click',function(){
            window.location.assign('/cart.html');
        })     
    }

// PHẦN HIỂN THỊ CART KHI ONMOUSEOVER 
var carts = document.querySelectorAll(".carts");

    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('mouseover',function(){
            document.querySelector('.cart-show').style.display = 'block'
        })
        
        carts[i].addEventListener('mouseout',function(){
            document.querySelector('.cart-show').style.display = 'none'
        })
    }


    // PHẦN THÊM SẢN PHẨM
    var dssp = [];
    var imgproduct = document.querySelector('.img-product img').getAttribute('src')
    var titleproduct = document.querySelector('#title-product').innerText
    var radio = document.querySelectorAll('.size-product input')
    var tong = 0;

    function addtocart() {
        var size = '';
        var price = 0;
        var selected = false;
        for (let i = 0; i < radio.length; i++) {
                radio[i].addEventListener('input',function(){
                    document.querySelector('.size-product .message').innerText = ''
                })
                if(radio[i].checked){
                    
                    size = radio[i].value
                    price = radio[i].getAttribute('price')
                    selected = true
                }
            }
            
        if(selected == false) {
            document.querySelector('.size-product .message').innerText = 'Vui lòng chọn kích thước pizza'
            return false
        }
        
        var product = {
            anh: imgproduct,
            tensanpham: titleproduct,
            kichthuoc: size,
            gia: price
        }
        
        dssp.push(product);
        
        giohang()
        saveCart()
    }

 
    // PHẦN GIỎ HÀNG

    function giohang() {
        var kq='';
        var type;
        
        for (let i = 0; i < dssp.length; i++) {
            if(
            dssp[i].tensanpham == 'Pepsi Lon' ||
            dssp[i].tensanpham == '7 Up Lon' ||
            dssp[i].tensanpham == 'Mirinda Xá Xị Lon' ||
            dssp[i].tensanpham == 'Nước Suối Lạnh'
            ){
                type = 'Loại'
            }else{
                type = 'Kích thước'
            }
            kq += `<div class="product-item">
            <div class="img-product">
                <img src="${dssp[i].anh}" alt="">
            </div>
            <div class="info-product">
                <div class="title-product">${dssp[i].tensanpham}</div>
                <div class="size-product">${type} - ${dssp[i].kichthuoc}</div>
            </div>
            
            <div class="price-product">
            ${dssp[i].gia}đ
            </div>
            <div class="trash-can">
                <i class="fa-solid fa-trash-can" onclick="deletetocart(${i})"></i>
            </div>
            </div>`
            tinhtong()
            demsanpham()
            
            
            
        }
        
        document.querySelector('.list-product').innerHTML = kq;
        
        
    }
    function demsanpham() {
        var count = dssp.length;
        document.querySelector('#count').innerText = count;
        
    }
    function tinhtong() {
        tong = 0;
        for (let i = 0; i < dssp.length; i++) {
            tong += parseFloat(dssp[i].gia);
        }
        document.querySelector('#tong').innerText = tong;
    }
    function deletetocart(index) {
         
        dssp.splice(index,1)
        
        tinhtong()
        demsanpham()
        giohang()
        saveCart()

        
    }

    function saveCart() {
        localStorage.setItem('cart',JSON.stringify(dssp));    
    }
    function getCart() {  
        dssp = JSON.parse(localStorage.getItem('cart')) || [];
        giohang();
     
    }

    window.onload = getCart
    document.querySelector('.btn-add-to-cart button').addEventListener('click',addtocart)
