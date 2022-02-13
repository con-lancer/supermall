import {request} from "@/network/request";
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.columns = columns;
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.lowNowPrice = itemInfo.lowNowPrice
    this.services = services;
  }
}

export class Shop {
  constructor(ShopInfo) {
    this.logo = ShopInfo.shopLogo;
    this.name = ShopInfo.name;
    this.fans = ShopInfo.cFans;
    this.sells = ShopInfo.cSells;
    this.score = ShopInfo.score;
    this.goodsCount = ShopInfo.cGoods
  }
}

export class GoodParam {
  constructor(info, rule) {
    //注：images 可能没有值（某些商品有值，某些没有值）
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
export class Comment {
  constructor(list) {
    this.list = list
  }
}
