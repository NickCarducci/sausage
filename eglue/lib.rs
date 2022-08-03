//https://github.com/cloudflare/workers-rs/issues/94
//"you'll need to define the Durable Object in a separate module. ...this:"
//"https://github.com/cloudflare/workers-rs/blob/main/worker-sandbox/src/lib.rs"
//use paste::paste;
//use std::assert_matches::assert_matches;
//#![feature(assert_matches)]
#[macro_export]
macro_rules! validreturn {
    /*($typetype:ty) => {
        paste! {
          fn |<displaytype| (type:$typetype) -> String {return format!("{:?}", type)}
        }
    };*///https://stackoverflow.com/questions/53580165/is-it-possible-to-let-a-macro-expand-to-a-struct-field
    //ty=>tt "expected expression, found `String`"
    ($($type:tt, $assertion:ident),*) => {
        //($()*) allows rule-in-rule
            //https://veykril.github.io/tlborm/decl-macros/patterns/internal-rules.html
    //fn displaytype (type:$type) -> String {return format!("{:?}", type)}

    /*paste! {
    fn |<ass T>| (type:$typetype) -> String {return std::any::type_name::<T>()}*/
    //use super::displaytype;//https://www.tutorialspoint.com/super-and-self-keywords-in-rust-programming
    //struct PotentialType<T>(T);
        {
            fn ass<T>(_: &T) -> String {
                std::any::type_name::<T>().to_string()
            } //https://stackoverflow.com/questions/27769681/should-i-implement-display-or-tostring-to-render-a-type-as-a-string
            let erted = $(ass(&$assertion))*;
            let displaytype = format!("{:?}", $($type)*); //eval_str($($type)*).unwrap());
                                                        //fn validreturn(v: Any) -> $type {
                                                        //https://stackoverflow.com/questions/32289605/how-do-i-write-a-wrapper-for-a-macro-without-repeating-the-rules
                                                        //match /*displaytype(*/assert_eq!(displaytype , erted) {
                                                        /*true => displaytype,
                                                        false => "'validreturn': " + erted + " type begging: " + displaytype*/
            match matches!(displaytype, erted) {
                true => {
                    console_log!("displaytype {}", displaytype);
                    true
                }
                false => {
                    //https://stackoverflow.com/questions/21747136/how-do-i-print-the-type-of-a-variable
                    console_log!(
                        "validreturn {}",
                        "'validreturn': ".to_owned() + &erted + " type begging: " + &displaytype
                    );
                    false
                }
            }
        }
    //match v {//https://github.com/Metaswitch/assert-type-eq-rs/blob/master/src/lib.rs}
    //}
    };
}

// We're able to specify a start event that is called when the WASM is initialized before any
// requests. This is useful if you have some global state or setup code, like a logger. This is
// only called once for the entire lifetime of the worker.
//use wasm_bindgen::JsValue;
use std::sync::atomic::{AtomicBool, Ordering /*,Result as Resultt*/};
//use web_sys::Url; //web_sys
//use wasm_bindgen::prelude::wasm_bindgen;
//use wasm_bindgen_futures::ResponseInit; wrong
//use web_sys::{ResponseInit,Response as webRes};

//use url::{Url};
use worker::{
    /*console_log, Headers,RequestInit, Fetch,*/ event,
    Env,
    Request,
    Response,
    Result,
    Router, //, Url,
};

mod index;
mod utils;
static GLOBAL_STATE: AtomicBool = AtomicBool::new(false);
#[event(start)]
pub fn start() {
    utils::set_panic_hook();
    // Change some global state so we know that we ran our setup function.
    GLOBAL_STATE.store(true, Ordering::SeqCst);
}

struct SomeSharedData {
    //data: u8, //regex::Regex,
}
//https://github.com/rust-lang/rfcs/pull/2600; //https://github.com/rust-lang/rust/issues/23416, type ascription ob.key: Type=value
#[event(fetch, respond_with_errors)] //#![feature(type_ascription)]//https://stackoverflow.com/questions/36389974/what-is-type-ascription
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    //use the request parameter of the router instead else return closure/(pointer)
    fn origin_url(req_headers: &worker::Headers) -> std::string::String {
        return match req_headers.get("Origin").unwrap() {
            Some(value) => value,
            None => "".to_owned() + "", //Response::empty(),
        };
    }
    let info = SomeSharedData {
        //data: 0, //regex::Regex::new(r"^\d{4}-\d{2}-\d{2}$").unwrap(),
    };
    let router = Router::with_data(info); // if no data is needed, pass `()` or any other valid data
                                          /*if (request.method === "OPTIONS")
                                            return new Response(`preflight response for POST`, {
                                              status: 200,
                                              message: `preflight response for POST`,
                                              headers: {
                                                "Access-Control-Allow-Headers": [
                                                  //"Access-Control-Allow-Origin",
                                                  "Access-Control-Allow-Methods",
                                                  "Content-Type"
                                                  //"Origin",
                                                  //"X-Requested-With",
                                                  //"Accept"
                                                ],
                                                "Access-Control-Allow-Methods": ["POST", "OPTIONS"]
                                              }
                                            });
                                          return await noException(request, env);*/
    /*.options("/ *catchall", |_, ctx| {
        Response::ok(ctx.param("catchall").unwrap())
    })*/
    router
        .get("/", |_, _| {
            Response::error(&("{error:get (method?) ".to_owned() + "}" + ""), 405)
        })
        .options("/", |req, _ctx| {
            let req_headers = req.headers(); //<&worker::Headers>
            let cors_origin = origin_url(req_headers);
            //let cors_origin = &ctx.var("CORS_ORIGIN")?.to_string(); //<&str>
            return match [
                "https://sausage.vau.money",
                "https://vau.money",
                "https://jwi5k.csb.app",
                "https://i7l8qe.csb.app", //,"https://mastercard-backbank.backbank.workers.dev"
            ]
            .iter()
            .any(|&s| s == cors_origin)
            {
                true => {
                    //options(req_headers, cors_origin)
                    //https://rodneylab.com/using-rust-cloudflare-workers/
                    //fn preflight_response(_,_)->Result<Response> {
                    let mut res_headers = worker::Headers::new();
                    res_headers.set("Access-Control-Allow-Origin", "*")?;
                    res_headers.set("Access-Control-Allow-Headers", "Content-Type")?;
                    res_headers.set("Access-Control-Allow-Methods", "POST")?;
                    //res_headers.set("Vary", "Origin")?;
                    for origin_element in cors_origin.split(',') {
                        if cors_origin.eq(origin_element) {
                            res_headers.set("Access-Control-Allow-Origin", &cors_origin)?;
                            break;
                        };
                    }
                    res_headers.set("Access-Control-Max-Age", "86400")?;
                    let req_method = req.method();
                    Response::ok(req_method).map(|resp| resp.with_headers(res_headers))
                }
                false => Response::error(&("no access from ".to_owned() + &cors_origin), 403), //&format!("no access from ")
            };
        }) //https://community.cloudflare.com/t/fetch-post-type-error-failed-to-execute-function/311016/3?u=carducci
        .post_async("/", |req, ctx| async move {
            let binding = ctx.durable_object("EXAMPLE_CLASS_DURABLE_OBJECT");
            binding?
                .id_from_name("DurableObjectExample")?
                .get_stub()?
                .fetch_with_request(req)
                .await
        })
        .run(req, env)
        .await // == Ok for Result<T> not return (hoist); https://stackoverflow.com/questions/60020738/expected-enum-stdresultresult-found

}
