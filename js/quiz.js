navigator.clipboard.readText()
    .then(text => {
        document.getElementById('json').innerText = text;
    });

/**
 * @return {boolean}
 */
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

let quizObj = {};

document.getElementById('json-ok').addEventListener('click', function (event) {
    let jsonValue = document.getElementById('json').value;

    if (!IsJsonString(jsonValue)) {
        return alert('Broken JSON');
    }

    document.getElementById('json-box').style.display = 'none';

    quizObj = JSON.parse(jsonValue);

    if (quizObj.content.length < 1) {
        return alert('Broken JSON');
    }

    for (let contentKey in quizObj.content) {
        let newQBox = document.querySelector(".hidden-templates .question-box").cloneNode(true);
        newQBox.querySelector('.question > h2').innerText = quizObj.content[contentKey].question;
        newQBox.id = 'q' + contentKey;
        if (contentKey != 0) {
            newQBox.style.display = 'none';
        }

        for (let answerKey in quizObj.content[contentKey].answers) {
            let div = document.createElement('div');
            div.className = 'answer';
            div.innerText = quizObj.content[contentKey].answers[answerKey].answer;
            div.dataset.correct = quizObj.content[contentKey].answers[answerKey].correct;
            div.dataset.selected = "false";
            div.addEventListener('click', onAnswerClick);
            div.id = 'a' + answerKey;

            newQBox.querySelector('.answer-box').insertAdjacentElement('beforeend', div);
        }

        document.querySelector('.quiz').insertAdjacentElement('beforeend', newQBox);
    }
});

function onNextClick(input) {
    qBox = input.closest('.question-box');
    qBox.style.display = 'none';

    if (qBox.nextSibling) {
        qBox.nextSibling.style.display = '';
    } else {
        return result();
    }
}

function onAnswerClick(event) {
    if (event.target.dataset.selected === "false") {
        event.target.dataset.selected = "true";
        event.target.style.background = 'yellow';
    } else {
        event.target.dataset.selected = "false";
        event.target.style.background = '';
    }
}

function result() {
    document.getElementById('result-box').style.display = '';

    let qBox = document.querySelectorAll('.quiz .question-box');
    let result = [];

    for (let q=0; q < qBox.length; q++) {
        let aBox = qBox[q].querySelectorAll('.answer-box .answer');

        let stepResult = {
            question: quizObj.content[q].question,
            correct: true
        };

        for (let a=0; a < aBox.length; a++) {
            if (aBox[a].dataset.selected !== quizObj.content[q].answers[a].correct.toString()) {
                stepResult.correct = false;
                break;
            }
        }

        result.push(stepResult);
    }

    let correctCount = 0;

    for (let q of result) {
        let div = document.createElement('div');
        div.className = 'result-question';
        div.innerText = q.question;

        if (q.correct === true) {
            div.style.borderColor = 'green';
            correctCount++;
        }

        document.querySelector('.result-box').insertAdjacentElement('beforeend', div);
    }

    document.getElementById('result').innerText = correctCount + '/' + result.length;
    console.log(result);
}