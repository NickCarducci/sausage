// /bear

export default {
  //const bearer = context.CF_API_Key;
  fetch(request, env, context) {
    return fetch("https://sausage.saltbank.org/api", {
      //USED BEAR PATH for actual api path (differnet zone)
      //https://community.cloudflare.com/t/is-a-worker-allowed-to-make-requests-to-another-worker/194733/5
      //mastercard-backbank.backbank.workers.dev
      //origin: true,
      //cors: "origin",
      headers: {
        //Origin: "https://i7l8qe.csb.app",
        //"Access-Control-Request-Headers": ["Allow", "Origin"],
        //"Referrer-Policy": "cross-origin",
        //https://developers.cloudflare.com/firewall/api/cf-firewall-rules/post/
        "X-Auth-Email": "nmcarducci@gmail.com",
        "X-Auth-Key": /*context.*/ env.CF_API_KEY, // cloudflare pages>settings>environment_variables
        ...request.headers //"Content-Type": "Application/JSON",
        //"Access-Control-Request-Method": request.method
      },
      method: request.method, //"POST"
      body:
        request.body /*JSON.stringify({
        pageOffset: "0",
        pageLength: "10",
        postalCode: "77777"
      })*/,
      maxAge: 3600
    });
    //return new Response("Hello World!");
  }
};
