document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.getElementById("note-form");
  const noteInput = document.getElementById("note-input");
  const notesList = document.getElementById("notes-list");
  let editMode = false;
  let editElement = null;

  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (editMode) {
      updateNote();
    } else {
      addNote();
    }
  });

  function addNote() {
    const noteText = noteInput.value;
    if (noteText === "") return;

    const li = document.createElement("li");

    const noteContent = document.createElement("div");
    noteContent.classList.add("note-content");

    const noteTextElement = document.createElement("span");
    noteTextElement.classList.add("note-text");
    noteTextElement.textContent = noteText;

    const noteButtons = document.createElement("div");
    noteButtons.classList.add("note-buttons");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      editMode = true;
      editElement = li;
      noteInput.value = noteText;
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      notesList.removeChild(li);
    });

    noteButtons.appendChild(editButton);
    noteButtons.appendChild(deleteButton);

    noteContent.appendChild(noteTextElement);
    noteContent.appendChild(noteButtons);

    const noteDate = document.createElement("div");
    noteDate.classList.add("note-date");
    noteDate.textContent = `Created on: ${new Date().toLocaleString()}`;

    li.appendChild(noteContent);
    li.appendChild(noteDate);
    notesList.appendChild(li);

    noteInput.value = "";
  }

  function updateNote() {
    if (editElement) {
      const noteTextElement = editElement.querySelector(".note-text");
      noteTextElement.textContent = noteInput.value;

      const noteDateElement = editElement.querySelector(".note-date");
      noteDateElement.textContent = `Updated on: ${new Date().toLocaleString()}`;

      editMode = false;
      editElement = null;
      noteInput.value = "";
    }
  }
});
