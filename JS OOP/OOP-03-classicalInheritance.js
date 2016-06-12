function solve() {
    var Person = (function () {
        function Person(firstname, lastname, age) {

            if (!(this instanceof arguments.callee)) {
                return new Person(name, age);
            }

            var self = this;

            validateName(firstname);
            validateName(lastname);
            validateAge(age);

            self._firstname = firstname;
            self._lastname = lastname;
            self._age = age;
        }

        function validateName(name) {
            // if(!/^[A-Za-z]{3,20}$/.test(name))
            if (!(typeof name=='string') ||
                !(/^[a-zA-Z]/g.test(name)) ||
                name.length<3 ||
                name.length>20) {
                throw new Error('Invalid name!');
            }
        }

        function validateAge(age) {
            var ourAge = Number(age);
            if (isNaN(ourAge) ||
                !(typeof ourAge == 'number') ||
                ourAge < 0 ||
                ourAge > 150) {
                throw new Error('Invalid age. Must be number between 0 and 150!!');
            }
        }

        Object.defineProperty(Person.prototype, 'firstname', {
            get: function () {
                return this._firstname;
            },
            set: function (value) {
                validateName(value);
                this._firstname = value;
            }
        });

        Object.defineProperty(Person.prototype, 'lastname', {
            get: function () {
                return this._lastname;
            },
            set: function (value) {
                validateName(value);
                this._lastname = value;
            }
        });

        Object.defineProperty(Person.prototype, 'age', {
            get: function () {
                return this._age;
            },
            set: function (value) {
                validateAge(value);
                this._age = value;
            }
        });

        Object.defineProperty(Person.prototype, 'fullname', {
            get: function () {
                return this._firstname + ' ' + this._lastname;
            },
            set: function (value) {

                if(!(typeof value=='string')){
                    throw new Error('Fullname must be a string!');
                }

                var names = value.split(' ');

                if (names.length !=2) {
                    throw new Error('Fullname must contain first and last names separated by space.');
                }

                this._firstname = names[0];
                this._lastname = names[1];

            }
        });

        Person.prototype.introduce = function () {
            return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
        };

        return Person;
    }());
    return Person;
}