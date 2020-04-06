import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;


//containers contain statefull components.. in which we can manage states