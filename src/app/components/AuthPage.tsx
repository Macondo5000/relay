import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { Mail } from 'lucide-react';
import { RelayLogo } from './RelayLogo';

interface AuthPageProps {
  onAuthenticated: () => void;
}

type AuthView = 'signin' | 'signup';

export function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [view, setView] = useState<AuthView>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticated();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2.5">
          <RelayLogo size={32} />
          <span className="text-xl font-bold text-gray-900 tracking-tight">Relay</span>
        </div>
        <div className="flex items-center gap-3">
          {view === 'signup' ? (
            <>
              <span className="text-sm text-gray-400">Already have an account?</span>
              <button
                onClick={() => setView('signin')}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-400">Don't have an account?</span>
              <button
                onClick={() => setView('signup')}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {view === 'signup' ? (
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-[440px] px-6"
            >
              <div className="bg-white rounded-2xl border border-gray-200/70 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Create an Account</h1>

                <form onSubmit={handleContinue} className="space-y-5">
                  {/* Email */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>Email Address</span>
                    </div>
                    <input
                      type="email"
                      placeholder="Enter email address to start"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-300 bg-gray-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                  >
                    Continue
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 border-t border-gray-100" />
                  <span className="text-xs text-gray-300 font-medium">or</span>
                  <div className="flex-1 border-t border-gray-100" />
                </div>

                {/* SSO Buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={onAuthenticated}
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>

                  <button
                    type="button"
                    onClick={onAuthenticated}
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 21 21">
                      <rect x="0" y="0" width="10" height="10" fill="#F25022"/>
                      <rect x="11" y="0" width="10" height="10" fill="#7FBA00"/>
                      <rect x="0" y="11" width="10" height="10" fill="#00A4EF"/>
                      <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
                    </svg>
                    Continue with Microsoft
                  </button>
                </div>

                {/* Terms */}
                <p className="text-[11px] text-gray-400 mt-6 leading-relaxed">
                  By continuing, you agree to our <span className="underline cursor-pointer hover:text-gray-500">Terms of Service</span> and <span className="underline cursor-pointer hover:text-gray-500">Privacy Policy</span>.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signin"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-[440px] px-6"
            >
              <div className="bg-white rounded-2xl border border-gray-200/70 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Welcome Back</h1>

                <form onSubmit={handleContinue} className="space-y-5">
                  {/* Email */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>Email Address</span>
                    </div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-300 bg-gray-50/50"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Password</label>
                      <button type="button" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                        Forgot password?
                      </button>
                    </div>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-300 bg-gray-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                  >
                    Sign In
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 border-t border-gray-100" />
                  <span className="text-xs text-gray-300 font-medium">or</span>
                  <div className="flex-1 border-t border-gray-100" />
                </div>

                {/* SSO Buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={onAuthenticated}
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>

                  <button
                    type="button"
                    onClick={onAuthenticated}
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 21 21">
                      <rect x="0" y="0" width="10" height="10" fill="#F25022"/>
                      <rect x="11" y="0" width="10" height="10" fill="#7FBA00"/>
                      <rect x="0" y="11" width="10" height="10" fill="#00A4EF"/>
                      <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
                    </svg>
                    Continue with Microsoft
                  </button>
                </div>

                {/* Terms */}
                <p className="text-[11px] text-gray-400 mt-6 leading-relaxed">
                  By continuing, you agree to our <span className="underline cursor-pointer hover:text-gray-500">Terms of Service</span> and <span className="underline cursor-pointer hover:text-gray-500">Privacy Policy</span>.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
