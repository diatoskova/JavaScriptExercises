function solve() {

    var lastItemId = 0,
        lastCatalogId = 0;

    function generateNextId() {
        return ++lastItemId;
    }
    function generateNextCatalogId() {
        return ++lastCatalogId;
    }
    function validateDescription(description) {
        if (!((typeof description == 'string') && description != '')) {
            throw new Error('Description must be non empty string!');
        }
    }
    function validateBookName(name) {
        if (!( (typeof name == 'string') && 
            name.length>=2 && 
            name.length<=40)) {
            throw new Error('Name must be a string with 2-to-40 characters!');
        }
    }
    function validateIsbn(isbn) {
        if (!((typeof isbn == 'string') &&
            /^[0-9]+$/.test(isbn) &&
            (isbn.length == 10 || isbn.length == 13)
            )) {
            throw new Error('Invalid ISBN!');
        }
    }
    function validateGenre(genre) {
        if (!((typeof genre == 'string') &&
           genre.length >= 2 &&
           genre.length <= 20)) {
            throw new Error('Genre must be a string with 2-to-20 characters!');
        }
    }
    function validateDuration(duration) {
        if (!((typeof duration=='number') &&
            duration>0)) {

            throw new Error('Invalid media duration! Must be a valid number greater than 0.');
        }
    }
    function validateRating(rating) {
        if (!((typeof rating == 'number') &&
            rating >= 1 &&
            rating<=5)) {

            throw new Error('Invalid media rating! Must be a valid number between 1 and 5 (inclusive).');
        }
    }
    function validateCatalogCreationArguments(arguments) {
        var i,
            len = arguments.length;

        if (len==0) {
            throw new Error('Cannot invoke add function with no arguments.');
        }
        for (i = 0; i < len; i+=1) {
            validateItem(arguments[i]);
        }
    }
    function validateBookCatalogCreationArguments(arguments) {
        var i,
            len = arguments.length;

        if (len == 0) {
            throw new Error('Cannot invoke add function with no arguments.');
        }
        for (i = 0; i < len; i += 1) {
            validateBookItem(arguments[i]);
        }
    }
    function validateMediaCatalogCreationArguments(arguments) {
        var i,
            len = arguments.length;

        if (len == 0) {
            throw new Error('Cannot invoke add function with no arguments.');
        }
        for (i = 0; i < len; i += 1) {
            validateMediaItem(arguments[i]);
        }
    }
    function validateItem(it) {
        if (!((it.prototype==item.prototype) ||
             (it.hasOwnProperty('id') && it.hasOwnProperty('name') && it.hasOwnProperty('description'))))
           // (it instanceof book) || 
            //(it instanceof media))) 
            {

            throw new Error('The passed argument is not a valid instance of item.');
        }
    }
    function validateBookItem(it) {
        if (!((it.prototype == book.prototype) ||
             (it.hasOwnProperty('id')
            && it.hasOwnProperty('name')
            && it.hasOwnProperty('description')
            && it.hasOwnProperty('isbn')
            && it.hasOwnProperty('genre'))))
            // (it instanceof book) || 
            //(it instanceof media))) 
        {

            throw new Error('The passed argument is not a valid instance of book.');
        }
    }
    function validateMediaItem(it) {
        if (!((it.prototype == media.prototype) ||
             (it.hasOwnProperty('id')
            && it.hasOwnProperty('name')
            && it.hasOwnProperty('description')
            && it.hasOwnProperty('duration')
            && it.hasOwnProperty('rating'))))
        {

            throw new Error('The passed argument is not a valid instance of media.');
        }
    }
    function validateItemsArray(items) {
        
        var i,
           len = items.length;

        if (len == 0) {
            throw new Error('Cannot invoke add function with an empty array.');
        }
        for (i = 0; i < len; i += 1) {
            validateItem(items[i]);
        }
    }
    function validateBookItemsArray(items) {

        var i,
           len = items.length;

        if (len == 0) {
            throw new Error('Cannot invoke add function with an empty array.');
        }
        for (i = 0; i < len; i += 1) {
            validateBookItem(items[i]);
        }
    }
    function validateMediaItemsArray(items) {

        var i,
           len = items.length;

        if (len == 0) {
            throw new Error('Cannot invoke add function with an empty array.');
        }
        for (i = 0; i < len; i += 1) {
            validateMediaItem(items[i]);
        }
    }
    function validatePattern(pattern) {
        if (!((typeof pattern == 'string') &&
        pattern.length > 1)) {
            throw new Error('Search pattern must be a valid string which contains at least one character!');
        }
    }
    function eliminateDuplicates(arr) {
        var i,
            len = arr.length,
            out = [],
            obj = {};

        for (i = 0; i < len; i++) {
            obj[arr[i]] = 0;
        }
        for (i in obj) {
            out.push(i);
        }
        return out;
    }
    function compareRatings(item1, item2) {
        if (item1.rating > item2.rating) {
            return 1;
        }
        else if (item1.rating < item2.rating) {
            return -1;
        }
        else {
            return 0;
        }
    }
    function sortDurationDescIdAsc(m1, m2) {
        if (m1.duration > m2.duration) {
            return -1;
        }
        else if (m1.duration < m2.duration) {
            return 1;
        }
        else {
            if (m1.id > m2.id) {
                return 1;
            }
            else if (m1.id < m2.id) {
                return -1;
            }
            else {
                return 0;
            }
        }
    }

    var item = (function () {
        var item={};
        Object.defineProperty(item, 'init', {
            value: function (name, description) {
                //???
                this.id = generateNextId();
                this.name = name;
                this.description = description;
                return this;
            }
        });
        Object.defineProperty(item, 'name', {
            get: function () {
                return this._name;
            },
            set: function (value) {
                validateBookName(value);
                this._name = value;
            }
        });
        Object.defineProperty(item, 'description', {
            get: function () {
                return this._description;
            },
            set: function (value) {
                validateDescription(value);
                this._description = value;
            }
        });

        return item;
    })();

    var book = (function(parent){
        var book = Object.create(parent);

        Object.defineProperty(book, 'init', {
            value: function (name, isbn, genre, description) {
                parent.init.call(this, name,description);
                this.isbn = isbn;
                this.genre = genre;
                return this;
            }
        });

        Object.defineProperty(book, 'isbn', {
            get: function () {
                return this._isbn;
            },
            set: function (value) {
                validateIsbn(value);
                this._isbn = value;
            }
        });

        Object.defineProperty(book, 'genre', {
            get: function () {
                return this._genre;
            },
            set: function (value) {
                validateGenre(value);
                this._genre = value;
            }
        });

        return book;

    })(item);

    var media = (function(parent){
        var media = Object.create(parent);

        Object.defineProperty(media, 'init', {
            value: function (name, rating, duration, description) {
                parent.init.call(this, name, description);
                this.rating = rating;
                this.duration = duration;
                return this;
            }
        });

        Object.defineProperty(media, 'duration', {
            get: function () {
                return this._duration;
            },
            set: function (value) {
                validateDuration(value);
                this._duration = value;
            }
        });

        Object.defineProperty(media, 'rating', {
            get: function () {
                return this._rating;
            },
            set: function (value) {
                validateRating(value);
                this._rating = value;
            }
        });
        return media;

    })(item);

    var catalog = (function () {
        var catalog = {};

        Object.defineProperty(catalog, 'init', {
            value: function (name) {
                this.id = generateNextCatalogId();
                this.name = name;
                this.items = [];
                return this;
            }
        });

        Object.defineProperty(catalog, 'name', {
            get: function () {
                return this._name;
            },
            set: function (value) {
                validateBookName(value);
                this._name = value;
            }
        });
        
        Object.defineProperty(catalog, 'add', {
            value: function () {
                if (catalog.add.arguments.length == 1 && (Array.isArray(catalog.add.arguments[0]))) {
                    validateItemsArray(catalog.add.arguments[0]);
                    var len = catalog.add.arguments[0].length,
                    i;

                    for (i = 0; i < len; i += 1) {
                        this.items.push(catalog.add.arguments[0][i]);
                    }
                }
                else {
                    validateCatalogCreationArguments(catalog.add.arguments);
                   
                    var len = catalog.add.arguments.length,
                        i;
                    for (i = 0; i < len; i += 1) {
                        this.items.push(catalog.add.arguments[i]);
                    }
                }
                return this;
            }
        });

        Object.defineProperty(catalog, 'find', {
            value: function (search) {
                if (catalog.find.arguments.length == 1 && (typeof search=='number')){
                    //if id provided
                    var i,
                        len = this.items.length;

                    for (i = 0; i < len; i+=1) {
                        if (search===this.items[i].id) {
                            return this.items[i];
                        }
                    }
                    return null;
                }
                else if (catalog.find.arguments.length == 1 && (typeof search == 'object')) {
                   
                    var i,
                        len = this.items.length,
                        result = [],
                        propertiesCount = 0,
                        matchedPropertiesCount = 0;

                    for (i = 0; i < len; i += 1) {
                        for (var prop in search) {
                            propertiesCount += 1;

                            if (search[prop]==this.items[i][prop]) {
                                matchedPropertiesCount += 1;
                            }                    
                        }                               
                        if (propertiesCount == matchedPropertiesCount) {
                            result.push(this.items[i]);
                        }
                        matchedPropertiesCount = 0;
                        propertiesCount = 0;
                        
                    }
                    return result;
                    
                }
                else {
                    throw new Error('Cannot invoke add() with no arguments or with invalid input (different from number or object).');
                }
            }
        });

        Object.defineProperty(catalog, 'search', {
            value: function (pattern) {
                //???
                if (catalog.search.arguments.length==0) {
                    throw new Error();
                }
                //??
                validatePattern(pattern);

                var i,
                    len = this.items.length,
                    result = [];

                for (i = 0; i < len; i += 1) {
                    if (this.items[i].name.toLowerCase().indexOf(pattern.toLowerCase()) > -1 ||
                        this.items[i].description.toLowerCase().indexOf(pattern.toLowerCase()) > -1) {
                        result.push(this.items[i]);
                    }
                }

                return result;
                    
            }
        });

        return catalog;
    })();

    var bookCatalog = (function (parent) {
        var bookCatalog = Object.create(parent);

        Object.defineProperty(bookCatalog, 'add', {
            value: function () {
                if (bookCatalog.add.arguments.length == 1 && (Array.isArray(bookCatalog.add.arguments[0]))) {
                    validateBookItemsArray(bookCatalog.add.arguments[0]);


                    var len = bookCatalog.add.arguments[0].length,
                        i;

                    for (i = 0; i < len; i += 1) {
                        this.items.push(bookCatalog.add.arguments[0][i]);
                    }
                }
                else {
                    validateBookCatalogCreationArguments(bookCatalog.add.arguments);

                    var len = bookCatalog.add.arguments.length,
                        i;
                    for (i = 0; i < len; i += 1) {
                        this.items.push(bookCatalog.add.arguments[i]);
                    }
                }
                return this;
            }
        });

        Object.defineProperty(bookCatalog, 'getGenres', {
            value: function () {
                var i,
                    len = this.items.length,
                    genres = [];

                for (i = 0; i < len; i += 1) {
                    genres.push(this.items[i].genre);
                }
                return eliminateDuplicates(genres);
                //return (new Set(genres));
            }
        });
        

        return bookCatalog;
    })(catalog);

    var mediaCatalog = (function (parent) {
        var mediaCatalog = Object.create(parent);

        Object.defineProperty(mediaCatalog, 'add', {
            value: function () {
                if (mediaCatalog.add.arguments.length == 1 && (Array.isArray(mediaCatalog.add.arguments[0]))) {
                    validateMediaItemsArray(mediaCatalog.add.arguments[0]);


                    var len = mediaCatalog.add.arguments[0].length,
                        i;

                    for (i = 0; i < len; i += 1) {
                        this.items.push(mediaCatalog.add.arguments[0][i]);
                    }
                }
                else {
                    validateMediaCatalogCreationArguments(mediaCatalog.add.arguments);

                    var len = mediaCatalog.add.arguments.length,
                        i;
                    for (i = 0; i < len; i += 1) {
                        this.items.push(mediaCatalog.add.arguments[i]);
                    }
                }
                return this;
            }
        });

        Object.defineProperty(mediaCatalog, 'getTop', {
            value: function (count) {
                if (!((typeof count == 'number') && count > 1)) {
                    throw new Error('Count must be a number bigger than 1!');
                }
                var i,
                    len = this.items.length,
                    sorted,
                    top = [];
                sorted = this.items.sort(compareScores);

                for (i = 0; i < count; i += 1) {
                    top.push(sorted[i]);
                }

                return top;
            }
        });

        Object.defineProperty(mediaCatalog, 'getSortedByDuration', {
            value: function () {

                var i,
                    len = this.items.length,
                    sorted;

                sorted = this.items.sort(sortDurationDescIdAsc);

                return sorted;
            }
        });
        
        return mediaCatalog;

    })(catalog);

    return {
        getBook: function (name, isbn, genre, description) {
            var someBook = Object.create(book).init(name, isbn, genre, description);
            return someBook;
        },
        getMedia: function (name, rating, duration, description) {
            var m = Object.create(media).init(name, rating, duration, description);
            return m;
        },
        getBookCatalog: function (name) {
            var c = Object.create(bookCatalog).init(name);
            return c;
        },
    getMediaCatalog: function (name) {
        var c = Object.create(mediaCatalog).init(name);
        return c;
    }
};
}

//var module = solve();
//var catalog = module.getBookCatalog('John\'s catalog');


//var book1 = module.getBook('The secrets of the JavaScript Ninja', '1234567890', 'IT', 'A book about JavaScript');
//var book2 = module.getBook('JavaScript: The Good Parts', '0123456789', 'IT', 'A good book about JS');


//catalog.add(book1);
//catalog.add(book2);
//console.log(catalog.getGenres());

//console.log(catalog.find(book1.id));
//returns book1

//console.log(catalog.find({id: book2.id, genre: 'IT'}));
//returns book2

//console.log(catalog.search('js')); 
// returns book2

//console.log(catalog.search('javascript'));
//returns book1 and book2

//console.log(catalog.search('Te sa zeleni'))
//returns []
