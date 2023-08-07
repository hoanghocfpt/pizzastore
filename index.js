
// Lấy vị trí của người dùng
navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Gửi yêu cầu đến API ipgeolocation.io
    var xhr = new XMLHttpRequest();
    var url = "https://api.ipgeolocation.io/ipgeo?apiKey=f28546ce48f74f478cbc4d452b7f40d2&lat=" + latitude + "&long=" + longitude;
  
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        document.querySelector('.location').setAttribute('placeholder',response.country_name)
      }
    }
    xhr.send();
  });
  
  
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
// PHẦN SLIDE SHOW
var images = [
    {url: 'images/banner-1.png'},
    {url: 'images/banner-2.jpeg'},
    {url: 'images/banner-3.jpeg'},
    {url: 'images/banner-4.jpeg'},
    {url: 'images/banner-5.jpeg'}
];
var slt = document.querySelectorAll('.slt');

var index = 0;
// var dot = document.querySelectorAll('.dot');
// console.log(dot);
function them() {
    slt[index].classList.add('select')
}
function xoa() {
    for (let i = 0; i < slt.length; i++) {
        slt[i].classList.remove('select')
        
    }
    
}
for (let i = 0; i < slt.length; i++) {
        slt[i].addEventListener('click', function() {
            xoa()
            slt[i].setAttribute('class', 'select')
            index = i;
            document.getElementById('img').setAttribute('src', images[index].url); 
            
        })
        
    }
function hienthi() {
    index = 0;
    document.getElementById('img').setAttribute('src', images[index].url);
    
    them()
    
}
function next() {
    index++;
    if(index > images.length - 1){
        index = 0;
    }
    document.getElementById('img').setAttribute('src', images[index].url); 
    
    xoa()
    them()
    
    

}
function prev() {
    index--;
    if(index < 0){
        index = images.length - 1;
    }
    console.log(index);
    document.getElementById('img').setAttribute('src', images[index].url);
    
    xoa()
    them()

}
    setInterval(function(){
        next()
    },3000)
document.querySelector('.fa-angle-right').addEventListener('click',next)
document.querySelector('.fa-angle-left').addEventListener('click',prev)




 
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
            
            hienthi()
            
            
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
        popular()
     
    }

    window.onload = getCart


    // Đẩy dữ liệu bán chạy nhất từ JS
    
    function popular() {
        var popular = [
            {url: 'images/pizza1.webp', name: 'Pizza Hải Sản Tom Yum', price: '69.000đ', link: 'pizza-1.html'},
            {url: 'images/pizza2.webp', name: 'Pizza Hải Sản Pesto', price: '69.000đ', link: 'pizza-2.html'},
            {url: 'images/pizza3.webp', name: 'Pizza Gà Cay', price: '69.000đ', link: 'pizza-3.html'},
            {url: 'images/pizza4.webp', name: 'Pizza 4 Season', price: '69.000đ', link: 'pizza-4.html'}
        ]
        var img = document.querySelectorAll('.popular .img-product img')
        var name = document.querySelectorAll('.popular .name-product')
        var price = document.querySelectorAll('.popular .price-product')
        var link = document.querySelectorAll('.buynow a')
        var kq = '';
        for (let i = 0; i < popular.length; i++) {
            
            kq += `<div class="product">
            <div class="img-product">
                <img src="${popular[i].url}" alt="">
            </div>
            <div class="name-product">${popular[i].name}</div>
            <div class="direct">
                <div class="price">
                    <span>Giá chỉ từ</span>
                    <span class="price-product">${popular[i].price}</span>
                </div>
                <div class="buynow">
                    <a href="${popular[i].link}">Mua ngay <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>`
        }
        document.querySelector('.popular .container').innerHTML = kq
    }
