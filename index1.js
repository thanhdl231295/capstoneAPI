window.onload = function () {
  getProductList();
  getListCart();
};
let productList = [];

function getProductList() {
  axios({
    url: "https://6336f4d45327df4c43cd013b.mockapi.io/baiTapLonJS",
    method: "GET",
  })
    .then(function (res) {
      productList = res.data;
      renderProductList();
      console.log(productList);
    })
    .catch(function (err) {
      console.log(err);
    });
}
function renderProductList(data) {
  if (!data) data = productList;
  var html = "";

  for (let i = 0; i < data.length; i++) {
    let currentProduct = data[i];
    html += `
  <div class="col">
  <div class="item card">
    <div class="thum ">
    <img src="${currentProduct.img}" alt=""/>
    </div>
    <div class="title card-body" style="">
    <h1>ID:${currentProduct.id} </h1>
    <h3>NAME:${currentProduct.name} </h3>
    <h3>PRICE: ${currentProduct.price} $</h3>
    <h3>SCREEN:${currentProduct.screen} </h3>
    <h3>BACKCAMERA:${currentProduct.backCamera} </h3>
    <h3>FRONTCAMERA:${currentProduct.frontCamera} </h3>
    <h3>DESC:${currentProduct.desc}</h3>
    <h3>TYPE:${currentProduct.type} </h3>
    <button onclick="addListCart('${currentProduct.id}')" class="  btn btn-primary">ADD TO CART</button>
    </div>
</div>

</div>
  `;
  }

  document.getElementById("showProducts").innerHTML = html;
}
//mapData

function selectProduct() {
  let res = [];

  let key = document
    .getElementById("selectProducts")
    .value.toLowerCase()
    .trim();

  for (let i = 0; i < productList.length; i++) {
    if (productList[i].type.toLowerCase().trim() === key) {
      res.push(productList[i]);
      console.log(res);
    } else if (key === "") {
      res = productList;
    }

    renderProductList(res);
  }
}
//////

var listCart = [];
// lưu danh sách xuống localstorage
function setListCart(a) {
  var listCartJSON = JSON.stringify(a);
  localStorage.setItem("lC", listCartJSON);
}

//lấy danh sách
function getListCart() {
  var listCartJSON = localStorage.getItem("lC");
  if (!listCartJSON) return;
  listCart = mapDataCart(JSON.parse(listCartJSON));
}

function mapDataCart(data) {
  var res = [];
  for (let i = 0; i < data.length; i++) {
    let oldCart = data[i];
    let newCart = new Cart(
      oldCart.productId,
      oldCart.productName,
      oldCart.img,
      oldCart.price,
      oldCart.amount
    );
    res.push(newCart);
  }
  return res;
}
function addListCart(id) {
  console.log(id);
  var isValid = false;
  for (let i = 0; i < listCart.length; i++) {
    if (listCart[i].productId === id) {
      listCart[i].amount++;
      isValid = true;
    }
  }
  var productId;
  var productName;
  var img;
  var price;
  if (!isValid) {
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id === id) {
        productId = productList[i].id;
        productName = productList[i].name;
        img = productList[i].img;
        price = productList[i].price;
      }
    }

    var newCart = new Cart(productId, productName, img, price, 1);
    listCart.push(newCart);
  }
  setListCart(listCart);
  document.getElementById("imgCart").innerHTML = numberCart();
}

function renderListCart(data) {
  if (!data) data = listCart;
  var html = "";
  for (let i = 0; i < data.length; i++) {
    var currentCart = data[i];
    html += `
    <tr>
    <td>${currentCart.productId}</td>
    <td>${currentCart.productName}</td>
    <td><img src="${currentCart.img}" width="100px"/></td>
    <td>${currentCart.price}</td>

    <td> 
    <button onclick="decreaseAmout('${
      currentCart.productId
    }')" class="btn btn-danger ">-</button>
    ${currentCart.amount}
    <button onclick="increaseAmout('${
      currentCart.productId
    }')" class="btn btn-danger ">+</button>
    </td>
    <td>${currentCart.calcPrice()}</td>
    <td>
    <button onclick="deleteCart('${
      currentCart.productId
    }')" class="btn btn-danger">Xóa</button>
    
    </td>
   
    </tr>
    `;
  }

  document.getElementById("totalPrice").innerHTML = calcTotalCart();
  document.getElementById("tableGioHang").innerHTML = html;
}
function calcTotalCart() {
  var total = 0;
  for (let i = 0; i < listCart.length; i++) {
    total += listCart[i].calcPrice();
  }
  return total;
}
function clearCart() {
  listCart = [];
  setListCart(listCart);
  renderListCart();
}
function deleteCart(id) {
  for (let i = 0; i < listCart.length; i++) {
    if (listCart[i].productId === id) {
      listCart.splice(i, 1);
    }
  }

  setListCart(listCart);
  renderListCart();
}

function decreaseAmout(id) {
  for (let i = 0; i < listCart.length; i++) {
    if (listCart[i].productId === id) {
      listCart[i].amount--;
      if (listCart[i].amount === 0) {
        listCart.splice(i, 1);
      }
    }
  }
  setListCart(listCart);
  renderListCart();
}
function increaseAmout(id) {
  for (let i = 0; i < listCart.length; i++) {
    if (listCart[i].productId === id) {
      listCart[i].amount++;
    }
  }
  setListCart(listCart);
  renderListCart();
}

function numberCart() {
  return listCart.reduce((total, item) => {
    return total + item.amount;
  }, 0);
}
