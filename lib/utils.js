const { clickElement } = require("./commands");
module.exports = {
  chooseDayAndMovie: async function (page, day, movie) {
    await clickElement(page, day);
    await clickElement(page, movie);
    await page.waitForSelector("div > p.buying__info-start");
  },

  bookTicket: async function (page, day, movie, chair) {
    await clickElement(page, day);
    await clickElement(page, movie);
    await page.waitForSelector("div > p.buying__info-start");
    await clickElement(chair);
  },

  purchase: async function (page) {
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
  },

  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
