export default function Step5Review({ data, onSubmit }) {
  return (
    <div className="p-4">
      <h2>Review Application</h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

      <button onClick={onSubmit}>
        Confirm & Submit
      </button>
    </div>
  );
}