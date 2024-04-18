---
title: "Brotli compression"
---

A quick update to let you know we've enabled Brotli
compression, [as requested by @McNeely on the fediverse](https://indieweb.social/@McNeely/112293430779619468).

This should yield better performance with modern browsers, as Brotli achieves higher ratios than gzip.

We moved compression from request time with caching, to upload time with full persistence. This should improve tail
latencies a fair bit, notably with larger media like photos, audio, and video, at the cost of slower uploads.
