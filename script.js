// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Select various elements from the DOM
    const plusButton = document.querySelector(".plus");
    const pageBody = document.getElementById("pageBody");
    const writeNotesSection = document.getElementById("writeNotes");
    const userNotesHeading = document.getElementById("userNotesHeading");
    const userNotesBody = document.getElementById("userNotesBody");
    const saveNotesButton = document.getElementById("saveNotes");
    const clearNotesButton = document.getElementById("clearNotes");
    const pageFooter = document.querySelector(".page-footer");
    let count = 0; // Counter to keep track of the number of notes

    // Load existing notes from local storage and display them on the page
    function loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        savedNotes.forEach((note) => createNoteElement(note));
    }

    // Save a note to local storage
    function saveNoteToLocalStorage(note) {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        savedNotes.push(note);
        localStorage.setItem("notes", JSON.stringify(savedNotes));
    }

    // Create HTML elements for a note and append them to the page
    function createNoteElement(note) {
        const Notes = document.createElement("div");
        Notes.classList.add("notes");

        const headingElement = document.createElement("h2");
        headingElement.textContent = note.heading;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteNoteFromLocalStorage(note);
            Notes.remove();
        });

        Notes.appendChild(headingElement);
        Notes.appendChild(deleteButton);

        pageBody.appendChild(Notes);
    }

    // Delete a note from local storage
    function deleteNoteFromLocalStorage(note) {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = savedNotes.filter((n) => n !== note);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }

    // Event listener for the "+" button to show the note input section
    plusButton.addEventListener("click", function () {
        console.log("clicked");
        pageBody.style.display = "none";
        plusButton.innerHTML = "^";
        writeNotesSection.style.display = "block";
        saveNotesButton.style.display = "block";
    });

    // Event listener for the "Save Notes" button
    saveNotesButton.addEventListener("click", function () {
        console.log("A is clicked ");
        pageBody.style.display = "grid";
        writeNotesSection.style.display = "none";
        saveNotesButton.style.display = "none";

        // Check if the note count is within the limit
        if (count <= 8) {
            // Get values from the note input fields
            const headingValue = userNotesHeading.value.trim();
            const bodyValue = userNotesBody.value.trim();

            // Check if both heading and body have content
            if (headingValue !== "" && bodyValue !== "") {
                // Create a note object
                const note = { heading: headingValue, body: bodyValue };
                // Create the note element and display it on the page
                createNoteElement(note);
                // Save the note to local storage
                saveNoteToLocalStorage(note);

                // Reset textarea values
                userNotesHeading.value = "";
                userNotesBody.value = "";

                // Increment the note count
                count++;
            } else {
                alert("Enter your notes ");
            }
        } else {
            alert("Notes are full ");
        }
    });

    // Event listener for the "Clear Notes" button
    clearNotesButton.addEventListener("click", function () {
        // Clear all notes from local storage
        localStorage.removeItem("notes");

        // Remove all note elements from the page
        pageBody.innerHTML = "";

        // Reset the note count to 0
        count = 0;
    });

    // Load existing notes on page load
    loadNotes();
});
