# Sausage react-local-firebase [Rust service worker](https://codesandbox.io/s/react-local-firebase-i7l8qe)

## Example API UI for react-local-firebase (edge serverse cannot use body POST..)

> [Google cloud run endpoint (extensible) service proxy api gateway firebase token](https://stackoverflow.com/questions/73674814/google-cloud-run-endpoint-extensible-service-proxy-api-gateway-firebase-token)

#### [mastercard-backbank-node-cloud-run](https://github.com/NickCarducci/mastercard-backbank-node-cloud-run)

\_

This is a project for an api sandbox that makes use of page as well as firewall rules from cloudflare.

Two services bound by a binding ARE REQUIRED to test bodacious requests using (cloudflare service) workers>settings>variables && (firebase) authentication, (bear) bearer and api endpoints, and will probably be suited by postman the same as this react framework + firebase implementation.

# especially with environment variables from pages function (pages' environment variables are only available during the compilation of javascript) sent in the service worker

## however, [firewall rules for a page can be applied to subdomains](https://github.com/NickCarducci/bear) that are the custom domain for workers

### and are [so important if you want to call a service worker from pages functions](https://blog.cloudflare.com/building-full-stack-with-pages/)

## Cloudflare page (react framework) + service worker ~~+ service binding(s)~~ by custom domain

> **CRA fetch** [sausage.saltbank.org](https://sausage.pages.dev) alone refers to **JS ~~SW~~ function fetch** ~~saltbank.org/bear~~ [sausage.saltbank.org/bear](https://sausage.saltbank.org/bear) that refers to **rust** ~~sausage.saltbank.org/api~~ [api.saltbank.org](https://api.saltbank.org)

deprecated: [eglue](https://github.com/NickCarducci/eglue/) on [mastercard-backbank.backbank.workers.dev](https://github.com/NickCarducci/mastercard-backbank)

#### Pages' Firewall rules (WAF): I ended up not using any contains, UniformResourceId ?query will suit

1. Allow
   allow-static _(http.request.uri.path contains "/static" and http.host contains "saltbank.org" and http.referer contains "saltbank.org")_
   URI Path, Hostname, Referer

2. Block
   stay-on-path _(http.host eq "saltbank.org" and not http.request.uri.path in {"/" "/favicon.ico" "/manifest.json" "/index.html"}) or (http.host eq "sausage.saltbank.org" and not http.request.uri.path in {"/" "/favicon.ico" "/manifest.json" "/index.html" "/bear"})_
   Hostname, URI Path

3. Block (for)
   sausage-maker-role(s) _(http.host eq "api.saltbank.org" and http.referer ne "`https://sausage.saltbank.org/`") ~~or (not http.request.uri.path in {"/" "/api"})~~_
   Hostname, Referer

4. Block
   pedestrian-grizzlies _(http.host eq "sausage.saltbank.org" and http.request.uri.path contains "/bear" and http.referer ne "`https://sausage.saltbank.org/`")_
   Hostname, URI Path, Referer

([Referer requests hostname](https://markethistory.quora.com/Is-a-host-name-not-the-responding-URL-1)) ?:query

#### Page rules:

1. sausage.saltbank.org/api\*
   Always Use HTTPS (this is the only worker route)

~~2. saltbank.org/bear
Forwarding URL (Status Code: 302 - Temporary Redirect, Url: bear-relay.backbank.workers.dev/)~~ DO NOT forward here by page rule after referer firewall - workers can use environment variables but not WAFirewall.

#### Page Environment variables [useless with frameworks](https://developers.cloudflare.com/pages/platform/build-configuration/):

[connect workers](https://github.com/jkup/cloudflare-docs/blob/14fb6a44328da68981121edee29e15abbe19e3c7/products/workers/src/content/cli-wrangler/commands.md) **_after_ deploying your page as a site**.

