const body = document.querySelector(".body");
const add_cards = document.querySelector(".add-card");
const cards = document.querySelectorAll(".card");
const overlay_screen = document.querySelector(".overlay-screen");
const heading = overlay_screen.querySelector(".edit-heading");
const content = overlay_screen.querySelector(".edit-content");
const menu = overlay_screen.querySelector(".edit-menu");
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const colors = ["bg-white", "bg-lime-500", "bg-cyan-200", "bg-violet-300", "bg-rose-300", "bg-amber-200"];

// SHOWNOTES
function shownotes() {
    document.querySelectorAll(".card").forEach(c => c.remove());
    notes.forEach((note, index) => {
        if (note.note_display) {
            let to_insert = `<div class="card ${colors[note.note_color_index]}" id="${index}" onclick="show_overlay_screen_update_the_card(${index})">
            <h1 class="heading">${note.note_heading}</h1>
            <p class="content">${note.note_content}</p>
            <span class="date">${note.note_date}</span>
            </div>`
            add_cards.insertAdjacentHTML("afterend", to_insert);
        }
    });
};
shownotes();

// HIDE_OVERLAY_SCREEN
function hide_overlay_screen() {
    overlay_screen.classList.remove("flex", "flex-col", "sm:flex-row");
    overlay_screen.classList.add("hidden");
}

// DONE
function done(index) {
    // e.preventDefault();
    let task = index == -1 ? "add" : "update";
    if (task == "add") {
        let heading_value = heading.value;
        let content_value = content.value;
        let color_index = overlay_screen.querySelector(".color-index").value;
        if (heading_value || content_value) {
            let date = new Date();
            let date_value = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
            let note_value = {
                note_heading: heading_value,
                note_content: content_value,
                note_date: date_value,
                note_color_index: color_index,
                note_display: true
            };
            console.log(notes);
            notes.push(note_value);
            localStorage.setItem("notes", JSON.stringify(notes));
            console.log(notes);
            hide_overlay_screen();
            shownotes();
        }
    }
    if (task == "update") {
        notes.splice(index, 1);
        let heading_value = heading.value;
        let content_value = content.value;
        let color_index = overlay_screen.querySelector(".color-index").value;
        if (heading_value || content_value) {
            let date = new Date();
            let date_value = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
            let note_value = {
                note_heading: heading_value,
                note_content: content_value,
                note_date: date_value,
                note_color_index: color_index,
                note_display: true
            };
            notes.push(note_value);
            localStorage.setItem("notes", JSON.stringify(notes));
            hide_overlay_screen();
            shownotes();
        }
    }
}

// DELETE
function remove(index) {
    let task = index == -1 ? "hide" : "remove";
    if (task == "hide") {
        hide_overlay_screen();
    }
    if (task == "remove") {
        let confirmation = confirm("The deleted data will be lost forever. Are you Sure?");
        if (!confirmation) return;
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        hide_overlay_screen();
        shownotes();
    }
}

// SHOW_OVERLAY_SCREEN_ADD_A_CARD
function show_overlay_screen_add_a_card() {

    let prev_color_index = overlay_screen.querySelector(".color-index").value;
    let prev_color = colors[prev_color_index];
    let new_color_index = 0;
    let new_color = colors[new_color_index];
    overlay_screen.querySelector(".edit-text").classList.replace(prev_color, new_color);
    overlay_screen.querySelector(".color-index").value = 0;


    heading.value = "";
    content.value = "";
    let done_index = -1;
    let remove_index = -1;
    menu.innerHTML = `
        <img class="icon option" src="./images/done.svg" alt="" onclick=done(${done_index})>
        <img class="icon option" src="./images/delete.svg" alt="" onclick=remove(${remove_index})>
        <img class="icon option" src="./images/close.svg" alt="" onclick=hide_overlay_screen()>
    `
    console.log(menu.innerHTML);
    overlay_screen.classList.remove("hidden");
    overlay_screen.classList.add("flex", "flex-col", "sm:flex-row");
}

// EVENT LISTENER FOR ADD_A_CARD
add_cards.addEventListener("click", () => {
    show_overlay_screen_add_a_card();
});

// SHOW_OVERLAY_SCREEN_UPDATE_THE_CARD
function show_overlay_screen_update_the_card(index) {


    let prev_color_index = overlay_screen.querySelector(".color-index").value;
    let prev_color = colors[prev_color_index];
    let new_color_index = notes[index].note_color_index;
    let new_color = colors[new_color_index];
    overlay_screen.querySelector(".edit-text").classList.replace(prev_color, new_color);
    overlay_screen.querySelector(".color-index").value = new_color_index;


    console.log(menu.innerHTML);
    let note = notes[index];
    heading.value = note.note_heading;
    content.value = note.note_content;
    let done_index = index;
    let remove_index = index;
    menu.innerHTML = `
        <img class="icon option" src="./images/done.svg" alt="" onclick=done(${done_index})>
        <img class="icon option" src="./images/delete.svg" alt="" onclick=remove(${remove_index})>
        <img class="icon option" src="./images/close.svg" alt="" onclick=hide_overlay_screen()>
    `
    overlay_screen.classList.remove("hidden");
    overlay_screen.classList.add("flex", "flex-col", "sm:flex-row");
}

// EVENT LISTENERS FOR EACH CARD
cards.forEach(c => c.addEventListener("click", () => {
    show_overlay_screen_update_the_card(index);
}))

// SEARCH
function search() {
    restore_color_filter();
    let key = document.querySelector(".edit-search").value.split(" ").join("").toUpperCase();
    notes.forEach(note => {
        let field = ((note.note_heading + note.note_content + note.note_date).toUpperCase().split(" ").join(""));
        if (field.indexOf(key) < 0) {
            note.note_display = false;
        }
    })
    shownotes();
    notes.forEach(note => {
        note.note_display = true;
    })
}

// UPDATE COLOR
function update_color(i) {
    let prev_color_index = overlay_screen.querySelector(".color-index").value;
    let prev_color = colors[prev_color_index];
    let new_index = i;
    let new_color = colors[new_index];
    console.log("called");
    overlay_screen.querySelector(".edit-text").classList.replace(prev_color, new_color);
    overlay_screen.querySelector(".color-index").value = new_index;
}

// FILTER
function filter(i) {
    restore_edit_search();
    if (document.querySelectorAll(".color-filter")[i].classList.contains("selected")) {
        console.log("contains");
        document.querySelectorAll(".color-filter")[i].classList.remove("selected");
        restore_edit_search();
    }
    else {
        console.log("does_note_contain");
        document.querySelectorAll(".color-filter").forEach(cf => {
            if(cf.classList.contains("selected")){
                cf.classList.remove("selected");
            }
        })
        document.querySelectorAll(".color-filter")[i].classList.add("selected");
        notes.forEach(note => {
            if (note.note_color_index != i) {
                note.note_display = false;
            }
        })
        shownotes();
        notes.forEach(note => {
            note.note_display = true;
        })
    }
}

// RESTORE
function restore_color_filter() {
    document.querySelectorAll(".color-filter").forEach(cf => {
        if(cf.classList.contains("selected")){
            cf.classList.remove("selected");
        }
    })
    shownotes();
}

// RESTORE
function restore_edit_search() {
    console.log("restore");
    document.querySelector(".edit-search").value = "";
    notes.forEach(note => {
        note.note_display = true;
    })
    shownotes();
}