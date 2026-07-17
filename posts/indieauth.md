---
title: IndieAuth on every site
date: 2026-07-18
---

Every site hosted on xmit is now an [IndieAuth](https://indieauth.spec.indieweb.org/) identity: you can sign in to IndieAuth clients — wikis, comment systems, [indieauth.com](https://indieauth.com/), and the rest of the IndieWeb — with your site's URL.

## Using it

Enter your site's URL, say `https://example.com/`, on any IndieAuth client. You'll be sent to a consent screen on xmit.co; approve the sign-in with your usual passkey. Only members of the team that owns the site can approve.

Behind the scenes: every HTML page we serve advertises the endpoints as HTTP `Link` headers, so your markup stays clean. The client sends you to `https://xmit.co/indieauth`, and on approval receives a single-use, PKCE-protected code which it redeems for your identity URL. Clients that request a scope receive a Bearer access token instead.

## Profile and email

Clients can ask for the `profile` and `email` scopes. We answer from your `xmit.toml` (or `xmit.json`):

```toml
[indieauth]
name = "Alice"
photo = "https://example.com/me.jpg"
email = "alice@example.com"
```

All fields are optional, and `profile` always includes your identity URL.

## Opting out, or rolling your own

IndieAuth is on by default. To turn it off for a site:

```toml
[indieauth]
disable = true
```

That stops our discovery headers and refuses sign-ins for the site. You're then free to advertise another IndieAuth provider, either with a custom header:

```toml
[[headers]]
name = "link"
value = '<https://provider.example/auth>; rel="authorization_endpoint"'
```

or with a `<link rel="authorization_endpoint" href="…">` element in your HTML.
