---
title: The origin story
---

Host static sites. Sounds trivial, right?

Here are details worth considering, whether you host on your own servers or rely on a platform like the one we're building.

## Safe deploys: atomicity & fallthrough

With atomic launches, it's all or nothing, and within the milliseconds of propagation delays of our coordination
system ([etcd](https://etcd.io/)). So a client won't see HTML referring to a new JS/CSS/asset until
it's been made available, avoiding a common source of 404s.

To fully avoid 404s, previous launches also need to be excluded slowly: servers need to fall through, so a client which
loaded HTML just before a launch, which referred to JS/CSS/assets not included in said launch, still gets enough chances
to load them (today, over 3 launches and 10 minutes, such that replacing a resource with the fallback page occurs
consistently within an short window).

## Upload vs launch, unbounded subdomains: your workflow, your URLs, internal previews

Some use cases prefer launching upon upload, others to promote after internal previews. Any individual or tool might
launch public previews on subdomains. It should be your workflows over a flexible model.

## Admin: 2 clicks to sign in, 1 click to rollback, no delays

We've been there: the latest launch is broken, a rollback is in order.

We've made it as fast and simple as possible, and as with any launch, it's effective across our infrastructure in
milliseconds.

And to make sure wires don't get crossed, the entire admin console is fully reactive.

## Uploads: only what's changed

`xmit` is smart enough to only upload files that have changed. It's open source (0BSD license), so you can inspect the
details. In short, it generates a manifest of all file hashes, uploads it only if it's new (checked by hash),
then uploads only files whose hashes are new.

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

Our servers only rely on content-addressible caching. Your browser caches URLs.

If a resource changes, better catch up fast, so launches of finalized uploads suffer no propagation delays in CDNs,
proxies, or browser caches.

But if the browser saw a resource already, no reason to transfer it again.

That's where [`ETag`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) comes in.

We always report one, and return `304 Not Modified` if it appears in the `if-none-match` header received from clients.

## Security: full HTTPS, HSTS, headers galore

Securing all traffic is a no-brainer.

All HTTP traffic is redirected to HTTPS, and
include [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) headers everywhere.

We go a bit further,
with `referrer-policy: no-referrer`, `x-frame-options: SAMEORIGIN`, `x-content-type-options: nosniff` out of the box.

## `www` subdomain

Unless you deploy a site there, we redirect `www` to its parent domain for you.

## No need for a subdirectory per page

Name your page `hello.html` and access it at `/hello`. Simple and practical.

## Just enough config: Single Page Apps, custom 404, custom headers

`xmit.toml`, which isn't served, offers simple settings. For example:

```toml
fallback = "index.html" # Single Page Apps
404 = "404.html" # for custom 404 pages, which do not exist in SPAs

[headers]
access-control-allow-origin = "*" # add a CORS header
referrer-policy = "" # unset "referrer-policy"
```
