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
        limit: 200,
        page: 1,
        products: [],
        sortBy: '',
        isEndOfCatalogue: false
    };
      
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleSortByChange(event) {
    const value = event.target.value;
    this.setState({
      sortBy: value,
      page: 1,
      isEndOfCatalogue: false,
      products: []
    }, () => {
      this.fetchProducts()
    });
  }

  fetchProducts() {
    this.setState({showLoading: true});
    let limitParam = `_limit=${this.state.limit}`;
    let pageParam = `&_page=${this.state.page}`;
    let sortParam = this.state.sortBy? `&_sort=${this.state.sortBy}` : '';
    let url = 'http://localhost:3000/products?' + limitParam + pageParam + sortParam;
    fetch(url)
      .then(response => response.json())
      .then(products => {
        this.setState({
          products: [...this.state.products, ...products],
          showLoading: false,
          page: products.length>0? this.state.page+1: this.state.page,
          isEndOfCatalogue: products.length>0? false: true
        })
      })
  }

  handleScroll() {
    const isNearBottom = window.innerHeight + window.scrollY >= (document.body.offsetHeight) - 20;
    if (isNearBottom && !this.state.showLoading && !this.state.isEndOfCatalogue) {
      this.fetchProducts();
    }
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
          {state.products.map((product, index) =>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 well-sm" key={product.id}>
              <h3>{index}</h3>
              <Product face={product.face} size={product.size} price={product.price} date={product.date}></Product>
            </div>
          )}
        </div>

        {this.state.isEndOfCatalogue && <div className="well-lg text-center">End of Catalogue!</div>}
      </Fragment>
    );
  }

}

export default App;
