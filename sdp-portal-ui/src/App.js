import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/header'
import Home from './pages/home'
import productCategories from './pages/productCategories'
import productCategory from './pages/productCategory'
import products from './pages/products'
import contact from './pages/contactUs'
import search from './pages/search'
import genericPage from './pages/generic'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/product' component={productCategories} />
            <Route exact path='/productCategory/:categoryId' component={productCategory} />
            <Route exact path='/products/:productId' component={products} />
            <Route exact path='/contact' component={contact} />
            <Route exact path='/search' component={search} />
            <Route exact path='/pages/:pageName' component={genericPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
