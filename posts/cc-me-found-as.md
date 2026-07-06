---
title: cc.me, and found.as grows a contact page
date: 2026-07-06
---

Two years ago, [we shipped small things](/posts/small-things). We're still at it.

## [cc.me: plumbing for people and programs](https://cc.me)

[cc.me](https://cc.me) bundles small utilities we kept wishing existed:

- **Email aliases**: as many `@cc.me` addresses forwarding to your inbox as you want; set them to expire, delete them whenever.
- **HTTP**: OAuth callback trampolines and sealed webhook inboxes. An inbox is just an Ed25519 public key in a URL; deliveries are encrypted for that key, so we couldn't read them if we wanted to. Claim/ack/release semantics, long polling, and small protocol adapters (WebSub, webmention, Slack, Discord, CloudEvents…) with clients for JS, Python, Go, Rust, and Ruby — `npx cc-me http://localhost:8080/webhook` forwards straight to your dev server.
- **Secrets**: encrypt a note in your browser, share the link, optionally burn it after reading.
- **Library**: a distributed semaphore — borrow numbered slots with auto-expiring leases.

As always: no tracking, and [usage stats are public](https://cc.me).

## [found.as, revamped](https://found.as)

[found.as](https://found.as) started as "names anything": a path, a password, and a redirect, markdown, HTML, or file behind it. Those all still work, but most people wanted one thing — a page with all the ways to reach them.

So that's now the default: a contact page at `found.as/you` with your name, photo, bio, and links — phone, email, website, plus the apps you already use (WhatsApp, Signal, Telegram, Matrix, Instagram, LinkedIn, Calendly, PayPal, and a couple dozen more). Reorder, rename, or hide anything; download a QR code for your business card.

The model hasn't changed since [the original](/posts/small-things): no account, no cookies, no tracking. Your password derives a signing key in the browser (PBKDF2, salted per path), and that's the only thing that can update your page. There is no reset — your address and password are the whole story.

Both run on infrastructure hosted in the European Union, on renewable energy. Free, and we intend to keep them that way.
