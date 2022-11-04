class Cart {
  constructor(productId, productName, img, price, amount) {
    this.productId = productId;
    this.productName = productName;
    this.img = img;
    this.price = price;
    this.amount = amount;
  }
  calcPrice() {
    var pri = +this.price;
    var amou = +this.amount;
    // return this.price * this.amount;
    return pri * amou;
  }
}
