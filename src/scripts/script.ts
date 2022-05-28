const noteBook = document.getElementById('noteBook') as HTMLElement;
let rowCounter: number = 1;
let editClicked: boolean = false;
let editor: HTMLInputElement;
let input: HTMLInputElement = createInput();
let enter: HTMLElement = createButton();
enter.addEventListener('click', () => addTask(input, enter));

//creates the add btn
function createButton(): HTMLElement {
    const button = document.createElement('button');
    button.setAttribute('id', 'enter');
    button.innerText = '➕';
    noteBook.appendChild(button);
    return button;
}
//creates the input field
function createInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'taskBox');
    input.setAttribute('placeholder', 'Enter Task');
    noteBook.appendChild(input);
    return input;
}
//creates the edit field
function createEditor(): HTMLInputElement {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'editor');
    input.setAttribute('placeholder', 'Enter Task');
    noteBook.appendChild(input);
    return input;
}
//creates the dlt btn
function createDltButton(task: HTMLElement): HTMLElement {
    const button = document.createElement('button');
    button.setAttribute('class', 'dlt');
    button.innerText = '❌';
    task.appendChild(button);
    return button;
}
//when dlt clicked
function onDlt(task: HTMLElement) {
    if (!editClicked) {
        task.remove();
        rowCounter--;
    }
    if(rowCounter<=12&&noteBook.querySelector('#taskBox')===null){
        input=createInput();
        enter = createButton();
        enter.addEventListener('click', () => addTask(input, enter));
    }
}
//creates the edit btn
function createEditButton(task: HTMLElement): HTMLElement {
    const button = document.createElement('button');
    button.setAttribute('class', 'edit');
    button.innerText = '✏️';
    task.appendChild(button);
    return button;
}
//when edit clicked
function onEdit(task: HTMLElement) {
    if (!editClicked) {
        editClicked = true;
        let text: string = '';
        if (typeof task.children[1].innerHTML === 'string') {
            text = task.children[1].innerHTML;
        }
        input.remove();
        enter.remove();
        task.children[1].innerHTML = '';
        editor = createEditor();
        editor.setAttribute('value', text);
        task.appendChild(editor);

    } else if (editClicked && task.children[1].innerHTML.length === 0) {
        if (!outOfLine(editor)) {
            editor.remove();
            editClicked = false;
            task.children[1].innerHTML = editor.value;
            input = createInput();
            enter = createButton();
            enter.addEventListener('click', () => addTask(input, enter));
        }
    }

}
function isChecked(task:HTMLElement){
    task.classList.toggle('checked');
}
//what happens when press on enter
function addTask(field: HTMLInputElement, button: HTMLElement) {
    if (!outOfLine(field) && rowCounter <= 12) {
        const checkTask = document.createElement('div');
        checkTask.classList.add('task');
        noteBook.appendChild(checkTask);
        const check = document.createElement('input');
        check.setAttribute('type', 'checkBox');
        check.classList.add('checkBox');
        check.addEventListener('click',()=>isChecked(checkTask));
        checkTask.appendChild(check);
        const line = document.createElement('h3');
        line.innerText = field.value;
        checkTask.appendChild(line);
        input.remove();
        button.remove();
        createEditButton(checkTask).addEventListener('click', () => onEdit(checkTask));
        createDltButton(checkTask).addEventListener('click', () => onDlt(checkTask));
        input = createInput();
        enter = createButton();
        enter.addEventListener('click', () => addTask(input, enter));
        if (rowCounter === 12) {
            input.remove();
            enter.remove(); 
        }
        rowCounter++;
    }
    else if (rowCounter >= 13) {
        alert("yes yes keep diggin' \ni already thought about it");
        field.value = '';
    }
}
//check for a valied input
function outOfLine(input: HTMLInputElement): boolean {
    if (input.value.split('').length > 42) {
        alert("What do you think that im an encyclopedia??\nim just a To-Do-List");
        input.value = '';
        return true;
    } else if (input.value.split('').length === 0) {
        alert("are you trying to mess with me?")
        return true;
    }
    else return false;
}