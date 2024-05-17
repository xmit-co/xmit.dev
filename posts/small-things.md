---
title: Shipping small things (0pw.me, 1pw.me, found.as)
---

As the design for [signali.ng](https://signali.ng) awaits reviews, I found myself with a fair bit of time and
infrastructure readily available. This gave me the unique opportunity of putting small non-commercial services together
quickly.

## [0pw.me: sign<del> up</del> to store](https://0pw.me)

The idea is simple: no sign up, no account, anybody can maintain a 64KiB chunk of data by associating it to a public
key.

As the updates must be [signed](https://en.wikipedia.org/wiki/Digital_signature) using the corresponding private key,
something verified by both the infrastructure and serious clients, only people with the private key can update it,
and only people with the private key and maintainers of the service can delete it.

To make it easy and lightweight on web clients without trusting NIST curves, we adopted
[TweetNaCl.js](https://github.com/dchest/tweetnacl-js)'s cryptography.

To support arbitrary chunks of data without going through base64 or the like, the protocol is based
on [CBOR](https://cbor.io) rather than JSON or HTTP paths.

To avoid ever logging public keys, reads pass the key being looked up in a POST body.
Don't disclose the public key and only maintainers of the service know where to get your data.

Encrypt your data and nobody can. Which leads me to the first app using this service,

## [1pw.me — password → page](https://1pw.me)

Again, the idea is simple: no sign up, no account, anybody can associate up to 64KB of text by associating it to a
password.

Of course, it leverages [0pw.me](https://0pw.me) to store the encrypted data. [0pw.me](https://0pw.me) was built for it,
really. And it was built, as the name might suggest, to store my [1password](https://1password.com) secret key so I can
recover it on the go, even if I lose all my devices.

The password is used to derive the private key used for [0pw.me](https://0pw.me)'s signature, the one needed to deecrypt
the data.
This derivation uses 100,000 rounds of SHA-256 PBKDF2 with a static salt.

There really isn't much more to it, adding up
to [only 219 lines of Preact](https://github.com/xmit-co/1pw.me/blob/main/src/app.tsx) within 30KiB compressed of an
open source website whose build is reproducible thanks to the [Vite](https://vitejs.dev/) ecosystem.

## [found.as names anything](https://be.found.as)

Feeling inspired by the simplicity of [0pw.me](https://0pw.me), quick editing experience of [1pw.me](https://1pw.me),
speedy service of [xmit.co](https://xmit.co), I put together a service to associate a redirection, webpage, or (later)
arbitrary file under 1MB to a URL: [found.as](https://found.as).

Pick a path, pick a password, see what's there if anything, choose what should be there, whether it be a redirect,
hand-written HTML, markdown, or an arbitrary file, hit a button, observe the result in a new tab, then share at will,
knowing you can come back and edit it later.

It reuses the key derivation from [1pw.me](https://1pw.me), but this time the salt depends on the path being edited,
guaranteeing that the same strong password can be used for multiple paths without correlation in our store.
Unlike [1pw.me](https://1pw.me), the data is never encrypted as the purpose is to publish.

Support for markdown with YAML metadata is implemented entirely in browser allowing for live previews, which combined
with [cbor-x](https://github.com/kriszyp/cbor-x), [TweetNaCl.js](https://github.com/dchest/tweetnacl-js),
and [Preact](https://preactjs.com/), puts the admin UI just under 60 KB compressed; of course, the generated resources
are served without any overhead.

## Eat what you cook

When I wrote about [migrating pcarrier.com to xmit.co](/posts/pcarrier-com), I missed an opportunity to touch on this
topic. There's nothing like building for your own needs, and there's nothing like using what you build.

Publishing [found.as' landing page](https://found.as) through [its admin UI](https://be.found.as) was a mind-altering
moment. I figured I should support uploading files too, so I could ship [favicon.ico](https://found.as/favicon.ico),
the site-wide default icon, without a backend rule for it.

One day, I might need my [1password](https://1password.com) secret key urgently, without access to any of my devices.
I look forward to it.

And of course, all those services use [xmit.co](https://xmit.co). They get the exclusive privilege of exposing APIs
through it, something I hope to allow through proxying and a serverless runtime at one point or another. I'll be sure
to (re-)build with those.
