import React from 'react';
import Reflux from 'reflux';
import unescape from 'lodash.unescape';
import Post from './Post';
import Store from '../stores/Store';
import fetchItems from '../utils/fetchItems';

const PostList = React.createClass({
  propTypes: {
    initialCategory: React.PropTypes.string.isRequired
  },

  mixins: [Reflux.listenTo(Store, 'onCategoryChange')],

  getInitialState() {
    return {
      category: this.props.initialCategory,
      items: []
    };
  },

  componentWillMount() {
    fetchItems(this.state.category)
      .then(items => {
        this.setState({
          items
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  onMenuToggle() {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    body.classList.toggle('menu-active');
    sidebar.classList.toggle('menu-active');
    content.classList.toggle('menu-active');
  },

  onCategoryChange(category) {
    fetchItems(category)
      .then(items => {
        this.setState({
          category,
          items
        });
      });
  },

  render() {
    return (
      <main className="content">
        <div className="site-overlay" onClick={this.onMenuToggle}></div>
        <header className="site-header">
          <div className="menu" onClick={this.onMenuToggle}>
            <span className="menu-icon"></span>
          </div>
          <h1 className="site-title">RedditFetch</h1>
        </header>
        <section className="post-list">
          {this.state.items.map(item => {
            if (!item.preview) {
              return null;
            }
            const availableResolutions = item.preview.images[0].resolutions.length;
            let postBackground;

            availableResolutions > 3
              ? postBackground = unescape(item.preview.images[0].resolutions[3].url)
              : postBackground = unescape(item.preview.images[0].source.url);

            const postStyle = {
              backgroundImage: `url(${postBackground})`
            };
            return (
              <Post key={item.id}
                    postImage={postStyle}
                    postTitle={item.title}
                    postUrl={item.url}
                    postDate={new Date(item.created * 1000).toUTCString()}
                    postScore={item.score}/>
            );
          })}
        </section>
      </main>
    );
  }
});

export default PostList;
