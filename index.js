var quiz = {
  data: [
    {
      q: "What is fullform of HTML?",
      o: ["HighText Machine Language", "HyperText Markup Language", "HyperText and links Markup Language", "None of these"],
      a: 1,
    },
    {
      q: "HTML is a subset of ______",
      o: ["SGMD", "SGMH", "XHTML", "SGML"],
      a: 3,
    },
    {
      q: "An HTML program is saved by using the ____ extension.",
      o: [".ht", ".hml", ".html", "None of these"],
      a: 2,
    },
    {
      q: "Who is the father of HTML?",
      o: ["Tim Berners-Lee", "Rasmus Lerdorf", "Brendan Eich", "Sergey Brin"],
      a: 0,
    },
    {
      q: "Which of the following is used to read an HTML page and render it?",
      o: ["Web server", "Web network", "Web matrix", "Web browser"],
      a: 3,
    },
  ],
  hWrap: null,
  hQn: null, 
  hAns: null,
  now: 0, 
  score: 0,
  init: () => {
    quiz.hWrap = document.getElementById("quizWrap");
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);
    quiz.draw();
  },
  draw: () => {
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => {
        quiz.select(label);
      });
      quiz.hAns.appendChild(label);
    }
  },
  select: (option) => {
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },
  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  },
};
window.addEventListener("load", quiz.init);
