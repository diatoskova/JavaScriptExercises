var vehicle = (function () {
    var vehicle = {};

    vehicle.init = function (brand) {
        this.brand = brand;
        return this;
    }

    vehicle.move = function () {
        return this.brand + ' is moving...';
    }

    return vehicle;
})();

var car = (function (parent) {

    var car = Object.create(parent);

    Object.defineProperty(car, 'wheels', {
        get: function () {
            return this._wheels;
        },
        set: function (value) {
            if (value > 4) {
                throw new Error('Cars must have up to 4 wheels for some reason ;)');
            }

            this._wheels = value;
        }
    });

    Object.defineProperty(car, 'init', {
        value: function (brand, wheels) {
            parent.init.call(this, brand);
            this.wheels = wheels;
            return this;
        }
    });

    /*car.init = function (brand, wheels) {
        parent.init.call(this,brand);
        this.wheels = wheels;
        return this;
    }
    */

    Object.defineProperty(car, 'move', {
        value: function () {
            return parent.move.call(this) + ' whit ' + this.wheels + ' wheels.';
        }
    });

    /*
    car.move = function () {
        return parent.move.call(this) + ' whit ' + this.wheels + ' wheels.';
    }
    */


    return car;

})(vehicle);

var someVehicle = Object.create(vehicle).init('Mercedes');
var someCar = Object.create(car).init('Audi',4);
console.log(someVehicle);
console.log(someCar.move());

//all properties from car and inherited from vehicle
for (var key in someCar) {
    console.log(key + ': ' + someCar[key]);
}

//all properties from car + information if it comes 
//from car or is inherited from the parend (vehicle)
for (var key in someCar) {
    console.log(key + ': ' + someCar.hasOwnProperty(key)); //brand??????,wheels ---> true    init, move ---->false 
}
