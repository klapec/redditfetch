import React from 'react';

import Store from './stores/Store';
import Sidebar from './components/Sidebar';
import PostList from './components/PostList';

const App = React.createClass({
  getInitialState() {
    return {
      currentCategory: Store.getDefaultCategory(),
      categoryList: Store.getDefaultCategoryList()
    };
  },

  render() {
    return (
      <div className="container" >
        <Sidebar categories={this.state.categoryList} active={this.state.currentCategory}/>
        <PostList category={this.state.currentCategory}/>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
