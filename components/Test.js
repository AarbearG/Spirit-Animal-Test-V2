import { useState, useEffect } from 'react';
import Result from './Result';

export default function Test() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(75).fill(null));
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/data/spirit_questions.json')
      .then(res => res.json())
      .then(setQuestions);
  }, []);

  const handleAnswer = (answerIdx) => {
    const updated = [...answers];
    updated[current] = answerIdx;
    setAnswers(updated);
    if (current < 74) setCurrent(current + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const res = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    setResult(data.topAnimal);
    setSubmitting(false);
  };

  if (result) return <Result animal={result} />;
  if (questions.length === 0) return <p className="p-4 text-center">Loading questions...</p>;

  const q = questions[current];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Question {current + 1} of 75</h2>
      <p className="text-lg mb-6">{q.question}</p>
      <div className="space-y-4">
        {q.answers.map((ans, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="w-full text-left px-4 py-3 border rounded-lg hover:bg-indigo-50 transition"
          >
            {ans.text}
          </button>
        ))}
      </div>
      {current === 74 && (
        <button
          onClick={handleSubmit}
          disabled={answers.includes(null) || submitting}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'See My Spirit Animal'}
        </button>
      )}
    </div>
  );
}
