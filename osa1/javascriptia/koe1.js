const t = [1, -1, 3]

console.log(t.length) // tulostuu 3
console.log(t[1])     // tulostuu -1

t.push(5)             // lisätään taulukkoon luku 5

console.log(t.length) // tulostuu 4

t.forEach(value => {
  console.log(value)  // tulostuu 1, -1, 3, 5 omille riveilleen
}) 

const tt = [1, 2, 3]
const m1 = tt.map(value => value * 2)
console.log(m1)   // tulostuu [2, 4, 6]

const m2 = tt.map(value => '<li>' + value + '</li>')
console.log(m2)  