import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../services/apiService'
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase'; // Adjust path

const handleLogout = async () => {
  await signOut(auth);
  localStorage.clear();
  window.location.href = '/';
};

const Questions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError('Please answer all questions before submitting.');
      return;
    }
    try {
      setIsSubmitting(true);
      const jsonData = JSON.stringify({ answers }, null, 2);
      const response = await apiService.submitAnswers({ answers });
      localStorage.setItem('quizResults', JSON.stringify(response));
      window.scrollTo(0, 0);
      navigate('/personality');
    } catch (error) {
      setError('Failed to submit answers');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await apiService.getQuestions();
        setQuestions(data); // Use exactly what the backend sends!
        setError(null);
      } catch (err) {
        setError('Failed to load questions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (id, value) => {
    setAnswers((prev) => {
      // Remove any previous answer for this id
      const filtered = prev.filter((item) => item.id !== id);
      return [
        ...filtered,
        { id, value: typeof value === "string" ? value : parseFloat(value) },
      ];
    });
  };
  

  

  return (
    <div className='w-[60%] mx-auto mt-[6rem] flex flex-col items-center '>
      {(loading || isSubmitting) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
      <h1 className='bungee-regular text-[4rem]'>The Path Within</h1>
      <p className='raleway text-neutral-400 text-2xl mb-[2rem]'>A 15-question odyssey to reveal your cultural soul and hidden strengths.</p>
      <div>
      {questions.map((q, idx) => {
        return q.type === "mcq" ? (
          <Card
            key={q.id + '-' + idx}
          id={q.id}
            question={`Q${idx + 1}. ${q.question}`}
          op1={q.options[0]}
          op2={q.options[1]}
          op3={q.options[2]}
          op4={q.options[3]}
          type={q.type}
          onAnswerSelect={handleAnswerSelect}
          />
        ) : (
          <Card key={q.id + '-' + idx} id={q.id} question={`Q${idx + 1}. ${q.question}`} type={q.type}  onAnswerSelect={handleAnswerSelect} />
        );
      })}
      </div>
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || loading}
        className="bg-blue-600 text-white w-[40%] outline-0 cursor-pointer raleway font-semibold text-xl mt-[4rem]   mb-[10rem] px-6 py-4 rounded-2xl hover:bg-blue-700 transition-all hover:scale-105 duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  )
}

export default Questions