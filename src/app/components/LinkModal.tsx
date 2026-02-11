import React, { useState, useEffect, useCallback } from 'react';
import { X, Key, ArrowLeftRight, Info, ExternalLink, Loader2, Check, Globe } from 'lucide-react';
import clsx from 'clsx';
import { RelayLogo } from './RelayLogo';
import type { AppItem } from './LinkedToolsList';

// ── App icon renderer ─────────────────────────────────────────
function AppIcon({ app, size = 48 }: { app: AppItem; size?: number }) {
  const inner = size * 0.7;
  const radius = size * 0.22;
  const innerR = inner * 0.22;
  return (
    <div
      className="flex items-center justify-center bg-white border border-gray-100"
      style={{ width: size, height: size, borderRadius: radius }}
    >
      <div
        className="flex items-center justify-center"
        style={{ width: inner, height: inner, borderRadius: innerR, backgroundColor: app.iconBg }}
      >
        <span className="font-bold leading-none" style={{ color: app.iconColor, fontSize: inner * 0.32 }}>
          {app.iconLabel}
        </span>
      </div>
    </div>
  );
}

// ── Per-app API-key config ────────────────────────────────────
interface ApiKeyConfig {
  label: string;
  placeholder: string;
  helpUrl: string;
  helpSteps: string[];
  helpNote?: string;
}

const API_KEY_CONFIGS: Record<string, ApiKeyConfig> = {
  chatgpt: {
    label: 'Your OpenAI API Key:',
    placeholder: 'Enter the API key',
    helpUrl: 'platform.openai.com/api-keys',
    helpSteps: [
      'Go to platform.openai.com/api-keys',
      'Click "Create new secret key"',
      'Copy your key and paste it here',
    ],
    helpNote: 'API access requires credits. Free OpenAI accounts are not supported.',
  },
  claude: {
    label: 'Your Anthropic API Key:',
    placeholder: 'Enter the API key',
    helpUrl: 'console.anthropic.com/settings/keys',
    helpSteps: [
      'Go to console.anthropic.com/settings/keys',
      'Click "Create Key"',
      'Copy your key and paste it here',
    ],
    helpNote: 'API access requires an Anthropic account with billing enabled.',
  },
  'tanka-ai': {
    label: 'Your Tanka API Key:',
    placeholder: 'Enter the API key',
    helpUrl: 'app.tanka.ai/settings/api',
    helpSteps: [
      'Go to app.tanka.ai/settings/api',
      'Click "Generate API Key"',
      'Copy your key and paste it here',
    ],
  },
};

const DEFAULT_API_CONFIG: ApiKeyConfig = {
  label: 'Your API Key:',
  placeholder: 'Enter the API key',
  helpUrl: '',
  helpSteps: ['Visit the app developer settings', 'Generate a new API key', 'Copy and paste it here'],
};

// ── Per-app OAuth config ──────────────────────────────────────
interface OAuthConfig {
  providerName: string;
  loginLabel: string;
  socialOptions?: string[];
}

