class Tile {
  img = null;
  num = 0;

  constructor(img, num) {
    this.img = img;
    this.num = num;
  }

  getImg() {
    return this.img;
  }

  getNum() {
    return this.num;
  }
}
