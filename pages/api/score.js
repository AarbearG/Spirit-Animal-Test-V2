import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { answers } = req.body;

    const questionsPath = path.join(process.cwd(), 'public', 'data', 'spirit_questions.json');
    const animalsPath = path.join(process.cwd(), 'public', 'data', 'final_animals.json');

    const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
    const animals = JSON.parse(fs.readFileSync(animalsPath, 'utf8'));

    const traitScores = {};

    answers.forEach((answerIndex, questionIndex) => {
      const answer = questions[questionIndex].answers[answerIndex];
      if (!answer) return;

      answer.primary_traits.forEach(trait => {
        traitScores[trait] = (traitScores[trait] || 0) + 2;
      });
      answer.secondary_traits.forEach(trait => {
        traitScores[trait] = (traitScores[trait] || 0) + 1;
      });
    });

    const animalScores = animals.map(animal => {
      let score = 0;
      animal.core_traits.forEach(trait => {
        score += (traitScores[trait] || 0) * 2;
      });
      animal.secondary_traits.forEach(trait => {
        score += (traitScores[trait] || 0);
      });
      return { name: animal.name, role: animal.role, embodiment: animal.embodiment, score };
    });

    animalScores.sort((a, b) => b.score - a.score);
    const topAnimal = animalScores[0];

    res.status(200).json({ topAnimal, allMatches: animalScores });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
