import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const currentUserId = token
    ? JSON.parse(atob(token.split('.')[1])).id
    : null;

  useEffect(() => {
    fetchAPI(`/events/${id}`)
      .then((data) => setEvent(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);
  
  const handleDelete = async () => {
    if (!window.confirm('Delete this event? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await fetchAPI(`/events/${id}`, { method: 'DELETE' });
      navigate('/');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center mt-12 text-slate-500">Loading details...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">{error}</p>;
  if (!event) return <p className="text-center mt-12 text-slate-500">Event not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <Link
        to="/"
        className="mb-4 inline-flex items-center rounded-full bg-linear-to-r from-blue-500 to-fuchsia-400 px-[1.035rem] py-[0.495rem] text-[0.72rem] font-bold tracking-[0.08em] text-white shadow-md transition hover:scale-[1.01] hover:shadow-lg"
      >
        ← Back to Events
      </Link>
      <h1 className="text-2xl font-bold text-slate-900">{event.title}</h1>
      <p className="text-slate-500 text-sm mt-1">
        {new Date(event.date).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        &bull; {event.location}
      </p>
      <div className="mt-6 text-slate-700 leading-relaxed border-t pt-4">
        {event.description}
      </div>
      {event.organizerId && (
        <p className="mt-4 text-xs text-slate-400">
          Organizer ID: {event.organizerId}
        </p>
      )}
      {event.organizerId === currentUserId && (
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn btn-error mt-6 w-full"
        >
          {deleting ? 'Deleting...' : 'Delete Event'}
        </button>
      )}
    </div>
  );
}