// /bear

export default {
  //const bearer = context.CF_API_Key;
  async fetch(rq, env, context) {
    if (rq.method === "OPTIONS")
      return rq.http.Origin === "https://sausage.saltbank.org"
        ? new Response("yeah alright", {
            status: 200,
            statusText: "ok",
            headers: {
              "Access-Control-Allow-Origin": rq.http.Origin,
              ...Object.keys(JSON.parse(rq.headers))
            }
            //"sausage.saltbank.org",
          })
        : new Response("no access for " + rq.http.Origin, {
            status: 403,
            statusText: "ok",
            //"Access-Control-Allow-Origin": rq.http.Origin,
            headers: Object.keys(JSON.parse(rq.headers))
            //"sausage.saltbank.org",
          });
    //https://developers.cloudflare.com/workers/examples/modify-response/
    //var response =
    //https://developers.cloudflare.com/workers/examples/modify-request-property/
    const request = new Request(
      new URL("https://sausage.saltbank.org/api").toString(),
      new Request(rq, {
        //USED BEAR PATH for actual api path (differnet zone)
        //https://community.cloudflare.com/t/is-a-worker-allowed-to-make-requests-to-another-worker/194733/5
        //mastercard-backbank.backbank.workers.dev
        //origin: true,
        //cors: "origin",
        // Change method
        method: "POST",
        // Change body
        body: JSON.stringify(
          rq.body
        ) /*JSON.stringify({
          pageOffset: "0",
          pageLength: "10",
          postalCode: "77777"
        })*/,
        // Change the redirect mode.
        redirect: "follow",
        headers: {
          //Origin: "https://i7l8qe.csb.app",
          //"Access-Control-Request-Headers": ["Allow", "Origin"],
          //"Referrer-Policy": "cross-origin",
          //https://developers.cloudflare.com/firewall/api/cf-firewall-rules/post/
          "X-Auth-Email": "nmcarducci@gmail.com",
          "X-Auth-Key": /*context.*/ env.CF_API_KEY, // cloudflare pages>settings>environment_variables
          ...rq.headers //"Content-Type": "Application/JSON",
          //"Access-Control-Request-Method": request.method
        },
        // Change a Cloudflare feature on the outbound response
        cf: { apps: false }
      })
    );

    //request = new Response(rq.body, rq);
    //https://developers.cloudflare.com/workers/runtime-apis/request/
    //const request = rq.clone().json();
    //https://developers.cloudflare.com/workers/examples/alter-headers/
    // Clone the response so that it's no longer immutable
    //maxAge: 3600
    return fetch(request)
      .then(async (rs) => await rs.json())
      .then((result) => {
        return new Response(JSON.stringify(result));
      })
      .catch((err) => new Response(JSON.stringify(err)));
    //return new Response("Hello World!");
  }
};
