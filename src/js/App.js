import React from 'react';

import Store from './stores/Store';
import Sidebar from './components/Sidebar';
import PostList from './components/PostList';

const App = React.createClass({
  getInitialState() {
    return {
      currentCategory: '',
      categoryList: []
    };
  },

  componentWillMount() {
    this.setState({ currentCategory: Store.getDefaultCategory() });
    this.setState({ categoryList: Store.getDefaultCategoryList() });
  },

  render() {
    return (
      <div className="container">
        <Sidebar categories={this.state.categoryList} initialActiveCategory={this.state.currentCategory}/>
        <PostList initialCategory={this.state.currentCategory}/>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
