const { clickElement, getText, bookTicket } = require("./lib/commands");

let page;

function getRandom(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Tickets tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Should check if available time is shown - test'", async () => {

    await clickElement(page, ".page-nav > a:nth-child(6)");
    await clickElement(page, "section:nth-child(2) li");
    await page.waitForSelector("div > p.buying__info-start");
 //   await page.$eval("div > p.buying__info-start", (link) => link.textContent);
    const actual = await getText(
      page, "div > p.buying__info-start");

    expect(actual).toContain("Начало сеанса: 17:00");
  });

  test("Should book a ticket - test'", async () => {
   let raw1 = getRandom(1, 10);
   let chair1 = getRandom(1, 10);
   // let raw2 = getRandom(1, 10);
   // let chair2 = getRandom(1, 10);

    await clickElement(page, ".page-nav > a:nth-child(5)");
    await clickElement(page, "section:nth-child(3) li");
    await page.waitForSelector("div > p.buying__info-start");
   // await bookTicket(page, `div:nth-child(${raw1}) > span:nth-child(${chair1})`, `div:nth-child(${raw2}) > span:nth-child(${chair2})`);

    await bookTicket(page, `div:nth-child(${raw1}) > span:nth-child(${chair1})`)

    actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain("Покажите QR-код");
   });
  });
