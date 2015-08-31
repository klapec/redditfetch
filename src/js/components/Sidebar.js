import React from 'react';
import Actions from '../actions/Actions';

const Sidebar = React.createClass({
  propTypes: {
    categories: React.PropTypes.array.isRequired,
    initialActiveCategory: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      activeCategory: this.props.initialActiveCategory
    };
  },

  handleCategoryChange(event) {
    const activeCategory = event.target.textContent;
    event.preventDefault();
    Actions.categoryUpdate(activeCategory);
    this.setState({
      activeCategory
    });
  },

  render() {
    const defaultClassName = 'category-item';
    let itemClassName = '';
    return (
      <aside className="sidebar">
        <nav className="category-list">
          {this.props.categories.map((category, index) => {
            const categoryName = Object.keys(category)[0];
            return (
              <ul key={'category' + index} className="category">
                <h3 className="category-title">{categoryName}</h3>
                  {category[categoryName].map(categoryItem => {
                    categoryItem === this.state.activeCategory
                      ? itemClassName = defaultClassName + ' active'
                      : itemClassName = defaultClassName;
                    return (
                      <li key={categoryItem}>
                        <a href="#"
                           className={itemClassName}
                           onClick={this.handleCategoryChange}>{categoryItem}</a>
                      </li>
                    );
                  })}
              </ul>
            );
          })}
        </nav>
      </aside>
    );
  }
});

export default Sidebar;
