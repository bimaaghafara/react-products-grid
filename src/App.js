import React, {Component, Fragment} from 'react';
import './App.scss';

// components
import Loader from './components/loader';
import Product from './components/product';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showLoading: false,
        products: [],
        sortBy: ''
    };
      
    this.handleSortByChange = this.handleSortByChange.bind(this);
  }

  componentDidMount() {
    this.fetchProducts()
  }

  handleSortByChange(event) {
    const value = event.target.value;
    this.setState({sortBy: value}, () => {
      this.fetchProducts()
    });
  }

  fetchProducts() {
    this.setState({showLoading: true});
    let sortBy = this.state.sortBy? `&_sort=${this.state.sortBy}` : '';
    let url = 'http://localhost:3000/products?_limit=15' + sortBy;
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
        {this.state.showLoading && <Loader></Loader>}
        <div className="container-fluid">
          <div className="container">
            <h1>Products Grid</h1>
            <h2>Ascii Faces</h2>
          </div>
          <hr></hr>
        </div>

        <div className="container">
          <div className="sort-by-wrapper pull-right">
            <div className="sort-by-label">
              Sort by:
            </div>
            <div className="sort-by-select">
              <select className="form-control" value={state.sortBy} onChange={this.handleSortByChange}>
                <option value="">Default</option>
                <option value="size">Size</option>
                <option value="price">Price</option>
                <option value="id">Id</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container products-wrapper">
          {state.products.map(product =>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 well-sm" key={product.id}>
              <Product face={product.face} size={product.size} price={product.price} date={product.date}></Product>
            </div>
          )}
        </div>
      </Fragment>
    );
  }

}

export default App;
