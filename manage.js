let productList = [];
function mapData(dataAPI) {
  let result = [];
  for (let i = 0; i < dataAPI.length; i++) {
    let oldProduct = dataAPI[i];

    let newProduct = new Products(
      oldProduct.id,
      oldProduct.name,
      oldProduct.price,
      oldProduct.screen,
      oldProduct.backCamera,
      oldProduct.frontCamera,
      oldProduct.img,
      oldProduct.desc,
      oldProduct.type
    );
    result.push(newProduct);
  }
  return result;
}
window.onload = () => {
  getProductList();
};

async function getProductList() {
  try {
    let res = await axios({
      url: "https://6336f4d45327df4c43cd013b.mockapi.io/baiTapLonJS",
      method: "GET",
    });
    productList = mapData(res.data);
    renderProductList();
    document.getElementById("close").click();
  } catch (error) {
    console.log(error);
  }
}
function renderProductList(data) {
  if (!data) data = productList;
  var HTMLProduct = "";
  for (let i = 0; i < data.length; i++) {
    currentProduct = data[i];
    HTMLProduct += `<tr > 
    <td>${currentProduct.id}</td>
    <td >${currentProduct.name}</td>
    <td>${currentProduct.price}</td>
    <td>${currentProduct.screen}</td>
    <td>${currentProduct.backCamera}</td>
    <td>${currentProduct.frontCamera}</td>
    <td class=""><img class="w-50 " src="${currentProduct.img}"/></td>
    <td>${currentProduct.desc}</td>
    <td>${currentProduct.type}</td>
    <td>
    <button onclick="deleteProduct(${currentProduct.id})" class="mb-1 btn btn-danger text-dark">Xoá</button>
    <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getUpdateProduct(${currentProduct.id})" class="btn btn-info text-dark">Sửa</button>
    </td>
    
    
    
    </tr>`;
  }

  document.getElementById("tableProduts").innerHTML = HTMLProduct;
}
async function deleteProduct(id) {
  try {
    await axios({
      url: "https://6336f4d45327df4c43cd013b.mockapi.io/baiTapLonJS/" + id,
      method: "DELETE",
    });

    renderProductList();
    getProductList();
  } catch (err) {
    console.log(err);
  }
}
function getUpdateProduct(id) {
  axios({
    url: "https://6336f4d45327df4c43cd013b.mockapi.io/baiTapLonJS/" + id,
    method: "GET",
  })
    .then((res) => {
      var product = res.data;
      console.log(res.data);
      let {
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type,
      } = product;

      document.getElementById("txtid").value = id;
      document.getElementById("txtname").value = name;
      document.getElementById("txtprice").value = price;
      document.getElementById("txtscreen").value = screen;
      document.getElementById("txtbackcamera").value = backCamera;
      document.getElementById("txtfontcamera").value = frontCamera;
      document.getElementById("txtimg").value = img;
      document.getElementById("txtdes").value = desc;
      document.getElementById("txttype").value = type;
      //hiện nut update
      document.getElementById("btnUpdateProduct").style.display =
        "inline-block";
      //khóa input id
      document.getElementById("txtid").disabled = true;
      document.getElementById("txtname").disabled = true;
      document.getElementById("btnAddproduct").style.display = "none";
    })
    .catch((err) => {
      console.log(err);
    });
}
async function updateProduct() {
  let id = document.getElementById("txtid").value;
  let name = document.getElementById("txtname").value;
  let price = document.getElementById("txtprice").value;
  let screen = document.getElementById("txtscreen").value;
  let backCamera = document.getElementById("txtbackcamera").value;
  let frontCamera = document.getElementById("txtfontcamera").value;
  let img = document.getElementById("txtimg").value;
  let desc = document.getElementById("txtdes").value;
  let type = document.getElementById("txttype").value;
  var newProduct = new Products(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  try {
    await axios({
      url: "https://6336f4d45327df4c43cd013b.mockapi.io/baiTapLonJS/" + id,
      method: "PUT",
      data: newProduct,
    });
    getProductList();
    document.getElementById("btnAddproduct").style.display = "inline-block";
    document.getElementById("btnUpdateProduct").style.display = "none";
    document.getElementById("txtid").disabled = false;
    document.getElementById("txtname").disabled = false;
    document.getElementById("resetform").reset();
  } catch (err) {
    console.log(err);
  }
}

async function createProduct() {
  var isValid = validateForm();
  if (!isValid) return;
  let id = document.getElementById("spanid").value;
  let name = document.getElementById("txtname").value;
  let price = document.getElementById("txtprice").value;
  let screen = document.getElementById("txtscreen").value;
  let backCamera = document.getElementById("txtbackcamera").value;
  let frontCamera = document.getElementById("txtfontcamera").value;
  let img = document.getElementById("txtimg").value;
  let desc = document.getElementById("txtdes").value;
  let type = document.getElementById("txttype").value;
  let newProduct = new Products(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  try {
    await axios({
      url: "https://6336f4d45327df4c43cd013b.mockapi.io/baiTapLonJS",
      method: "POST",
      data: newProduct,
    });
    document.getElementById("btnUpdateProduct").style.display = "none";
    getProductList();
  } catch (err) {
    console.log(err);
  }
}

function validateForm() {
  let name = document.getElementById("txtname").value;
  let price = document.getElementById("txtprice").value;
  let screen = document.getElementById("txtscreen").value;
  let backCamera = document.getElementById("txtbackcamera").value;
  let frontCamera = document.getElementById("txtfontcamera").value;
  let img = document.getElementById("txtimg").value;
  let desc = document.getElementById("txtdes").value;
  let type = document.getElementById("txttype").value;
  let isValid = true;
  isValid &= required(name, "spanname") && length(name, "spanname", 8, 10);
  isValid &= required(price, "spanprice") && length(price, "spanprice", 4, 7);
  isValid &= required(screen, "spanscreen");
  isValid &= required(backCamera, "spanbackcamera");
  isValid &= required(frontCamera, "spanfontcamera");
  isValid &= required(img, "spanimg");
  isValid &= required(desc, "spandes");
  isValid &= required(type, "spantype");

  return isValid;
}
//check độ dài
function required(val, spanid) {
  if (val.length === 0) {
    document.getElementById(spanid).innerHTML = "*vui lòng nhập thông tin!!";
    return false;
  }
  document.getElementById(spanid).innerHTML = "";
  return true;
}
function length(val, spanid, min, max) {
  if (val.length < min || val.length > max) {
    document.getElementById(
      spanid
    ).innerHTML = `*vui lòng nhập thông tin có độ dài từ ${min}-${max}!!`;
    return false;
  }
  document.getElementById(spanid).innerHTML = "";
  return true;
}

function reachProduct() {
  var keyword = document.getElementById("searchProducts").value;
  var res = [];
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(keyword)) {
      res.push(productList[i]);
    }
  }
  renderProductList(res);
}
