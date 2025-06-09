async function loadGoal() {
  const res = await fetch("/api/goal");
  const { current, target } = await res.json();
  document.getElementById("current").value = current;
  document.getElementById("target").value = target;
}

document.getElementById("goal-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const current = +document.getElementById("current").value;
  const target = +document.getElementById("target").value;
  const res = await fetch("/api/goal", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ current, target }),
  });
  if (res.ok) alert("Goal updated!");
  else alert("Error updating goal.");
});

loadGoal();
