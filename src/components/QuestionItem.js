
import React, { useState } from "react";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  const [isDeleting, setIsDeleting] = useState(false);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDeleteClick = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      // Ensure onDelete exists and is a function
      if (typeof onDelete === 'function') {
        await onDelete(id);
      } else {
        console.error('onDelete is not a function');
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Question"}
      </button>
    </li>
  );
}

// Add default prop to prevent errors
QuestionItem.defaultProps = {
  onDelete: async () => {} // Default empty async function
};

export default QuestionItem;