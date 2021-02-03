import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./components/Header";
import MoviePage from "./components/MoviesPage";
import DetailsPage from "./components/DetailsPage";
import LoginPage from "./components/LoginPage";
import FavoritePage from "./components/FavoritePage";
import RatedPage from "./components/RatedPage";

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
