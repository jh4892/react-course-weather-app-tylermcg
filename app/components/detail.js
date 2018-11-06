var React = require("react");
var convertTemp = require("../utils/helpers").convertTemp;
var ReactRouter = require("react-router-dom");
var Link = ReactRouter.Link;
var utils = require("../utils/helpers");
var getDate = utils.getDate;
var convertTemp = utils.convertTemp;

function DayItem(props) {
  var date = getDate(props.day.dt);
  var icon = props.day.weather[0].icon;
  return (
    <div onClick={props.onClick} className="dayContainer">
      <img
        className="weather"
        src={"app/images/weather-icons/" + icon + ".svg"}
        alt="Weather"
      />
      <h2 className="subheader">{date}</h2>
    </div>
  );
}

class Detail extends React.Component {
  render() {
    console.log(this.props);

    if (!this.props.location || !this.props.location.state) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> Something went wrong. Please go{" "}
          <Link to="/">home</Link>.
        </div>
      );
    } else {
      var props = this.props.location.state;
      return (
        <div>
          <DayItem day={props} />
          <div className="description-container">
            <p>{props.city}</p>
            <p>{props.weather[0].description}</p>
            <p>
              min temp: {Math.round(convertTemp(props.main.temp_min), 1)} &deg;C
            </p>
            <p>
              max temp: {Math.round(convertTemp(props.main.temp_max), 1)} &deg;C
            </p>
            <p>humidity: {props.main.humidity}</p>
          </div>
        </div>
      );
    }
  }
}

module.exports = Detail;
