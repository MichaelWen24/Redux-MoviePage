import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./components/Header";
import MoviePage from "./components/MoviesPage";
import DetailsPage from "./components/DetailsPage";


const App = withRouter((props) => {
  return (
    <div className="App">
      <Header/>
      <Switch>
      <Route path="/movies/:movieId" component={DetailsPage}/>
        <Route path="/" component={MoviePage}/>
      </Switch>
    </div>
  );
})

export default App;
