import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { Employee, Message } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar } from './Avatar';
import { clsx } from 'clsx';

interface ChatInterfaceProps {
  employee: Employee | null;
  currentUserName?: string;
}

const DEFAULT_USER = 'Cody Song';

// Force English date label
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

const QUICK_PROMPTS = [
  "What are the core growth metrics?",
  "Where is the Role/Purpose doc?",
  "Who is the contact for Q3 roadmap?",
  "Explain the deployment process"
];

// Generate initial messages for a digital avatar chat
function generateInitialMessages(employee: Employee): Message[] {
  const now = new Date();
  const todayMorning = new Date(now); todayMorning.setHours(9, 15, 0, 0);

  return [
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm ${employee.name}'s Digital Avatar. I can help answer questions about my previous work, including ${employee.roleDescription.split(',').slice(0, 3).join(', ')} and more.\n\nKnowledge Completeness: 92%\n\nHow can I help you?`,
      timestamp: todayMorning,
      senderName: employee.name,
    }
  ];
}

export function ChatInterface({ employee, currentUserName }: ChatInterfaceProps) {
  const CURRENT_USER = currentUserName || DEFAULT_USER;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset chat when employee changes
  useEffect(() => {
    if (employee) {
      setMessages(generateInitialMessages(employee));
    }
  }, [employee]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      senderName: CURRENT_USER,
    };

    setMessages(prev => [...prev, newMsg]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I can certainly help with that. This is a simulated response based on my knowledge base.",
        timestamp: new Date(),
        senderName: employee?.name || '',
      };
      setMessages(prev => [...prev, responseMsg]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
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
          {/* Avatar — left for assistant, right for current user */}
          {!isMe ? (
            <div className="flex-shrink-0 mt-0.5">
              <Avatar name={msg.senderName || 'User'} size="sm" className="ring-[1.5px] ring-white" />
            </div>
          ) : (
            <div className="flex-shrink-0 mt-0.5">
              <Avatar name={CURRENT_USER} size="sm" className="ring-[1.5px] ring-white" />
            </div>
          )}

          {/* Message Bubble */}
          <div className={clsx(
            "px-4 py-2.5 text-[15px] leading-relaxed max-w-2xl whitespace-pre-line",
            isMe
              ? "msg-bubble-self bg-gray-900 text-white rounded-2xl rounded-tr-sm"
              : "msg-bubble-other bg-white text-gray-900 rounded-2xl rounded-tl-sm border border-gray-200"
          )}>
            {msg.content}
          </div>
        </motion.div>
      );
    });

    return elements;
  };

  if (!employee) {
    return (
      <div className="flex-1 h-full bg-white flex flex-col items-center justify-center text-center p-8 min-w-0">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Digital Avatar</h3>
        <p className="text-gray-500 max-w-sm">
          Choose a departing employee from the list to start a handover conversation with their AI assistant.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col bg-[#F2F4F7] min-w-0">
      {/* Header */}
      <div className="h-[72px] px-6 border-b border-gray-200 flex items-center bg-white sticky top-0 z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
           <Avatar name={employee.name} size="sm" />
           <div className="flex flex-col">
             <div className="flex items-center gap-2">
               <h3 className="font-medium text-gray-900 text-lg leading-tight">{employee.name}</h3>
               <span className="px-1.5 py-0.5 text-gray-500 text-[10px] font-medium rounded bg-gray-100">
                 Digital Avatar
               </span>
             </div>
             <span className="text-xs text-gray-400 mt-0.5">{employee.department}</span>
           </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
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
        {/* Quick Prompts */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mask-gradient-right">
          {QUICK_PROMPTS.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(prompt)}
              className="quick-prompt-chip flex-shrink-0 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 whitespace-nowrap hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
          <form onSubmit={handleSubmit} className="chat-input-form relative flex items-center bg-white border border-gray-200 rounded-2xl focus-within:ring-2 focus-within:ring-black/5 focus-within:border-gray-300 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask ${employee?.name || 'the Digital Avatar'}...`}
              className="flex-1 py-4 pl-6 bg-transparent border-none text-base focus:outline-none placeholder:text-gray-400"
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
    </div>
  );
}
