
function isPrime(num){
    for (let i = 2; i < num; i++) {
        if (num % i === 0)
            return false;
    }
    return true;
}

function isPrime2(num) {
    let root = ~~Math.sqrt(num);
    for (let i = 2; i <= root; i++) {
        if (num % i === 0)
            return false;
    }
    return true;
}

const MAX_NUM = 20000;

function f1() {
    let primeArr = [2, 3, 5];
    for (let i = 7; i < MAX_NUM; i++) {
        isPrime(i) && primeArr.push(i);
    }
    console.log(primeArr.length);
}

function f2() {
    let primeArr = [2, 3, 5];
    for (let i = 7; i < MAX_NUM; i++) {
        isPrime2(i) && primeArr.push(i);
    }
    console.log(primeArr.length);
}

function f3() {
    let primeArr = [2, 3, 5];
    for (let i = 7; i < MAX_NUM; i += 2) {
        isPrime2(i) && primeArr.push(i);
    }
    console.log(primeArr.length);
}

console.time('f1');
f1();
console.timeEnd('f1');

console.time('f2');
f2();
console.timeEnd('f2');

console.time('f3');
f3();
console.timeEnd('f3');


