const { Given, When, Then, Before, After } = require("cucumber");
const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { clickElement, getText } = require("../../lib/commands");
const { purchase, chooseDayAndMovie, getRandom } = require("../../lib/utils");
var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on the page {string}", async function (string) {
  return await this.page.goto(`${string}`);
});

When("user chooses day and movie", async function () {
  await chooseDayAndMovie(
    this.page,
    ".page-nav > a:nth-child(2)",
    "section:nth-child(2) li"
  );
});

When("user chooses day, movie and chair", async function () {
  let row = getRandom(1, 10);
  let chair = getRandom(1, 10);

  await chooseDayAndMovie(
    this.page,
    ".page-nav > a:nth-child(5)",
    "section:nth-child(3) li"
  );
  await clickElement(
    this.page,
    `div:nth-child(${row}) > span:nth-child(${chair})`
  );
});

When("user books movie and tries to book it again", async function () {
  let row = getRandom(1, 10);
  let chair = getRandom(1, 10);

  await chooseDayAndMovie(
    this.page,
    ".page-nav > a:nth-child(5)",
    "section:nth-child(3) li"
  );
  await clickElement(
    this.page,
    `div:nth-child(${row}) > span:nth-child(${chair})`
  );
  await clickElement(this.page, "button.acceptin-button");
  expect(await getText(this.page, "h2.ticket__check-title")).contains(
    "Вы выбрали билеты:"
  );
  await clickElement(this.page, "button.acceptin-button");
  expect(await getText(this.page, "h2.ticket__check-title")).contains(
    "Электронный билет"
  );

  await this.page.goto("http://qamid.tmweb.ru/client/index.php");
  await chooseDayAndMovie(
    this.page,
    ".page-nav > a:nth-child(5)",
    "section:nth-child(3) li"
  );
  await clickElement(
    this.page,
    `div:nth-child(${row}) > span:nth-child(${chair})`
  );
});

Then("user sees if available time is shown", async function () {
  const actual = await getText(this.page, "div > p.buying__info-start");
  const expectText = "Начало сеанса";
  expect(actual).contains(expectText);
});

Then("user books and receives ticket", async function () {
  disabled = await this.page.$eval(
    "button.acceptin-button",
    (button) => button.disabled
  );
  if (!disabled) {
    await purchase(this.page);
    actual = await getText(this.page, "p.ticket__hint");
    expect(actual).contains("Покажите QR-код");
  } else {
    expect(disabled).toEqual(true);
  }
});

Then("user sees that chair is taken", async function () {
  expect(
    String(
      await this.page.$eval("button.acceptin-button", (button) => {
        return button.disabled;
      })
    )
  ).contains("true");
});
