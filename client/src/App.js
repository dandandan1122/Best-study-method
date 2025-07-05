import React, { useState } from 'react';

const questions = [
  // 30 questions, each with 4 options corresponding to a study method
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
  0, 1, 2, 3, // 1-4
  0, 1, 2, 3, // 5-8
  0, 1, 2, 3, // 9-12
  0, 1, 2, 3, // 13-16
  0, 1, 2, 3, // 17-20
  0, 1, 2, 3, // 21-24
  0, 1, 2, 3, // 25-28
  0, 1 // 29-30
];

function App() {
  const [answers, setAnswers] = useState(Array(30).fill(null));
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (qIdx, value) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (answers.some(a => a === null)) {
      setError('Please answer all questions.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://best-study-method-server.onrender.com/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Error submitting quiz.');
    }
    setLoading(false);
  };

  if (result) {
    return (
      <div className="result">
        <h2>Your Best Study Method: {result.type}</h2>
        <p>{result.description}</p>
        <button onClick={() => { setResult(null); setAnswers(Array(30).fill(null)); }}>Retake Quiz</button>
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
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default App;
