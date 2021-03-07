import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} /> 
      <Route exact path="/search/photos/:query" component={ResultsPage} />
    </Router>
  );
}

export default App;
