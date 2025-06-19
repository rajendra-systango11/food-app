'use client'
export default function ErrorPage({ error, reset }) {
  return (
    <div className="error">
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}