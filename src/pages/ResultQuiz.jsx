const ResultQuiz = () => {
  // You can pass quiz results through the state or context
  const results = {}; // Mock results data

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-red-100 flex flex-col">
      <main className="flex-grow container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>
        <div>
          <p>Your results are:</p>
          {/* Render results here */}
          {/* Example: results.map((result, index) => <div key={index}>{result}</div>) */}
        </div>
      </main>
    </div>
  );
};

export default ResultQuiz;
