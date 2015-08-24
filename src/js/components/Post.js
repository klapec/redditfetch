import React from 'react';

const Post = React.createClass({
  propTypes: {
    postImage: React.PropTypes.object.isRequired,
    postUrl: React.PropTypes.string.isRequired,
    postTitle: React.PropTypes.string.isRequired,
    postDate: React.PropTypes.string.isRequired,
    postScore: React.PropTypes.number.isRequired
  },

  getInitialState() {
    return {};
  },

  render() {
    return (
      <div className="post" style={this.props.postImage}>
        <a href={this.props.postUrl}>
          <div className="overlay">
            <h2 className="post-title">
              {this.props.postTitle}
            </h2>
            <div className="post-details">
              <span className="post-date">{this.props.postDate}</span>
              <span className="post-score">{this.props.postScore}</span>
            </div>
          </div>
        </a>
      </div>
    );
  }
});

export default Post;
