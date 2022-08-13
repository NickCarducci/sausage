import React from "react";
import { standardCatch } from "./App";
//bad advice only lie endpoint
//import bear from "../bear/index.js";
//delete the following to use the object
//web app firewall rules (clouflare)
//https://github.com/NickCarducci/sausage
//https://github.com/NickCarducci/bear
//Allow allow-statics (http.request.uri.path contains "/static" and http.host contains "saltbank.org" and http.referer contains "saltbank.org") URI Path, Hostname, Referer
//Block (to) stay-on-path (http.host eq "saltbank.org" and not http.request.uri.path in {
//"/" "/favicon.ico" "/manifest.json" "/index.html"
//}) or (http.host eq "sausage.saltbank.org" and not http.request.uri.path in {
//"/" "/favicon.ico" "/manifest.json" "/index.html" "/bear"
//}) Hostname, URI Path
//Block (for) sausage-maker-role(s) (http.host eq "api.saltbank.org" and http.referer ne "https://sausage.saltbank.org/") Hostname, Referer
//Block pedestrian-grizzlies (http.host eq "sausage.saltbank.org" and http.request.uri.path contains "/bear" and http.referer ne "https://sausage.saltbank.org/") Hostname, URI Path, Referer

/*const context = {
  env: { CF_API_KEY: process.env.CF_API_KEY } //"github repo settings>secrets>actions(also source)" }
};*/
export default class Fetch extends React.Component {
  state = {}; //CF_CF_API_KEY: ${{ secrets.CF_API_KEY }} wrangler dev &&
  fetcher = () => {
    //will certainly need to use a worker instead
    //to pass CF_API_KEY to bearer & pass ?query to "/api"
    //or just add a worker to a foler like /bear & wrangler that
    /*const body = /*JSON.stringify() * / {
      pageOffset: "0",
      pageLength: "10",
      postalCode: "77777"
    };*/
    fetch(
      "https://api.saltbank.org/",
      /*"https://api.saltbank.org/?" +
        Object.keys(body)
          .map((k) => k + "=" + body[k])
          .join("&")*/ {
        //"https://mastercard-backbank.backbank.workers.dev/"
        //this will be refered from sausage.saltbank.org page alone blocking with web app firewall site (Cloudflare)
        //"https://bear-relay.backbank.workers.dev", {
        //DO NOT forward here by page rule after referer firewall - workers can use environment variables but not WAFirewall
        //then the actual host and path sausage.saltbank.org/api from such the same referer may be called
        //USE BEAR PATH relay
        //mastercard-backbank.backbank.workers.dev
        //origin: true,
        //cors: "origin",
        headers: {
          //https://developers.cloudflare.com/workers/examples/cors-header-proxy/
          //Origin: "https://sausage.saltbank.org",
          "Access-Control-Request-Headers": ["Allow", "Origin"]
          //"Referrer-Policy": "cross-origin",
          //https://developers.cloudflare.com/firewall/api/cf-firewall-rules/post/
          //"X-Auth-Email": "nmcarducci@gmail.com",
          //"X-Auth-Key": context.env.CF_API_KEY, // cloudflare pages>settings>environment_variables

          //"Content-Type": "Application/JSON",
          //"Access-Control-Request-Method": "POST" //https://community.cloudflare.com/t/how-to-call-api-using-cloudflare/408641
          //GET + ?query requests only before service bindings via Wranlger 2
        },
        /*method: "POST", //"GET"
      body: JSON.stringify({
        pageOffset: "0",
        pageLength: "10",
        postalCode: "77777"
      }),*/
        maxAge: 3600
      }
    )
      .then(async (res) => await res.text())
      .then((result) => {
        console.log(result);
      })
      .catch(standardCatch);
  };
  render() {
    const color = (x) => (this.state.hovering === x ? "white" : "grey");
    const styleOption = {
      margin: "6px 0px",
      borderRadius: "10px",
      padding: "10px 20px"
    };
    const space = " ";
    return (
      <div style={{ cursor: "pointer" }}>
        <div
          onClick={this.fetcher}
          id="/"
          onMouseEnter={(e) => this.setState({ hovering: e.target.id })}
          onMouseLeave={() => this.setState({ hovering: "" })}
          style={{ ...styleOption, border: `2px solid ${color("/")}` }}
        >
          /
        </div>
        <div
          id="/places"
          onMouseEnter={(e) => this.setState({ hovering: e.target.id })}
          onMouseLeave={() => this.setState({ hovering: "" })}
          style={{
            ...styleOption,
            border: `2px solid ${color("/places")}`,
            display: "flex"
          }}
        >
          /places{space}&nbsp;
          <input
            value={this.state.placequery}
            onChange={(e) => this.setState({ placequery: e.target.value })}
          />
        </div>
      </div>
    );
  }
}
