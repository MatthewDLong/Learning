//
// Strings
//

// Remove last 2 characters from string
console.log('foo'.slice(0, -2))

// Remove last 3 characters from string
console.log('foobar'.slice(0, -3))

// Remove middle 2 chars from string
let s = 'quxxbazz'
console.log(s.slice(0, Math.floor(s.length / 2 - 1)) + s.slice(Math.floor(s.length / 2 + 1)))

// Push onto end of string
console.log('foo' + 'bar')

// Reverse string 0(n/2)
const ss = 'foo'
let rr = []
let p11 = 0
let p22 = ss.length - 1
while (p11 <= p22) {
    rr[p11] = ss[p22]
    rr[p22] = ss[p11]
    if (p11 == p22) {
        rr[p11] = ss[p22]
    }
    p11++
    p22--
}
console.log(rr.join(''))

// Count length of string
console.log('foo'.length)

// Count frequency of each letter in string
s = 'foo'
let f = {}
for (let c of s) {
    if (f[c]) {
        f[c]++
    } else {
        f[c] = 1
    }
}
console.log(f)

//
// Objects
//

// loop through object keys and values
let o = { a: 123, b: 456 }
for (let [k, v] of Object.entries(o)) {
    console.log(k, v)
}

// loop through keys of object
for (let k of Object.keys(o)) {
    console.log(k)
}

// count keys in object
console.log(Object.keys(o).length)

// check if object keys length is even
console.log(Object.keys(o).length % 2 === 0)

// count entries in object
console.log(Object.entries(o).length)

// sort keys in object: keys containing f first
let oo = { foo: 123, bar: 456, fooo: 789 }
console.log(Object.keys(oo).sort((a, b) => a.indexOf('f') > -1 ? -1 : 1))

// sort keys in object: numbers before strings
let ooo = { 1: 'abc', a: 123, 3: 'ced' }
console.log(Object.keys(ooo).sort((a, b) => typeof a === 'number' ? -1 : 1))

// sort keys in object: biggest numbers first
let oooo = { 1: 'abc', 34: 'def', 67: 'ghi' }
console.log(Object.keys(oooo).sort((a, b) => Number(a) > Number(b) ? -1 : 1))

// sort keys in object: shortest string first
let os = { 'foo': 123, f: 456 }
console.log(Object.keys(os).sort((a, b) => a.length < b.length ? -1 : 1))

// sort keys in object: strings containing substring 'hi' first, 'hey' next, 'hello' next, other words last
// O(n)
let oss = { 'hiqux': 123, 'heybar': 456, 'foohello': 789, 'hifoo': 101, 'bar': 234 }
let his = []
let heys = []
let hellos = []
let words = []
for (let k of Object.keys(oss)) {
    if (k.indexOf('hi') > -1) {
        his.unshift(k)
    } else if (k.indexOf('hey') > -1) {
        heys.unshift(k)
    } else if (k.indexOf('hello') > -1) {
        hellos.unshift(k)
    } else {
        words.unshift(k)
    }

}
console.log(his.concat(heys, hellos, words))

// Reverse each value which is string
let k = { a: 'foo', b: 'bar', c: 'baz' }
function rev(s) {
    let p1 = 0
    let p2 = s.length - 1
    let reversed = []
    while (p1 <= p2) {
        reversed[p1] = s[p2]
        reversed[p2] = s[p1]
        if (p1 == p2) {
            reversed[p1] = s[p1]
        }
        p1++
        p2--
    }
    return reversed.join('')
}
for (let [key, v] of Object.entries(k)) {
    if (typeof v == 'string') {
        k[key] = rev(v)
    }
}
console.log(k)

// n^2 each value which is number
let ob = { a: 1, b: 4, c: 5 }
for (let [k, v] of Object.entries(ob)) {
    if (typeof v == 'number') {
        ob[k] = v ** 2
    }
}
console.log(ob)

// Count length of each value which is string
kkk = { a: 'foo', b: 'bar', c: 'baz' }
let freq = {}
for (let [k, v] of Object.entries(kkk)) {
    freq[k] = v.length
}
console.log(freq)

// Count frequency of each letter in string
let s1 = 'foobarbazquxquuxx'
let freq1 = {}
for (let c of s1) {
    if (freq1[c]) {
        freq1[c]++
    } else {
        freq1[c] = 1
    }
}
console.log(freq1)

//
// Arrays
//

// Loop through array
let aa = [1, 2, 3]
for (let i of aa) {
    console.log(i)
}

// find length of array
console.log(aa.length)

// merge two arrays
let aaa = [3, 4, 5]
let b = [1, 2, 3]
console.log(aaa.concat(b))

// get last item of array
let bb = [1, 2, 3]
console.log(bb[bb.length - 1])

// get first item of array
console.log(bb[0])

// check if item exists in array
console.log(bb.indexOf(2) > -1)

// pop from end of array
bb.pop()
console.log(bb)

// unshift onto begining of array
let ff = [2, 3, 4, 5]
ff.unshift(1)
console.log(ff)

// Reverse array  - O(n/2)
let nums = [1, 2, 3, 4, 5]

let p1 = 0
let p2 = nums.length - 1
let r = []
while (p1 <= p2) {
    r[p1] = nums[p2]
    r[p2] = nums[p1]
    if (p1 == p2) {
        r[p1] = nums[p1]
    }
    p1++
    p2--
}
console.log(r)