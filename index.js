class Store {
  constructor() {
    this.data = JSON.parse(localStorage.getItem('books')) || [];
  }

  add(book) {
    this.data.push(book);
    localStorage.setItem('books', JSON.stringify(this.data));
  }

  remove(id) {
    this.data = this.data.filter((book) => book.id !== id);
    localStorage.setItem('books', JSON.stringify(this.data));
  }
}
const store = new Store();

function remove(e) {
  e.target.parentElement.remove();
  store.remove(parseInt(e.target.parentElement.id, 10));
}

window.onload = () => {
  const addButton = document.querySelector('.add');
  const books = document.querySelector('.books');
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');

  const article = (book) => `<article id=${book.id}>
    <p>${book.title}</p>
    <span>by</span>
    <p>${book.author}</p>
    <button class="remove">Remove</button>
    </article>`;

  books.innerHTML = store.data.map((book) => article(book)).join('');
  document.querySelectorAll('.remove').forEach((removeButton) => {
    removeButton.onclick = (e) => remove(e);
  });

  addButton.onclick = (event) => {
    event.preventDefault();
    const id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const book = {
      id,
      title: title.value,
      author: author.value,
    };
    store.add(book);
    const wrapper = document.createElement('div');
    wrapper.innerHTML = article(book);

    const div = wrapper.firstChild;
    div.childNodes[7].onclick = (e) => remove(e);

    books.appendChild(div);
  };
};
