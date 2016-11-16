import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
  getInitialState: function() {
    return {author: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    if (!author) {
      return;
    }
    this.props.onCommentSubmit({author: author});
    this.setState({author: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});