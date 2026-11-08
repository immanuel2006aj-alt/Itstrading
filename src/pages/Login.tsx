import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr(error.message);
  };

  return (
    <div className="flex items-center justify-center h-full p-6">
      <form onSubmit={submit} className="w-full max-w-sm p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <h1 className="text-2xl font-black mb-1">🐱 Shadow Signals</h1>
        <p className="text-sm text-gray-400 mb-6">Private dashboard</p>

        <label className="block text-xs text-gray-400 mb-1">Email</label>
        <input
          type="email" required value={email} onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-950 border border-gray-800 focus:border-emerald-500 outline-none"
        />

        <label className="block text-xs text-gray-400 mb-1">Password</label>
        <input
          type="password" required value={password} onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-950 border border-gray-800 focus:border-emerald-500 outline-none"
        />

        {err && <p className="text-sm text-red-400 mb-3">{err}</p>}

        <button
          disabled={busy}
          className="w-full p-2 rounded bg-emerald-500 text-black font-bold hover:bg-emerald-400 disabled:opacity-50"
        >
          {busy ? 'Logging in…' : 'LOG IN'}
        </button>
      </form>
    </div>
  );
}
