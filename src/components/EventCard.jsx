import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  const formattedDate = event.date 
    ? new Date(event.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Date TBA';

  return (
    <Link 
      to={`/events/${event.id}`} 
      className="border border-slate-200 bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between"
    >
      <div>
        <h3 className="font-bold text-lg text-slate-800">{event.title}</h3>
        <p className="text-slate-500 text-sm mt-1">{event.location || 'Location TBA'}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
        <span>{formattedDate}</span>
        <span className="text-blue-600 font-semibold">View Details &rarr;</span>
      </div>
    </Link>
  );
}