const OAUTH_CONFIGS: Record<string, OAuthConfig> = {
  linear:     { providerName: 'Linear',            loginLabel: 'Work Email',   socialOptions: ['Google', 'SAML SSO'] },
  slack:      { providerName: 'Slack',             loginLabel: 'Work Email',   socialOptions: ['Google', 'Apple'] },
  figma:      { providerName: 'Figma',             loginLabel: 'Email',        socialOptions: ['Google'] },
  jira:       { providerName: 'Atlassian',         loginLabel: 'Email',        socialOptions: ['Google', 'Microsoft', 'Apple'] },
  confluence: { providerName: 'Atlassian',         loginLabel: 'Email',        socialOptions: ['Google', 'Microsoft', 'Apple'] },
  github:     { providerName: 'GitHub',            loginLabel: 'Username or email', socialOptions: [] },
  zoom:       { providerName: 'Zoom',              loginLabel: 'Email',        socialOptions: ['Google', 'Apple', 'SSO'] },
  notion:     { providerName: 'Notion',            loginLabel: 'Email',        socialOptions: ['Google', 'Apple'] },
  asana:      { providerName: 'Asana',             loginLabel: 'Email',        socialOptions: ['Google'] },
  trello:     { providerName: 'Trello',            loginLabel: 'Email',        socialOptions: ['Google', 'Microsoft', 'Apple'] },
  hubspot:    { providerName: 'HubSpot',           loginLabel: 'Email',        socialOptions: ['Google'] },
  salesforce: { providerName: 'Salesforce',        loginLabel: 'Username',     socialOptions: [] },
  intercom:   { providerName: 'Intercom',          loginLabel: 'Work Email',   socialOptions: ['Google'] },
  monday:     { providerName: 'monday.com',        loginLabel: 'Email',        socialOptions: ['Google'] },
  clickup:    { providerName: 'ClickUp',           loginLabel: 'Email',        socialOptions: ['Google', 'SSO'] },
  discord:    { providerName: 'Discord',           loginLabel: 'Email',        socialOptions: [] },
  dropbox:    { providerName: 'Dropbox',           loginLabel: 'Email',        socialOptions: ['Google', 'Apple'] },
  miro:       { providerName: 'Miro',              loginLabel: 'Work Email',   socialOptions: ['Google', 'Microsoft'] },
  loom:       { providerName: 'Loom',              loginLabel: 'Email',        socialOptions: ['Google', 'Slack', 'Apple', 'SSO'] },
};

const DEFAULT_OAUTH_CONFIG: OAuthConfig = {
  providerName: '',
  loginLabel: 'Email',
  socialOptions: ['Google'],
};

// ── Props ─────────────────────────────────────────────────────
interface LinkModalProps {
  app: AppItem;
  onClose: () => void;
  onLinked: (id: string) => void;
}

// ═══════════════════════════════════════════════════════════════
// Modal component
// ═══════════════════════════════════════════════════════════════
export function LinkModal({ app, onClose, onLinked }: LinkModalProps) {
  if (app.authType === 'api-key') {
    return <ApiKeyModal app={app} onClose={onClose} onLinked={onLinked} />;
  }
  return <OAuthModal app={app} onClose={onClose} onLinked={onLinked} />;
}

