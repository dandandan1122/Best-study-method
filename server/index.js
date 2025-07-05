import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Example study methods
const studyMethods = [
  {
    type: 'Visual',
    description: 'You learn best with images, diagrams, and visual aids.'
  },
  {
    type: 'Auditory',
    description: 'You learn best by listening and speaking.'
  },
  {
    type: 'Reading/Writing',
    description: 'You learn best through reading and writing.'
  },
  {
    type: 'Kinesthetic',
    description: 'You learn best by doing and engaging in physical activities.'
  }
];

// Simple scoring algorithm
function determineStudyMethod(answers) {
  // answers: array of 30 numbers (0-3)
  // Each answer corresponds to a method: 0=Visual, 1=Auditory, 2=Reading/Writing, 3=Kinesthetic
  const scores = [0, 0, 0, 0];
  answers.forEach(a => {
    if (a >= 0 && a <= 3) scores[a]++;
  });
  const maxScore = Math.max(...scores);
  const bestIndex = scores.indexOf(maxScore);
  return studyMethods[bestIndex];
}

app.post('/api/quiz', (req, res) => {
  const { answers } = req.body;
  if (!Array.isArray(answers) || answers.length !== 30) {
    return res.status(400).json({ error: 'Invalid answers' });
  }
  const result = determineStudyMethod(answers);
  res.json(result);
});

app.get('/', (req, res) => {
  res.send('Best Study Method API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
