---
title: "Four more utilities on cc.me"
date: 2026-07-15
---

Nine days ago [cc.me shipped](/posts/cc-me-found-as) as plumbing for people and programs. We kept adding to it. Four new utilities, same rules: no accounts, no tracking, [public stats](https://cc.me).

## [Favicons](https://cc.me/icon)

Fetch and cache the favicon of any URL, embeddable as an image from anywhere:

```
<img src="https://cc.me/icon?url=https%3A%2F%2Fexample.com">
```

We parse the page for `<link rel="icon">`, fall back through `apple-touch-icon`, `shortcut icon`, and finally `/favicon.ico`, and return the first thing that's actually image bytes. Results are cached per origin — a week for hits, an hour for misses. Only public URLs; loopback and link-local are rejected.

## [Fonts](https://cc.me/fonts)

Search the Google Fonts catalog and download the files over a plain API — no third-party `<script>`, no referrer leak.

`GET /fonts?q=roboto&category=SANS_SERIF&subset=latin` searches; `GET /fonts/roboto` returns one family with its variable-font axes; `GET /fonts/roboto/Roboto%5Bwdth,wght%5D.ttf` pulls a file. Wire it into a page with an `@font-face` rule and serve the type yourself.

## [Proof of work](https://cc.me/pow)

A JWT-shaped proof-of-work token, with an in-browser solver and verifier.

A token is `b64u(doc) "." b64u(suffix)`: `doc` is whatever bytes your application chooses, `suffix` is up to 32 bytes the solver picks — usually an 8-byte counter. Verification is `SHA-256(SHA-256(doc) || suffix)`; read the result big-endian, count the trailing zero bits, and that's the level. Finding level L costs 2^L hashes on average — no shortcut, no memory to trade. Level 20 is a fifth of a second in JS, level 28 is under a minute, level 40 wants a GPU.

It rate-limits, it doesn't authenticate — so bind the proof to its use: an audience, an action, a timestamp, a server-issued nonce. Reference solvers ship for Node, Swift (Metal), and C (OpenCL), from 5.4 MH/s single-threaded in JS to ~5 GH/s on a 4090.

## [Screenshots](https://cc.me/shot)

Which is what the last one pays for. Render any page in a disposable headless-Chrome context, priced in proof of work instead of an API key:

```
doc=$(jq -nc --arg url https://example.com/ \
  '{url: $url, width: 800, height: 600, scale: 0.5, ts: now | floor}')
curl -sG https://cc.me/shot --data-urlencode "token=$(node pow.mjs solve 24 "$doc")" -o shot.png
```

The `doc` names the page, a viewport up to 2048 CSS pixels, an optional `scale`, and a timestamp good for five minutes; the PNG comes back at `width×scale` by `height×scale`. `/shot/config` tells you the current difficulty — 24 by default, milliseconds on a GPU, seconds in a browser worker. Identical documents share a cache entry for an hour, so retries are free.

Same as everything else: EU infrastructure, renewable energy, free, and we mean to keep it that way.
