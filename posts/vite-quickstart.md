---
title: "Vite quick start"
---

In this article, we'll get a stock Vite app online through [xmit.co](https://xmit.co/) as quickly as possible.

If you'd like to go further (set up your own domain, an npm script, a GitHub repository, continuous delivery through GitHub Actions),
please refer to our [end-to-end guide for Vite](/posts/end-to-end/).

## Prerequisites

- A working installation of Node and npm. One might appreciate dedicated managers like [fnm](https://github.com/Schniz/fnm); otherwise, to keep things simple:
  
    - On Mac, [install `brew`](https://brew.sh/) if you haven't already, then `brew install node`.

    - On Linux, use your package manager.

    - On Windows, download from [nodejs.org](https://nodejs.org/).

- A code editor like [Visual Studio Code](https://code.visualstudio.com/).

## Create the project

In a terminal, let's run `npm create vite@latest`, choose `hello` as the project name, React as our framework, and TypeScript as our language.

```
$ npm create vite@latest
Need to install the following packages:
  create-vite@5.2.3
Ok to proceed? (y)
✔ Project name: … hello
✔ Select a framework: › React
✔ Select a variant: › TypeScript

Scaffolding project in /Users/demo/hello...

Done. Now run:

  cd hello
  npm install
  npm run dev
```

## Prepare dependencies

From the terminal, we get into the project, install dependencies, add one on `xmit`:

```
$ cd hello
$ npm install
[…]
$ npm install @xmit.co/xmit --save-dev
[…]
```

## xmit setup

Having logged into our account on [xmit.co](https://xmit.co/), we click `+ new team`; a team `#33: unnamed` appears.

We note the team number of 33 and `✎ rename` it to `demo team`.

We click `+ create` in the `API keys` section of our user, then `📋 copy` it after a `✎ rename` to `laptop`.

To use it on our laptop, we run `npx xmit set-key`, paste the key then press `Enter`:

```
$ npm install
…
$ npx xmit set-key
🔑 Enter your key (no echo):
```

## SPA routing, JS and CSS caching

In `public`, we create `xmit.toml` with:

```
fallback = "index.html"

[[headers]]
name = "cache-control"
value = "public, max-age=31536000"
on = "/assets/.*"
```

## Deploy

As we're using a subdomain of `xmit.dev`, the first deploy command must specify which of your teams owns the site.

We need to introduce `@33` after the desired hostname to specify team #33:

```
$ npm run build && npx xmit hello.xmit.dev@33
2024/04/30 19:49:41 📦 Bundling /Users/pcarrier/src/hello/dist…
2024/04/30 19:49:41 🎁 Bundled 5 files (150833 bytes)
2024/04/30 19:49:41 🤔 Suggesting bundle…
2024/04/30 19:49:42 🚶 Uploading bundle (325 bytes)…
Upload progress: 325/325 (100%)
🧘 Bundle upload complete, waiting for server…
2024/04/30 19:49:43 🏃 Uploading 5 missing parts (48950 bytes)…
Upload progress: 48950/48950 (100%)
🧘 Upload complete, waiting for server…
2024/04/30 19:49:45 🏁 Finalizing…
2024/04/30 19:49:46 🚀 Launch #1 complete, visible at https://hello.xmit.dev
```

and [hello.xmit.dev](https://hello.xmit.dev) is live!
