---
title: "Slower uploads"
---

A quick update to let you know we now acquire certificates synchronously during uploads.

This lets us report any issues with the certificate acquisition process in real time.
It also means that when we tell you an upload is ready, it's truly ready.

Unfortunately, this adds up to 30 seconds to the `xmit` execution time.

As part of this change, we show the preview URL as part of every upload, even those launched right away.
