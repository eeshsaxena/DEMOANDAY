import { useState, useEffect } from "react";

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/submissions")
      .then((res) => res.json())
      .then((data) => setSubmissions(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ name: "", email: "", message: "" });
    alert("Form Submitted!");
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Form Submission</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input className="border p-2 w-full" type="text" placeholder="Name" value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input className="border p-2 w-full" type="email" placeholder="Email" value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <textarea className="border p-2 w-full" placeholder="Message" value={formData.message} 
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">Submit</button>
      </form>
      <h2 className="mt-5 font-bold">Submissions:</h2>
      /* <ul>
        {submissions.map((s, i) => (
          <li key={i}>{s.name} - {s.email}: {s.message}</li>
        ))}
      </ul> */
    </div>
  );
}
