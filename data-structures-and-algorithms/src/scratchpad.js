//
// Strings
//

let s = 'foobar'

// Remove last 2 characters from string
console.log(s.slice(0, -2))

// Remove last 3 characters from string
console.log(s.slice(0, -3))

// Remove middle 2 chars from string
console.log(s.slice(0, Math.floor(s.length / 2 - 1)) + s.slice(Math.floor(s.length / 2 + 1)))

// Push onto end of string
console.log(s + 'f')

// Reverse string 0(n)
console.log(s)
let r = []
let p1 = 0
let p2 = s.length - 1
while (p1 <= p2) {
    r[p1] = s[p2]
    r[p2] = s[p1]
    if (p1 == p2) {
        r[p1] = s[p1]
    }
    p1++
    p2--
}
r = r.join('')
console.log(r)

// Count length of string
console.log(s.length)

// Count frequency of each letter in string
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

let o = { foo: 123, bar: 'baz', 1: 123, 2: 456, hi: 'foo', hello: 'bar', hey: 'baz', qux: 'baz' }
// loop through object keys and values
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
console.log(Object.keys(o) % 2 == 0)

// count entries in object
console.log(Object.entries(o).length)

// sort keys in object: keys containing f first
console.log(Object.keys(o).sort((a, b) => a.indexOf('f') > -1 ? -1 : 1))

// sort keys in object: numbers before strings
console.log(Object.keys(o).sort((a, b) => typeof a == 'number' ? -1 : 1))

// sort keys in object: biggest numbers first
console.log(Object.keys(o).sort((a, b) => Number(a) > Number(b) ? -1 : 1))

// sort keys in object: shortest key first
console.log(Object.keys(o).sort((a, b) => a.length < b.length ? -1 : 1))

// sort keys in object: strings containing substring 'hi' first, 'hey' next, 'hello' next, other words last
// O(n)
let group1 = []
let group2 = []
let group3 = []
let group4 = []
for (let k of Object.keys(o)) {
    if (k.indexOf('hi') > -1) {
        group1.push(k)
    } else if (k.indexOf('hey') > -1) {
        group2.push(k)
    } else if (k.indexOf('hello') > -1) {
        group3.push(k)
    } else {
        group4.push(k)
    }
}
console.log(group1.concat(group2, group3, group4).join())

// Reverse each value which is string O(n)
function rev(s) {
    let r = []
    let p1 = 0
    let p2 = s.length - 1
    while (p1 <= p2) {
        r[p1] = s[p2]
        r[p2] = s[p1]
        if (p1 == p2) {
            r[p1] = s[p1]
        }
        p1++
        p2--
    }
    return r.join('')
}
for (let [k, v] of Object.entries(o)) {
    if (typeof v == 'string') {
        o[k] = rev(v)
    }
}
console.log(o)

// n^2 each value which is number
for (let [k, v] of Object.entries(o)) {
    if (typeof v == 'number') {
        o[k] = v ** 2
    }
}
console.log(o)

// Count length of each value which is string
for (let [k, v] of Object.entries(o)) {
    if (typeof v == 'string') {
        console.log(v.length)
    }
}

// Count frequency of each letter in string
s = 'foobar'
let freq1 = { highest: 0 }
for (let c of s) {
    if (freq1[c]) {
        freq1[c]++
    } else {
        freq1[c] = 1
    }
    if (freq1[c] > freq1['highest']) {
        freq1['highest'] = freq1[c]
    }
}
console.log(freq1)

//
// Arrays
//

let a = [1, 2, 3, 4, 5]

// Loop through array
for (let v of a) {
    console.log(v)
}

// find length of array
console.log(a.length)

// merge two arrays
console.log(a.concat([1, 2, 3]))

// get last item of array
console.log(a[a.length - 1])

// get first item of array
console.log(a[0])

// check if item exists in array
console.log(a.indexOf(2) > -1)

// pop from end of array
console.log(a.pop())

// unshift onto begining of array
console.log(a.unshift(1))

// Reverse array  - O(n)
console.log(a)
let rev1 = []

let p11 = 0
let p22 = a.length - 1

while (p11 <= p22) {
    rev1[p11] = a[p22]
    rev1[p22] = a[p11]
    if (p11 == p22) {
        rev1[p11] = a[p11]
    }
    p11++
    p22--
}
console.log(rev1)