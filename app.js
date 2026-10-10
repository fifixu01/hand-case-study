const MEDALS = ["🥇", "🥈", "🥉"];

// A ranking is a list of names, where a nested list means those people are tied,
// e.g. ["Jason", ["Claytron", "Gab"]]. Tied people share a rank and the next rank skips.
function ranked(entries) {
  const rows = [];
  entries.forEach((entry) => {
    const group = Array.isArray(entry) ? entry : [entry];
    const rank = rows.length + 1;
    group.forEach((name) => rows.push({ name, rank, tie: group.length > 1 }));
  });
  return rows;
}

// Combined ranking: average of Fifi's and Emu's ranks (lower is better).
function combine(fifi, emu) {
  const rankOf = (rows, name) => rows.find((r) => r.name === name).rank;
  const f = ranked(fifi), e = ranked(emu);
  const scored = PEOPLE
    .map((name) => ({ name, score: (rankOf(f, name) + rankOf(e, name)) / 2 }))
    .sort((a, b) => a.score - b.score);
  const groups = [];
  scored.forEach((p, i) => {
    if (i > 0 && p.score === scored[i - 1].score) groups[groups.length - 1].push(p.name);
    else groups.push([p.name]);
  });
  return groups.map((g) => (g.length > 1 ? g : g[0]));
}

function list(entries, className) {
  const ol = document.createElement("ol");
  ol.className = `ranking ${className}`;
  ranked(entries).forEach(({ name, rank, tie }) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="pos">${MEDALS[rank - 1] || `#${rank}`}</span><span class="name"></span>`;
    li.querySelector(".name").textContent = tie ? `${name} (tie)` : name;
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
  if (names.length) {
    div.append(h3, list(names, className));
  } else {
    const p = document.createElement("p");
    p.className = "pending";
    p.textContent = "Not ranked yet…";
    div.append(h3, p);
  }
  return div;
}

document.getElementById("cast").innerHTML = PEOPLE.map((p) => `<li>${p}</li>`).join("");

const main = document.getElementById("categories");
CATEGORIES.forEach((cat) => {
  const section = document.createElement("section");
  section.className = cat.mystery ? "card mystery" : "card";
  const h2 = document.createElement("h2");
  h2.textContent = `${cat.emoji} ${cat.title}`;
  const cols = document.createElement("div");
  cols.className = "cols";
  const done = (entries) => entries.flat().length === PEOPLE.length;
  cols.append(
    column("Fifi", cat.fifi, "fifi"),
    column("Emu", cat.emu, "emu"),
    done(cat.fifi) && done(cat.emu)
      ? column("Combined", combine(cat.fifi, cat.emu), "combined")
      : column("Combined", [], "combined"),
  );
  section.append(h2);
  const note = cat.mystery ? "What is this category about? You will never know. 🤫" : cat.note;
  if (note) {
    const p = document.createElement("p");
    p.className = "secret";
    p.textContent = note;
    section.append(p);
  }
  section.append(cols);
  main.appendChild(section);
});
