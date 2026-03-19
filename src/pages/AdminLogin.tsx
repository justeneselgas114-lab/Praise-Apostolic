import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useEditMode } from '../contexts/EditModeContext';
import { apiCall } from '../lib/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginWithToken } = useEditMode();
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder auth: replace with real API call
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const data = await apiCall<{ access_token?: string; token?: string; accessToken?: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const token = data?.access_token || data?.token || data?.accessToken;
      if (!token) {
        throw new Error('Login failed (no token returned)');
      }

      if (remember) {
        try {
          localStorage.setItem('pap_admin_token', token);
        } catch {}
      }

      loginWithToken(token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      const message = err?.message || 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // This notice is shown so dev/test users know the default login credentials.
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-serif font-bold mb-4">Admin Login</h2>
          <p className="text-sm text-gray-600 mb-6">Sign in to manage site content.</p>
          {isDev && (
            <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
              Dev credentials (use in local/dev): <strong>admin@pap.local</strong> / <strong>papadmin123</strong>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-primary focus:border-transparent transition-all"
                placeholder="admin@example.com"
                type="email"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-pap-primary focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-pap-primary transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100"
                  tabIndex={-1}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div className="flex items-center justify-between gap-4 pt-2">
              <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-pap-primary focus:ring-pap-primary cursor-pointer"
                />
                <span className="text-gray-700 font-medium">Remember me</span>
              </label>
              <button
                type="submit"
                className="px-6 py-3 bg-pap-primary text-white rounded-xl font-semibold hover:bg-pap-primary/90 disabled:opacity-60 transition-all"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
