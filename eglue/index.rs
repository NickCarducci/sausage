//struct PotentialType<T>(T);

use serde::Serialize;
use worker::{
  async_trait, durable_object, js_sys, wasm_bindgen, wasm_bindgen_futures, worker_sys, Env,
  Request, Response, Result, State,
};
pub use worker_sys::{console_debug, console_error, console_log, console_warn};
#[derive(Serialize)]
struct Product {
  ivity: String,
}
/*#[derive(Serialize)]
struct Noth {
  ing: String,
}*/
#[durable_object]
pub struct DurableObjectExample {
  app: String, //Vec<u8>,
  initialized: bool,
  state: State,
  env: Env, // access `Env` across requests, use inside `fetch`
}

/*fn pathify(path: &str) -> std::path::PathBuf {
  let mut input_file = std::path::PathBuf::new();
  let _arr: () = path.split("/").map(|x| input_file.push(x)).collect();
  return input_file;
}*/

use serde::Deserialize;
#[derive(Deserialize, Debug)]
#[serde(rename_all = "camelCase")] //https://github.com/serde-rs/serde/issues/1435
struct Body {
  //
  page_offset: String,
  page_length: String,
  postal_code: String,
}
struct IsString(String);
impl std::fmt::Debug for IsString {
  /*fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
    Ok(())
  } *///Self::Output
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    f.debug_tuple("IsString").field(&self.0).finish()
  } //https://doc.rust-lang.org/std/fmt/trait.Debug.html
} //https://stackoverflow.com/questions/22243527/how-to-implement-a-custom-fmtdebug-trait
  //https://juliano-alves.com/2020/01/06/rust-deserialize-json-with-serde/
#[durable_object]
impl DurableObject for DurableObjectExample {
  fn new(state: State, env: Env) -> Self {
    Self {
      app: "initialapp".to_owned(), //format!(""),vec![]
      //https://www.hackertouch.com/how-to-create-and-check-string-is-empty-rust.html
      initialized: false,
      state: state,
      env,
    }
  } //https://github.com/cloudflare/durable-objects-template/issues/14
    //"Can't read from request stream after response has been sent" or just read _req (?)
  async fn fetch(&mut self, req: Request) -> Result<Response> {
    //let _state = &self.state;
    //let _env = &self.env;
    //let _req = req; //.arrayBuffer();
    //if (!_req.url)
    //return R({ response: "abnormal" }, [400, "abnormal", dataHead]);

    //let url = new URL(_req.url);
    //let  value = null;
    //self.state.storage().put("app", self.app).await?;
    let mut s = req.clone()?;
    let body: Body = match s.json().await {
      Ok(body) => body,
      Err(m) => {
        console_log!("{}", m);
        let g: Body = Body {
          page_offset: "0".to_owned(),
          page_length: "1".to_owned(),
          postal_code: "00000".to_owned(),
        };
        g
      }
    }; //.clone();//.clone()?;

    let _page_offset = body.page_offset;
    let _page_length = body.page_length;
    let _postal_code = body.postal_code;

    if !self.initialized {
      self.initialized = true;
    }
    self.env.secret("SOME_SECRET")?.to_string();

    self.state.storage().put("app", &self.app).await?;

    Response::from_json(&Product {
      ivity: self.app.to_string(),
    })
  }
}