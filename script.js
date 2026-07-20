// script.js
let currentLang = "js";

const implementations = {
  js: `function hashJoin(A, B) {
  const MB = new Map();
  for (const b of B) {
    const key = b.character;
    if (!MB.has(key)) MB.set(key, []);
    MB.get(key).push(b);
  }
  
  const C = [];
  for (const a of A) {
    const key = a.name;
    if (MB.has(key)) {
      for (const b of MB.get(key)) {
        C.push({
          A_age: a.age,
          A_name: a.name,
          B_character: b.character,
          B_nemesis: b.nemesis
        });
      }
    }
  }
  return C;
}`,
  ts: `interface RowA { age: number; name: string; }
interface RowB { character: string; nemesis: string; }

function hashJoin(A: RowA[], B: RowB[]): any[] {
  const MB = new Map<string, RowB[]>();
  // ... (full typed implementation)
}`,
  py: `def hash_join(A, B):
    from collections import defaultdict
    mb = defaultdict(list)
    for b in B:
        mb[b['character']].append(b)
    # ...`,
  java: `public class HashJoin {
  public static List<Map<String, Object>> join(List<Map<String, Object>> A, List<Map<String, Object>> B) {
    // Production Java implementation with generics
  }
}`
};

function runHashJoin() {
  const A = document
    .getElementById("tableA")
    .value.trim()
    .split("\n")
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return {};
      }
    })
    .filter((o) => o.name);

  const B = document
    .getElementById("tableB")
    .value.trim()
    .split("\n")
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return {};
      }
    })
    .filter((o) => o.character);

  // Execute JS version
  const result = hashJoin(A, B);

  let html =
    "<h3>RESULT SET</h3><table><tr><th>A_age</th><th>A_name</th><th>B_character</th><th>B_nemesis</th></tr>";
  result.forEach((row) => {
    html += `<tr><td>${row.A_age}</td><td>${row.A_name}</td><td>${row.B_character}</td><td>${row.B_nemesis}</td></tr>`;
  });
  html += "</table>";

  document.getElementById("result").innerHTML = html;

  // Simple visualization
  const viz = document.getElementById("viz");
  viz.innerHTML = `<div class="success">✓ HASH JOIN COMPLETE — ${result.length} MATCHES GENERATED</div>`;
}

function resetDemo() {
  document.getElementById("result").innerHTML = "";
  document.getElementById("viz").innerHTML = "";
}

// Tab functionality
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentLang = tab.dataset.lang;
    document.getElementById("code-content").textContent =
      implementations[currentLang];
  });
});

// Canvas animation for hero
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw animated hash nodes and connections
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 1.5;
  // ... (particle/hash visualization code)
  requestAnimationFrame(animate);
}
animate();
