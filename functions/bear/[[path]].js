//https://developers.cloudflare.com/pages/how-to/refactor-a-worker-to-pages-functions/
export default {
  async fetch(r, env) {
    const url = new URL(r.url);
    if (url.pathname.startsWith('/bear')) {
      
      /*const http = { Origin: r.headers.get("Origin") };
      if (r.method === "OPTIONS") {//possibly redundant with Web App Firewall for page
        return http.Origin.includes("sausage.saltbank.org")
          ? new Response("yeah alright", {
              status: 200,
              statusText: "ok",
              headers: {
                "Content-Type": "Application/JSON",
                "Access-Control-Allow-Origin": http.Origin,
                "Access-Control-Allow-Methods": r.headers.get(
                  "Access-Control-Request-Method"
                ) //rq.headers["Access-Control-Request-Method"]
                //...Object.keys(JSON.parse(rq.headers))
              }
              //"sausage.saltbank.org",
            })
          : new Response("no access for " + http.Origin, {
              status: 403,
              statusText: "not ok"
              //"Access-Control-Allow-Origin": rq.http.Origin,
              //"sausage.saltbank.org",
            });
      }*/
      //return await fetch(new Request("https://sausage.saltbank.org/api/",r));//.then(async a=>await a.json());
      //return await env.BANK.fetch(new Request("./api/", r));
      return new Response('Ok');
    }
    // Otherwise, serve the static assets.
    // Without this, the Worker will error and no assets will be served.
    return env.ASSETS.fetch(r);
  },
};
