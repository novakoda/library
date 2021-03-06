if (localStorage.getItem("myLibrary") != null) {
  var myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
} else {
  var myLibrary = [];
}

var libCont = document.getElementById('myLibrary');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  if (this.read == true) {
    this.readStatus = "read";
  } else {
    this.readStatus = "not read";
  }
  this.info = `${title} by ${author}, ${pages} pages - ${this.readStatus}`;
}


function addBookToLibrary(title, author, pages, read) {
  book = new Book(title, author, pages, read);
  myLibrary.push(book);
  console.log(book.info);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  listBooks();
}


function listBooks() {
  var html = ""
  console.log(JSON.parse(localStorage.getItem("myLibrary")));
  if (localStorage.getItem("myLibrary") != null) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  }

  myLibrary.forEach((book, i) => {
    html += `
    <tr id="book${i}">
      <th scope="row">${book.title}</th>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>
        <button id="readBtn${i}" type="button" class="btn">${book.readStatus}</button>
      </td>
      <td>
        <button id="delete${i}" class="btn btn-danger px-1 py-0">X</button>
      </td>
    </tr>`
  });
  libCont.innerHTML = html;

  for (let i = 0; i < myLibrary.length; i++) {
    window["book"+i] = document.getElementById(`book${i}`);
    window["readBtn"+i] = document.getElementById(`readBtn${i}`);

    readBtnColors(i);

    window["readBtn"+i].addEventListener("click",  function() {
      if (myLibrary[i].read) {
        myLibrary[i].read = false;
        myLibrary[i].readStatus = "not read";
      } else {
        myLibrary[i].read = true;
        myLibrary[i].readStatus = "read";
      }
      readBtnColors(i);
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    });

    document.getElementById(`delete${i}`).addEventListener("click",  function() {
      myLibrary.splice(i, 1);
      libCont.removeChild(window["book"+i]);
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      listBooks();
    });
  }
}

function readBtnColors(i) {
  if (myLibrary[i].read) {
    window["readBtn"+i].className = "btn btn-success";
  } else {
    window["readBtn"+i].className = "btn btn-danger";
  }
  window["readBtn"+i].innerHTML = myLibrary[i].readStatus;
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


if (myLibrary.length < 1) {
  addBookToLibrary("Think and Grow Rich", "Napoleon Hill", 238, false);
  addBookToLibrary("Outwitting the Devil", "Napoleon Hill", 288, true);
}

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
