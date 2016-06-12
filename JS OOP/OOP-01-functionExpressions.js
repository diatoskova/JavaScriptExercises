
//Task 1
var arr1=[1,1];

function sum(arr) {

    if (arguments.length != 1) {
        throw new Error();
    }
    if (!Array.isArray(arr)) {
        throw new Error();
    }

    var sum = 0;

    arr.forEach(function (item) {
        if (typeof item !== 'number' ) {
            throw new Error();
        }
        else {
            sum += item;
        }
    });

    if (arr.length == 0) {
        return null;
    }
    else {
        return sum;
    }

}

console.log(sum(arr1));

//Task 2
/*function isPrime(number) {

    if (arguments.length != 1) {
        throw "The function should take exactly one parameter!";
    }

    if (typeof number !== 'number' || isNaN(number)) {
        throw "The input is not a valid number";
    }
   
    var i;
    for (i = 2; i <= Math.sqrt(number) ; i+=1) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}*/

function primeNumbersInRange(begin, end) {
    if (arguments.length != 2) {
        throw new Error();
    }

    if (typeof begin !== 'number'  || typeof end !== 'number' ) {
        throw new Error();
    }


    var i;
    var primeNums = [];

    for (i = begin; i <= end; i+=1) {
        if (isPrime(i)) {
            primeNums.push(i);
        }
    }
    function isPrime(number) {

        if (arguments.length != 1) {
            throw new Error();
        }

        if (typeof number !== 'number') {
            throw new Error();
        }
        if (number == 1 || number == 0) {
            return false;
        }
        var i;
        for (i = 2; i <= Math.sqrt(number) ; i += 1) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }
    return primeNums;
}

console.log(primeNumbersInRange(0,5));