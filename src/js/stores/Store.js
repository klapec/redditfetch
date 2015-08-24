import Reflux from 'reflux';
import Actions from '../actions/Actions';

const Store = Reflux.createStore({
  listenables: Actions,

  getInitialState() {
    return {
      currentCategory: ''
    };
  },

  getDefaultCategory() {
    return 'Earth';
  },

  getDefaultCategoryList() {
    return [
      { Nature: ['Earth', 'Sky', 'Geology', 'Space'] },
      { Synthetic: ['City', 'Village', 'Architecture', 'Car'] },
      { Organic: ['Animal', 'Adrenaline', 'Sports', 'Food'] },
      { Aesthetic: ['Design', 'Room', 'Movie poster', 'Art'] },
      { Scholastic: ['History', 'Map', 'Book', 'Quotes'] }
    ];
  },

  onCategoryUpdate(category) {
    this.currentCategory = category;
    this.trigger(this.currentCategory);
  }
});

export default Store;
