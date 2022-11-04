class Products {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
  }
}

//-----
function AddListCart(id) {
  alert("Đã thêm sản phãm vào giỏ hàng" + id);

  var isVald = false; //kiem tra giỏ hàng đã có san phẩm id này chưa
  //có rồi thì la true và +số lượng lên 1
  for (let i = 0; i < ListGiohang.length; i++) {
    if (ListGiohang[i].idSanpham === id) {
      ListGiohang[i].soluong++;
      isVald = true;
    }
  }
  //giỏ hàng chưa có sản phẩm thì thêm sản phẩm vào giỏ hàng

  if (!isVald) {
    var price;
    var name;
    var img;

    for (let i = 0; i < ListProducts.length; i++) {
      if (ListProducts[i].id === id) {
        price = ListProducts[i].price;
        name = ListProducts[i].name;
        img = ListProducts[i].img;
      }
    }
    var cart = new gioHang(id, 1, price, name, img);
    ListGiohang.push(cart);
  }

  setListgiohang(ListGiohang);
  document.getElementById("imgCart").innerHTML = ":" + calcAmountCart();
}
