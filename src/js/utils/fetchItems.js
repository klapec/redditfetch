const fetchItems = function fetchItems(category) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = `https://www.reddit.com/r/${category.replace(/\s/, '')}Porn.json`;

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response);
        const items = res.data.children.map(v => {
          return v.data;
        });
        items.shift();
        resolve(items);
      } else {
        reject(Error('Error'));
      }
    };
    xhr.onerror = () => {
      reject(Error('Network error'));
    };
    xhr.open('get', url, true);
    xhr.send();
  });
};

export default fetchItems;
