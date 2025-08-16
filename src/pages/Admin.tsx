import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'ACA-ADMIN-2025';

const Admin: React.FC = () => {
  const [authed, setAuthed] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('adminAuthed');
    if (saved === 'true') setAuthed(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === PASSCODE) {
      sessionStorage.setItem('adminAuthed', 'true');
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect passcode');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthed');
    setAuthed(false);
    setCode('');
  };

  const handleDownloadMaster = () => {
    try {
      const base64 = localStorage.getItem('applications_master_xlsx_base64');
      if (!base64) {
        alert('No applications found yet. Submit a form to generate the master file.');
        return;
      }
      const wb = XLSX.read(base64, { type: 'base64' });
      const fileName = `angels_academy_applications_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);
    } catch (e) {
      console.error('Failed to download master file', e);
      alert('Failed to download master file.');
    }
  };

  if (!authed) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Administrator</h1>
        <p className="text-sm text-gray-500 mb-6">For Admin Use</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Passcode</label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Admin passcode"
              required
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Access Admin</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">Administrator</h1>
          <p className="text-sm text-gray-500">For Admin Use</p>
        </div>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700 underline">Logout</button>
      </div>

      <p className="text-gray-600 mb-6">Download the latest consolidated applications Excel file.</p>
      <button onClick={handleDownloadMaster} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
        Download Master Excel
      </button>
    </div>
  );
};

export default Admin;
