function solve() {
    var library = (function () {

        var books = [],
            categories = [];


        function validateISBN(ISBN) {
            if (!/^(?:\d{10}|\d{13})$/.test(ISBN)) {
                throw new Error('ISBN must be 10 or 13 digits');
            }
        }
        function validateBook(book) {
            if (books.some(function (currentBook) {
                return (currentBook.isbn === book.isbn ||
                        currentBook.id === book.id);
            })) {
                throw new Error('Cannot add duplicate books');
            }
            if (books.some(function (currentBook) {
                    return (currentBook.title === book.title);
            })
                || book.title.length < 2
                || book.title.length > 100) {
                throw new Error('Cannot add duplicate books');
            }

            if (!book.author || book.author.length == 0 || book.author === '') {
                throw new Error("Invalid book author!");
            }
            if (!(book.isbn.length == 10 || book.isbn.length == 13)) {
                throw new Error('Invalid ISBN!');
            }
        }
       
        function addBook(book) {
            if (!book || Object.keys(book).length === 0) {
                throw new Error('Undefined or empty object');
            }
            if (arguments.length == 0) {
                throw new Error('Function addBook() must take at least one parameter');
            }       

            validateObject(book);
            validateBook(book);

            if (!categories.some(function (cat) {
                book.category == cat;
            })) {
                categories.push(book.category)
            }

            book.id = books.length + 1;
            books.push(book);
            return book;
        }
        
        function listBooks(by) {

            var sortedBooks = [];

            if (!by || !Object.keys(by).length) { //if 'by' is undefined or is an empty object
                sortedBooks = books;
            }
            else if (by.hasOwnProperty('category') || by.hasOwnProperty('author')) {
                sortedBooks = books.filter(function (book) {
                    return book.category == by.category || book.author == by.author;
                });
            }

            return sortedBooks;
        }

        function listCategories() {
            return categories;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    }());
    return library;
}

