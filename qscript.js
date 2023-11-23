const quizData = [
  {
    question: 'What is the recommended daily intake of water for an average adult?',
    options: ['2 liters', '3 liters', '5 liters', '8 liters'],
    answer: '2 liters',
  },
  {
    question: 'Which nutrient is the bodys primary source of energy?',
    options: ['Protein', 'Carbohydrates', 'Fats', 'Vitamins'],
    answer: 'Carbohydrates',
  },
  {
    question: 'What is the importance of incorporating strength training into your fitness routine?',
    options: ['Improved flexibility', 'Enhanced cardiovascular health', 'Increased muscle mass and bone density', 'Stress reduction'],
    answer: 'Increased muscle mass and bone density',
  },
  {
    question: 'Which of the following foods is considered a good source of omega-3 fatty acids?',
    options: ['Olive oil', 'Salmon', 'Avocado', 'Chicken'],
    answer: 'Salmon',
  },
  {
    question: 'What is the key to maintaining a balanced diet?',
    options: [
      'Avoiding all carbohydrates',
      'Eating the same foods every day',
      'Consuming a variety of foods in moderation',
      'Skipping meals regularly',
    ],
    answer: 'Consuming a variety of foods in moderation',
  },
  {
    question: 'What is the recommended duration for a good nights sleep for adults?',
    options: ['4 hours', '6 hours', '8 hours', '10 hours'],
    answer: '8 hours',
  },
  {
    question: 'Which activity is effective for reducing stress and promoting mental well-being?',
    options: [
      'Watching TV for hours',
      'Meditation and deep breathing exercises',
      'Consuming caffeine',
      'Avoiding social interactions',
    ],
    answer: 'Meditation and deep breathing exercises',
  },
  {
    question: 'What is the primary function of antioxidants in the body?',
    options: [
	'Boosting energy levels',
	'Preventing oxidative stress and cell damage',
	'Promoting muscle growth',
	'Regulating blood sugar levels'],
    answer: 'Preventing oxidative stress and cell damage',
  },
  {
    question: 'What is the role of fiber in a healthy diet?',
    options: [
      'Providing quick energy',
      'Supporting digestion and preventing constipation',
      'Building muscle mass',
      'Regulating body temperature',
    ],
    answer: 'Supporting digestion and preventing constipation',
  },
  {
    question: 'How does social connection contribute to overall well-being?',
    options: [
	'Increases stress levels',
	'Promotes a sense of isolation', 
	'Negatively impacts mental health', 
	'Fosters a sense of community and support'],
    answer: 'Fosters a sense of community and support',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();