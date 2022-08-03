This is a project for an api sandbox that makes use of page as well as firewall rules from cloudflare.

Two service bindings ARE REQUIRED to test bodacious requests using (cloudflare service) workers>settings>variables && (firebase) authentication, (bear) bearer and api endpoints.

## Cloudflare page (react framework) + service worker + service binding(s)

> **CRA fetch** [sausage.saltbank.org](https://sausage.pages.dev) alone refers to **JS SW fetch** [saltbank.org/bear](https://saltbank.org/bear) that refers to **rust** [sausage.saltbank.org/api](https://sausage.saltbank.org/api)

deprecated: [eglue](https://github.com/NickCarducci/eglue/) on [mastercard-backbank.backbank.workers.dev](https://github.com/NickCarducci/mastercard-backbank)

#### Pages' Firewall rules (WAF): I ended up not using any contains, UniformResourceId ?query will suit

1. Allow (among)
   verily-pedestrian, _(http.referer eq "sausage.saltbank.org")_
   Referer

2. Block (for)
   sausage-maker-role(s) _(http.host eq "sausage.saltbank.org" and not http.request.uri.path in {"/" "/index.html" "/manifest.json" "/favicon.ico" "/api/"}) or (http.host eq "sausage.saltbank.org" and http.request.uri.path in {"/api/"} and http.referer ne "bear-relay.backbank.workers.dev") ~~or (not http.request.uri.path in {"/" "/api"})~~_
   Hostname, URI Path

3. Block
   lazy-grizzlies _(http.host eq "saltbank.org" and http.request.uri.path ne "/bear")_
   Hostname, URI Path

([Referer requests hostname](https://markethistory.quora.com/Is-a-host-name-not-the-responding-URL-1)) ?:query

## Example API UI for react-local-firebase

[Rust service worker](https://codesandbox.io/s/react-local-firebase-i7l8qe)

#### Page rules:

1. sausage.saltbank.org/api\*
   Always Use HTTPS

2. saltbank.org/bear
   Forwarding URL (Status Code: 302 - Temporary Redirect, Url: https://bear-relay.backbank.workers.dev/)

#### Page Environment variables [useless with frameworks](https://developers.cloudflare.com/pages/platform/build-configuration/):

[connect workers](https://github.com/jkup/cloudflare-docs/blob/14fb6a44328da68981121edee29e15abbe19e3c7/products/workers/src/content/cli-wrangler/commands.md) **_after_ deploying your page as a site**.
