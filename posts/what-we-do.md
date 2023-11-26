---
title: What we do
---

Host your static sites. Sounds trivial, right?

Here are a few details we encourage everyone to consider.

## Uploads: only what's changed

`xmit` is smart enough to only upload files that have changed. It's open source (0BSD license), so you can inspect the
details. In short, it generates a manifest of all file hashes, uploads it only if it's new (checked by hash),
then upload only files whose hashes we don't have yet.

## Safe deploys: atomicity & fallthrough

There's no risk of a partial deploy. So a client won't see HTML referring to a new JS/CSS/asset until it's actually
available, avoiding a common source of 404s.

But we also fall through, so if a client loaded the old HTML and its JS/CSS/asset isn't in the latest launch,
we'll find it in previous launches for a few launches and minutes.

## Protocols: HTTP/1.1, HTTP/2, & H3

[HTTP/2](https://en.wikipedia.org/wiki/HTTP/2) was a leap forward. [QUIC](https://en.wikipedia.org/wiki/QUIC) is
another.

We support both, announced through DNS HTTPS records and Alt-Svc headers.

## Compression: `gzip` whenever worthwhile

Rather than hardcode a list of extensions or MIME types worthy of compression,
we give it a go on everything, and use the compressed version when requested and smaller.

## Caching: `ETag` & `if-none-match`

We don't cache at all. But your browser does. If it's seen something already, no reason to download it again.

That's where [`ETag`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) comes in.

We always report one, and return `304 Not Modified` if it appears in the `if-none-match` header.

## Admin: 2 clicks to sign in, 1 click to rollback, no delays

We've been there: the latest launch is broken, a rollback is in order.

We've made it as fast and simple as possible, and as with any launch, it's effective across our infrastructure in
milliseconds.

And to make sure wires don't get crossed, the entire admin console is fully reactive.

## Security: full HTTPS, HSTS, headers galore

Securing all traffic is a no-brainer.

We redirect all HTTP traffic to HTTPS, and
include [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) headers everywhere.

We go a bit further,
with `referrer-policy: no-referrer`, `x-frame-options: SAMEORIGIN`, `x-content-type-options: nosniff` out of the box.

## `www` subdomain

Unless you deploy a site there, we redirect `www` to its parent domain for you.

## No need for a subdirectory per page

Name your page `hello.html` and access it at `/hello`. Simple and practical.

## Just enough config: Single Page Apps, custom 404, custom headers

`xmit.toml` lets you specify settings trivially, and we won't serve it. For example:

```toml
fallback = "index.html"
404 = "404.html" # fallback takes precedence

[headers]
access-control-allow-origin = "*"
```

## `accept-ranges: bytes`

Resume downloads, play videos in Safari, and more. We support `range`  requests and advertise it.
