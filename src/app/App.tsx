import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DigitalTwinList } from './components/DigitalTwinList';
import { ChatInterface } from './components/ChatInterface';
import { AdminConsole } from './components/AdminConsole';
import { AvatarAdmin } from './components/AvatarAdmin';
import { GroupChatList, MOCK_GROUP_CHATS, GroupChat } from './components/GroupChatList';
import { GroupChatInterface } from './components/GroupChatInterface';
import { LoginPage } from './components/LoginPage';
import { AuthPage } from './components/AuthPage';
import { LinkApps } from './components/LinkApps';
import { LinkedToolsList, AppItem } from './components/LinkedToolsList';
import { OnboardingGate } from './components/OnboardingGate';
import { LinkModal } from './components/LinkModal';
import { Employee, UserProfile, Organization } from './types';
import clsx from 'clsx';

// ── Organizations ────────────────────────────────────────────
const ORGANIZATIONS: Organization[] = [
  { id: 'tanka', name: 'Tanka', logo: 'T' },
  { id: 'miromind', name: 'MiroMind', logo: 'M' },
  { id: 'newsbang', name: 'Newsbang', logo: 'N' },
];

// ── User Profiles ──────────────────────────────────────────
const USER_PROFILES: Record<string, UserProfile> = {
  cody: {
    id: 'cody',
    name: 'Cody Song',
    initials: 'CS',
    title: 'Director of Compensation and Incentives',
    avatarBg: 'bg-sky-100',
    avatarText: 'text-sky-700',
    role: 'admin',
  },
  koko: {
    id: 'koko',
    name: 'Koko Lv',
    initials: 'KL',
    title: 'VP of Design',
    avatarBg: 'bg-violet-100',
    avatarText: 'text-violet-700',
    role: 'active',
  },
  shawn: {
    id: 'shawn',
    name: 'Shawn Guo',
    initials: 'SG',
    title: 'Product Manager',
    avatarBg: 'bg-teal-100',
    avatarText: 'text-teal-700',
    role: 'departing',
  },
};

// ── Mock Employees (Digital Avatars) ───────────────────────
const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    department: 'Product Manager',
    roleDescription: 'Role/Purpose, Strategy Product, User Research, Roadmap Planning',
    avatarUrl: 'https://images.unsplash.com/photo-1761243892035-c3e13829115a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcwNDU0OTM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    initials: 'SC',
    status: 'departing'
  },
  {
    id: '2',
    name: 'Mike Zhang',
    department: 'Engineering',
    roleDescription: 'Microservices, Golang, Kubernetes, System Architecture, Cloud Infrastructure',
    avatarUrl: 'https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3MDQyNDA4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    initials: 'MZ',
    status: 'active'
  },
  {
    id: '3',
    name: 'Emily Wang',
    department: 'Marketing',
    roleDescription: 'Brand Marketing, Event Planning, Social Media Strategy, Content Creation',
    avatarUrl: 'https://images.unsplash.com/photo-1652471949169-9c587e8898cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcwNDgzMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    initials: 'EW',
    status: 'departing'
  },
  {
    id: '4',
    name: 'David Li',
    department: 'Sales',
    roleDescription: 'Key Accounts, Business Negotiation, Client Relations, Revenue Growth',
    avatarUrl: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcwNDg5MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    initials: 'DL',
    status: 'active'
  },
  {
    id: '5',
    name: 'Amy Zhou',
    department: 'Design',
    roleDescription: 'UI/UX Design, Design Systems, Prototyping, User Testing',
    avatarUrl: '',
    initials: 'AZ',
    status: 'active'
  }
];

// ── Koko only sees Shawn Guo's Handover ────────────────────
const KOKO_GROUP_CHATS: GroupChat[] = [
  { id: '1', name: "Shawn Guo's Handover", membersCount: 3, progress: 75, colorIndex: 0 },
];

