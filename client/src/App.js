import React, { useState } from 'react';
import './App.css';

const studyTypes = ['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'];

const studyDescriptions = {
  Visual: 'You learn best through seeing. Use diagrams, charts, and color-coded notes.',
  Auditory: 'You learn best through listening. Try lectures, discussions, and audiobooks.',
  'Reading/Writing': 'You learn best through reading and writing. Use lists, notes, and written explanations.',
  Kinesthetic: 'You learn best through doing. Use hands-on activities, experiments, and movement.'
};

const questions = [
  { q: 'I remember information best when I see it written down or in diagrams.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I prefer listening to lectures over reading textbooks.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I like to take notes and rewrite information to learn.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I learn best when I can move around or use my hands.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I use colors, charts, or maps to help me study.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I remember things I hear better than things I read.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I like to read and write to understand new topics.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I learn by doing activities or experiments.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I visualize information in my mind.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I remember conversations more than written notes.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I write summaries to help me remember.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I use gestures or role-play to learn.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I prefer pictures and diagrams over words.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I like to discuss topics with others.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I make lists to organize my thoughts.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I learn best when I can touch or manipulate objects.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I use mind maps or visual organizers.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I remember jokes or stories told aloud.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I keep a journal or write reflections.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I learn by building or creating things.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I prefer watching videos to reading.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I remember what people say.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I like to write essays or reports.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I learn by acting things out.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I use symbols or drawings in my notes.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I prefer group discussions.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I make outlines before writing.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I learn by assembling or fixing things.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I use flashcards with images.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] },
  { q: 'I remember instructions better when spoken.', options: ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'] }
];

const studyMethodMap = [
  0, 1, 2, 3, 0, 1, 2, 3,
  0, 1, 2, 3, 0, 1, 2, 3,
  0, 1, 2, 3, 0, 1, 2, 3,
  0, 1, 2, 3, 0, 1
];

function App() {
  const [answers, setAnswers] = useState(Array(30).fill(null));
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = (qIdx, value) => {
    const newAnswers = [...answers];
    newAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (answers.some(a => a === null)) {
      setError('Please answer all questions.');
      return;
    }

    const scores = [0, 0, 0, 0];
    answers.forEach((answer, idx) => {
      const methodIdx = studyMethodMap[idx];
      scores[methodIdx] += parseInt(answer);
    });

    const maxScore = Math.max(...scores);
    const bestMethodIdx = scores.indexOf(maxScore);
    const bestMethod = studyTypes[bestMethodIdx];

    setResult({
      type: bestMethod,
      description: studyDescriptions[bestMethod]
    });
  };

  const getStudyTips = (type) => {
    const tips = {
      Visual: [
        'Use mind maps, charts, and diagrams to organize information.',
        'Color-code your notes to highlight key concepts.',
        'Watch videos or animations to reinforce learning.',
        'Use flashcards with images or symbols.'
      ],
      Auditory: [
        'Record lectures or yourself reading notes aloud.',
        'Join study groups or explain topics to others.',
        'Use rhymes, songs, or mnemonics to remember facts.',
        'Listen to educational podcasts or audiobooks.'
      ],
      'Reading/Writing': [
        'Rewrite notes in your own words.',
        'Use bullet points, outlines, and headings.',
        'Read textbooks and highlight key sections.',
        'Practice with written quizzes or summaries.'
      ],
      Kinesthetic: [
        'Use hands-on activities like building models or doing experiments.',
        'Act out scenarios or use gestures while studying.',
        'Take frequent breaks and move around while learning.',
        'Use physical flashcards or interactive tools.'
      ]
    };
    return tips[type] || [];
  };

  if (result) {
    return (
      <div className="result">
        <h2>Your Best Study Method: {result.type}</h2>
        <p>{result.description}</p>

        {!showDetails && (
          <button onClick={() => setShowDetails(true)}>Learn More</button>
        )}

        {showDetails && (
          <div className="study-tips">
            <h3>Study Tips for {result.type} Learners:</h3>
            <ul>
              {getStudyTips(result.type).map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={() => {
          setResult(null);
          setAnswers(Array(30).fill(null));
          setShowDetails(false);
        }}>
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Best Study Method Quiz</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q, idx) => (
          <div key={idx} className="question-block">
            <p>{idx + 1}. {q.q}</p>
            {q.options.map((opt, oIdx) => (
              <label key={oIdx}>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={oIdx}
                  checked={answers[idx] === oIdx}
                  onChange={() => handleChange(idx, oIdx)}
                  required
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
