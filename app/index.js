var React = require("react");
var ReactDom = require("react-dom");
var PropTypes = require("prop-types");
require("./index.css");

var Main = require("./components/main.js");

class App extends React.Component {
  render(props) {
    return <Main />;
  }
}

ReactDom.render(<App />, document.getElementById("app"));
