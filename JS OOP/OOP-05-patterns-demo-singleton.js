var databases = (function () {

    var items = [],
        db = {
            add: function (item) {
                items.push(item);
                return db;
            },
            list: function () {
                return items.slice();
            }
        }

    return {
        get: function () {
            return db;
        }
    }


})();

//var databases = databases.get().add('John').add('An');
//console.log(databases.list());

//databases = databases.get().add('John').add('An');
//console.log(databases.list());


//Augmenting Modules

//file 1

(function (scope) {
    scope.x = 'file 1';
})(mod);


(function (scope) {
    scope.y = 'file 2';
})(mod);

console.log(mod.x);
console.log(mod.y);