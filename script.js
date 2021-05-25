'use strict';

const QUESTIONS = [];

function standarize(txt) {
    return txt.toLowerCase()
        .replace("á", "a")
        .replace("é", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ú", "u");
}

const renderAnswers = (answers) => {
    const ul = document.createElement("ul");
    ul.classList.add("list-group");
    ul.classList.add("list-group-flush");

    answers.forEach(answer => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        if (answer.correct) li.classList.add("active");
        li.innerText = answer.text;
        ul.appendChild(li);
    });

    return ul;
};

const renderQuestionCard = (question) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("w-100");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = question.question;
    cardBody.appendChild(cardTitle);

    const ulQuestions = renderAnswers(question.answers);

    card.appendChild(cardBody);
    card.appendChild(ulQuestions);

    return card;
};

const renderQuestionAccordion = (question) => {
    const id = Math.floor(Math.random() * 1024);

    const item = document.createElement("div");
    item.classList.add("accordion-item");

    const header = document.createElement("h2");
    header.classList.add("accordion-header");

    const button = document.createElement("button");
    button.classList.add("accordion-button");
    button.classList.add("collapsed");
    button.type = "button";
    button.setAttribute("data-mdb-toggle", "collapse");
    button.setAttribute("data-mdb-target", "#question" + id);
    button.setAttribute("data-mdb-target", "#question" + id);
    button.innerText = question.question;
    header.appendChild(button);

    const collapse = document.createElement("div");
    collapse.classList.add("accordion-collapse");
    collapse.classList.add("collapse");
    collapse.id = "question" + id;

    const body = renderAnswers(question.answers);
    collapse.appendChild(body);

    item.appendChild(header);
    item.appendChild(collapse);

    return item;
};

function renderCard() {
    const container = document.getElementById("container");
    container.innerHTML = "";

    QUESTIONS.forEach(question => {
        const row = document.createElement("div");
        row.classList.add("row");
        row.classList.add("py-2");

        const col = document.createElement("div");
        col.classList.add("col-md");

        const card = renderQuestionCard(question);
        col.appendChild(card);
        row.appendChild(col);

        container.appendChild(row);
    });
};

function renderAccordion(txtValue) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("py-2");

    const col = document.createElement("div");
    col.classList.add("col-md");

    const accordion = document.createElement("div");
    accordion.classList.add("accordion");

    QUESTIONS.forEach(question => {
        let match = false;
        match = match || standarize(question.question).includes(txtValue);
        question.answers.forEach(answer => {
            match = match || standarize(answer.text).includes(txtValue);
        });

        if (match) {
            const accordionItem = renderQuestionAccordion(question);
            accordion.appendChild(accordionItem);
        }
    });


    col.appendChild(accordion);
    row.appendChild(col);

    container.appendChild(row);
}

function update() {
    const txtSearch = document.getElementById("txtSearch");
    const txtValue = txtSearch.value.toLowerCase();
    console.log(txtValue);

    if (txtValue.length === 0) renderCard();
    else renderAccordion(txtValue);
}

function getQuestions() {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(q => QUESTIONS.push(q));
            update();
        });
}

document.getElementById("txtSearch").addEventListener("input", update);
getQuestions();
