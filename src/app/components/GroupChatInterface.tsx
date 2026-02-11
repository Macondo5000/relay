import React, { useState, useRef, useEffect } from 'react';
import { Plus, ArrowUp, Bot, Link2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { GroupAvatar } from './GroupChatList';
import { Avatar } from './Avatar';
import { GroupChatDrawer } from './GroupChatDrawer';
import { GroupChat } from './GroupChatList';
import { LinkDrawer } from './LinkDrawer';
import type { AppItem } from './LinkedToolsList';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  senderName?: string;
  timestamp: Date;
}

interface GroupChatInterfaceProps {
  chatId: string;
  chatName: string;
  memberCount: number;
  progress: number;
  colorIndex: number;
  currentUserName?: string;
  linkApps?: AppItem[];
  onOpenLinkModal?: (id: string) => void;
}

const DEFAULT_USER = 'Cody Song';

// Force English AM/PM time
function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${mm} ${ampm}`;
}

// Force English date label — MM/DD/YYYY or Today/Yesterday
function getDateLabel(date: Date): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

// Generate chat-specific messages
function generateMessages(chatId: string, chatName: string): Message[] {
  const personName = chatName.split("'")[0] || "User";
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2);
  const twoDaysAgoLater = new Date(twoDaysAgo.getTime() + 1000 * 60 * 18);
  const todayMorning = new Date(now); todayMorning.setHours(9, 15, 0, 0);
  const todayMid = new Date(now); todayMid.setHours(9, 42, 0, 0);
  const todayLate = new Date(now); todayLate.setHours(10, 8, 0, 0);
  const todayAfter = new Date(now); todayAfter.setHours(10, 30, 0, 0);

  if (chatId === '1') {
    return [
      {
        id: '0', role: 'assistant', senderName: 'Relay AI',
        content: "Welcome to Shawn Guo's offboarding workspace. I'll be guiding the transition process. Let's start with Documentation & Handover.",
        timestamp: twoDaysAgo
      },
      {
        id: '1', role: 'user', senderName: 'Shawn Guo',
        content: "Hi everyone! Ready to make this a smooth transition. I've been managing the product team for 3 years and want to make sure nothing gets lost.",
        timestamp: twoDaysAgoLater
      },
      {
        id: '2', role: 'user', senderName: 'Koko Lv',
        content: "Thanks Shawn. Looking forward to capturing all your knowledge about the product workflow.",
        timestamp: todayMorning
      },
      {
        id: '3', role: 'assistant', senderName: 'Relay AI',
        content: "@Shawn Guo Great start! Your first task is to document the product workflow & processes. I've created a template for you. Please include: sprint rituals, stakeholder alignment, and prioritization frameworks.",
        timestamp: todayMid
      },
    ];
  }

  if (chatId === '2') {
    return [
      {
        id: '0', role: 'assistant', senderName: 'Relay AI',
        content: `Welcome to Lisa Park's offboarding workspace. I'll be guiding the transition process. Let's start with Documentation & Handover.`,
        timestamp: twoDaysAgo
      },
      {
        id: '1', role: 'user', senderName: 'Lisa Park',
        content: "Hey team, I'll be wrapping up my projects over the next two weeks. Let me know if there's anything specific you'd like me to prioritize.",
        timestamp: twoDaysAgoLater
      },
      {
        id: '2', role: 'user', senderName: 'Mike Li',
        content: "Thanks Lisa. Could you start with the architecture docs for the payment service? That's the most critical piece.",
        timestamp: todayMorning
      },
      {
        id: '3', role: 'assistant', senderName: 'Relay AI',
        content: "@Lisa Park I've prepared a checklist for your engineering handover. Key areas to cover: codebase ownership, deployment pipelines, on-call runbook, and pending tech debt items.",
        timestamp: todayMid
      },
    ];
  }

  if (chatId === '3') {
    return [
      {
        id: '0', role: 'assistant', senderName: 'Relay AI',
        content: `Welcome to James Wu's offboarding workspace. I'll be guiding the transition process. Let's start with Documentation & Handover.`,
        timestamp: twoDaysAgo
      },
      {
        id: '1', role: 'user', senderName: 'James Wu',
        content: "Hi all! I've started organizing the campaign materials and vendor contacts. Will share the folder shortly.",
        timestamp: twoDaysAgoLater
      },
      {
        id: '2', role: 'user', senderName: 'Rachel Lin',
        content: "Great, James. Please also include the social media content calendar — we need to keep the Q2 campaigns on track.",
        timestamp: todayMorning
      },
      {
        id: '3', role: 'assistant', senderName: 'Relay AI',
        content: "@James Wu Your first task is to hand over the marketing calendar and active campaign briefs. I've created a template covering: brand guidelines, agency contacts, and budget allocations.",
        timestamp: todayMid
      },
    ];
  }

  // Nina Chen (chatId === '4')
  return [
    {
      id: '0', role: 'assistant', senderName: 'Relay AI',
      content: `Welcome to Nina Chen's offboarding workspace. I'll be guiding the transition process. Let's start with Documentation & Handover.`,
      timestamp: twoDaysAgo
    },
    {
      id: '1', role: 'user', senderName: 'Nina Chen',
      content: "Hello team! I'll be documenting all my client relationships and ongoing deals. Want to make sure every account is properly transitioned.",
      timestamp: twoDaysAgoLater
    },
    {
      id: '2', role: 'user', senderName: 'Kevin Wang',
      content: "Thanks Nina. The Q1 pipeline report would be really helpful — especially the enterprise accounts.",
      timestamp: todayMorning
    },
    {
      id: '3', role: 'assistant', senderName: 'Relay AI',
      content: "@Nina Chen I've prepared your sales handover template. Please document: key account details, pipeline status, contract renewal dates, and client communication preferences.",
      timestamp: todayMid
    },
  ];
}

