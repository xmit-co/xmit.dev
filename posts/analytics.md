---
title: "Launching analytics on xmit.co"
date: 2025-11-28
---

[xmit.co](https://xmit.co) now sports server-side analytics. We do not use cookies, record the IP address or geolocation in any way. We do not track sessions.

Entirely backed by strictly filtered access logs injected in a ClickHouse cluster and queriable from a new tab on the site.

## What's recorded exactly?

For each HTTP request, we record:

- Time of the request
- Site identifier
- Domain (one site can have multiple domains)
- Path of the request (e.g. `/`, `/style.css`, etc.)
- User agent (not exposed through the API today, can be used for recategorization of the traffic)
- Referrer (if available)
- Type (mobile, tablet, desktop, bot; does a poor job at detecting bots)
- HTTP status code
- Content type of the response

## How do I try it?

Head to [xmit.co/analytics](https://xmit.co/analytics).

## Is it free?

Currently, 100%.

It will remain available for free in some capacity, but we reserve the right to add paid features and/or limit existing features to paying customers.

More generally, keen to explore paid services under the xmit brand and on top of the platform we're building.
