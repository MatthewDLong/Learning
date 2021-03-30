class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const increaseQualityIfLessThan50 = (item) => {
  if (item.quality < 50) {
    item.quality = item.quality + 1;
    if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sellIn < 11) {
        item.quality = item.quality + 1;
      }
      if (item.sellIn < 6) {
        item.quality = item.quality + 1;
      }
    }
  }
  return item;
};

const makeQualityZero = (item) => {
  item.quality = item.quality - item.quality;
  return item;
};

const reduceItemQuality = (item) => {
  if (item.quality < 0 || item.name === "Sulfuras, Hand of Ragnaros") {
    return item;
  }
  if (item.quality > 0) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return item;
    } else {
      item.quality = item.quality - 1;
    }
  }
  return item;
};

const reduceItemSellIn = (item) => {
  if (item.name != "Sulfuras, Hand of Ragnaros") {
    item.sellIn = item.sellIn - 1;
  }
  return item;
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateItem(item) {
    if (
      item.name === "Aged Brie" ||
      item.name === "Backstage passes to a TAFKAL80ETC concert"
    ) {
      increaseQualityIfLessThan50(item);
    } else {
      reduceItemQuality(item);
    }

    reduceItemSellIn(item);

    if (item.sellIn < 0) {
      if (item.name != "Aged Brie") {
        if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
          makeQualityZero(item);
        } else {
          reduceItemQuality(item);
        }
      } else {
        increaseQualityIfLessThan50(item);
      }
    }
    return item;
  }

  updateQuality() {
    const updatedItems = this.items.map(this.updateItem);
    return updatedItems;
  }
}

module.exports = {
  Item,
  Shop,
};
