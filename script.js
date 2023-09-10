// Function to add a new note
function addNote() {
    const noteInput = document.getElementById("noteInput");
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a valid note.");
        return;
    }

    const noteList = document.getElementById("noteList");
    const listItem = document.createElement("li");

    const noteActions = document.createElement("span");
    noteActions.className = "note-actions";

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.innerHTML = "&#9998;"; // Edit icon
    editButton.addEventListener("click", function () {
        const newText = prompt("Edit the note:", noteText);
        if (newText !== null) {
            noteText = newText.trim();
            listItem.querySelector(".note-text").textContent = noteText;
            saveNotes();
        }
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerHTML = "&#10008;"; // Delete icon
    deleteButton.addEventListener("click", function () {
        noteList.removeChild(listItem);
        saveNotes();
    });

    const noteTextNode = document.createElement("span");
    noteTextNode.className = "note-text";
    noteTextNode.textContent = noteText;

    listItem.appendChild(noteActions);
    listItem.appendChild(noteTextNode);
    noteActions.appendChild(editButton);
    noteActions.appendChild(deleteButton);

    noteList.appendChild(listItem);
    noteInput.value = "";
    saveNotes();
}

// Load notes from local storage
function loadNotes() {
    const notes = localStorage.getItem("notes");
    if (notes) {
        const noteList = document.getElementById("noteList");
        noteList.innerHTML = notes;
    }
}

// Save notes to local storage
function saveNotes() {
    const noteList = document.getElementById("noteList");
    localStorage.setItem("notes", noteList.innerHTML);
}

// Add a click event listener to the "Add" button
document.getElementById("addNote").addEventListener("click", addNote);

// Add an event listener to allow adding notes by pressing Enter key
document.getElementById("noteInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});

// Load saved notes when the page loads
window.addEventListener("load", loadNotes);
