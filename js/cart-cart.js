document.addEventListener('DOMContentLoaded', function() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const cartContainer = document.getElementById('cart-container');
	const subtotalElement = document.getElementById('subtotal');  
	const deliveryElement = document.getElementById('delivery');  
	const discountElement = document.getElementById('discount');  
	const totalElement = document.getElementById('total');        
  
	function updateCartDisplay() {
	  // Nếu giỏ hàng trống
	  if (cart.length === 0) {
		cartContainer.innerHTML = '<p>Giỏ hàng trống</p>';
		subtotalElement.innerText = '0 VNĐ';
		deliveryElement.innerText = '0 VNĐ';
		discountElement.innerText = '0 VNĐ';
		totalElement.innerText = '0 VNĐ';
		return;
	  }
  
	  cartContainer.innerHTML = ''; // Xóa nội dung cũ
	  let subtotal = 0;
  
	  // Tạo phần tử table-wrap
	  const tableWrap = document.createElement('div');
	  tableWrap.classList.add('table-wrap');
  
	  // Tạo bảng
	  const table = document.createElement('table');
	  table.classList.add('table');
  
	  // Tạo tiêu đề bảng
	  const headerRow = document.createElement('tr');
	  headerRow.innerHTML = `
		<th>&nbsp;</th>
		<th>Ảnh</th>
		<th>Tên sản phẩm</th>
		<th>Giá</th>
		<th>Số lượng</th>
		<th>Tổng cộng</th>
		<th>&nbsp;</th>
	  `;
	  table.appendChild(headerRow);
  
	  // Thêm từng sản phẩm vào bảng
	  cart.forEach((product, index) => {
		const row = document.createElement('tr');
		row.innerHTML = `
		  <td>
			<label class="checkbox-wrap checkbox-primary">
			  <input type="checkbox" checked data-index="${index}">
			  <span class="checkmark"></span>
			</label>
		  </td>
		  <td>
			<div class="img" style="background-image: url('${product.image}'); width: 100px; height: 100px; background-size: cover;"></div>
		  </td>
		  <td>${product.name}</td>
		  <td>${product.price.toLocaleString()} VNĐ</td>
		  <td>
			<div class="input-group">
			  <input type="number" name="quantity" class="quantity form-control input-number" value="${product.quantity}" min="0" max="100" data-index="${index}">
			</div>
		  </td>
		  <td>
			<span class="total-price">${(product.price * product.quantity).toLocaleString()} VNĐ</span>
		  </td>
		  <td>
			<button type="button" class="close remove-btn" aria-label="Close" data-index="${index}">
			  <span aria-hidden="true"><i class="fa fa-close"></i></span>
			</button>
		  </td>
		`;
		table.appendChild(row);
  
		subtotal += product.price * product.quantity;
	  });
  
	  tableWrap.appendChild(table);
	  cartContainer.appendChild(tableWrap);
  
	  // Hiển thị Subtotal
	  subtotalElement.innerText = subtotal.toLocaleString() + ' VNĐ';
  
	  // Delivery: 15000
	  const delivery = 15000;
	  deliveryElement.innerText = delivery.toLocaleString() + ' VNĐ';
  
	  // Discount: cố định
	  const discount = 0;
	  discountElement.innerText = discount.toLocaleString() + ' VNĐ';
  
	  // Tổng cộng
	  const total = subtotal + delivery - discount;
	  totalElement.innerText = total.toLocaleString() + ' VNĐ';
  
	  // Gán sự kiện cho input số lượng
	  const quantityInputs = document.querySelectorAll('.quantity');
	  quantityInputs.forEach(input => {
		input.addEventListener('change', function() {
		  const index = this.getAttribute('data-index');
		  const newQuantity = parseInt(this.value);
		  
		  if (newQuantity <= 0) {
			// Nếu số lượng <= 0, tự động xóa sản phẩm
			cart.splice(index, 1);
		  } else {
			cart[index].quantity = newQuantity;
		  }
  
		  localStorage.setItem('cart', JSON.stringify(cart));
		  updateCartDisplay();
		});
	  });
  
	  // Gán sự kiện cho nút xóa
	  const removeButtons = document.querySelectorAll('.remove-btn');
	  removeButtons.forEach(button => {
		button.addEventListener('click', function() {
		  const index = this.getAttribute('data-index');
		  cart.splice(index, 1);
		  localStorage.setItem('cart', JSON.stringify(cart));
		  updateCartDisplay();
		});
	  });
	}
  
	// Khởi tạo
	updateCartDisplay();
  });
  