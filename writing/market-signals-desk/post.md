---
title: "I Built a Stock Research Desk Out of Agents. Then I Made It Grade Itself."
subtitle: "What runs every day, what held up when scored, where it has been wrong, and one real stock walked through end to end."
date: 2026-11-23
summary: "A tour of my agent-run research desk: its daily routine, its graded track record (two chart patterns held up, most did not), and its full morning read on American Express."
reading_time: "9 min"
---

## Why I built a research desk out of agents

I follow about 200 US stocks. Reading each one properly every morning means looking at the chart, the last earnings report, the news, what analysts think and what the rest of its sector is doing. One person cannot do that for 200 names before work. I tried. I ended up reading ten stocks well and ignoring the rest.

So I built a desk. It is a set of scheduled research jobs. Code does the measuring, AI analysts do the reading and writing, and a second, senior reviewer checks each analyst's work before anything is published. Everything lands on one dashboard and in my inbox.

Two things interest me most. The first is underdogs: good businesses whose stock has fallen or been left behind, where the business itself suggests it can recover. The second is early industry setups, the kind you can see in company spending, supply and pricing before they show up in the share price.

I also wanted one rule from day one. The desk has to write down every call it makes and grade it later. If a signal does not work, I want to know, in numbers, and I want the desk to stop leaning on it.

## The desk at a glance

Six jobs run on a schedule. All times are US Pacific.

[[FIGURE: desk-diagram]]

| Job | When | What it produces |
|---|---|---|
| Daily brief | Weekdays, before the open | What changed, signals to watch, a technical scan of every stock, sector direction, underdogs, and small studies the desk runs on its own questions |
| Trigger check | Weekdays, after the close | Checks every price level written in advance against the day's close, rewrites about 20 chart reads, records and grades calls |
| Earnings and verdict | Weekday evenings | Earnings cards for companies that reported, crowd and analyst sentiment, a news radar, and a combined verdict for every stock |
| The lab | Twice a week | Research agents propose new signals; a fixed test decides which ones pass |
| Weekly review | Saturday morning | Deep dives on underdogs, a wider market sweep, and written post-mortems on the desk's own calls |
| Sunday prep | Sunday morning | The week ahead: who reports, the economic calendar, the levels closest to being crossed |

The roles matter more than the schedule. A chart analyst reads price. A fundamentals reader turns an earnings report into a short card: the figures, what was good, what was weak, and the bear case. A sector check asks whether a move belongs to the company or to its whole industry. A news radar and a sentiment read fill in the rest. Then code lays the reads side by side and says where they agree and where they conflict. That last step is the verdict. It is a summary of evidence, not a prediction.

## What has worked

The desk grades its calls against how the typical stock it tracks did over the same 20 trading sessions. So 50% is a coin flip.

Two chart patterns have held up:

- **Inverse head and shoulders** (three dips where the middle one is deepest, often seen at the end of a decline): right 62% of the time across 228 cases.
- **Double bottom** (two lows at about the same price with a bounce in between): right 59% of the time across 329 cases.

Those hit rates come only from windows with no news event inside them, so they measure the pattern and not an earnings surprise.

[[FIGURE: track-record]]
*Hit rate by pattern over 20 sessions, against a 50% coin flip. Only windows with no news event are counted.*

Three other parts of the desk have earned their place.

**The reviewer.** In the American Express example below, the first draft of the earnings card missed that most of the profit growth came from a lower tax rate. The reviewer went back to the filing, added it, and marked the beat as lower quality.

**The sector check.** It is a simple comparison of a stock's daily moves with its sector fund. It has repeatedly stopped me from reading a market-wide drop as bad news about one company.

**The lab's filter.** Research agents have proposed 349 new signals. Four passed both tests and are in use. A filter that rejects 99% of ideas is doing its job, and every rejected idea stays on the record so the bar rises as more are tried.

## Where it fails, and what I do about it

Most of what technical analysis textbooks teach did not beat chance on my stocks.

The desk replayed its signals over about 36,000 past cases, using only the prices available on each past date. "Sitting on support", RSI extremes, Bollinger band touches and Fibonacci levels all came out no better than a coin flip. A double top was right 48% of the time. A cup and handle was right 40% of the time and a bear flag 34%, which means they tended to come before the opposite move.

The analysts' confidence labels are not working yet either. Reads marked high conviction were right 48% of the time. Reads marked low conviction were right 50%. So far the label carries no information.

And the desk has been plainly wrong on single stocks. On American Express, the stock I walk through below, its graded calls stand at 11 wrong and none right. That is an early result on one stock over about two months, and 9 of those windows had a news event inside them. It is still a bad record, and it is on the page the analyst sees before writing.

Every miss gets a label. Code first tags whether an earnings date or an unusually large move sat inside the window. Then, once a week, a reviewer writes one line on each failure and marks it "method wrong" (the call itself was bad) or "news overrode it" (a dated event changed the picture). Of 112 post-mortems so far, 59 were news and 48 were method. Because code tags the events first, "news" cannot become an excuse bin.

What I changed because of this:

- A pattern that has not beaten chance can still be drawn and named, but it can no longer be the reason for a call.
- Half of all crossed price levels were back on the other side within three sessions. The levels were too close to price, so the desk now sets them further away.
- Fibonacci and band levels count only as supporting evidence when they overlap something independent.
- Next, I will keep grading the conviction labels. If they still do not separate right from wrong, I will remove them.

