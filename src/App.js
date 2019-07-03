import React, {Component, Fragment} from 'react';
import './App.scss';
import Loader from './components/loader';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          showLoading: false,
          products: []
      };
  }

  componentDidMount() {
    this.fetchProducts()
  }

  fetchProducts() {
    this.setState({showLoading: true});
    let url = 'http://localhost:3000/products?_limit=10';
    fetch(url)
      .then(response => response.json())
      .then(products => {
        this.setState({
          products: products,
          showLoading: false
        })
      })
  }

  render() {
    const state = this.state;

    return (
      <Fragment>
        {state.showLoading && <Loader></Loader>}
        <div className="container-fluid">
          <div className="container">
            <h1>Products Grid</h1>
            <h2>Ascii Faces</h2>
          </div>
          <hr></hr>
        </div>

        <div className="products-wrapper">
          {state.products.map(product => 
            <div key={product.id} className="well-sm"> {product.face} </div>
          )}
        </div>
      </Fragment>
    );
  }

}

export default App;
