import React, {Component, Fragment} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          showLoading: false
      };
  }

  render() {
    return (
      <Fragment>
        {this.state.showLoading && <div>
          loading
        </div>}
        <div className="container-fluid">
          <div className="container">
            <h1>Products Grid</h1>
            <h2>Ascii Faces</h2>
          </div>
          <hr></hr>
        </div>
      </Fragment>
    );
  }

}

export default App;