## One stock, end to end: American Express (AXP), Nov 23, 2026

This is the desk's actual read from the morning brief of Nov 23, 2026, using prices through Friday, Nov 20. Prices are adjusted for dividends, so older levels can sit slightly under the quoted price of the day.

[[FIGURE: axp-chart]]

### Chart analyst

American Express closed at 301.70 after falling 5.9% in a week.

Start with **support**: a price where a falling stock has repeatedly stopped and turned. The desk found one near 300.90 that has held five times this year. The stock is sitting right on it. There is an older one at 288.37.

Above the price are the **moving averages**, which are just the average closing price over a recent stretch of days. The 21 day average is at 317.08, the 50 day at 318.34 and the 200 day at 321.80. The price is under all three, so each one is now a ceiling the stock has to climb back through. The first **resistance**, the mirror image of support, is at 313.24.

**RSI** is a 0 to 100 gauge of how hard a stock has been bought or sold recently. The desk reads it against each stock's own history. At 34, it is low for this stock.

The chart code also drew two patterns: a double bottom, which is bullish, and a **double top** (two highs at about the same price, which is bearish). Both were drawn through the same swing points. One shape cannot be evidence for two opposite outcomes, so the analyst called it a forced pair and gave it no weight.

Six flags were raised on the stock that morning. Here is what the backtest says about each.

[[FIGURE: evidence-table]]

None of the six beat chance. The desk prints that next to the flags so nobody, including me, mistakes them for a reason to act.

[[FIGURE: agent-cards]]

### Earnings and fundamentals reader

The [third quarter report](https://www.sec.gov/Archives/edgar/data/0000004962/000000496226000405/q326exhibit991.htm) of Oct 23 beat on earnings per share at 4.68, and the company [raised its full year forecast](https://www.investing.com/news/stock-market-news/american-express-raises-2026-profit-forecast-as-affluent-customers-keep-spending-4968920). Card spending rose 8% and the write-off rate held at 1.8%.

Underneath, profit before tax grew only about 2% once a lower tax rate, a release of loan reserves and a one-off gain are set aside. Costs grew as fast as revenue. The reader's call: the business is intact, the beat was lower quality than the headline, and the stock fell 3.7% on the day.

### Sector check

The desk compared the stock's daily moves with the financials fund XLF over the past 250 sessions. American Express normally moves about 1.26 times as much as the fund. Measured that way, last week's drop belonged to the sector. The stock did 3.5% better than its link to the fund implied.

[[FIGURE: sector-regression | AXP daily moves against XLF over 250 sessions, with last week highlighted]]

### News radar

The main risk is political. On Nov 21 the President [said he would back a 10% cap on card interest rates](https://thehill.com/business/6235394) with Democrats. A [bill exists](https://www.congress.gov/bill/119th-congress/senate-bill/381) but has not moved since it was introduced. The radar also listed about 122 million dollars of insider share sales in early November, including the chief executive [selling exercised options](https://mlq.ai/news/american-express-ceo-stephen-squeri-sold-99-million-of-stock-on-nov-4-outside-a-10b5-1-plan/) outside a pre-set trading plan.

### Sentiment

The retail crowd on Stocktwits reads neutral at 45 out of 100, close to the stock's own average for the month. Analysts are more positive. Per Finviz, their average price target is about 21% above the price and the average rating sits near Buy. Only 1.6% of tradable shares are sold short, meaning few investors are betting against it.

### Own study

Each morning the desk can ask its own question and count. Here it asked: how often has this stock closed on a well-tested support while under both shorter averages, and what happened next?

[[FIGURE: own-study]]

It found 15 earlier cases. The stock was higher 20 sessions later in 64% of them, with a median gain of 4.2%. For comparison, any random 20 sessions were higher 56% of the time. But in 9 of 14 cases the price first slipped 2% or more under the level. The desk's own verdict on its own count: too few cases to lean on.

### Lead verdict

Two of five kinds of evidence agree: the business results and analyst expectations point up, and the other three do not. The call is watch, not act.

The levels do the deciding:

- A close below **301.03** breaks the idea.
- A close below **296.28** confirms the floor has gone.
- A close back above **313.24** means the support held.

## Same evening

By that evening the combined verdict for American Express read "No clear read".

Nothing dramatic happened. The stock closed at 306.90, between the levels above. The morning count is a researcher's tally for one idea. The evening verdict is rebuilt by code from every read on the stock, and when it lined them up, the mixed earnings card, the neutral crowd and a low-conviction chart read cancelled out.

I count that as a feature. A desk that cannot say "I don't know" will always find a story, and a story is the most common way to lose money on a chart.

## What I'd tell someone building one

1. **Record every call when it is made.** If you only remember the calls that worked, you do not have a track record.
2. **Let code grade and let code tag the news.** People are generous to their own misses.
3. **Use two tiers.** A reviewer who checks the source catches things a first draft will not.
4. **Show the evidence next to the signal.** "Sitting on support" reads very differently beside "did not beat chance in 7,761 cases".
5. **Expect most ideas to fail.** Four passes out of 349 is a normal result, not a broken lab.

## A note before you go

This desk is research to inform my own decisions. It is not investment advice, and it does not place trades.

I will update this post after about 20 trading sessions with what American Express did against each of the three levels, and how the desk graded its own call.

