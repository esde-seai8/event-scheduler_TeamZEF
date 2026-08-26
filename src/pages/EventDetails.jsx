import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAPI(`/api/events/${id}`)
      .then((data) => setEvent(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-12 text-slate-500">Loading details...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">{error}</p>;
  if (!event) return <p className="text-center mt-12 text-slate-500">Event not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <Link to="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Events</Link>
      <h1 className="text-2xl font-bold text-slate-900">{event.title}</h1>
      <p className="text-slate-500 text-sm mt-1">
        {new Date(event.date).toLocaleDateString(undefined, { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })} &bull; {event.location}
      </p>
      <div className="mt-6 text-slate-700 leading-relaxed border-t pt-4">
        {event.description}
      </div>
      {event.organizerId && (
        <p className="mt-4 text-xs text-slate-400">Organizer ID: {event.organizerId}</p>
      )}
    </div>
  );
}