const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose - updateQuality", function () {
  describe("Wine", () => {
    it("should reduce quality by 1", () => {
      const gildedRose = new Shop([new Item("Wine", 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("should reduce sellIn by 1", () => {
      const gildedRose = new Shop([new Item("foo", 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(0);
    });

    it("should not reduce quality if quality is 0", () => {
      const gildedRose = new Shop([new Item("Wine", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("should reduce quality twice as fast when sellIn is less than 0", () => {
      const gildedRose = new Shop([new Item("Wine", -1, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
  });

  describe("Aged Brie", () => {
    it("should increase quality by 1 if quality is less than 50", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it("should increase quality by 1 if quality is less than 50 and sellIn is less than 0", () => {
      const gildedRose = new Shop([new Item("Aged Brie", -1, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it("should not change quality if quality is equal to 50 and sellIn is less than 0", () => {
      const gildedRose = new Shop([new Item("Aged Brie", -1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it("should increase quality by 2 if quality less than 50 and sellIn is less than 0", () => {
      const gildedRose = new Shop([new Item("Aged Brie", -1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(3);
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert", () => {
    it("should increase quality by 3 if quality is less than 50 and sellIn is less than 6", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(4);
    });

    it("should increase quality by 2 if quality is less than 50 and sellIn is less than 11", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(3);
    });

    it("should increase quality by 1 if quality is less than 50 and sellIn is greater than 10", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(2);
    });

    it("should reduce quality to zero if sellIn is less than 0", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", -1, 50),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    it("should not reduce quality", () => {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 1, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(80);
    });

    it("should not reduce sellIn value", () => {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 1, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(1);
    });
  });
});
