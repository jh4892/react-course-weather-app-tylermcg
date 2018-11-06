var React = require("react");
var ReactDom = require("react-dom");
var PropTypes = require("prop-types");

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSubmit() {
    // console.log(this.state.city);

    this.props.onSubmitZipcode(this.state.city);
  }

  handleChange(event) {
    // console.log(event.target.value);
    var value = event.target.value;

    this.setState(function() {
      return {
        city: value
      };
    });
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  }

  render() {
    var style = {
      flexDirection: this.props.direction,
      display: "flex"
    };

    var buttonStyle = {};

    if (this.props.direction === "row") {
      buttonStyle.marginLeft = "10px";
    } else {
      buttonStyle.marginTop = "10px";
    }

    return (
      <div className="mijnForm" style={style}>
        <input
          className="form-control"
          placeholder="Sydney, Australia"
          type="text"
          autoComplete="off"
          value={this.state.city}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button
          style={buttonStyle}
          className="btn btn-success"
          onClick={this.handleSubmit}
        >
          Get Weather
        </button>
      </div>
    );
  }
}

module.exports = Form;
