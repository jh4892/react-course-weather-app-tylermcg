var React = require("react");
var ReactDom = require("react-dom");
var PropTypes = require("prop-types");
var Nav = require("./Nav");
var Form = require("./Form");

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <div
          className="home-container"
          style={{ backgroundImage: 'url("app/images/pattern.svg")' }}
        >
          <h1>Enter City and state</h1>
          <Form />
        </div>
      </React.Fragment>
    );
  }
}

module.exports = Main;
