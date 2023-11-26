---
title: The origin story
---

Host static sites. Sounds trivial, right?

Here are details worth considering, whether you host on your own servers or rely on a platform like the one we're
building.

## Security: full HTTPS, HSTS, headers galore

Securing all traffic is a no-brainer.

All HTTP traffic is redirected to HTTPS, and we
include [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) headers everywhere.

We go a bit further,
with `referrer-policy: no-referrer`, `x-content-type-options: nosniff`, `x-frame-options: SAMEORIGIN` out of the box.

## Admin: 2 clicks to sign in, 1 click to rollback, no delays

We've been there: the latest launch is broken, a rollback is in order.

We've made it as fast and simple as possible, and as with any launch, it's effective across our infrastructure in
milliseconds.

And to make sure wires don't get crossed, the entire admin console is fully reactive.

## Uploads: only what's changed

`xmit` is smart enough to only upload files that have changed. It's open source (0BSD license), so you can inspect the
details. In short, it generates a manifest of all file hashes, uploads it only if it's new (checked by hash),
then uploads only files whose hashes are new.

## Safe launches: atomicity & fallthrough

With atomic launches, it's all or nothing, and within the milliseconds of propagation delays of our coordination
system ([etcd](https://etcd.io/)). A client won't see HTML referring to a new JS/CSS/asset until it's been made
available on its connection, avoiding a common source of 404s.

To fully avoid 404s, previous launches also need to be excluded slowly: servers need to fall through, so a client which
loaded HTML just before a launch, which referred to JS/CSS/assets not included in said launch, still gets enough chances
to load them (today, over 5 launches and 10 minutes, such that removing a resource propagates consistently within an
short window).

## xmit subdomains: every upload is visible to your team

Every upload can be accessed through a dedicated xmit subdomain, letting you vet it before launch if you didn't enable
launch on upload. Those subdomains are only accessible to your team. They stick around, so it's easy to check what was
online at any point in recent history.

## Protocols: HTTP/1.1, HTTP/2, & H3

[HTTP/2](https://en.wikipedia.org/wiki/HTTP/2) was a leap forward. [QUIC](https://en.wikipedia.org/wiki/QUIC) is
another.

We support both, announced through DNS HTTPS records and Alt-Svc headers.

## `accept-ranges: bytes`

Resume downloads, play videos in Safari, and more. We support `range` requests and advertise it to clients.

## Compression: `gzip` whenever worthwhile

Rather than hardcode a list of extensions or MIME types worthy of compression,
we give it a go on everything, and use the compressed version when requested and smaller.

## Caching: `ETag` & `if-none-match`

na
Our servers only rely on content-addressible caching. Browsers cache URLs.

We do not introduce any propagation delays in CDNs, proxies, or browser caches other than through headers you control.

But if the browser saw a resource already, no reason to transfer it again. That's
where [`ETag`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) comes in.
We always report one, and return `304 Not Modified` if it appears in the `if-none-match` header received from clients.

## `www` subdomain

Unless you launch a site there, we redirect `www` to its parent domain for you.

## No need for a subdirectory per page

Name your page `hello.html` and access it at `/hello`. Simple and practical.

## Just enough config

`xmit.toml`, which isn't served, offers simple settings. For example:

```toml
fallback = "index.html" # for Single Page Apps
404 = "404.html" # for custom 404 pages (none in SPAs)

[[headers]] # add a CORS header
name = "access-control-allow-origin"
value = "*"

[[headers]] # unset "referrer-policy"
name = "referrer-policy"

[[headers]] # cache assets for a year
name = "cache-control"
value = "public, max-age=31536000"
on = "/assets/.*"

[[redirects]]
from = "/new/(.*)"
to = "/$1"
permanent = true # 301 instead of 307
```
