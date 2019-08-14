# quiz-constructor
Js online quizzes and tests constructor. Simple and clear constructor for the site. Create a quiz on one page. 
answers and questions are reorder with the mouse (drag & drop). Unlimited questions and options. The output format is JSON, it can be obtained at any time by clicking the button in the upper right corner of the form
The result of the program can be viewed on the quiz.html page, by first inserting JSON-data into the form.

## constructor.html
### Quiz form
![alt text](http://drive.google.com/uc?export=view&id=1T2FmUWbcpc83QlbxRl-ZN33uselXO9Dz)
### Output data of constructor.html (JSON)
```json
{
  "name": "C++ Mock Test",
  "content": [
    {
      "question": "Abstract class is... ?",
      "answers": [
        {
          "answer": "A class must contain all pure virtual functions",
          "correct": false
        },
        {
          "answer": "A class must contain at least one pure virtual function",
          "correct": true
        },
        {
          "answer": "A class may not contain pure virtual function.",
          "correct": false
        },
        {
          "answer": "A class must contain pure virtual function defined outside the class.",
          "correct": false
        }
      ]
    },
    {
      "question": "The default access specifer for the class members is... ?",
      "answers": [
        {
          "answer": "public",
          "correct": false
        },
        {
          "answer": "private",
          "correct": true
        }
      ]
    }
  ]
}
```
### quiz.html (quiz page)
![alt text](http://drive.google.com/uc?export=view&id=1wQPmiAudaCKGcp1lWv0-bgYVafnb78_T)

