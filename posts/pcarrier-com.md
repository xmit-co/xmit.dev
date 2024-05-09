---
title: "Migrating pcarrier.com: over a GB, and a zoo of domain redirects"
---

There really is joy in using one's own software to solve one's own problems. I can't help but share my experience migrating
my personal website to [xmit.co](https://xmit.co/), from a small VPS running nginx. I won't argue the benefits, having already
done so in [our first post](/posts/origin/) (though I failed to point out what might be the most obvious to me, high availability
through redundancy).

I have domain acquisition syndrome. For my name alone, over the years I've collected `gcarrier.fr`, `pcarrier.ca`,
`pcarrier.fr`, `pcarrier.com`, `rrier.ca`, `rrier.fr`.
The last two are merely a domain hack so I could be emailed at `pc@rrier.ca` & `pc@rrier.fr`.

[`pcarrier.com`](https://pcarrier.com/) is the only web property left standing; everything else redirects to it,
with a quick hack so I could be found through `@pc@rrier.ca` & `@pc@rrier.fr` on the fediverse.

I already had an organization `#19: perso`, so I went straight to DNS, where I created the following records for all domains:

```
@ CNAME 19.xmit.co.
* CNAME 19.xmit.co.
@ TXT "xmit=19"
```

Then I launched my >1GB web directory with `xmit pcarrier.com`. That crashed halfway through the upload.
Implemented chunked uploads in the `xmit` CLI, released it, and finally relaunched with caching rules in `xmit.toml`:

```
[[headers]]
name = "Cache-Control"
value = "public, max-age=31536000"
on = "/fonts/.*"
```

For all the other domains, I launched a separate site with `xmit rrier.ca` from a directory with a lone `xmit.toml`:

```
[[headers]]
on = "^/.well-known/webfinger$"
name = "access-control-allow-origin"
value = "*"

[[redirects]]
from = "^/.well-known/webfinger$"
to = "https://mastodon.social/.well-known/webfinger?resource=acct%3Apcarrier%40mastodon.social"

[[redirects]]
from = "^/(.*)"
to = "https://pcarrier.com/$1"
permanent = true
```

After that, I headed to the [xmit admin](https://xmit.co/admin), clicked on the newly created site,
renamed it to `pcarrier.com redirs`, and added all the other domains on it:

![domains](/img/domains.webp)

That's all. I thought this worth sharing, though looking back this migration didn't amount to much.
Happy to be building a rather boring piece of infrastructure.
