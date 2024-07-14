// Selecting elements from the DOM
const countspan = document.querySelector(".count span");
const bulletspancontainer = document.querySelector(".bullets .spans");
const quizarea = document.querySelector(".quiz_area");
const answerA = document.querySelector(".answer_area");
const submitbutton = document.querySelector(".submit_button");
const bullets = document.querySelector(".bullets");
const resultcont = document.querySelector(".results");
const countDown = document.querySelector(".countdown");

// Initialize variables
let currentindex = 0;
let rightAnswers = 0;
let countdowninterval;

async function getQuestions() {
    try {
        const response = await fetch("html_question.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const questions = await response.json();
        const qCount = questions.length;

        // Initialize quiz
        createBullets(qCount);
        setQuestionData(questions[currentindex], qCount);
        startCountdown(15, qCount);

        // Submit button click event
        submitbutton.addEventListener("click", () => handleSubmit(questions, qCount));
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

function createBullets(num) {
    countspan.textContent = num;
    for (let i = 0; i < num; i++) {
        const bullet = document.createElement("span");
        if (i === 0) bullet.classList.add("on");
        bulletspancontainer.appendChild(bullet);
    }
}

function setQuestionData(question, count) {
    if (currentindex >= count) return;

    const questionTitle = document.createElement("h2");
    questionTitle.textContent = question.title;
    quizarea.appendChild(questionTitle);

    for (let i = 1; i <= 4; i++) {
        const answerDiv = document.createElement("div");
        answerDiv.className = 'answer';

        const radioInput = document.createElement("input");
        radioInput.name = "question";
        radioInput.type = "radio";
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = question[`answer_${i}`];
        if (i === 1) radioInput.checked = true;

        const label = document.createElement("label");
        label.htmlFor = `answer_${i}`;
        label.textContent = question[`answer_${i}`];

        answerDiv.appendChild(radioInput);
        answerDiv.appendChild(label);
        answerA.appendChild(answerDiv);
    }
}

function handleSubmit(questions, qCount) {
    const rightAnswer = questions[currentindex].right_answer;

    currentindex++;
    checkAnswer(rightAnswer, qCount);
    quizarea.innerHTML = "";
    answerA.innerHTML = "";

    if (currentindex < qCount) {
        setQuestionData(questions[currentindex], qCount);
        updateBullets();
        clearInterval(countdowninterval);
        startCountdown(15, qCount);
    } else {
        showResults(qCount);
    }
}

function checkAnswer(rightAnswer, count) {
    const selectedAnswer = document.querySelector('input[name="question"]:checked').dataset.answer;
    if (selectedAnswer === rightAnswer) {
        rightAnswers++;
    }
}

function updateBullets() {
    const bullets = document.querySelectorAll(".bullets .spans span");
    bullets.forEach((bullet, index) => {
        bullet.classList.toggle("on", index === currentindex);
    });
}

function showResults(count) {
    if (currentindex === count) {
        quizarea.remove();
        answerA.remove();
        submitbutton.remove();
        bullets.remove();

        let resultMessage = "";
        if (rightAnswers > count / 2 && rightAnswers < count) {
            resultMessage = `<span class="good">Good</span>, ${rightAnswers} out of ${count}`;
        } else if (rightAnswers === count) {
            resultMessage = `<span class="perfect">Perfect</span>, all answers are correct!`;
        } else {
            resultMessage = `<span class="bad">Bad</span>, ${rightAnswers} out of ${count}`;
        }
        resultcont.innerHTML = resultMessage;
    }
}

function startCountdown(duration, count) {
    if (currentindex >= count) return;

    countdowninterval = setInterval(() => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        countDown.textContent = `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (--duration < 0) {
            clearInterval(countdowninterval);
            submitbutton.click();
        }
    }, 1000);
}

// Initialize the quiz
getQuestions();