export default function App() {
  // ── Auth & Org State ─────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentOrgId, setCurrentOrgId] = useState('tanka');

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'handover' | 'digital-avatars' | 'offboarding' | 'avatar-admin' | 'link'>('digital-avatars');
  
  // Digital Avatars Tab State
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  
  // Handover Tab State
  const [selectedGroupChatId, setSelectedGroupChatId] = useState<string | null>(null);
  
  // Link Tab State
  const [linkApps, setLinkApps] = useState<AppItem[]>([
    { id: 'notion',     name: 'Notion',             linked: true,  category: ['Featured', 'Files & Docs'],                iconBg: '#000000', iconColor: '#fff', iconLabel: 'N', authType: 'oauth' },
    { id: 'gdrive',     name: 'Google Drive',       linked: true,  category: ['Featured', 'Files & Docs'],                iconBg: '#34A853', iconColor: '#fff', iconLabel: 'GD', authType: 'oauth' },
    { id: 'gdocs',      name: 'Google Docs',        linked: true,  category: ['Featured', 'Files & Docs'],                iconBg: '#4285F4', iconColor: '#fff', iconLabel: 'GD', authType: 'oauth' },
    { id: 'gsheets',    name: 'Google Sheets',      linked: true,  category: ['Featured', 'Files & Docs'],                iconBg: '#0F9D58', iconColor: '#fff', iconLabel: 'GS', authType: 'oauth' },
    { id: 'gslides',    name: 'Google Slides',      linked: true,  category: ['Featured', 'Files & Docs'],                iconBg: '#F4B400', iconColor: '#fff', iconLabel: 'GS', authType: 'oauth' },
    { id: 'dropbox',    name: 'Dropbox',            linked: true,  category: ['Featured', 'Files & Docs'],                iconBg: '#0061FF', iconColor: '#fff', iconLabel: 'D', authType: 'oauth' },
    { id: 'onedrive',   name: 'OneDrive',           linked: false, category: ['Featured', 'Files & Docs'],                iconBg: '#0078D4', iconColor: '#fff', iconLabel: 'OD', authType: 'oauth' },
    { id: 'sharepoint', name: 'Sharepoint',         linked: false, category: ['Files & Docs'],                            iconBg: '#038387', iconColor: '#fff', iconLabel: 'SP', authType: 'oauth' },
    { id: 'confluence', name: 'Confluence',         linked: false, category: ['Files & Docs'],                            iconBg: '#172B4D', iconColor: '#fff', iconLabel: 'C', authType: 'oauth' },
    { id: 'typeform',   name: 'Typeform',           linked: false, category: ['Files & Docs'],                            iconBg: '#262627', iconColor: '#fff', iconLabel: 'Tf', authType: 'oauth' },
    { id: 'evernote',   name: 'Evernote',           linked: false, category: ['Files & Docs'],                            iconBg: '#00A82D', iconColor: '#fff', iconLabel: 'EN', authType: 'oauth' },
    { id: 'box',        name: 'Box',                linked: false, category: ['Files & Docs'],                            iconBg: '#0061D5', iconColor: '#fff', iconLabel: 'Bx', authType: 'oauth' },
    { id: 'gmail',      name: 'Gmail',              linked: false, category: ['Email & Messengers'],                      iconBg: '#EA4335', iconColor: '#fff', iconLabel: 'Gm', authType: 'oauth' },
    { id: 'outlook',    name: 'Outlook',            linked: true,  category: ['Featured', 'Email & Messengers'],          iconBg: '#0078D4', iconColor: '#fff', iconLabel: 'O', authType: 'oauth' },
    { id: 'slack',      name: 'Slack',              linked: true,  category: ['Featured', 'Email & Messengers'],          iconBg: '#4A154B', iconColor: '#fff', iconLabel: 'S', authType: 'oauth' },
    { id: 'teams',      name: 'Microsoft Teams',    linked: false, category: ['Email & Messengers', 'Meeting & Voice'],   iconBg: '#6264A7', iconColor: '#fff', iconLabel: 'T', authType: 'oauth' },
    { id: 'discord',    name: 'Discord',            linked: false, category: ['Email & Messengers'],                      iconBg: '#5865F2', iconColor: '#fff', iconLabel: 'Dc', authType: 'oauth' },
    { id: 'intercom',   name: 'Intercom',           linked: false, category: ['Email & Messengers', 'Customer & Growth'], iconBg: '#1F8DED', iconColor: '#fff', iconLabel: 'IC', authType: 'oauth' },
    { id: 'gcal',       name: 'Google Calendar',    linked: true,  category: ['Featured', 'Calendars'],                   iconBg: '#4285F4', iconColor: '#fff', iconLabel: '31', authType: 'oauth' },
    { id: 'outcal',     name: 'Outlook Calendar',   linked: false, category: ['Calendars'],                               iconBg: '#0078D4', iconColor: '#fff', iconLabel: 'OC', authType: 'oauth' },
    { id: 'zoom',       name: 'Zoom',               linked: true,  category: ['Featured', 'Meeting & Voice'],             iconBg: '#2D8CFF', iconColor: '#fff', iconLabel: 'Z', authType: 'oauth' },
    { id: 'gmeet',      name: 'Google Meet',        linked: true,  category: ['Meeting & Voice'],                         iconBg: '#00897B', iconColor: '#fff', iconLabel: 'GM', authType: 'oauth' },
    { id: 'loom',       name: 'Loom',               linked: true,  category: ['Meeting & Voice'],                         iconBg: '#625DF5', iconColor: '#fff', iconLabel: 'Lo', authType: 'oauth' },
    { id: 'webex',      name: 'Webex',              linked: false, category: ['Meeting & Voice'],                         iconBg: '#00BCF2', iconColor: '#fff', iconLabel: 'Wx', authType: 'oauth' },
    { id: 'jira',       name: 'Jira',               linked: false, category: ['Project & Task'],                          iconBg: '#0052CC', iconColor: '#fff', iconLabel: 'J', authType: 'oauth' },
    { id: 'linear',     name: 'Linear',             linked: false, category: ['Project & Task'],                          iconBg: '#5E6AD2', iconColor: '#fff', iconLabel: 'L', authType: 'oauth' },
    { id: 'asana',      name: 'Asana',              linked: false, category: ['Project & Task'],                          iconBg: '#F06A6A', iconColor: '#fff', iconLabel: 'A', authType: 'oauth' },
    { id: 'trello',     name: 'Trello',             linked: false, category: ['Project & Task'],                          iconBg: '#0079BF', iconColor: '#fff', iconLabel: 'Tr', authType: 'oauth' },
    { id: 'monday',     name: 'Monday.com',         linked: false, category: ['Project & Task'],                          iconBg: '#FF3D57', iconColor: '#fff', iconLabel: 'Mo', authType: 'oauth' },
    { id: 'clickup',    name: 'ClickUp',            linked: false, category: ['Project & Task'],                          iconBg: '#7B68EE', iconColor: '#fff', iconLabel: 'CU', authType: 'oauth' },
    { id: 'hubspot',    name: 'HubSpot',            linked: false, category: ['Customer & Growth'],                       iconBg: '#FF7A59', iconColor: '#fff', iconLabel: 'HS', authType: 'oauth' },
    { id: 'salesforce', name: 'Salesforce',         linked: false, category: ['Customer & Growth'],                       iconBg: '#00A1E0', iconColor: '#fff', iconLabel: 'SF', authType: 'oauth' },
    { id: 'zapier',     name: 'Zapier',             linked: false, category: ['Customer & Growth'],                       iconBg: '#FF4A00', iconColor: '#fff', iconLabel: 'Zp', authType: 'oauth' },
    { id: 'airtable',   name: 'Airtable',           linked: false, category: ['Data & Analytics'],                        iconBg: '#FCBF49', iconColor: '#fff', iconLabel: 'AT', authType: 'oauth' },
    { id: 'tableau',    name: 'Tableau',            linked: false, category: ['Data & Analytics'],                        iconBg: '#E97627', iconColor: '#fff', iconLabel: 'Tb', authType: 'oauth' },
    { id: 'power-bi',   name: 'Power BI',           linked: false, category: ['Data & Analytics'],                        iconBg: '#F2C811', iconColor: '#000', iconLabel: 'PB', authType: 'oauth' },
    { id: 'figma',      name: 'Figma',              linked: true,  category: ['Design & Creative'],                       iconBg: '#F24E1E', iconColor: '#fff', iconLabel: 'F', authType: 'oauth' },
    { id: 'miro',       name: 'Miro',               linked: false, category: ['Design & Creative'],                       iconBg: '#FFD02F', iconColor: '#050038', iconLabel: 'M', authType: 'oauth' },
    { id: 'github',     name: 'GitHub',             linked: true,  category: ['Featured', 'Project & Task'],              iconBg: '#24292E', iconColor: '#fff', iconLabel: 'GH', authType: 'oauth' },
    { id: 'chatgpt',    name: 'ChatGPT',            linked: true,  category: ['AI Models'],                               iconBg: '#10A37F', iconColor: '#fff', iconLabel: 'AI', authType: 'api-key' },
    { id: 'claude',     name: 'Claude',             linked: false, category: ['AI Models'],                               iconBg: '#D4A27F', iconColor: '#fff', iconLabel: 'Cl', authType: 'api-key' },
    { id: 'tanka-ai',   name: 'Tanka AI',           linked: true,  category: ['AI Models'],                               iconBg: '#000', iconColor: '#fff', iconLabel: 'Ta', authType: 'api-key' },
  ]);
  const [selectedLinkAppId, setSelectedLinkAppId] = useState<string | null>(null);

  // Departing onboarding gate — requires connecting ≥ 1 app
  const [departingOnboarded, setDepartingOnboarded] = useState(false);

  // Link modal state — which app is currently being linked
  const [linkModalAppId, setLinkModalAppId] = useState<string | null>(null);
  const linkModalApp = linkModalAppId ? linkApps.find(a => a.id === linkModalAppId) || null : null;

  /** Open the appropriate auth modal for an unlinked app */
  const handleOpenLinkModal = (id: string) => {
    const app = linkApps.find(a => a.id === id);
    if (!app || app.linked) return; // already linked — nothing to do
    setLinkModalAppId(id);
  };

  /** Called by modal on successful auth — mark app as linked */
  const handleLinkComplete = (id: string) => {
    setLinkApps(prev =>
      prev.map(a => (a.id === id ? { ...a, linked: true } : a))
    );
    setLinkModalAppId(null);
  };

  const handleToggleLinkApp = (id: string) => {
    setLinkApps(prev =>
      prev.map(a => (a.id === id ? { ...a, linked: !a.linked } : a))
    );
  };

  // Shared State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark class on document root for global dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const currentUser = currentUserId ? USER_PROFILES[currentUserId] : null;
  const isAdmin = currentUser?.role === 'admin';

  // Pick correct group chats based on user
  const groupChats = isAdmin ? MOCK_GROUP_CHATS : KOKO_GROUP_CHATS;

  const selectedEmployee = MOCK_EMPLOYEES.find(e => e.id === selectedEmployeeId) || null;
  const selectedGroupChat = groupChats.find(c => c.id === selectedGroupChatId) || null;

  const handleEmployeeSelect = (id: string) => {
    setSelectedEmployeeId(id);
  };

  const handleLogin = (userId: string) => {
    setCurrentUserId(userId);
    // Reset tab — non-admin users shouldn't land on admin tabs
    if (USER_PROFILES[userId]?.role !== 'admin') {
      setActiveTab('handover');
    } else {
      setActiveTab('handover');
    }
    // Reset selections
    setSelectedEmployeeId(null);
    setSelectedGroupChatId(null);

    // Departing user: reset all apps to unlinked, require onboarding
    if (USER_PROFILES[userId]?.role === 'departing') {
      setLinkApps(prev => prev.map(a => ({ ...a, linked: false })));
      setDepartingOnboarded(false);
    } else {
      setDepartingOnboarded(true); // non-departing users skip the gate
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUserId(null);
    setActiveTab('digital-avatars');
    setSelectedEmployeeId(null);
    setSelectedGroupChatId(null);
    setIsDarkMode(false);
    setDepartingOnboarded(false);
  };

  const handleOrgChange = (orgId: string) => {
    setCurrentOrgId(orgId);
    // Reset to handover tab when switching org
    setActiveTab('handover');
    setSelectedEmployeeId(null);
    setSelectedGroupChatId(null);
  };

  const currentOrg = ORGANIZATIONS.find(o => o.id === currentOrgId) || ORGANIZATIONS[0];

  // Auto-select first chat when switching to Handover tab if none selected
  useEffect(() => {
    if (activeTab === 'handover' && !selectedGroupChatId && groupChats.length > 0) {
      setSelectedGroupChatId(groupChats[0].id);
    }
  }, [activeTab, selectedGroupChatId, groupChats]);

  // Auto-select first employee when switching to Digital Avatars tab if none selected
  useEffect(() => {
    if (activeTab === 'digital-avatars' && !selectedEmployeeId && MOCK_EMPLOYEES.length > 0) {
      setSelectedEmployeeId(MOCK_EMPLOYEES[0].id);
    }
  }, [activeTab, selectedEmployeeId]);

  // 1. Not authenticated → show Sign In / Sign Up
  if (!isAuthenticated) {
    return <AuthPage onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  // 2. Authenticated but no user selected → show user picker
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Departing user must complete onboarding (connect ≥ 1 app) first
  const isDeparting = currentUser.role === 'departing';
  if (isDeparting && !departingOnboarded) {
    return (
      <OnboardingGate
        apps={linkApps}
        onToggleLink={handleToggleLinkApp}
        onContinue={() => setDepartingOnboarded(true)}
        userName={currentUser.name}
      />
    );
  }

  return (
    <div className={clsx(
      "flex h-screen w-full overflow-hidden font-sans transition-colors duration-300",
      isDarkMode 
        ? "bg-[#212121] text-[#ececec]" 
        : "bg-gray-50 text-gray-900"
    )}>
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'digital-avatars') {
            setSelectedEmployeeId(MOCK_EMPLOYEES[0]?.id || null);
          }
        }}
        collapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onLogout={handleLogout}
        currentUser={currentUser}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        organizations={ORGANIZATIONS}
        currentOrg={currentOrg}
        onOrgChange={handleOrgChange}
      />
      
      {activeTab === 'digital-avatars' ? (
        <>
          <DigitalTwinList 
            employees={MOCK_EMPLOYEES} 
            selectedId={selectedEmployeeId} 
            onSelect={handleEmployeeSelect}
          />
          
          <ChatInterface 
            employee={selectedEmployee}
            currentUserName={currentUser.name}
          />
        </>
      ) : activeTab === 'handover' ? (
        <>
          <GroupChatList 
            selectedId={selectedGroupChatId} 
            onSelect={setSelectedGroupChatId}
            chats={groupChats}
          />
          
          {selectedGroupChat ? (
            <GroupChatInterface
              chatId={selectedGroupChat.id}
              chatName={selectedGroupChat.name}
              memberCount={selectedGroupChat.membersCount}
              progress={selectedGroupChat.progress}
              colorIndex={selectedGroupChat.colorIndex}
              currentUserName={currentUser.name}
              linkApps={linkApps}
              onOpenLinkModal={handleOpenLinkModal}
            />
          ) : (
            <div className="flex-1 h-full bg-white flex flex-col items-center justify-center text-center p-8 min-w-0">
               <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                 <MessageSquare className="w-8 h-8 text-gray-400" />
               </div>
               <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Conversation</h3>
               <p className="text-gray-500 max-w-sm">
                 Choose a handover group chat from the list to start collaborating.
               </p>
            </div>
          )}
        </>
      ) : activeTab === 'offboarding' ? (
        <AdminConsole />
      ) : activeTab === 'avatar-admin' ? (
        <AvatarAdmin />
      ) : activeTab === 'link' ? (
        <>
          <LinkedToolsList
            apps={linkApps}
            selectedId={selectedLinkAppId}
            onSelect={setSelectedLinkAppId}
          />
          <LinkApps
            apps={linkApps}
            selectedId={selectedLinkAppId}
            onToggleLink={handleToggleLinkApp}
            onOpenLinkModal={handleOpenLinkModal}
          />
          {linkModalApp && (
            <LinkModal
              app={linkModalApp}
              onClose={() => setLinkModalAppId(null)}
              onLinked={handleLinkComplete}
            />
          )}
        </>
      ) : null}
    </div>
  );
}