// ═══════════════════════════════════════════════════════════════
// API Key Modal
// ════════════════════════════════════════��══════════════════════
function ApiKeyModal({ app, onClose, onLinked }: LinkModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const config = API_KEY_CONFIGS[app.id] || DEFAULT_API_CONFIG;
  const canSubmit = apiKey.trim().length > 0;

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLinked(app.id);
    }, 1200);
  }, [canSubmit, app.id, onLinked]);

  return (
    <ModalWrapper onClose={onClose}>
      <div className="link-modal-content flex flex-col items-center">
        {/* Logos — Relay 56×56 + App 48×48 */}
        <div className="flex items-center gap-3 mb-4">
          <RelayLogo size={56} />
          <span className="text-gray-400" style={{ fontSize: '20px' }}>+</span>
          <AppIcon app={app} size={48} />
        </div>

        {/* Title */}
        <h2
          className="link-modal-title text-gray-900 text-center mb-8"
          style={{ fontSize: '18px', fontWeight: 600, lineHeight: '26px' }}
        >
          Link Relay to {app.name}
        </h2>

        {/* API Key Input */}
        <div className="w-full mb-3">
          <label className="link-modal-label flex items-center gap-1.5 text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
            <Key className="w-3.5 h-3.5" strokeWidth={2} />
            {config.label}
          </label>
          <input
            type="text"
            placeholder={config.placeholder}
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
            className="link-modal-input w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-400"
            autoFocus
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className={clsx(
            'link-modal-submit-btn w-full py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2',
            canSubmit && !isSubmitting
              ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          )}
          style={{ fontWeight: 600 }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Continue'
          )}
        </button>

        {/* Help section */}
        <div className="w-full mt-6 pt-5 border-t border-gray-100">
          <p className="link-modal-help-title text-gray-600 mb-2" style={{ fontSize: '13px', fontWeight: 500 }}>
            Where to get your key:
          </p>
          <ol className="list-decimal list-inside space-y-1">
            {config.helpSteps.map((step, i) => (
              <li key={i} className="link-modal-help-step text-gray-500" style={{ fontSize: '13px', lineHeight: '20px' }}>
                {step.includes(config.helpUrl) && config.helpUrl ? (
                  <>
                    Go to{' '}
                    <button
                      onClick={() => window.open(`https://${config.helpUrl}`, '_blank')}
                      className="text-blue-500 hover:underline cursor-pointer inline-flex items-center gap-0.5"
                    >
                      {config.helpUrl}
                    </button>
                  </>
                ) : (
                  step
                )}
              </li>
            ))}
          </ol>

          {config.helpNote && (
            <div className="link-modal-help-note flex items-start gap-1.5 mt-3 text-gray-400" style={{ fontSize: '12px' }}>
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>{config.helpNote}</span>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

// ═══════════════════════════════════════════════════════════════
// OAuth Modal (simulated browser authorization)
// ═══════════════════════════════════════════════════════════════
function OAuthModal({ app, onClose, onLinked }: LinkModalProps) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'login' | 'authorizing' | 'done'>('login');
  const config = OAUTH_CONFIGS[app.id] || { ...DEFAULT_OAUTH_CONFIG, providerName: app.name };

  const handleLogin = useCallback(() => {
    setStep('authorizing');
    setTimeout(() => {
      setStep('done');
      setTimeout(() => {
        onLinked(app.id);
      }, 800);
    }, 1800);
  }, [app.id, onLinked]);

  const handleSocial = useCallback((provider: string) => {
    setStep('authorizing');
    setTimeout(() => {
      setStep('done');
      setTimeout(() => {
        onLinked(app.id);
      }, 800);
    }, 2000);
  }, [app.id, onLinked]);

  return (
    <ModalWrapper onClose={onClose}>
      <div className="link-modal-content flex flex-col items-center">
        {/* Browser-like header bar */}
        <div className="link-modal-browser-bar w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 mb-5">
          <Globe className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="link-modal-browser-url text-gray-400 truncate" style={{ fontSize: '12px' }}>
            {config.providerName.toLowerCase().replace(/[^a-z]/g, '')}.com/oauth/authorize
          </span>
          <div className="flex-1" />
          <ExternalLink className="w-3 h-3 text-gray-300 flex-shrink-0" />
        </div>

        {/* Logos — App 48×48 + Relay 56×56 */}
        <div className="flex items-center gap-3 mb-4">
          <AppIcon app={app} size={48} />
          <ArrowLeftRight className="w-5 h-5 text-gray-300" />
          <RelayLogo size={56} />
        </div>

        {step === 'done' ? (
          /* ── Success state ──────────────── */
          <div className="flex flex-col items-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
              <Check className="w-7 h-7 text-emerald-500" strokeWidth={2.5} />
            </div>
            <p className="link-modal-title text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
              Successfully connected!
            </p>
            <p className="text-gray-500 mt-1" style={{ fontSize: '13px' }}>
              {app.name} is now linked to Relay
            </p>
          </div>
        ) : step === 'authorizing' ? (
          /* ── Authorizing state ──────────── */
          <div className="flex flex-col items-center py-8">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="link-modal-title text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
              Authorizing...
            </p>
            <p className="text-gray-500 mt-1" style={{ fontSize: '13px' }}>
              Connecting your {config.providerName} account to Relay
            </p>
          </div>
        ) : (
          /* ── Login form ─────────────────── */
          <>
            <h2
              className="link-modal-title text-gray-900 text-center mb-1"
              style={{ fontSize: '20px', fontWeight: 700, lineHeight: '28px' }}
            >
              Log in and authorize
            </h2>
            <p className="text-gray-500 text-center mb-6" style={{ fontSize: '14px' }}>
              Log in to authorize your {config.providerName} account to{' '}
              <span className="text-blue-500">Relay</span>.
            </p>

            {/* Email / username input */}
            <div className="w-full mb-3">
              <label className="link-modal-label block text-gray-700 mb-1.5" style={{ fontSize: '13px', fontWeight: 600 }}>
                {config.loginLabel}
              </label>
              <input
                type="text"
                placeholder={`Enter your ${config.loginLabel.toLowerCase()}`}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && email.trim()) handleLogin(); }}
                className="link-modal-input w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-400"
                autoFocus
              />
            </div>

            {/* Log In button */}
            <button
              onClick={handleLogin}
              disabled={!email.trim()}
              className={clsx(
                'link-modal-submit-btn w-full py-3 rounded-xl text-sm transition-all',
                email.trim()
                  ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              )}
              style={{ fontWeight: 600 }}
            >
              Log In
            </button>

            {/* Social login options */}
            {config.socialOptions && config.socialOptions.length > 0 && (
              <>
                <div className="link-modal-divider-line flex items-center gap-3 w-full my-4">
                  <div className="flex-1 border-t border-gray-100" />
                  <span className="text-gray-400" style={{ fontSize: '12px' }}>or</span>
                  <div className="flex-1 border-t border-gray-100" />
                </div>
                <div className="w-full space-y-2">
                  {config.socialOptions.map(provider => (
                    <button
                      key={provider}
                      onClick={() => handleSocial(provider)}
                      className="link-modal-social-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      <SocialIcon provider={provider} />
                      Continue with {provider}
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </ModalWrapper>
  );
}

// ── Social icon (small inline SVGs) ───────────────────────────
function SocialIcon({ provider }: { provider: string }) {
  switch (provider) {
    case 'Google':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M15.68 8.18c0-.57-.05-1.11-.15-1.64H8v3.09h4.3a3.68 3.68 0 01-1.6 2.41v2h2.59c1.51-1.4 2.39-3.45 2.39-5.86z" fill="#4285F4"/>
          <path d="M8 16c2.16 0 3.97-.72 5.29-1.94l-2.58-2a4.82 4.82 0 01-7.18-2.53H.96v2.06A8 8 0 008 16z" fill="#34A853"/>
          <path d="M3.53 9.53a4.8 4.8 0 010-3.06V4.41H.96a8 8 0 000 7.18l2.57-2.06z" fill="#FBBC05"/>
          <path d="M8 3.18c1.22 0 2.31.42 3.17 1.24l2.38-2.38A7.95 7.95 0 008 0 8 8 0 00.96 4.41l2.57 2.06A4.77 4.77 0 018 3.18z" fill="#EA4335"/>
        </svg>
      );
    case 'Apple':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12.66 8.48c-.02-1.8 1.47-2.67 1.54-2.71a3.34 3.34 0 00-2.63-1.42c-1.12-.11-2.19.66-2.75.66-.57 0-1.44-.64-2.37-.62A3.5 3.5 0 003.5 6.21c-1.27 2.2-.32 5.45.91 7.23.6.87 1.32 1.85 2.27 1.81.91-.04 1.25-.59 2.35-.59 1.1 0 1.41.59 2.37.57.98-.01 1.6-.89 2.2-1.76.69-1.02.97-2 .99-2.05-.02-.01-1.9-.73-1.93-2.94zM10.88 3.08A3.39 3.39 0 0011.66.5a3.46 3.46 0 00-2.24 1.16A3.24 3.24 0 008.6 4.16a2.87 2.87 0 002.28-1.08z" fill="currentColor"/>
        </svg>
      );
    case 'Microsoft':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="6.5" height="6.5" fill="#F25022"/>
          <rect x="8.5" y="1" width="6.5" height="6.5" fill="#7FBA00"/>
          <rect x="1" y="8.5" width="6.5" height="6.5" fill="#00A4EF"/>
          <rect x="8.5" y="8.5" width="6.5" height="6.5" fill="#FFB900"/>
        </svg>
      );
    default:
      return (
        <ExternalLink className="w-4 h-4 text-gray-400" />
      );
  }
}

// ── Modal wrapper (backdrop + card) ───────────────────────────
function ModalWrapper({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div className="link-modal-card relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto mx-4 animate-in fade-in zoom-in-95">
        {/* Close button */}
        <button
          onClick={onClose}
          className="link-modal-close absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 pt-10">
          {children}
        </div>
      </div>
    </div>
  );
}
