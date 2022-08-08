/*import { Router } from "itty-router";
//import React from "react";
//https://developers.cloudflare.com/pages/how-to/refactor-a-worker-to-pages-functions/
//const Bear =
export default {
  async fetch(r, env) {
    const url = new URL(r.url);
    //if (url.pathname.startsWith("/bear")) {
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
          }* /
    const request = new Request(r, {
      headers: { Authorization: `bearer ${env.CF_API_TOKEN}` }
    });
    return await fetch(
      new Request("https://sausage.saltbank.org/api/", request)
    ); //.then(async a=>await a.json());
    //return await env.BANK.fetch(new Request("./api/", r));
    //return new Response("Ok");}

    // Otherwise, serve the static assets.
    // Without this, the Worker will error and no assets will be served.
    //return env.ASSETS.fetch(r);
  }
};*/

/*export default React.forwardRef((props, ref) => {
  return <Bear fetch={ref.current["bear"]} {...props} />;
});*/

export const onRequest: PagesFunction<{}> = async ({
  request: r,
  env,
  params
}): Promise<Response> => {
  return new Response("Ok");
};

export const onRequestOptions: PagesFunction<{}> = async ({
  request: r,
  env,
  params
}): Promise<Response> => {
  const origin = r.headers.get("Origin");
  //const url = new URL(context.request.url);
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Max-Age": "86400"
    }
  });
};
export const onRequestPost: PagesFunction<{}> = async ({
  request: r,
  env,
  params
}): Promise<Response> => {
  const request = new Request(r, {
    redirect: "follow",
    headers: {
      //...r.headers,
      "Access-Control-Allow-Headers": "*",
      Authorization: `Bearer ${env.CF_API_TOKEN}`,
      "Content-Type": "application/json"
    }
  });
  //return new Response("posted");
  try {
    return await fetch(new Request("https://api.saltbank.org/", request));
  } catch (e) {
    return new Response(e + " error", {
      status: 403,
      message: "bad subdomain"
    });
  }
  /*return await fetch("https://api.saltbank.org/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.CF_API_TOKEN}`
    }
  });*/
  //return await env.BANK.fetch(new Request("./api", r));//service binding N/A for now (8/2022)
  //.then(async (res) => await res.json())
  //.then((result) => JSON.stringify(result))
  /*.then(
      (info) =>
        new Response(info, {
          status: 200,
          headers: {}
        })
    );*/
};