export function GroupChatInterface({ chatId, chatName, memberCount, progress, colorIndex, currentUserName, linkApps, onOpenLinkModal }: GroupChatInterfaceProps) {
  const CURRENT_USER = currentUserName || DEFAULT_USER;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLinkDrawerOpen, setIsLinkDrawerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(generateMessages(chatId, chatName));
  }, [chatId, chatName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      senderName: CURRENT_USER,
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
  };

  const currentChat: GroupChat = {
    id: chatId,
    name: chatName,
    membersCount: memberCount,
    progress: progress,
    colorIndex: colorIndex
  };

  // Build messages with date separators
  const renderMessages = () => {
    const elements: React.ReactNode[] = [];
    let lastDateLabel = '';

    messages.forEach((msg) => {
      const dateLabel = getDateLabel(msg.timestamp);
      if (dateLabel !== lastDateLabel) {
        lastDateLabel = dateLabel;
        elements.push(
          <div key={`date-${msg.id}`} className="flex items-center justify-center py-3">
            <span className="px-3 py-1 text-gray-500 text-[11px] font-medium rounded-full tracking-wide">
              {dateLabel}
            </span>
          </div>
        );
      }

      const isMe = msg.senderName === CURRENT_USER;
      const isAssistant = msg.role === 'assistant';

      elements.push(
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={clsx(
            "flex items-start gap-3 max-w-3xl",
            isMe ? "ml-auto flex-row-reverse" : ""
          )}
        >
          {/* Avatar */}
          {!isMe ? (
            <div className="flex-shrink-0 mt-0.5">
              {isAssistant ? (
                <div className="bot-avatar w-8 h-8 rounded-full bg-white flex items-center justify-center ring-[1.5px] ring-white">
                  <Bot className="w-4 h-4 text-gray-900 stroke-[2]" />
                </div>
              ) : (
                <Avatar name={msg.senderName || 'User'} size="sm" className="ring-[1.5px] ring-white" />
              )}
            </div>
          ) : (
            <div className="flex-shrink-0 mt-0.5">
              <Avatar name={CURRENT_USER} size="sm" className="ring-[1.5px] ring-white" />
            </div>
          )}
          
          {/* Content Group */}
          <div className={clsx(
            "flex flex-col",
            isMe ? "items-end" : "items-start"
          )}>
            {/* Sender Name + Tag + Time */}
            <div className={clsx("flex items-center gap-2 mb-2 px-1", isMe ? "flex-row-reverse" : "")}>
              <span className="chat-sender-name text-xs font-semibold text-gray-600">
                {msg.senderName}
              </span>
              {isAssistant && (
                <span
                  className="ai-assistant-tag px-1.5 py-0.5 text-gray-500 text-[10px] font-medium rounded bg-gray-300/40"
                >
                  AI Assistant
                </span>
              )}
              <span className="text-[10px] text-gray-400">
                {formatTime(msg.timestamp)}
              </span>
            </div>

            {/* Message Bubble */}
            <div className={clsx(
              "px-4 py-2.5 text-[15px] leading-relaxed max-w-2xl whitespace-pre-line",
              isMe
                ? "msg-bubble-self bg-gray-900 text-white rounded-2xl rounded-tr-sm"
                : "msg-bubble-other bg-white text-gray-900 rounded-2xl rounded-tl-sm border border-gray-200"
            )}>
              {msg.content}
            </div>
          </div>
        </motion.div>
      );
    });

    return elements;
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#F2F4F7] min-w-0 relative overflow-hidden">
      {/* Header */}
      <div className="h-[72px] px-6 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
           <GroupAvatar name={chatName} size="sm" colorIndex={colorIndex} />
           <div className="flex flex-col">
             <h3 className="font-medium text-gray-900 text-lg leading-tight">{chatName}</h3>
             <button 
               onClick={() => setIsDrawerOpen(true)}
               className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors mt-0.5 text-left"
             >
               <span className="text-xs">{memberCount} members</span>
             </button>
           </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Link button — entry point for tool linking */}
          {linkApps && onOpenLinkModal && (
            <button
              onClick={() => setIsLinkDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="Link Tools"
            >
              <Link2 className="w-4 h-4" />
              <span>Link</span>
            </button>
          )}

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
             <span className="text-xs font-semibold text-gray-900">{progress}%</span>
             <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-black rounded-full" style={{ width: `${progress}%` }} />
             </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {renderMessages()}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 bg-[#F2F4F7] p-6 pt-2">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="chat-input-form relative flex items-center bg-white border border-gray-200 rounded-2xl focus-within:ring-2 focus-within:ring-black/5 focus-within:border-gray-300 transition-all">
            <button 
              type="button"
              className="p-3.5 ml-1 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Reply..."
              className="flex-1 py-4 bg-transparent border-none text-base focus:outline-none placeholder:text-gray-400"
            />
            
            <div className="p-2">
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={clsx(
                   "p-2.5 rounded-xl transition-all flex-shrink-0",
                   inputValue.trim() 
                     ? "send-btn-active bg-black text-white hover:bg-gray-800" 
                     : "send-btn-disabled bg-gray-100 text-gray-300 cursor-not-allowed"
                )}
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Drawer */}
      <GroupChatDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        groupChat={currentChat}
      />

      {/* Link Drawer */}
      {linkApps && onOpenLinkModal && (
        <LinkDrawer
          isOpen={isLinkDrawerOpen}
          onClose={() => setIsLinkDrawerOpen(false)}
          apps={linkApps}
          onOpenLinkModal={(id) => {
            setIsLinkDrawerOpen(false);
            onOpenLinkModal(id);
          }}
        />
      )}
    </div>
  );
}