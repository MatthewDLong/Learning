# Metrics Dashboard

## Description

Create an analytics dashboard that shows historical data of tech stocks.

To understand the performance, you need the to see the data that shows how well a particular stock is doing.

### Objective 1

Create a HTML table that shows historical data of several tech stocks.

[x] Choose tech stocks: AAPL - end of day data
[x] Request stock data
[x] Add data to table

### Objective 2

Create a dashboard of charts that display metrics for key performance indicators.

[] Add charts for data
[] Add dashboard of charts

### Objective 3

Link each chart to a page that provides raw, in depth data for that performance indicator.

[] Add pages for charts
[] Add raw data for charts

### Notes

Market stack API key: ebd8c2157db949fb4531c41019ea3bd1
Market stack base url: http://api.marketstack.com/v1/

example request for end of day (eod) data:

GET http://api.marketstack.com/v1/eod?access_key=ebd8c2157db949fb4531c41019ea3bd1&symbols=AAPL,GOOG,TWTR,FB&limit=10

#### Progress update

After 1 hour and a half I managed to write some tests for rendering.
I set up a `msw` Server to intercept and mock a Market Stack API request.
I started on creating a reducer and a client to fetch stock data.
