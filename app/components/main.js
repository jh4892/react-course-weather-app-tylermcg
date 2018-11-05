var React = require("react");
var ReactDom = require("react-dom");
var PropTypes = require("prop-types");
var Nav = require("./Nav");
var Form = require("./Form");
var ReactRouter = require("react-router-dom");
var BrowserRouter = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Forecast = require("./forecast");
var Detail = require("./detail");

class Main extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route
            render={function(props) {
              return (
                <React.Fragment>
                  <div className="navbar">
                    <h1>Clever Title</h1>
                    <Form
                      direction="row"
                      onSubmitZipcode={function(city) {
                        props.history.push({
                          pathname: "forecast",
                          search: "?city=" + city
                        });
                      }}
                    />
                  </div>
                </React.Fragment>
              );
            }}
          />

          <Route
            exact
            path="/"
            render={function(props) {
              return (
                <React.Fragment>
                  <div
                    className="home-container"
                    style={{ backgroundImage: "url('app/images/pattern.svg')" }}
                  >
                    <h1 className="header">Enter a City and State</h1>
                    <Form
                      direction="column"
                      onSubmitZipcode={function(city) {
                        props.history.push({
                          pathname: "forecast",
                          search: "?city=" + city
                        });
                      }}
                    />
                  </div>
                </React.Fragment>
              );
            }}
          />

          <Route
            path="/forecast"
            render={function(props) {
              return (
                <Forecast
                  onOpenDetail={function(city) {
                    props.history.push({
                      pathname: "detail",
                      search: "?city=" + city
                    });
                  }}
                />
              );
            }}
          />
          <Route path="/detail" component={Detail} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

module.exports = Main;
