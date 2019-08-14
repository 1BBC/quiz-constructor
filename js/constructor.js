document.querySelector(".question-box-bottom")
    .insertAdjacentHTML('beforebegin', document.querySelector(".add-templates .question").outerHTML);

document.getElementById('show-dialog').onclick = function() {
    showCover();

    function showCover() {
        let coverDiv = document.createElement('div');
        let json = document.getElementById('json');
        let btnOk = document.getElementById("json-ok");
        let btnCopy = document.getElementById("json-copy");
        let container = document.getElementById('json-block');

        container.style.display = "block";
        json.value = getJson();

        coverDiv.id = 'cover-div';
        document.body.style.overflowY = 'hidden';
        document.body.append(coverDiv);

        btnOk.onclick = function () {
            hideCover();
        };

        btnCopy.onclick = function () {
            navigator.clipboard.writeText(json.value)
                .then(() => {
                    alert('data copied to buffer');
                })
        };
    }

    function hideCover() {
        document.getElementById('cover-div').remove();
        document.body.style.overflowY = '';
        document.getElementById('json-block').style.display = "none";
    }
};

function getJson() {
    let qBox = document.getElementsByClassName('question-box')[0];
    let questions = qBox.getElementsByClassName('question');
    let obj = {};
    let allQuestionsObj = [];


    for (let q of questions) {
        let answers = q.querySelectorAll('.answer-box > .answer');
        let allAnswersObj = [];

        for (let a of answers) {
            let answerObj = {};
            answerObj.answer = a.querySelector('input[name="answer').value;

            let strCorrect = a.querySelector('.correct').dataset.correct
            answerObj.correct = (strCorrect === 'true');
            allAnswersObj.push(answerObj);
        }

        let questionObj = {};
        questionObj.answers = allAnswersObj;
        questionObj.question = q.querySelector('.question-top input[name="question"]').value;
        allQuestionsObj.push(questionObj);
    }

    obj.name = document.getElementById('test-name').value;
    obj.content = allQuestionsObj;

    return JSON.stringify(obj, ['name', 'content', 'question', 'answers', 'answer', 'correct'], 2);
}

document.querySelector(".question-box").onclick = function(event) {
    if (event.target.className === 'correct') {
        if(event.target.dataset.correct === "true") {
            event.target.dataset.correct = "false";
            event.target.style.background = "red";
        } else {
            event.target.dataset.correct = "true";
            event.target.style.background = "green";
        }
    }

    if (event.target.name === 'answer-add') {
        let answer = document.querySelector(".add-templates .question .answer");
        let answerCount = event.target.closest('.answer-box').querySelectorAll('.answer').length + 1;
        answer.querySelector('input[name="answer"]').setAttribute('value', 'answer' + answerCount);

        event.target.closest("div").insertAdjacentHTML('beforebegin', answer.outerHTML);
    }

    if (event.target.name === 'question-add') {
        let question = document.querySelector(".add-templates .question");
        let questionCount = document.querySelectorAll('.question-box .question').length + 1;
        question.querySelector('.question-top input[name="question"]')
            .setAttribute('value', 'question' + questionCount);

        event.target.closest("div").insertAdjacentHTML('beforebegin', question.outerHTML);
    }

    if (event.target.name === 'answer-del') {
        event.target.closest(".answer").remove();
    }

    if (event.target.name === 'question-del') {
        event.target.closest(".question").remove();
    }
};

function dragTargetDrag(draggableBtn) {
    draggableBtn.ondragstart = function() {
        return false;
    };

    let dragTarget = draggableBtn.classList.contains("drag-target") ? draggableBtn
        : draggableBtn.closest(".drag-target");
    let dragPlace = dragTarget.closest(".drag-place");

    dragTarget.style.width = dragTarget.clientWidth + "px";
    dragTarget.style.height = dragTarget.clientHeight + "px";

    let tempDiv = document.createElement('div');
    tempDiv.id = "tempDiv";
    tempDiv.style.height = dragTarget.offsetHeight + "px";
    dragTarget.insertAdjacentHTML('afterend', tempDiv.outerHTML);

    dragTarget.style.position = 'absolute';
    dragTarget.style.zIndex = "1000";
    let mousePosition = 0;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        if (event.pageY < dragPlace.getBoundingClientRect().top + pageYOffset
            || event.pageY > dragPlace.getBoundingClientRect().bottom + pageYOffset) {
            return;
        }

        let newTop = event.pageY - draggableBtn.offsetHeight/2;

        if (newTop < dragPlace.getBoundingClientRect().top + pageYOffset) {
            newTop = dragPlace.getBoundingClientRect().top + pageYOffset;
        }

        if (newTop > dragPlace.getBoundingClientRect().bottom + pageYOffset - dragTarget.offsetHeight) {
            newTop = dragPlace.getBoundingClientRect().bottom + pageYOffset - dragTarget.offsetHeight;
        }

        dragTarget.style.top = newTop + "px";

        dragTarget.style.visibility = "hidden";
        let elemBelow = document.elementFromPoint(dragTarget.getBoundingClientRect().left + pageXOffset, event.clientY);
        dragTarget.style.visibility = "visible";

        if (elemBelow != null && elemBelow.classList.contains('drag-target')) {
            if	(document.getElementById('tempDiv')) {
                document.getElementById('tempDiv').remove();
            }

            let insertPosition = (mousePosition > event.pageY) ? 'beforebegin' : 'afterend';
            elemBelow.insertAdjacentHTML(insertPosition, tempDiv.outerHTML);

            mousePosition = event.pageY;
        }
    }

    function onMouseUp(event) {
        dragTarget.style.width = "";
        dragTarget.style.height = "";
        dragTarget.style.position = "";
        dragTarget.style.zIndex = "";

        if (document.getElementById('tempDiv')) {
            document.getElementById('tempDiv').replaceWith(dragTarget);
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}