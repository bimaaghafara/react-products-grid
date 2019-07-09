import React, {Component, Fragment} from 'react';
import './App.scss';

// components
import Loader from './components/loader';
import Product from './components/product';
import Ads from './components/ads';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showLoading: false,
        limit: 125,
        page: 1,
        products: [],
        nextProducts: [],
        sortBy: '',
        isEndOfCatalogue: false,
        isFetchingNextProducts: false,
        adsIds: []
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
        const adsIds = this.getRandomAdsIds(Math.floor([...this.state.products, ...products].length/20));
        this.setState({
          adsIds: adsIds,
          products: [...this.state.products, ...products],
          showLoading: false,
          page: products.length>0? this.state.page+1: this.state.page,
          isEndOfCatalogue: products.length>0? false: true
        });
      });
  }

  fetchNextProducts() {
    this.setState({isFetchingNextProducts: true});
    let limitParam = `_limit=${this.state.limit}`;
    let pageParam = `&_page=${this.state.page}`;
    let sortParam = this.state.sortBy? `&_sort=${this.state.sortBy}` : '';
    let url = 'http://localhost:3000/products?' + limitParam + pageParam + sortParam;
    fetch(url)
      .then(response => response.json())
      .then(products => {
        const adsIds = this.getRandomAdsIds(Math.floor([...this.state.products, ...products].length/20));
        this.setState({
          isFetchingNextProducts: false,
          adsIds: adsIds,
          nextProducts: products,
          page: products.length>0? this.state.page+1: this.state.page,
          isEndOfCatalogue: products.length>0? false: true
        });
      });
  }

  async handleScroll() {
    const isNearBottom = window.innerHeight + window.scrollY >= (document.body.offsetHeight) - 20;
    if (isNearBottom && this.state.nextProducts.length>0) {
      await this.setState({
        products: [...this.state.products, ...this.state.nextProducts],
      });
      await this.setState({
        nextProducts : []
      });
    }

    if (!this.state.isFetchingNextProducts && this.state.nextProducts.length===0 && !this.state.isEndOfCatalogue) {
      this.fetchNextProducts();
    }
  }

  getRandomAdsIds(newLength) {
    let ret = this.state.adsIds;
    for(let i=this.state.adsIds.length; i<newLength; i++) {
      ret.push(this.getRandomInt())
    }
    return ret;
  }

  getRandomInt() {
    const min = 1;
    const max = 1234567890123456;
    return Math.floor(Math.random()*(max-min)) + min;
  }

  render() {
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
              <select className="form-control" value={this.state.sortBy} onChange={this.handleSortByChange}>
                <option value="">Default</option>
                <option value="size">Size</option>
                <option value="price">Price</option>
                <option value="id">Id</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container products-wrapper">
          {this.state.products.map((product, index) =>
            <Fragment key={product.id}>
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 well-sm">
                <h3>{index}</h3>
                <Product id={product.id} face={product.face} size={product.size} price={product.price} date={product.date}></Product>
              </div>
              {(index+1)%20 === 0 && 
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 well-sm">
                  <h3>Ads {((index+1)/20)-1}</h3>
                  <Ads rParam={this.state.adsIds[((index+1)/20)-1]}></Ads>
                </div>
              }
            </Fragment>
          )}
        </div>

        {this.state.isEndOfCatalogue &&
          <div className="well-lg text-center">
            <h2>End of Catalogue!</h2>
          </div>
        }
      </Fragment>
    );
  }

}

export default App;
