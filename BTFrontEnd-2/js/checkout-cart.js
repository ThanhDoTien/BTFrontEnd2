document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartDetail = document.querySelector('.cart-total');
  let subtotal = 0;
  const deliveryFee = 15000;
  const discount = 0; // Bạn có thể thêm logic tính toán discount nếu cần
  let total = subtotal + deliveryFee - discount;

  // Nơi để chèn HTML sản phẩm
  let html = '<h3 class="billing-heading mb-4">Cart Total</h3>';

  if (cart.length === 0) {
      html += '<p>Giỏ hàng trống.</p>';
  } else {
      cart.forEach(item => {
          let itemTotal = item.price * item.quantity;
          subtotal += itemTotal;

          html += `
              <div class="d-flex justify-content-between">
                  <span>${item.name} x ${item.quantity}</span>
                  <span>${itemTotal.toLocaleString()} VNĐ</span>
              </div>
          `;
      });

      total = subtotal + deliveryFee - discount;

      html += `
          <hr>
          <div class="d-flex justify-content-between price-section">
              <span class="font-weight-bold">Subtotal</span>
              <span>${subtotal.toLocaleString()} VNĐ</span>
          </div>
          <div class="d-flex justify-content-between">
              <span>Delivery</span>
              <span>${deliveryFee.toLocaleString()} VNĐ</span>
          </div>
          <div class="d-flex justify-content-between">
              <span>Discount</span>
              <span>${discount.toLocaleString()} VNĐ</span>
          </div>
          <hr>
          <div class="d-flex justify-content-between price-section total-price">
              <span class="font-weight-bold">Total</span>
              <span>${total.toLocaleString()} VNĐ</span>
          </div>
      `;
  }

  cartDetail.innerHTML = html;
});
//Xử lý place an order
document.getElementById('place-order').addEventListener('click', function(e) {
  e.preventDefault();

  const requiredFields = document.querySelectorAll('.billing-form input[required], .billing-form select[required]');
  let allFilled = true;
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      allFilled = false;
    }
  });

  const paymentChecked = document.querySelector('input[name="payment"]:checked');

  if (!allFilled) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  if (!paymentChecked) {
    alert('Vui lòng chọn phương thức thanh toán.');
    return;
  }

  alert('Đặt hàng thành công!');

  // XÓA GIỎ HÀNG
  localStorage.removeItem('cart');

  // CẬP NHẬT GIAO DIỆN GIỎ HÀNG
  let cartDetail = document.querySelector('.cart-total');
  cartDetail.innerHTML = `
    <h3 class="billing-heading mb-4">Cart Total</h3>
    <p>Giỏ hàng trống.</p>
  `;
});
