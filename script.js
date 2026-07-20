// script.js - VELOCITY HASHJOIN
// High-end, clean, and production-ready

/**
 * Core Hash Join Algorithm
 * @param {Array<Object>} A - First table (probe)
 * @param {Array<Object>} B - Second table (build)
 * @returns {Array<Object>} Joined result
 */
function hashJoin(A, B) {
  // Build Phase: Create multimap from Table B
  const multiMap = new Map();

  for (const row of B) {
    const key = row.character;
    if (!multiMap.has(key)) {
      multiMap.set(key, []);
    }
    multiMap.get(key).push(row);
  }

  // Probe Phase: Scan Table A and join matches
  const result = [];

  for (const row of A) {
    const key = row.name;

    if (multiMap.has(key)) {
      for (const match of multiMap.get(key)) {
        result.push({
          A_age: row.age,
          A_name: row.name,
          B_character: match.character,
          B_nemesis: match.nemesis
        });
      }
    }
  }

  return result;
}

/**
 * Parse textarea input into array of objects
 * @param {string} text
 * @returns {Array<Object>}
 */
function parseTableInput(text) {
  return text
    .trim()
    .split("\n")
    .map((line) => {
      try {
        return JSON.parse(line.trim());
      } catch (e) {
        return null;
      }
    })
    .filter((item) => item !== null);
}

/**
 * Main demo execution function
 */
function runDemo() {
  const rawA = document.getElementById("tableA").value;
  const rawB = document.getElementById("tableB").value;

  const tableA = parseTableInput(rawA);
  const tableB = parseTableInput(rawB);

  if (tableA.length === 0 || tableB.length === 0) {
    showMessage("Please provide valid data in both tables.", "error");
    return;
  }

  const startTime = performance.now();
  const result = hashJoin(tableA, tableB);
  const endTime = performance.now();

  renderResult(result, endTime - startTime);
}

/**
 * Render results in a beautiful table
 */
function renderResult(result, executionTime) {
  const container = document.getElementById("result");

  let html = `
        <div class="result-header">
            <h3>✅ HASH JOIN COMPLETED</h3>
            <p><strong>${
              result.length
            }</strong> matches • ${executionTime.toFixed(2)}ms</p>
        </div>
        <table class="result-table">
            <thead>
                <tr>
                    <th>A_age</th>
                    <th>A_name</th>
                    <th>B_character</th>
                    <th>B_nemesis</th>
                </tr>
            </thead>
            <tbody>
    `;

  result.forEach((row) => {
    html += `
            <tr>
                <td>${row.A_age}</td>
                <td>${row.A_name}</td>
                <td>${row.B_character}</td>
                <td>${row.B_nemesis}</td>
            </tr>
        `;
  });

  html += `</tbody></table>`;

  container.innerHTML = html;
}

/**
 * Show temporary message
 */
function showMessage(text, type = "info") {
  const container = document.getElementById("result");
  container.innerHTML = `
        <div style="padding: 30px; text-align: center; color: ${
          type === "error" ? "#ff6b6b" : "#d4af37"
        };">
            ${text}
        </div>
    `;
}

/**
 * Reset the demo
 */
function resetDemo() {
  document.getElementById("result").innerHTML = `
        <div style="padding: 60px; text-align: center; color: #666;">
            Click <strong>EXECUTE HASH JOIN</strong> to see the magic.
        </div>
    `;
}

// Auto-run demo when page loads
window.onload = () => {
  setTimeout(() => {
    runDemo();
  }, 700);
};

// Make functions available globally for inline onclick handlers
window.runDemo = runDemo;
window.resetDemo = resetDemo;
