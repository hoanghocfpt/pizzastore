
// PHẦN LINK GIỎ HÀNG 
var cart = document.querySelectorAll(".cart");

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

// PHẦN CHECK LỖI FORM
var sdt = document.querySelector('.phone-number input')
var pass = document.querySelector('.password input')
function checkform() {
    
    if(sdt.value === ''){
        
        document.querySelector('.phone-number').classList.add('invalid');
        document.querySelector('.phone-number .form-message').innerText = 'Vui lòng nhập số điện thoại';
        return false;
    }
    if(isNaN(sdt.value) || sdt.value.length < 10){
    
        document.querySelector('.phone-number').classList.add('invalid');
        document.querySelector('.phone-number .form-message').innerText = 'SDT không hợp lệ, vui lòng nhập lại';
        return false;
    }

    if(pass.value === ''){
        document.querySelector('.password').classList.add('invalid');
        document.querySelector('.password .form-message').innerText = 'Vui lòng nhập mật khẩu';
        return false;
    }
    else if(pass.value.length < 6){
    
        document.querySelector('.password').classList.add('invalid');
        document.querySelector('.password .form-message').innerText = 'Mật khẩu tối thiểu 6 kí tự, vui lòng nhập lại';
        return false;
    }

   
   }
   sdt.addEventListener('input',function(){
    document.querySelector('.phone-number').classList.remove('invalid');
    document.querySelector('.phone-number .form-message').innerText = '';
   })
   pass.addEventListener('input',function(){
    document.querySelector('.password').classList.remove('invalid');
    document.querySelector('.password .form-message').innerText = '';
   })


    
    



