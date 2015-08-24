import React from 'react';
import Actions from '../actions/Actions';

const Sidebar = React.createClass({
  propTypes: {
    categories: React.PropTypes.array.isRequired,
    active: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      active: this.props.active
    };
  },

  changeCategory(event) {
    const activeCategory = event.target.textContent;
    event.preventDefault();
    Actions.categoryUpdate(activeCategory);
    this.setState({
      active: activeCategory
    });
  },

  render() {
    const categories = this.props.categories;
    const defaultClassName = 'category-item';
    let itemClassName = '';
    return (
      <aside className="sidebar">
        <nav className="category-list">
          {categories.map(category => {
            const categoryName = Object.keys(category)[0];
            return (
              <ul key={categoryName} className="category">
                <h3 className="category-title">{categoryName}</h3>
                  {category[categoryName].map(categoryItem => {
                    if (categoryItem === this.state.active) {
                      itemClassName = defaultClassName + ' active';
                    } else {
                      itemClassName = defaultClassName;
                    }
                    return <li key={categoryItem}><a href="#" className={itemClassName} onClick={this.changeCategory}>{categoryItem}</a></li>;
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
