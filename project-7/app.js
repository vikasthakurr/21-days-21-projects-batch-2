//access of dom nodes

const form = document.getElementById("taskForm");
const titleIn = document.getElementById("title");
const notesIn = document.getElementById("notes");
const dueIn = document.getElementById("due");
const priorityIn = document.getElementById("priority");
const taskNode = document.getElementById("tasks");
const search = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");
const sortBy = document.getElementById("sortBy");
const countNode = document.getElementById("count");
const editingId = document.getElementById("editingId");
const notifyPermBtn = document.getElementById("notifyPermBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

const LS_KEY = "project-7-tasks";

let tasks = loadTasks();

function loadTasks() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.log("load error", e);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(LS_KEY, JSON.stringify(tasks));
  render();
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
}

function fmtDateISO(d) {
  try {
    const dt = new Date(d);
    if (isNaN(dt)) return "";
    return dt.toLocaleString();
  } catch (e) {
    return "";
  }
}

//crud operation

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleIn.value.trim();
  if (!title) return titleIn.focus();
  const notes = notesIn.value.trim();

  const due = dueIn.value
    ? new Date(dueIn.value + "T00:00:00").toISOString()
    : null;
  const priority = priorityIn.value;
  const editing = editingId.value;

  if (editing) {
    //update
    const t = tasks.find((x) => x.id === editing);
    if (t) {
      t.title = title;
      t.notes = notes;
      t.due = due;
      t.priority = priority;
      t.updatedAt = new Date().toISOString();
    }
    editingId.value = "";
    document.getElementById("saveBtn").textContent = "Add Task";
  } else {
    const newTask = {
      id: uid(),
      title,
      notes,
      due,
      priority,
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reminded: false,
    };
    tasks.unshift(newTask);
  }
  saveTasks();
  form.reset();
});

function editTask(id) {
  const t = tasks.find((x) => x.id === id);
  if (!t) return;

  titleIn.value = t.title;
  notesIn.value = t.notes || "";
  priorityIn.value = t.priority || "medium";

  if (t.due) {
    const dt = new Date(t.due);
    const pad = (n) => n.toString().padStart(2, "0");

    const local =
      dt.getFullYear() + "-" + pad(dt.getMonth() + 1) + "-" + pad(dt.getDate());
    dueIn.value = local;
  } else {
    dueIn.value = "";
  }
  editingId.value = id;
  document.getElementById("saveBtn").textContent = "Update Task";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleDone(id) {
  const t = tasks.find((x) => x.id === id);
  if (!t) return;
  t.done = !t.done;
  t.updatedAt = new Date().toISOString();
  saveTasks();
}

function removeTask(id) {
  if (!confirm("Are you sure?")) return;
  tasks = tasks.filter((x) => x.id !== id);
  saveTasks();
}
function clearAll() {
  if (!confirm("Are you sure?")) return;
  tasks = [];
  saveTasks();
}

clearAllBtn.addEventListener("click", clearAll);

//render function

function render() {
  const q = search.value.trim().toLowerCase();
  let out = tasks.slice();

  if (filterStatus.value === "active") out = out.filter((t) => !t.done);
  if (filterStatus.value === "completed") out = out.filter((t) => t.done);

  if (filterStatus.value === "due") {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    out = out.filter((t) => {
      t.due &&
        new Date(t.due).getTime() - now <= day &&
        new Date(t.due).getTime() > now;
    });
  }
  if (q) {
    out = out.filter((t) =>
      (t.title + "" + (t.notes || "").toLowerCase()).includes(q)
    );
  }
  // sort
  if (sortBy.value === "createdDesc")
    out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (sortBy.value === "createdAsc")
    out.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  if (sortBy.value === "dueAsc")
    out.sort(
      (a, b) =>
        (a.due ? new Date(a.due).getTime() : Infinity) -
        (b.due ? new Date(b.due).getTime() : Infinity)
    );
  if (sortBy.value === "priorityHigh") {
    const map = { high: 0, medium: 1, low: 2 };
    out.sort((a, b) => map[a.priority] - map[b.priority]);
  }

  //render
  taskNode.innerHTML = "";
  if (out.length === 0) {
    tasksNode.innerHTML =
      '<div class="small" style="opacity:0.7">No tasks yet — add one on the left.</div>';
  }
  out.forEach((t) => {
    const el = document.createElement("div");
    el.className = "task" + (t.done ? " completed" : "");
    const dueSoon =
      t.due &&
      new Date(t.due).getTime() - Date.now() <= 24 * 60 * 60 * 1000 &&
      new Date(t.due).getTime() > Date.now();
    el.innerHTML = `
          <div style="width:24px;flex:0 0 24px;margin-top:2px">
            <input type="checkbox" ${
              t.done ? "checked" : ""
            } aria-label="done" style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--accent);" />
          </div>
          <div class="left">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div class="title" style="font-size: 1.1rem;">${escapeHtml(
                  t.title
                )}</div>
                <div class="meta" style="margin-top: 4px;">${
                  t.notes
                    ? escapeHtml(t.notes)
                    : '<span style="opacity:0.5; font-style: italic;">No details added</span>'
                }</div>
              </div>
              <div class="actions">
                ${
                  t.priority
                    ? `<span class="chip" style="background: rgba(46, 204, 113, 0.1); border-color: rgba(46, 204, 113, 0.2);">${t.priority}</span>`
                    : ""
                }
                ${
                  t.due
                    ? `<span class="chip" title="Due"><i data-lucide="calendar" style="width: 12px; height: 12px; margin-right: 4px; vertical-align: middle;"></i>${fmtDateISO(
                        t.due
                      )}</span>`
                    : ""
                }
                ${
                  dueSoon
                    ? `<span class="chip" style="background:rgba(231, 76, 60, 0.1); border:1px solid rgba(231, 76, 60, 0.2); color: #e74c3c;"><i data-lucide="alert-circle" style="width: 12px; height: 12px; margin-right: 4px; vertical-align: middle;"></i>Due soon</span>`
                    : ""
                }
                <button class="btn ghost" data-action="edit" title="Edit" style="padding: 0.4rem 0.8rem;"><i data-lucide="edit-3" style="width: 14px; height: 14px;"></i></button>
                <button class="btn ghost" data-action="delete" title="Delete" style="padding: 0.4rem 0.8rem; color: var(--danger);"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
              </div>
            </div>
            <div class="small" style="margin-top: 8px; opacity: 0.6;">
              <i data-lucide="clock" style="width: 12px; height: 12px; margin-right: 4px; vertical-align: middle;"></i>Created: ${fmtDateISO(
                t.createdAt
              )}
            </div>
          </div>
        `;

    // wire actions
    const chk = el.querySelector("input[type=checkbox]");
    chk.addEventListener("change", () => toggleDone(t.id));
    el.querySelector("[data-action=edit]").addEventListener("click", () =>
      editTask(t.id)
    );
    el.querySelector("[data-action=delete]").addEventListener("click", () =>
      removeTask(t.id)
    );

    tasksNode.appendChild(el);
  });
  countNode.textContent = tasks.length;
  if (window.lucide) lucide.createIcons();
}
