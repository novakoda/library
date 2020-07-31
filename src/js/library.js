var myLibrary = [];
var libCont = document.getElementById('myLibrary');

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
  listBooks();
}


function listBooks() {
  var html = ""
  myLibrary.forEach((book, i) => {
    html += `<tr id="book${i}"><th scope="row">${book.title}</th><td>${book.author}</td><td>${book.pages}</td><td>${book.readStatus}</td><td><button id="delete${i}" class="btn btn-danger px-1 py-0">X</button></td></tr>`
  });
  libCont.innerHTML = html;

  for (let i = 0; i < myLibrary.length; i++) {
    window["book"+i] = document.getElementById(`book${i}`);

    document.getElementById(`delete${i}`).addEventListener("click",  function() {
      myLibrary.splice(i, 1);
      libCont.removeChild(window["book"+i]);
      listBooks();
    });
  }
}


function formData(form) {
  var messages = [];
  title = document.getElementById("formTitle").value;
  author = document.getElementById("formAuthor").value;
  pages = document.getElementById("formPages").value;

  if (title === "" || title == null) {
    messages.push("Title cannot be empty");
  }
  if (author === "" || author == null) {
    messages.push("Author cannot be empty");
  }
  if (pages === "" || pages == null) {
    messages.push("Pages cannot be empty");
  }

  error = document.querySelector("#error");
  if (messages.length > 0) {
    error.style.display = "block";
    error.innerHTML = messages.join(", ");
    return;
  }
  error.style.display = "none";

  if (document.getElementById("formRead").checked) {
    read = true;
  } else {
    read = false;
  }
  addBookToLibrary(title, author, pages, read);
  document.querySelector("#book-form-container").style.display = "none";
}



addBookToLibrary("Think and Grow Rich", "Napoleon Hill", 238, false);
addBookToLibrary("Outwitting the Devil", "Napoleon Hill", 288, true);
console.log(myLibrary);
listBooks();

document.getElementById("newBook").addEventListener("click",  function() {
  document.querySelector("#book-form-container").style.display = "block";
});

document.getElementById("addBook").addEventListener("click",  function() {
  formData(this);
});

document.getElementById("closeBtn").addEventListener("click",  function() {
  document.querySelector("#book-form-container").style.display = "none";
});
