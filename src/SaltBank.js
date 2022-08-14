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
    return (
      <div
        style={{
          transition: ".3s ease-in",
          display: "flex",
          flexDirection: "column",
          justifyContent: this.props.onscroll ? "start" : "space-around",
          height: "calc(100vh - 0px)",
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
              <a
                style={{ color: "white" }}
                href="https://www.quora.com/unanswered/Is-a-politician-selling-his-office-when-he-is-a-dependent"
              >
                hunter can pay biden
              </a>{" "}
              <span
                style={{
                  color: "rgb(130,180,130)",
                  textDecoration: "line-through"
                }}
              >
                tax on bartenders and beauticians
              </span>{" "}
              gift friend and family without taxes but for gift as discount and
              damage{" "}
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
            <a href="https://commie.dev">
              <h4 {...setting(3)}>depositary valorization</h4>
            </a>
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
        </div>
      </div>
    );
  }
}

export default SaltBank;
