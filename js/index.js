showBooks();


class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }

}

class Display {
    constructor() {
    }

    static add(book) {
        console.log("addding :");
        let uiString = ` <tr id=${book.name} >
        <td>$ {
        book.name
    } </td>
        <td>$ {
        book.author
    } </td>
        <td>$ {
        book.type
    } </td>
        <td><Button id='btn' onclick='del()'  class ='btn btn-Danger'>Delete</Button></td>
        </tr>`;
        let tablebody = document.getElementById("tablebody");
        tablebody.innerHTML += uiString;


    }



    static clear() {

        let libraryform = document.getElementById("libraryform");
        libraryform.reset();

    }

    static validate(book) {
        if (book.name.length < 2 || book.author.length < 2)
            return false
        else
            return true;
    }

    static show(type, msg) {

        let messasge = document.getElementById('message');
        messasge.innerHTML = `    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                    <strong>Error!</strong> ${msg}
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>`;
        setTimeout(() => {
            messasge.innerHTML = "";
        }, 2000)

    }



}






function del(index) {
    if (document.getElementById('btn') != null) {

        let notes = localStorage.getItem("books");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(notesObj));
        showBooks();

    }
}



let libraryform = document.getElementById("libraryform");
libraryform.addEventListener('submit', libraryformSubmit);

function libraryformSubmit(event) {
    event.preventDefault();
    console.log("You have submittedd")
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;
    let coding = document.getElementById('coding');
    let fiction = document.getElementById('fiction');
    let anime = document.getElementById('anime');
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (coding.checked) {
        type = coding.value;
    }
    else if (anime.checked) {
        type = anime.value;
    }

    let book = new Book(name, author, type);


    let display = Display;
    if (display.validate(book)) {


        let books = localStorage.getItem("books");
        if (books == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(books);
        }
        let myObj = {
            name: book.name,
            author: book.author,
            type: book.type
        }
        notesObj.push(myObj);
        localStorage.setItem("books", JSON.stringify(notesObj));
        display.add(book);
        display.clear();
        display.show('success', 'book added succesfully');
        showBooks();
    }
    else {
        display.show('danger', 'You cannot add this book, Minimum length of name for book and author must be atleast 3');
    }

}

function showBooks() {

    let books = localStorage.getItem("books");

    if (books == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(books);
    }

    let html = "";

    notesObj.forEach(function (element, index) {
        html += ` <tr id=${index}>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><Button id='btn' value=${index} onclick='del(${index})'  class='btn btn-danger'>Delete</Button></td>
        
    </tr>`;

    });

    let notesElm = document.getElementById("tablebody");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<p style="padding:1rem;">Nothing to show! Use "Add a Note" section above to add notes.<p>`;
    }
}