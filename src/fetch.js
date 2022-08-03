import React from "react";
import { standardCatch } from "./App";
//import bear from "../bear/index.js";
//delete the following to use the object
//web app firewall rules (clouflare)
//https://github.com/NickCarducci/sausage
//https://github.com/NickCarducci/bear
//Allow (among) verily-pedestrian, (http.referer eq "sausage.saltbank.org") Referer
//Block (for) sausage-maker-role(s) (http.host eq "sausage.saltbank.org" and not http.request.uri.path in {
//"/" "/index.html" "/manifest.json" "/favicon.ico" "/api/"
//})
//or (not http.request.uri.path in {"/" "/api"}) Hostname, URI Path
//Block lazy-grizzlies (http.host eq "saltbank.org" and http.request.uri.path ne "/bear") Hostname, URI Path

const context = {
  env: { CF_API_KEY: process.env.CF_API_KEY } //"github repo settings>secrets>actions(also source)" }
};
export default class Fetch extends React.Component {
  state = {}; //CF_CF_API_KEY: ${{ secrets.CF_API_KEY }} wrangler dev &&
  fetcher = () => {
    //will certainly need to use a worker instead
    //to pass CF_API_KEY to bearer & pass ?query to "/api"
    //or just add a worker to a foler like /bear & wrangler that
    fetch("https://saltbank.org/bear", {
      //this will be refered from sausage.saltbank.org page alone blocking with web app firewall site (Cloudflare)
      //"https://bear-relay.backbank.workers.dev", {
      //forwarded here by page rule after referer firewall
      //then the actual host and path sausage.saltbank.org/api from such the same referer may be called
      //USE BEAR PATH relay
      //mastercard-backbank.backbank.workers.dev
      //origin: true,
      //cors: "origin",
      headers: {
        //Origin: "https://i7l8qe.csb.app",
        //"Access-Control-Request-Headers": ["Allow", "Origin"],
        //"Referrer-Policy": "cross-origin",
        //https://developers.cloudflare.com/firewall/api/cf-firewall-rules/post/
        "X-Auth-Email": "nmcarducci@gmail.com",
        "X-Auth-Key": context.env.CF_API_KEY, // cloudflare pages>settings>environment_variables
        "Content-Type": "Application/JSON",
        "Access-Control-Request-Method": "POST"
      },
      method: "POST",
      body: JSON.stringify({
        pageOffset: "0",
        pageLength: "10",
        postalCode: "77777"
      }),
      maxAge: 3600
    })
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
