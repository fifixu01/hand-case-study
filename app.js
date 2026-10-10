const MEDALS = ["🥇", "🥈", "🥉"];

// Combined ranking: average of Fifi's and Emu's positions (lower is better).
function combine(fifi, emu) {
  return PEOPLE
    .map((name) => ({ name, score: (fifi.indexOf(name) + emu.indexOf(name)) / 2 }))
    .sort((a, b) => a.score - b.score)
    .map((p) => p.name);
}

function list(names, className) {
  const ol = document.createElement("ol");
  ol.className = `ranking ${className}`;
  names.forEach((name, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="pos">${MEDALS[i] || `#${i + 1}`}</span><span class="name"></span>`;
    li.querySelector(".name").textContent = name;
    ol.appendChild(li);
  });
  return ol;
}

function column(label, names, className) {
  const div = document.createElement("div");
  div.className = "col";
  const h3 = document.createElement("h3");
  h3.className = className;
  h3.textContent = label;
  div.append(h3, list(names, className));
  return div;
}

document.getElementById("cast").innerHTML = PEOPLE.map((p) => `<li>${p}</li>`).join("");

const main = document.getElementById("categories");
CATEGORIES.forEach((cat) => {
  const section = document.createElement("section");
  section.className = "card";
  const h2 = document.createElement("h2");
  h2.textContent = `${cat.emoji} ${cat.title}`;
  const cols = document.createElement("div");
  cols.className = "cols";
  cols.append(
    column("Fifi", cat.fifi, "fifi"),
    column("Emu", cat.emu, "emu"),
    column("Combined", combine(cat.fifi, cat.emu), "combined"),
  );
  section.append(h2, cols);
  main.appendChild(section);
});
