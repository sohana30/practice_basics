function fetchData() {
  const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
  fetch(url)
  .then(response => {
    if(!response.ok) {
      throw new Error('Network fail');
    }
    return response.json();
  })
  .then(data => {
    displayData(data);
  })
  .then(error => {
    console.error(error);
  });
}

function displayData(post) {
  const list = document.createElement('ul');
  post.forEach(post => {
    const listItem = document.createElement('li');
    listItem.textContent = post.title;
    console.log(post)
    list.appendChild(listItem);
  });
  document.body.appendChild(list);
}
fetchData();