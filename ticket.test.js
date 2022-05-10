const { clickElement, getText } = require("./lib/commands");
const {
  bookTicket,
  purchase,
  chooseDayAndMovie,
  success,
} = require("./lib/utils");

let page;

function getRandom(min, max) {
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

  test.skip("Should check if available time is shown - test'", async () => {
    await chooseDayAndMovie(
      page,
      ".page-nav > a:nth-child(2)",
      "section:nth-child(2) li"
    );
    const actual = await getText(page, "div > p.buying__info-start");

    expect(actual).toContain("Начало сеанса: 17:00");
  });

  test.skip("Should book a ticket if available - test'", async () => {
    let row = getRandom(1, 10);
    let chair = getRandom(1, 10);

    await chooseDayAndMovie(
      page,
      ".page-nav > a:nth-child(5)",
      "section:nth-child(3) li"
    );
    await clickElement(
      page,
      `div:nth-child(${row}) > span:nth-child(${chair})`
    );

    disabled = await page.$eval(
      "button.acceptin-button",
      (button) => button.disabled
    );
    if (!disabled) {
      await purchase(page);
      actual = await getText(page, "p.ticket__hint");
      expect(actual).toContain("Покажите QR-код");
    } else {
      expect(disabled).toEqual(true);
    }
  });

  test("Should not book a ticket if already booked - test", async () => {
    await chooseDayAndMovie(
      page,
      ".page-nav > a:nth-child(5)",
      "section:nth-child(3) li"
    );
    await clickElement(page, "div:nth-child(4) > span:nth-child(6)");
    await clickElement(page, "button.acceptin-button");
    expect(await getText(page, "h2.ticket__check-title")).toContain(
      "Вы выбрали билеты:"
    );
    await clickElement(page, "button.acceptin-button");
    expect(await getText(page, "h2.ticket__check-title")).toContain(
      "Электронный билет"
    );

    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await chooseDayAndMovie(
      page,
      ".page-nav > a:nth-child(5)",
      "section:nth-child(3) li"
    );
    await clickElement(page, "div:nth-child(4) > span:nth-child(6)");
    expect(
      String(
        await page.$eval("button.acceptin-button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});
