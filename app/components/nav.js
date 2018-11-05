var React = require("react");
var ReactDom = require("react-dom");
var PropTypes = require("prop-types");
var Form = require("./Form");

class Nav extends React.Component {
  render() {
    return (
      <div className="navbar">
        <h1>Weather app</h1>
        <Form isInNav={true} />
      </div>
    );
  }
}

module.exports = Nav;
