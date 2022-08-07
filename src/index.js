import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { UAParser } from "ua-parser-js";
import App from "./App";
import Bear from "../functions/bear/[[path]].js";
import SaltBank from "./SaltBank";

var check = null;
class PathRouter extends React.Component {
  constructor(props) {
    super(props);
    var parser = new UAParser();
    const name = parser.getBrowser().name;
    console.log(name);
    this.state = {
      browser: name
    };
    this.bf = React.createRef();
    this.matchMedia = null;
    this.deferredPrompt = null;
  }
  componentDidMount = () => {
    this.setState(
      {
        ios: this.state.browser.includes("Safari"),
        iosNoPhoto: this.state.browser.includes("Safari")
      },
      () => {
        this.resize();
        window.addEventListener("resize", this.resize);
        //window.addEventListener("scroll", this.scroll);
        this.checkInstall(true);
        window.FontAwesomeConfig = { autoReplaceSvg: "nest" };
      }
    );
  };
  componentWillUnmount = () => {
    clearInterval(check);
    window.removeEventListener("resize", this.resize);
    //window.removeEventListener("scroll", this.scroll);
    window.removeEventListener("beforeinstallprompt", this.beforeinstallprompt);
    window.removeEventListener("appinstalled", this.afterinstallation);
    this.matchMedia &&
      this.matchMedia.removeEventListener("change", this.installChange);
  };
  resize = () =>
    this.setState({
      width: this.state.ios ? window.screen.availWidth : window.innerWidth,
      availableHeight: this.state.ios
        ? window.screen.availHeight - 20
        : window.innerHeight
    });

  /*scroll = () => {
    const w = !this.matchMedia ? window.screen.availWidth : window.innerWidth;
    this.setState({
      width:
        window.innerHeight - window.document.body.offsetHeight < 0 ? w - 16 : w
    });
  };*/
  // Initialize deferredPrompt for use later to show browser install prompt.
  beforeinstallprompt = (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    this.setState({ showPWAprompt: true }, () => (this.deferredPrompt = e));
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
  };
  afterinstallation = () => {
    this.setState({ showPWAprompt: false }, () => (this.deferredPrompt = null));
    console.log("PWA was installed");
  };
  installChange = (evt) => this.setState({ showPWAprompt: !evt.matches });

  checkInstall = (addListers) => {
    if (
      navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches ||
      document.referrer.startsWith("android-app://")
    ) {
      console.log("PWA");
      window.alert(
        `wow, thanks for adding us to your homescreen, please re-add ` +
          `if any bugs pop up and email nick@thumbprint.us with any complaints! ` +
          `STAGE: Work-In-Progress Beta (a.k.a. Alpha)`
      );
    } else {
      const ios = () => {
        return (
          [
            "iPad Simulator",
            "iPhone Simulator",
            "iPod Simulator",
            "iPad",
            "iPhone",
            "iPod"
          ].includes(navigator.platform) ||
          // iPad on iOS 13 detection
          (navigator.userAgent.includes("iOS") && "ontouchend" in document)
        );
      };
      //!/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
      if (ios()) {
        if (addListers) {
          this.matchMedia = window.matchMedia("(display-mode: standalone)");
          this.matchMedia.addEventListener("change", this.installChange);

          console.log("PWA query");
          window.addEventListener(
            "beforeinstallprompt",
            this.beforeinstallprompt
          );
          window.addEventListener("appinstalled", this.afterinstallation);
          this.resize();
        }
      } else
        this.setState({ showPWAprompt: true }, () =>
          console.log("PWA query on iOS")
        );
    }
  };
  render() {
    const { availableHeight, showPWAprompt, width } = this.state;
    return (
      <Route //BrowserRouter
        render={({ location, history }) => {
          if (location.pathname !== this.state.pathname) {
            clearTimeout(this.pauseRender);
            this.pauseRender = setTimeout(() => {
              this.setState({ pathname: location.pathname, history }, () => {
                if (location.state && location.state.statePathname) {
                  this.setState({
                    statePathname: location.state.statePathname
                  });
                }
              });
            }, 200);
          }
          return (
            <TransitionGroup
              key="1"
              style={{
                width: "100%",
                transition: ".3s ease-in",
                minHeight: availableHeight ? availableHeight : "100%"
              }}
            >
              <CSSTransition key="11" timeout={300} classNames={"fade"}>
                <Switch key={location.key} location={location}>
                  <Route
                    render={(props) =>
                      this.props.history === "/bear" ? (
                        <Bear ref={{ current: { bear: this.bf } }} />
                      ) : !(
                          //delete for deploy
                          (
                            window.location.href.includes(
                              "sausage.saltbank.org"
                            ) || window.location.href.includes("i7l8qe.csb.app")
                          )
                        ) ? (
                        <App
                          unmountFirebase={this.state.unmountFirebase}
                          showPWAprompt={showPWAprompt}
                          apple={!this.matchMedia}
                          appHeight={availableHeight}
                          width={width}
                          history={history}
                          pathname={location.pathname}
                          statePathname={this.state.statePathname}
                          location={location}
                          closeWebAppPrompt={() =>
                            this.setState({ showPWAprompt: false })
                          }
                          addToHomescreen={async () => {
                            this.setState({ showPWAprompt: false });
                            if (!this.deferredPrompt) {
                              window.alert(
                                "for iOS, you must use their browser option, 'add to homescreen' " +
                                  "instead of providing web-developers beforeinstallprompt appinstalled"
                              );
                            } else {
                              this.deferredPrompt.prompt();
                              const { outcome } = await this.deferredPrompt
                                .userChoice;
                              console.log(outcome);
                              // the prompt can't be used again so, throw it away
                              this.deferredPrompt = null;
                            }
                          }}
                          functions={{ bear: this.bf.current.onclick }}
                        />
                      ) : (
                        <SaltBank
                          lastPath={this.state.lastPathname}
                          pathname={this.state.pathname}
                          history={this.state.history}
                        />
                      )
                    }
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      ></Route>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <PathRouter />
  </BrowserRouter>,
  rootElement
);

/*const vE = document.getElementById("root");
ReactDOM[vE && vE.innerHTML !== "" ? "hydrate" : "render"](
  <PathRouter />,
  vE,
  () => console.log("virtualElem loaded alright")
);
*/
