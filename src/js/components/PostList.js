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

  onCategoryChange(category) {
    fetchItems(category)
      .then(items => {
        this.setState({
          category,
          items
        });
      });
  },

  handleMenuToggle() {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    body.classList.toggle('menu-active');
    sidebar.classList.toggle('menu-active');
    content.classList.toggle('menu-active');
  },

  render() {
    return (
      <main className="content">
        <div className="site-overlay" onClick={this.handleMenuToggle}></div>
        <header className="site-header">
          <div className="menu" onClick={this.handleMenuToggle}>
            <span className="menu-icon"></span>
          </div>
          <h1 className="site-title">RedditFetch</h1>
        </header>
        <section className="post-list">
          {this.state.items.map(item => {
            // Exclude all the self-posts and those without an image
            if (!item.preview) {
              return null;
            }
            // Check how many preview images are available
            const availableResolutions = item.preview.images[0].resolutions.length;
            let postBackground;

            availableResolutions >= 4
              // We need to use the fourth preview image as it's 640px wide
              ? postBackground = unescape(item.preview.images[0].resolutions[3].url)
              // if it does not exist, use the source image
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
