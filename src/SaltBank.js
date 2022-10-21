import React from "react";

class SaltBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //const {} = this.state;
    //console.log(this.state.username);
    //const space = " ";
    const setting = (n, more) => {
      return {
        style: {
          color: this.state["hoverin" + n] ? "rgb(50,70,90)" : "black",
          cursor: "pointer",
          ...more
        },
        onMouseEnter: () => this.setState({ ["hoverin" + n]: true }),
        onMouseLeave: () => this.setState({ ["hoverin" + n]: false })
      };
    };
    const setting2 = (n, more) => {
      return {
        style: {
          color: this.state["hoverin" + n]
            ? "rgb(80,100,120)"
            : "rgb(50,70,90)",
          cursor: "pointer",
          ...more
        },
        onMouseEnter: () => this.setState({ ["hoverin" + n]: true }),
        onMouseLeave: () => this.setState({ ["hoverin" + n]: false })
      };
    };
    //https://www.quora.com/What-is-the-cause-of-inequality-in-competitive-markets/answer/Nick-Carducci
    //reverse amortization
    return (
      <div
        style={{
          transition: ".3s ease-in",
          display: "flex",
          flexDirection: "column",
          justifyContent: this.props.onscroll ? "flex-start" : "space-around",
          maxheight: "min-content",
          height: "calc(100% - 0px)",
          fontFamily: "sans-serif",
          textAlign: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            position: "relative",
            top: "0px",
            marginTop: "30px"
          }}
        >
          <a
            href="https://vau.money"
            {...setting(8, {
              color: "black",
              textDecoration: "none",
              position: "fixed",
              left: "30px",
              top: "40px"
            })}
          >
            vau.money
          </a>
          <a
            href="https://realecon.quora.com/Are-there-serious-economists-who-dispute-the-Laffer-curve-1"
            {...setting(8, {
              color: "black",
              textDecoration: "none",
              position: "fixed",
              left: "30px",
              bottom: "80px"
            })}
          >
            saverparty.xyz/global
          </a>
          <a
            href="https://commie.dev"
            {...setting(8, {
              color: "black",
              textDecoration: "none",
              position: "fixed",
              left: "30px",
              bottom: "40px"
            })}
          >
            durable goods tax
          </a>
          <a
            {...setting(8, {
              textDecoration: "none",
              position: "fixed",
              right: "30px",
              top: "40px"
            })}
            href="https://sausage.saltbank.org"
          >
            &diams;
          </a>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h1 {...setting(0)}>
              Salt{" "}
              <span style={{ fontSize: "15px" }}>
                (n) revenge, non-rhetorical nor acidic
              </span>
            </h1>
            <h4 {...setting(3)}>depositary valorization by exchange</h4>
            <br />
            <a href="https://truncatedwholesaletax.com">
              <h4 {...setting(1)}>geohash spoofable foreign intervention</h4>
            </a>
            <br />
            <a href="https://realecon.quora.com">
              <h4 {...setting(2)}>
                in kind tax exemptions for nonprofessionals
              </h4>
            </a>
            <br />
            <div
              style={{
                width: "min-content",
                minWidth: "170px",
                color: "white",
                backgroundColor: "rgba(20,20,20,.6)",
                fontSize: "14px",
                padding: "6px"
              }}
            >
              Isn’t foreign agent registration only required for cases of
              racketeering anyway? Is the incompetence to stand trial the issue
              of racketeering? Is Hunter Biden not only{" "}
              <a href="https://teapharmacy.party">guilty for smoking crack</a>{" "}
              and <a href="https://asyluminportugal.quora.com">owning a</a> gun?{" "}
              <a style={{ color: "white" }} href="https://thetax.party">
                Hunter can pay biden
              </a>{" "}
              <span
                style={{
                  color: "rgb(130,180,130)",
                  textDecoration: "line-through"
                }}
              >
                tax on bartenders and beauticians
              </span>{" "}
              gift{" "}
              <a
                style={{ color: "white" }}
                href="https://www.quora.com/unanswered/Is-a-politician-selling-his-office-when-he-is-a-dependent"
              >
                friend and family
              </a>{" "}
              without taxes but for gift as discount and damage{" "}
              <a
                style={{
                  color: "rgb(230,180,180)"
                }}
                href="https://www.quora.com/unanswered/To-allow-gifts-to-be-tax-free-should-gifts-be-exclusively-without-discounted-sales"
              >
                tax exemption
              </a>
              <br />
              commodity has no{" "}
              <a
                style={{ color: "white" }}
                href="https://www.quora.com/If-my-income-were-1m-year-could-I-not-buy-a-home-office-with-it-tax-free"
              >
                living costs
              </a>
              . 3% under{" "}
              <a
                style={{
                  color: "rgb(130,180,200)"
                }}
                href="https://truncatedproductiontax.quora.com"
              >
                $2k/ payday and transaction
              </a>
            </div>
            <br />
            <a href="https://scopebook.quora.com">
              <h4 {...setting(4)}>timeclock unlock</h4>
            </a>
            <br />
            <a href="https://www.quora.com/unanswered/Is-government-not-fining-judges-for-successful-appeals-not-evidence-of-fiduciary-embezzlement">
              <h4 {...setting2(10)}>novation fraud negotiated</h4>
            </a>
            <br />
            <a href="https://maxroyalties.quora.com">
              <h4 {...setting(5)}>industry specific payday loans</h4>
            </a>
            <br />
            <a href="https://thirdpartybeneficiary.quora.com">
              <h4 {...setting(6)}>third party donee beneficiary</h4>
            </a>
            <br />
            <a href="https://reverseamortization.quora.com">
              <h4 {...setting(7)}>cash:debt * annual income</h4>
            </a>
            <br />
            <a href="https://rolloverinsurance.quora.com">
              <h4 {...setting(7)}>direct or exclusion</h4>
            </a>

            <br />
            <a href="https://minimalviableduress.quora.com/">
              <h4 {...setting(11)}>minimal viable duress</h4>
            </a>

            <br />
            <div
              style={{
                width: "min-content",
                minWidth: "150px",
                color: "white",
                backgroundColor: "rgba(20,20,20,.6)",
                fontSize: "14px",
                padding: "6px"
              }}
            >
              Rollover insurance
              <hr />
              Renegotiation at the end of the period is as meaningless as cdc
              mortality significance and unconscionable
            </div>
            <br />
            <a href="https://regressivecops.quora.com">
              <h4 {...setting(7)}>fiduciary cops</h4>
            </a>
            <br />
            <a href="https://courttechnology.quora.com">
              <h4 {...setting(7)}>state machinery</h4>
            </a>
            <br />
            <a href="https://www.quora.com/unanswered/Is-government-not-fining-judges-for-successful-appeals-not-evidence-of-fiduciary-embezzlement">
              <h4 {...setting2(9)}>tort embezzlement reform</h4>
            </a>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            //alignSelf: "start",
            bottom: "3px",
            right: "5px"
          }}
        >
          no <a href="https://realvelocity.asia">capitalization</a>
          <br />(<a href="https://stocktwits.com/nmc123">Valuation</a>): $5t top
          500, $5b top 5k, $50m top 50k, $16m top 3m, $16m top 27m, $16m top
          120m, $20k bottom 167m (<a href="https://vaults.biz">Checking</a>):
          $300m top 500, $300k top 3m
        </div>
      </div>
    );
  }
}

export default SaltBank;
