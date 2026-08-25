import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Base Scaffold Ready</h1>
        <p className="text-slate-600 mt-2">Team members can now branch off and build individual pages.</p>
      </main>
    </div>
  );
}