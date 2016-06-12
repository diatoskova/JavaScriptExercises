var db = (function () {
    var objects = [],
        lastId;

    function getNextId(){
        return ++lastId;
    }

    function add(obj) {
        obj.id=getNextId();
        objects.push(obj);
    }

    function list() {
        return objects.map(function (obj) {
            return {
                name: obj.name,
                id: obj.id
            };
        });
    }

    return {
        add: add,
        list: list
        }

    }
());

