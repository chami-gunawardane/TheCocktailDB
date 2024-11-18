import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { Provider } from "react-redux"; 
import Routers from "../src/routes/Routers";
import "./App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { SearchProvider } from "../src/context/SearchContext"; 
import store from "./redux/Store"; 

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.drinks)) {
          setIngredients(data.drinks);
        }
      })
      .catch((error) => console.error("Failed to fetch ingredients:", error));
  }, []);

  return (
    <Provider store={store}> {/* Wrap the app in the Redux Provider */}
      <div className="App">
        <Router>
          <SearchProvider>
            <Header />
            <Routers ingredients={ingredients} />
            <Footer />
          </SearchProvider>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
