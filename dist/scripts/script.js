"use strict";
const noteBook = document.getElementById('noteBook');
const DltAll = document.getElementById('dltAll');
const CheckAll = document.getElementById('checkAll');
DltAll.addEventListener('click', () => dltAll());
let editClicked = false;
let editor;
if (localStorage.getItem('ids') === null) {
    localStorage.setItem('ids', '1');
}
for (let task in localStorage) {
    if (!isNaN(+task)) {
        const checkTask = document.createElement('div');
        checkTask.classList.add('task');
        checkTask.setAttribute('id', '' + task);
        noteBook.appendChild(checkTask);
        const check = document.createElement('input');
        check.setAttribute('type', 'checkBox');
        check.classList.add('checkBox');
        check.addEventListener('click', () => isChecked(checkTask));
        checkTask.appendChild(check);
        const line = document.createElement('h3');
        line.innerText = '' + localStorage.getItem(task);
        checkTask.appendChild(line);
        createEditButton(checkTask).addEventListener('click', () => onEdit(checkTask));
        createDltButton(checkTask).addEventListener('click', () => onDlt(checkTask));
    }
}
let input = createInput();
let enter = createButton();
enter.addEventListener('click', () => addTask(input, enter));
if (localStorage.length === 13) {
    input.remove();
    enter.remove();
}
//creates the add btn
function createButton() {
    const button = document.createElement('button');
    button.setAttribute('id', 'enter');
    button.innerText = '➕';
    noteBook.appendChild(button);
    return button;
}
//creates the input field
function createInput() {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'taskBox');
    input.setAttribute('placeholder', 'Enter Task');
    noteBook.appendChild(input);
    return input;
}
//creates the edit field
function createEditor() {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'editor');
    input.setAttribute('placeholder', 'Enter Task');
    noteBook.appendChild(input);
    return input;
}
//creates the dlt btn
function createDltButton(task) {
    const button = document.createElement('button');
    button.setAttribute('class', 'dlt');
    button.innerText = '❌';
    task.appendChild(button);
    return button;
}
//when dlt clicked
function onDlt(task) {
    if (!editClicked) {
        task.remove();
        localStorage.removeItem(task.id);
        console.log(localStorage);
        if (localStorage.length <= 12 && noteBook.querySelector('#taskBox') === null) {
            input = createInput();
            enter = createButton();
            enter.addEventListener('click', () => addTask(input, enter));
        }
    }
}
//creates the edit btn
function createEditButton(task) {
    const button = document.createElement('button');
    button.setAttribute('class', 'edit');
    button.innerText = '✏️';
    task.appendChild(button);
    return button;
}
//when edit clicked
function onEdit(task) {
    if (!editClicked) {
        editClicked = true;
        let text = '';
        if (typeof task.children[1].innerHTML === 'string') {
            text = task.children[1].innerHTML;
        }
        input.remove();
        enter.remove();
        task.children[1].innerHTML = '';
        editor = createEditor();
        editor.setAttribute('value', text);
        task.appendChild(editor);
    }
    else if (editClicked && task.children[1].innerHTML.length === 0) {
        if (!outOfLine(editor)) {
            const id = '' + task.getAttribute('id');
            localStorage.removeItem(id);
            localStorage.setItem(id, editor.value);
            editor.remove();
            editClicked = false;
            task.children[1].innerHTML = editor.value;
            if (localStorage.length < 11) {
                input = createInput();
                enter = createButton();
                enter.addEventListener('click', () => addTask(input, enter));
            }
        }
    }
}
//check the task
function isChecked(task) {
    task.classList.toggle('checked');
}
//when press on enter
function addTask(field, button) {
    if (!outOfLine(field) && localStorage.length <= 13) {
        const checkTask = document.createElement('div');
        checkTask.classList.add('task');
        checkTask.setAttribute('id', '' + localStorage.getItem('ids'));
        noteBook.appendChild(checkTask);
        const check = document.createElement('input');
        check.setAttribute('type', 'checkBox');
        check.classList.add('checkBox');
        check.addEventListener('click', () => isChecked(checkTask));
        checkTask.appendChild(check);
        const line = document.createElement('h3');
        line.innerText = field.value;
        checkTask.appendChild(line);
        input.remove();
        button.remove();
        createEditButton(checkTask).addEventListener('click', () => onEdit(checkTask));
        input = createInput();
        enter = createButton();
        enter.addEventListener('click', () => addTask(input, enter));
        localStorage.setItem((localStorage.ids).toString(), field.value.toString());
        localStorage.ids = (+('' + localStorage.getItem('ids')) + 1).toString();
        createDltButton(checkTask).addEventListener('click', () => onDlt(checkTask));
        if (localStorage.length === 13) {
            input.remove();
            enter.remove();
        }
    }
    location.reload();
}
//check for a valied input
function outOfLine(input) {
    if (input.value.split('').length > 42) {
        alert("What do you think that im an encyclopedia??\nim just a To-Do-List");
        input.value = '';
        return true;
    }
    else if (input.value.split('').length === 0) {
        alert("are you trying to mess with me?");
        return true;
    }
    else
        return false;
}
//delete all tasks
function dltAll() {
    var _a;
    for (let task in localStorage) {
        if (!isNaN(+task)) {
            (_a = noteBook.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
        }
    }
    localStorage.clear();
    location.reload();
}
