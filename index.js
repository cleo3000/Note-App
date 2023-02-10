// creating an array to hold the notes
let notes = [
    {
        id: new Date(),
        title: 'Sample Note',
        body: 'This is a description for our sample note',
        bgColor: 'pink'
    }
]

// making a function to short cut creating elements, rather than writing it each time
const createElement = (tag, classes = []) => {
    const element = document.createElement(tag);
    classes.forEach(cl => {
        element.classList.add(cl);
    })
    return element;
}

// creating a function to make the notes
// creating all the elements using the above function
const createNoteView = (note) => {
    const noteDiv = createElement('div', ['note']);
    noteDiv.id = note.id;
    const textDiv = createElement('div', ['text']);
    textDiv.style.background = note.bgColor;
    const titleP = createElement('b', ['title']);
    titleP.innerHTML = note.title;
    const bodyP = createElement('p', ['body']);
    bodyP.innerHTML = note.body;
    const editButton = createElement('button', ['edit']);
    editButton.innerHTML = 'Edit Note';
    const deleteButton = createElement('button', ['delete']);
    deleteButton.innerHTML = 'Delete Note';

    // using append to structure the page
    textDiv.append(titleP)
    textDiv.append(bodyP)
    noteDiv.append(textDiv)
    noteDiv.append(editButton)
    noteDiv.append(deleteButton)

    // adding on clicks for the edit and delete buttons
    editButton.onclick = () => editNote(noteDiv);
    deleteButton.onclick = () => deleteNote(noteDiv);
    return noteDiv;
}

// cancel edit function
const cancelEdit = (noteDiv) => {
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = false;
    const bodyP = noteDiv.querySelector('p.body');
    bodyP.contentEditable = false;
    const editButton = noteDiv.querySelector('button.edit');
    editButton.innerHTML = 'Edit Note';
    const deleteButton = noteDiv.querySelector('button.delete');
    deleteButton.innerHTML = 'Delete Note';
    const note = notes.find(note => note.id == noteDiv.id);
    titleP.innerHTML = note.title;  // putting them to what they were before the edits
    bodyP.innerHTML = note.body;
    editButton.onclick = () => editNote(noteDiv);   // switiching back to normal edit / delete buttons
    deleteButton.onclick = () => deleteNote(noteDiv);
}

// edit note function
const editNote = (noteDiv, editSave = false) => {   // setting editSave to default false so it knows what to do with two onclicks for same button
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = true; // built in property
    titleP.focus(); // focus (built in js) allows immediate typing in inputs
    const bodyP = noteDiv.querySelector('p.body');
    bodyP.contentEditable = true;

    const editButton = noteDiv.querySelector('button.edit');
    editButton.innerHTML = 'Save Note';
    const deleteButton = noteDiv.querySelector('button.delete');
    deleteButton.innerHTML = 'Cancel Edit';
    deleteButton.onclick = () => cancelEdit(noteDiv);
    editButton.onclick = () => editNote(noteDiv, true);  // when true

    if (editSave) {
        const note = notes.find(note => note.id == noteDiv.id);
        note.title = titleP.innerText.trim();  // cutting off extra spaces added by user
        note.body = bodyP.innerText.trim();
        deleteButton.innerHTML = 'Delete Note';
        editButton.innerHTML = 'Edit Note';
        titleP.contentEditable = false;
        bodyP.contentEditable = false;
        editButton.onclick = () => editNote(noteDiv);
        deleteButton.onclick = () => deleteNote(noteDiv);
    }
}

// collecting user input and saving as a note
const saveNote = () => {
    const titleInput = document.querySelector('input#title');
    const bodyInput = document.querySelector('input#body'); // input# tells js that the id is an input field
    const bgColorInput = document.querySelector('select');
    const id = new Date().getTime(); // assign current time as the id
    const note = {
        id, title: titleInput.value, body: bodyInput.value, bgColor: bgColorInput.value
    }
    const noteDiv = createNoteView(note);
    notesDiv.prepend(noteDiv);

    // setting the inputs to empty so they clear after a note is submitted
    titleInput.value = '';
    bodyInput.value = '';
    bgColorInput.value = '';
}

// function to delete a note - show only valid ids
const deleteNote = (noteDiv) => {
    noteDiv.remove();  // where remove is a built in js function
    notes = notes.filter(note => note.id != noteDiv.id);
}

// adding the onclick call for saveNote to the add button
document.querySelector('button.add').onclick = () => saveNote();

// get the div wrapper
const notesDiv = document.querySelector('.notesDiv');
// setting up to view each note created below
notes.forEach(note => {
    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
})
