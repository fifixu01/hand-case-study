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
    if (rank === 1) li.className = "top";
    li.innerHTML = `<span class="pos">#${rank}</span><span class="name"></span>`;
    li.querySelector(".name").textContent = name;
    if (tie) li.insertAdjacentHTML("beforeend", `<span class="tie">tie</span>`);
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

const main = document.getElementById("categories");
CATEGORIES.forEach((cat) => {
  const section = document.createElement("section");
  section.className = cat.mystery ? "card mystery" : "card";
  const h2 = document.createElement("h2");
  h2.innerHTML = `<span class="sticker"></span><span></span>`;
  h2.children[0].textContent = cat.emoji;
  h2.children[1].textContent = cat.title;
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

// Subject files: a clipboard per person, with their combined rank in each finished category.
const boards = document.getElementById("subjects");
SUBJECTS.forEach((subject, i) => {
  const board = document.createElement("article");
  board.className = "clipboard";
  board.innerHTML = `
    <div class="clip"></div>
    <div class="sheet">
      <p class="file-no">Subject #${String(i + 1).padStart(3, "0")}</p>
      <h3 class="subject-name"></h3>
      <figure class="specimen">
        <img alt="">
        <figcaption></figcaption>
      </figure>
      <h4>Observations</h4>
      <ul class="observations"></ul>
      <h4>Results</h4>
      <ul class="results"></ul>
      <h4>Diagnosis</h4>
      <p class="diagnosis"></p>
      <div class="stamp">Analyzed</div>
    </div>`;
  board.querySelector(".subject-name").textContent = subject.name;
  board.querySelector("img").src = subject.photo;
  board.querySelector("img").alt = `${subject.name}'s hand`;
  board.querySelector("figcaption").textContent = `Specimen: ${subject.specimen}`;
  board.querySelector(".diagnosis").textContent = subject.diagnosis;
  subject.observations.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    board.querySelector(".observations").appendChild(li);
  });
  CATEGORIES.forEach((cat) => {
    const done = (entries) => entries.flat().length === PEOPLE.length;
    if (!done(cat.fifi) || !done(cat.emu)) return;
    const row = ranked(combine(cat.fifi, cat.emu)).find((r) => r.name === subject.name);
    if (!row) return;
    const li = document.createElement("li");
    li.innerHTML = `<span></span><strong></strong>`;
    li.children[0].textContent = cat.mystery ? "??? (classified)" : cat.title;
    li.children[1].textContent = `#${row.rank}${row.tie ? " (tie)" : ""}`;
    board.querySelector(".results").appendChild(li);
  });
  boards.appendChild(board);
});
