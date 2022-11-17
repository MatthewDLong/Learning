const puppeteer = require("puppeteer");

(async () => {
  const activities = [
    {
      date: "21/07/2020",
      activity_time: "08:25",
      time_hour: "0",
      time_minutes: "27",
      distance_km: "5",
    },
    {
      date: "28/07/2022",
      activity_time: "08:32",
      time_hour: "0",
      time_minutes: "40",
      distance_km: "5.09",
    },
    {
      date: "11/11/2022",
      activity_time: "08:43",
      time_hour: "0",
      time_minutes: "34",
      distance_km: "5.09",
    },
    {
      date: "05/11/2022",
      activity_time: "08:52",
      time_hour: "0",
      time_minutes: "31",
      distance_km: "5.14",
    },
    {
      date: "11/08/2020",
      activity_time: "08:30",
      time_hour: "0",
      time_minutes: "30",
      distance_km: "5.23",
    },
    {
      date: "16/09/2020",
      activity_time: "08:48",
      time_hour: "0",
      time_minutes: "31",
      distance_km: "5.33",
    },
    {
      date: "23/02/2021",
      activity_time: "08:24",
      time_hour: "0",
      time_minutes: "36",
      distance_km: "5.58",
    },
    {
      date: "07/07/2020",
      activity_time: "08:10",
      time_hour: "0",
      time_minutes: "59",
      distance_km: "5.65",
    },
    {
      date: "02/02/2021",
      activity_time: "08:34",
      time_hour: "0",
      time_minutes: "44",
      distance_km: "5.91",
    },
    {
      date: "21/03/2022",
      activity_time: "08:56",
      time_hour: "0",
      time_minutes: "37",
      distance_km: "6.06",
    },
    {
      date: "04/09/2022",
      activity_time: "08:53",
      time_hour: "0",
      time_minutes: "36",
      distance_km: "6.21",
    },
    {
      date: "04/08/2022",
      activity_time: "08:23",
      time_hour: "0",
      time_minutes: "40",
      distance_km: "6.28",
    },
    {
      date: "15/10/2021",
      activity_time: "09:22",
      time_hour: "0",
      time_minutes: "36",
      distance_km: "6.36",
    },
    {
      date: "25/09/2022",
      activity_time: "08:32",
      time_hour: "0",
      time_minutes: "41",
      distance_km: "6.46",
    },
    {
      date: "10/08/2022",
      activity_time: "08:23",
      time_hour: "0",
      time_minutes: "44",
      distance_km: "6.47",
    },
    {
      date: "13/10/2021",
      activity_time: "08:23",
      time_hour: "0",
      time_minutes: "44",
      distance_km: "6.63",
    },
    {
      date: "24/08/2020",
      activity_time: "09:12",
      time_hour: "1",
      time_minutes: "7",
      distance_km: "6.78",
    },
    {
      date: "04/01/2021",
      activity_time: "09:15",
      time_hour: "0",
      time_minutes: "48",
      distance_km: "7.12",
    },
    {
      date: "07/08/2022",
      activity_time: "08:26",
      time_hour: "0",
      time_minutes: "48",
      distance_km: "7.53",
    },
    {
      date: "06/11/2022",
      activity_time: "08:45",
      time_hour: "0",
      time_minutes: "45",
      distance_km: "7.6",
    },
    {
      date: "19/07/2020",
      activity_time: "08:52",
      time_hour: "0",
      time_minutes: "54",
      distance_km: "7.82",
    },
    {
      date: "15/10/2021",
      activity_time: "08:12",
      time_hour: "0",
      time_minutes: "53",
      distance_km: "7.83",
    },
    {
      date: "06/11/2021",
      activity_time: "08:54",
      time_hour: "1",
      time_minutes: "3",
      distance_km: "8.44",
    },
    {
      date: "25/08/2020",
      activity_time: "08:34",
      time_hour: "0",
      time_minutes: "55",
      distance_km: "8.68",
    },
    {
      date: "23/10/2021",
      activity_time: "08:54",
      time_hour: "1",
      time_minutes: "14",
      distance_km: "9.61",
    },
    {
      date: "21/06/2020",
      activity_time: "08:23",
      time_hour: "1",
      time_minutes: "1",
      distance_km: "9.88",
    },
    {
      date: "10/06/2020",
      activity_time: "08:19",
      time_hour: "1",
      time_minutes: "11",
      distance_km: "9.94",
    },
    {
      date: "11/03/2022",
      activity_time: "08:17",
      time_hour: "1",
      time_minutes: "1",
      distance_km: "10.02",
    },
    {
      date: "12/10/2020",
      activity_time: "08:15",
      time_hour: "0",
      time_minutes: "57",
      distance_km: "10.04",
    },
    {
      date: "26/04/2022",
      activity_time: "08:19",
      time_hour: "1",
      time_minutes: "3",
      distance_km: "10.04",
    },
    {
      date: "26/09/2020",
      activity_time: "08:28",
      time_hour: "1",
      time_minutes: "1",
      distance_km: "10.05",
    },
    {
      date: "30/09/2020",
      activity_time: "08:14",
      time_hour: "1",
      time_minutes: "2",
      distance_km: "10.06",
    },
    {
      date: "08/03/2021",
      activity_time: "08:27",
      time_hour: "1",
      time_minutes: "6",
      distance_km: "10.09",
    },
    {
      date: "12/05/2021",
      activity_time: "08:13",
      time_hour: "1",
      time_minutes: "8",
      distance_km: "10.1",
    },
    {
      date: "25/09/2021",
      activity_time: "08:25",
      time_hour: "1",
      time_minutes: "9",
      distance_km: "10.11",
    },
    {
      date: "19/03/2021",
      activity_time: "08:14",
      time_hour: "1",
      time_minutes: "5",
      distance_km: "10.13",
    },
    {
      date: "07/11/2020",
      activity_time: "08:12",
      time_hour: "1",
      time_minutes: "9",
      distance_km: "10.48",
    },
    {
      date: "18/11/2020",
      activity_time: "08:34",
      time_hour: "1",
      time_minutes: "5",
      distance_km: "10.55",
    },
    {
      date: "10/09/2020",
      activity_time: "08:32",
      time_hour: "1",
      time_minutes: "2",
      distance_km: "10.58",
    },
    {
      date: "27/08/2020",
      activity_time: "08:17",
      time_hour: "1",
      time_minutes: "3",
      distance_km: "10.59",
    },
    {
      date: "24/10/2021",
      activity_time: "08:49",
      time_hour: "1",
      time_minutes: "13",
      distance_km: "10.74",
    },
    {
      date: "06/05/2021",
      activity_time: "08:59",
      time_hour: "1",
      time_minutes: "37",
      distance_km: "10.78",
    },
    {
      date: "11/01/2021",
      activity_time: "08:23",
      time_hour: "1",
      time_minutes: "15",
      distance_km: "10.9",
    },
    {
      date: "27/08/2021",
      activity_time: "08:45",
      time_hour: "1",
      time_minutes: "22",
      distance_km: "10.92",
    },
    {
      date: "05/04/2021",
      activity_time: "08:46",
      time_hour: "1",
      time_minutes: "12",
      distance_km: "11.06",
    },
    {
      date: "23/10/2020",
      activity_time: "08:35",
      time_hour: "1",
      time_minutes: "12",
      distance_km: "11.54",
    },
    {
      date: "25/05/2022",
      activity_time: "08:45",
      time_hour: "1",
      time_minutes: "15",
      distance_km: "11.75",
    },
    {
      date: "12/11/2021",
      activity_time: "08:46",
      time_hour: "1",
      time_minutes: "16",
      distance_km: "11.99",
    },
    {
      date: "01/04/2022",
      activity_time: "08:49",
      time_hour: "1",
      time_minutes: "17",
      distance_km: "12.96",
    },
    {
      date: "17/10/2021",
      activity_time: "08:52",
      time_hour: "1",
      time_minutes: "25",
      distance_km: "13.06",
    },
    {
      date: "02/04/2022",
      activity_time: "08:56",
      time_hour: "1",
      time_minutes: "21",
      distance_km: "13.23",
    },
    {
      date: "10/05/2021",
      activity_time: "08:23",
      time_hour: "1",
      time_minutes: "27",
      distance_km: "13.38",
    },
    {
      date: "07/05/2021",
      activity_time: "08:56",
      time_hour: "1",
      time_minutes: "36",
      distance_km: "13.47",
    },
    {
      date: "16/02/2021",
      activity_time: "08:45",
      time_hour: "1",
      time_minutes: "35",
      distance_km: "13.61",
    },
    {
      date: "28/10/2021",
      activity_time: "08:23",
      time_hour: "1",
      time_minutes: "36",
      distance_km: "13.72",
    },
    {
      date: "08/12/2020",
      activity_time: "08:34",
      time_hour: "1",
      time_minutes: "39",
      distance_km: "15.04",
    },
    {
      date: "04/02/2022",
      activity_time: "08:23",
      time_hour: "1",
      time_minutes: "38",
      distance_km: "15.08",
    },
    {
      date: "21/11/2021",
      activity_time: "08:13",
      time_hour: "2",
      time_minutes: "0",
      distance_km: "20.03",
    },
    {
      date: "15/11/2022",
      activity_time: "09:43",
      time_hour: "1",
      time_minutes: "24",
      distance_km: "14.39",
    }
  ];

  async function sync() {
    for (var i = 0; i < activities.length; i++) {
      function delay(time) {
        return new Promise(function (resolve) {
          setTimeout(resolve, time);
        });
      }

      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(
        "https://www.justgiving.com/fundraising/marathon-manchester-2023"
      );

      const cookiesSelector = "#accept-all-Cookies";
      await page.waitForSelector(cookiesSelector);
      await page.click(cookiesSelector);

      const linkHandlers = await page.$x('//span[contains(text(), "Log in")]');

      await linkHandlers[0].click();

      await page.waitForSelector("input[name=EmailAddress]");

      await page.$eval(
        "input[name=EmailAddress]",
        (el) => (el.value = "")
      );

      await page.waitForSelector("input[name=Password]");

      await page.$eval(
        "input[name=Password]",
        (el) => (el.value = "")
      );

      await page.click('button[type="submit"]');

      const addData = await page.waitForXPath(
        '//*[@id="content"]/div/div[3]/div/aside/section[1]/div/div[3]/button'
      );

      await addData.click();

      const activityDate = await page.waitForSelector(
        "input[name=activityDate]"
      );

      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.press("Backspace");
      activityDate.type(activities[i]["date"]);

      const activityTime = await page.waitForSelector(
        "input[name=activityTime]"
      );

      activityTime.press("Backspace");
      activityTime.press("Backspace");
      activityTime.press("Backspace");
      activityTime.press("Backspace");
      activityTime.press("Backspace");
      activityTime.press("Backspace");
      activityTime.press("Backspace");
      activityTime.press("Backspace");
      activityTime.press("Backspace");
      activityTime.press("Backspace");
      activityTime.type(activities[i]["activity_time"]);

      const amPmSelect = await page.waitForXPath(
        '//*[@id="content"]/div/div[3]/div/aside/section[1]/div/div[4]/div/div[2]/div/div/div/div/form/div[1]/div/div[3]/label/div/button'
      );

      await amPmSelect.click();

      const pm = await page.waitForXPath('//*[@id="downshift-0-item-1"]');

      await pm.click();

      const activityType = await page.waitForXPath(
        '//*[@id="content"]/div/div[3]/div/aside/section[1]/div/div[4]/div/div[2]/div/div/div/div/form/div[2]/label/div/button'
      );

      await activityType.click();

      const run = await page.waitForXPath('//*[@id="downshift-1-item-0"]');

      await run.click();

      const distance = await page.waitForXPath('//*[@id="distance"]');

      await distance.type(activities[i]["distance_km"]);

      const unit = await page.waitForXPath(
        '//*[@id="content"]/div/div[3]/div/aside/section[1]/div/div[4]/div/div[2]/div/div/div/div/form/div[3]/div/div[2]/label/div/button'
      );

      await unit.click();

      const km = await page.waitForXPath('//*[@id="downshift-2-item-0"]');

      await km.click();

      const durationHour = await page.waitForXPath('//*[@id="durationHours"]');

      await durationHour.type(activities[i]["time_hour"]);

      const durationMin = await page.waitForXPath('//*[@id="durationMinutes"]');

      await durationMin.type(activities[i]["time_minutes"]);

      const title = await page.waitForXPath('//*[@id="title"]');

      await title.type("Run");

      const submit = await page.waitForXPath(
        '//*[@id="content"]/div/div[3]/div/aside/section[1]/div/div[4]/div/div[2]/div/div/div/div/form/button[1]'
      );

      await submit.click();

      await delay(2000);
    }
  }

  await sync();
})();
