// Khởi tạo giỏ hàng từ LocalStorage (nếu có)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Thêm sản phẩm vào giỏ hàng
function addToCart(productName, price, image, quantity = 1) {
  if (!productName || !price) return;

  const existingProduct = cart.find(product => product.name === productName);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ name: productName, price: price, image: image, quantity: quantity });
  }

  saveCart();
  updateCartCount();
  updateCartDropdown();
}

// Tăng số lượng sản phẩm
function increaseQuantity(productName) {
  const product = cart.find(p => p.name === productName);
  if (product) {
    product.quantity++;
    saveCart();
    updateCartCount();
    updateCartDropdown();
  }
}

// Giảm số lượng sản phẩm
function decreaseQuantity(productName) {
  const product = cart.find(p => p.name === productName);
  if (product) {
    product.quantity--;
    if (product.quantity <= 0) {
      // Xóa nếu số lượng còn 0
      cart = cart.filter(p => p.name !== productName);
    }
    saveCart();
    updateCartCount();
    updateCartDropdown();
  }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productName) {
  cart = cart.filter(product => product.name !== productName);
  saveCart();
  updateCartCount();
  updateCartDropdown();
}

// Lưu giỏ hàng vào LocalStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Cập nhật số lượng sản phẩm trên icon giỏ hàng
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
  cartCount.textContent = totalItems;
}

// Hiển thị dropdown giỏ hàng
function updateCartDropdown() {
  const cartDropdown = document.getElementById('cart-dropdown');
  cartDropdown.innerHTML = '';

  if (cart.length === 0) {
    cartDropdown.innerHTML = '<p class="text-center my-2">Giỏ hàng trống</p>';
  } else {
    let totalCartPrice = 0;

    cart.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('dropdown-item', 'border-bottom', 'pb-2', 'mb-2');

      productElement.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
        <div class="flex-grow-1">
          <div><strong>${product.name}</strong></div>
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary mr-1" onclick="decreaseQuantity('${product.name}')">-</button>
            <span>${product.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary ml-1" onclick="increaseQuantity('${product.name}')">+</button>
          </div>
          <div><small>Giá: ${product.price.toLocaleString()} VNĐ</small></div>
          <div><small>Thành tiền: ${(product.price * product.quantity).toLocaleString()} VNĐ</small></div>
        </div>
        <button class="btn btn-sm btn-danger ml-2" onclick="removeFromCart('${product.name}')">&times;</button>
      </div>
    `;
      cartDropdown.appendChild(productElement);
      totalCartPrice += product.price * product.quantity;
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('dropdown-item', 'text-right', 'mt-2');
    totalElement.innerHTML = `<strong>Tổng cộng: ${totalCartPrice.toLocaleString()} VNĐ</strong>`;
    cartDropdown.appendChild(totalElement);

    const viewCartButton = document.createElement('div');
    viewCartButton.classList.add('dropdown-item', 'text-center', 'mt-2');
    viewCartButton.innerHTML = `<a href="cart.html" class="btn btn-primary btn-sm">Xem Giỏ Hàng</a>`;
    cartDropdown.appendChild(viewCartButton);
  }
}

// Khi load trang
updateCartCount();
updateCartDropdown();

// Ngăn sự kiện click "lan ra ngoài" làm đóng giỏ hàng
document.addEventListener('DOMContentLoaded', function () {
  const cartDropdown = document.getElementById('cart-dropdown');

  cartDropdown.addEventListener('click', function (event) {
    event.stopPropagation();
  });
});

$(document).ready(function () {
  var quantity = 0;
  $('.quantity-right-plus').click(function (e) {
    e.preventDefault();
    var quantity = parseInt($('#quantity').val());
    $('#quantity').val(quantity + 1);
  });

  $('.quantity-left-minus').click(function (e) {
    e.preventDefault();
    var quantity = parseInt($('#quantity').val());
    if (quantity > 0) {
      $('#quantity').val(quantity - 1);
    }
  });
  
  // Sự kiện khi người dùng nhấn "Thêm vào giỏ hàng" hoặc "Mua ngay"
  $('#add-to-cart, #buy-now').click(function (e) {
    e.preventDefault();

    // Lấy thông tin sản phẩm
    const productName = $('.product-details h3').text().trim();
    const priceText = $('.product-details .price span').text().trim();
    const price = parseInt(priceText.replace(/[^\d]/g, '')); // Lấy số từ "15,000 VNĐ"
    const image = $('.prod-img-bg img').attr('src');
    const quantity = parseInt($('#quantity').val());

    // Gọi hàm addToCart để thêm sản phẩm vào giỏ hàng
    addToCart(productName, price, image, quantity);

    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  });
});
