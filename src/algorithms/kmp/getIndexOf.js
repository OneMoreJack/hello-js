
export function getIndexOf(s, m) {
  if (s === null || m === null || m.length < 1 || s.length < m.length) {
    return -1
  }

  const next = getNextArray(m)
  let i1 = i2 = 0
  while (i1 < s.length && i2 < m.length) {
    if (s[i1] === m[i2]) {
      i1++
      i2++
    } else if (next[i2] === -1) {
      i1++
    } else {
      i2 = next[i2]
    }
  }

  return i2 === m.length ? i1 - i2 : -1
}

function getNextArray(m) {
  
}