function hashJoin(A, B) {
  // Hash phase: Build multimap from B (smaller table ideally)
  const MB = new Map();
  for (let b of B) {
    const key = b.character;
    if (!MB.has(key)) {
      MB.set(key, []);
    }
    MB.get(key).push(b);
  }

  // Join phase: Scan A and match
  const C = [];
  for (let a of A) {
    const key = a.name;
    if (MB.has(key)) {
      for (let b of MB.get(key)) {
        const c = {
          A_age: a.age,
          A_name: a.name,
          B_character: b.character,
          B_nemesis: b.nemesis
        };
        C.push(c);
      }
    }
  }
  return C;
}
