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
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100vh",
          margin: "auto",
          fontFamily: "sans-serif",
          textAlign: "center",
          alignItems: "center",
          backgroundColor: "rgb(200, 230, 240)"
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
        <div>
          <h1 {...setting(0)}>Salt</h1>
          <br />
          <a href="https://truncatedwholesaletax.com">
            <h4 {...setting(1)}>geohash spoofable foreign intervention</h4>
          </a>
          <br />
          <a href="https://realecon.quora.com">
            <h4 {...setting(2)}>in kind tax exemptions for nonprofessionals</h4>
          </a>
          <br />
          <a href="https://commie.dev">
            <h4 {...setting(3)}>depositary valorization</h4>
          </a>
          <br />
          <a href="https://scopebook.quora.com">
            <h4 {...setting(4)}>timeclock unlock</h4>
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
          <a href="https://regressivecops.quora.com">
            <h4 {...setting(7)}>fiduciary cops</h4>
          </a>
          <br />
          <a href="https://courttechnology.quora.com">
            <h4 {...setting(7)}>state machinery</h4>
          </a>
        </div>
      </div>
    );
  }
}

export default SaltBank;
