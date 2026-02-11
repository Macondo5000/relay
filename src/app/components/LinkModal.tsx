import React, { useState, useEffect, useCallback } from 'react';
import { X, Key, ArrowLeftRight, Info, Loader2, Check } from 'lucide-react';
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
      {app.icon ? (
        <img src={app.icon} alt={app.name} className="object-contain" style={{ width: inner, height: inner }} />
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ width: inner, height: inner, borderRadius: innerR, backgroundColor: app.iconBg }}
        >
          <span className="font-bold leading-none" style={{ color: app.iconColor, fontSize: inner * 0.32 }}>
            {app.iconLabel}
          </span>
        </div>
      )}
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

// ── Per-app OAuth descriptions ───────────────────────────────
const OAUTH_DESCRIPTIONS: Record<string, string> = {
  notion:     'Link Notion to sync workspace pages and databases. Your assistant accesses project documentation and team wikis, ensuring its responses are fully informed by your internal knowledge base.',
  gdrive:     'Link Google Drive to sync files and folders. Your assistant accesses shared documents and resources, ensuring its responses are informed by your team\'s collaborative work.',
  gdocs:      'Link Google Docs to sync documents and collaborative files. Your assistant accesses written content and drafts, ensuring its responses reflect your team\'s latest documentation.',
  gsheets:    'Link Google Sheets to sync spreadsheets and data. Your assistant accesses structured data and reports, ensuring its responses are backed by your team\'s analytics.',
  gslides:    'Link Google Slides to sync presentations. Your assistant accesses slide decks and visual content, ensuring its responses incorporate your team\'s presentation materials.',
  dropbox:    'Link Dropbox to sync cloud storage files. Your assistant accesses shared folders and documents, ensuring its responses draw from your organization\'s file repository.',
  onedrive:   'Link OneDrive to sync cloud files and folders. Your assistant accesses stored documents and shared resources across your Microsoft ecosystem.',
  sharepoint: 'Link SharePoint to sync team sites and document libraries. Your assistant accesses institutional knowledge and internal memos, ensuring its responses are compliant with company standards and fully informed by internal data.',
  confluence: 'Link Confluence to sync knowledge base articles and team spaces. Your assistant accesses documentation, meeting notes, and project plans from your Atlassian workspace.',
  typeform:   'Link Typeform to sync form responses and survey data. Your assistant accesses collected feedback and submissions, helping you analyze and act on user insights.',
  gmail:      'Link Gmail to sync email conversations. Your assistant accesses messages and threads, ensuring its responses are informed by your communication history.',
  outlook:    'Link Outlook to sync email and calendar data. Your assistant accesses messages and scheduling information from your Microsoft account.',
  slack:      'Link Slack to sync channels and messages. Your assistant accesses team conversations and shared context, ensuring its responses reflect your real-time communication.',
  discord:    'Link Discord to sync server channels and messages. Your assistant accesses community discussions and team conversations.',
  intercom:   'Link Intercom to sync customer conversations and support data. Your assistant accesses chat history and customer insights to improve support quality.',
  telegram:   'Link Telegram to sync messages and group chats. Your assistant accesses conversation history to stay informed about team communications.',
  whatsapp:   'Link WhatsApp to sync messages and group conversations. Your assistant accesses chat history for seamless communication continuity.',
  gcal:       'Link Google Calendar to sync events and schedules. Your assistant accesses meeting details and availability, helping coordinate your team\'s time effectively.',
  outcal:     'Link Outlook Calendar to sync events and schedules. Your assistant accesses calendar data from your Microsoft account for scheduling support.',
  calendly:   'Link Calendly to sync scheduling data. Your assistant accesses booking information and availability to streamline meeting coordination.',
  zoom:       'Link Zoom to sync meeting recordings and transcripts. Your assistant accesses meeting content, ensuring its responses capture key discussion points and action items.',
  fireflies:  'Link Fireflies to sync meeting transcriptions and notes. Your assistant accesses AI-generated summaries, ensuring no meeting insight is lost.',
  jira:       'Link Jira to sync issues and project boards. Your assistant accesses tickets, sprints, and workflows, ensuring its responses align with your project management data.',
  linear:     'Link Linear to sync issues and project cycles. Your assistant accesses task tracking and engineering workflows for streamlined project coordination.',
  github:     'Link GitHub to sync repositories and pull requests. Your assistant accesses code reviews, issues, and project activity across your development workflow.',
  gitlab:     'Link GitLab to sync repositories and CI/CD pipelines. Your assistant accesses merge requests, issues, and DevOps workflows.',
  hubspot:    'Link HubSpot to sync CRM contacts and deal pipelines. Your assistant accesses customer data and sales activity to support your growth strategy.',
  mailchimp:  'Link Mailchimp to sync email campaigns and audience data. Your assistant accesses marketing performance and subscriber insights.',
  sendgrid:   'Link SendGrid to sync email delivery data. Your assistant accesses transactional email metrics and delivery analytics.',
  airtable:   'Link Airtable to sync bases and structured data. Your assistant accesses organized records and collaborative databases for data-driven responses.',
  mixpanel:   'Link Mixpanel to sync product analytics and event data. Your assistant accesses user behavior insights to inform product decisions.',
  ganalytics: 'Link Google Analytics to sync website traffic and user data. Your assistant accesses web performance metrics for data-driven insights.',
  figma:      'Link Figma to sync design files and prototypes. Your assistant accesses design assets and collaboration activity across your creative workflow.',
  framer:     'Link Framer to sync design and prototype projects. Your assistant accesses interactive designs and published site data.',
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
        {/* Logos — Relay 48×48 + App 48×48 */}
        <div className="flex items-center gap-3 mb-4">
          <RelayLogo size={48} />
          <span className="text-gray-400" style={{ fontSize: '20px' }}>+</span>
          <AppIcon app={app} size={48} />
        </div>

        {/* Title */}
        <h2
          className="link-modal-title text-gray-900 text-center mb-8"
          style={{ fontSize: '18px', fontWeight: 600, lineHeight: '26px' }}
        >
          Link Relay and Tanka to {app.name}
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
  const [step, setStep] = useState<'intro' | 'authorizing' | 'done'>('intro');
  const description = OAUTH_DESCRIPTIONS[app.id] || `Link ${app.name} to Relay and Tanka. Your assistant accesses your ${app.name} data, ensuring its responses are fully informed by your connected tools.`;

  const handleLinkNow = useCallback(() => {
    setStep('authorizing');
    setTimeout(() => {
      setStep('done');
      setTimeout(() => {
        onLinked(app.id);
      }, 800);
    }, 1800);
  }, [app.id, onLinked]);

  return (
    <ModalWrapper onClose={onClose}>
      <div className="link-modal-content flex flex-col items-center">
        {/* Logos — App 48×48 + Relay 48×48 */}
        <div className="flex items-center gap-3 mb-4">
          <AppIcon app={app} size={48} />
          <ArrowLeftRight className="w-5 h-5 text-gray-300" />
          <RelayLogo size={48} />
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
              {app.name} is now linked to Relay and Tanka
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
              Connecting your {app.name} account to Relay and Tanka
            </p>
          </div>
        ) : (
          /* ── Intro / description ─────────── */
          <>
            <h2
              className="link-modal-title text-gray-900 text-center mb-4"
              style={{ fontSize: '20px', fontWeight: 700, lineHeight: '28px' }}
            >
              Link {app.name} to Relay and Tanka
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-center mb-6" style={{ fontSize: '14px', lineHeight: '22px' }}>
              {description}
            </p>

            {/* Link Now button */}
            <button
              onClick={handleLinkNow}
              className="link-modal-submit-btn w-full py-3.5 rounded-xl text-sm bg-gray-900 text-white hover:bg-gray-800 cursor-pointer transition-all"
              style={{ fontWeight: 600 }}
            >
              Link Now
            </button>

            {/* Terms */}
            <p className="text-gray-400 text-center mt-5" style={{ fontSize: '12px', lineHeight: '18px' }}>
              Learn more in the{' '}
              <span className="underline cursor-pointer hover:text-gray-500">Terms of Service</span>
              {' '}and{' '}
              <span className="underline cursor-pointer hover:text-gray-500">Privacy Policy</span>.
            </p>
          </>
        )}
      </div>
    </ModalWrapper>
  );
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
