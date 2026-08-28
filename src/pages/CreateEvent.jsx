import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/api";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const payload = {
        title: formData.title,
        date: new Date(formData.date).toISOString(),
        location: formData.location,
        ...(formData.description.trim() && { description: formData.description }),
      };
      const event = await fetchAPI("/events", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      navigate(`/events/${event.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white border border-slate-200 rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Create Event</h2>

      {error && (
        <div className="alert alert-error text-sm mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Event title"
          value={formData.title}
          onChange={handleChange}
          required
          minLength={3}
          className="input input-bordered w-full bg-white text-black"
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="textarea textarea-bordered w-full bg-white text-black"
        />
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-white text-black"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-white text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}