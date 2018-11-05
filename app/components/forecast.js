var React = require("react");
var ReactDom = require("react-dom");
var queryString = require("query-string");
var api = require("../utils/api");
var Moment = require("react-moment");
var utils = require("../utils/helpers");
var getDate = utils.getDate;
var convertTemp = utils.convertTemp;

function Day(props) {
  var date = getDate(props.day.dt);
  var icon = props.day.weather[0].icon;
  return (
    <div className="dayContainer">
      <img
        className="weather"
        src={"./app/images/weather-icons/" + icon + ".svg"}
        alt="Weather"
      />
      <h2 className="subheader">{date}</h2>
    </div>
  );
}

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      city: queryString.parse(this.props.location.search).city
    };

    this.handleClick.bind(this);
  }

  componentDidMount() {
    var data = api.get5dayForecast(this.state.city).then(
      function(data) {
        if (data) {
          this.setState(function() {
            return {
              data: data
            };
          });
        } else {
          console.log("Something went wrong.");
        }
      }.bind(this)
    );

    this.setState();
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="home-container"
          style={{ backgroundImage: "url('app/images/pattern.svg')" }}
        >
          <h1>Voorspelling</h1>
          {!this.state.data ? (
            <h1>Loading...</h1>
          ) : (
            this.state.data.list.map(
              function(item) {
                return (
                  <Day
                    key={item.dt}
                    day={item}
                    onClick={this.props.onOpenDetail.bind(
                      null,
                      this.state.city
                    )}
                  />
                );
              }.bind(this)
            )
          )}
        </div>
      </React.Fragment>
    );
  }
}

module.exports = Forecast;
