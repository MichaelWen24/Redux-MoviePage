import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./components/Header";
import MoviePage from "./containers/MoviesPage";
import DetailsPage from "./containers/DetailsPage";
import LoginPage from "./containers/LoginPage";
import FavoritePage from "./containers/FavoritePage";
import RatedPage from "./containers/RatedPage";

const App = withRouter((props) => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/favorite" component={FavoritePage} />
        <Route path="/rated" component={RatedPage} />
        <Route path="/movies/:movieId" component={DetailsPage} />
        <Route path="/" component={MoviePage} />
      </Switch>
    </div>
  );
});

export default App;
