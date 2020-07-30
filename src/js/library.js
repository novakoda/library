var myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.readStatus = "not read";

  if (this.read == true) {
    this.readStatus = "read";
  }

  this.info = `${title} by ${author}, ${pages} pages - ${this.readStatus}`;
}

function addBookToLibrary(title, author, pages, read) {
  book = new Book(title, author, pages, read);
  myLibrary.push(book);
  console.log(book.info);
}

function render(html) {
  document.getElementById('myLibrary').innerHTML = html;
}

function listBooks() {
  var html = ""
  myLibrary.forEach((book) => {
    html += `<tr><th scope="row">${book.title}</th><td>${book.author}</td><td>${book.pages}</td><td>${book.readStatus}</td></tr>`
  });

  render(html);
}

addBookToLibrary("Think and Grow Rich", "Napoleon Hill", 238, false);
addBookToLibrary("Outwitting the Devil", "Napoleon Hill", 288, true);
console.log(myLibrary);
listBooks();

document.getElementById("newBook").addEventListener("click",  function() {
  document.querySelector("#book-form-container").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click",  function() {
  document.querySelector("#book-form-container").style.display = "none";
});
