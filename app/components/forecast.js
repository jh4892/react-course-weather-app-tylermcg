var React = require("react");
var ReactDom = require("react-dom");
var queryString = require("query-string");
var api = require("../utils/api");
var utils = require("../utils/helpers");
var getDate = utils.getDate;
var convertTemp = utils.convertTemp;

function Day(props) {
  console.log(props.day.dt);

  var date = getDate(props.day.dt);
  var icon = props.day.weather[0].icon;
  return (
    <div className="dayContainer" onClick={props.onClick}>
      <img
        className="weather"
        src={"./app/images/weather-icons/" + icon + ".svg"}
        alt="Weather"
      />
      <h2 className="subheader">
        {Math.round(convertTemp(props.day.main.temp)) + " ℃ - " + date}
      </h2>
    </div>
  );
}

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props: props,
      data: null,
      city: queryString.parse(this.props.location.search).city
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.makeRequest(this.state.city);
  }
  componentWillReceiveProps(nextProps) {
    // console.log("got new props: ", nextProps.location.search);

    var city = queryString.parse(nextProps.location.search).city;

    if (this.state.props.location.search !== nextProps.location.search) {
      console.log("changed to " + city);
      this.setState(function() {
        return {
          city: city
        };
      });
      this.makeRequest(city); // Pass the new city. this is called before the state.city is updated...
    }
  }

  makeRequest(city) {
    var data = api
      .get5dayForecast(city)
      .then(
        function(data) {
          if (data) {
            this.setState(function() {
              return {
                data: data,
                gotError: false
              };
            });
          } else {
            console.log("Something went wrong.");
          }
        }.bind(this)
      )
      .catch(
        function() {
          this.setState(function() {
            return {
              data: null,
              gotError: true
            };
          });
        }.bind(this)
      );
  }

  handleClick(item) {
    item.city = this.state.city;

    console.log("handleClick", item);

    this.props.history.push({
      pathname: "/details/" + this.state.city,
      state: item
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="home-container"
          style={{
            backgroundImage: "url('app/images/pattern.svg')",
            backgroundRepeat: "repeat",
            overflow: "scroll"
          }}
        >
          <h1>Forecast</h1>
          {!this.state.data ? (
            this.state.gotError ? (
              <div className="alert alert-danger">
                <strong>Oops!</strong> Something went wrong.
              </div>
            ) : (
              <h1 className="forecast-header">Loading...</h1>
            )
          ) : (
            <React.Fragment>
              <h1 className="forecast-header">{this.state.city}</h1>
              <div className="forecast-container">
                {this.state.data.list.map(
                  function(item) {
                    return (
                      <Day
                        key={item.dt}
                        day={item}
                        onClick={this.handleClick.bind(this, item)}
                      />
                    );
                  }.bind(this)
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

module.exports = Forecast;
