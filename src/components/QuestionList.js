

import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete question. Status: ${response.status}`);
      }

      // Optimistic update - remove the question immediately
      setQuestions(prevQuestions => 
        prevQuestions.filter(question => question.id !== id)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
      setError(error.message);
      // You could add logic here to revert the optimistic update if needed
    }
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onDelete={handleDeleteQuestion}
            />
          ))
        ) : (
          <p>No questions found.</p>
        )}
      </ul>
    </section>
  );
}

export default QuestionList;