import React, { useState, useRef, useEffect } from 'react';
import { PanelLeft, LogOut, Sun, Moon, ChevronDown, Check, Plus, Building2 } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, Organization } from '../types';

// Import assets
import { RelayLogo } from './RelayLogo';
import handoverIcon from "@/assets/ba1e251d39fed35f4b1712b01f2ceaa390824d37.png";
import digitalAvatarsIcon from "@/assets/5cca191fb25ef932a6ac991f571aa396f9bb79d4.png";
import offboardingIcon from "@/assets/9f3caa595879e269f47f73f142192eb02f661724.png";
import avatarAdminIcon from "@/assets/a16c32f4a1f27129148c3fcc3ef0e0786d1b31f4.png";

interface SidebarProps {
  activeTab: 'handover' | 'digital-avatars' | 'offboarding' | 'avatar-admin' | 'link';
  onTabChange: (tab: 'handover' | 'digital-avatars' | 'offboarding' | 'avatar-admin' | 'link') => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
  currentUser: UserProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  organizations: Organization[];
  currentOrg: Organization;
  onOrgChange: (orgId: string) => void;
}

export function Sidebar({ activeTab, onTabChange, collapsed, onToggleCollapse, onLogout, currentUser, isDarkMode, onToggleDarkMode, organizations, currentOrg, onOrgChange }: SidebarProps) {
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const orgDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (orgDropdownRef.current && !orgDropdownRef.current.contains(e.target as Node)) {
        setIsOrgDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const isAdmin = currentUser.role === 'admin';
  const isDeparting = currentUser.role === 'departing';

  // Build WORKSPACE items based on role
  const workspaceItems = isDeparting
    ? [
        { id: 'handover', label: 'Handover', iconSrc: handoverIcon, isAsset: true, isSvg: false },
        { id: 'link', label: 'Link', iconSrc: '', isAsset: false, isSvg: true },
      ]
    : [
        { id: 'handover', label: 'Handover', iconSrc: handoverIcon, isAsset: true, isSvg: false },
        { id: 'digital-avatars', label: 'Digital Avatars', iconSrc: avatarAdminIcon, isAsset: true, isSvg: false },
      ];

  // Define sections — ADMIN only visible for admin users
  const sections = [
    {
      title: "WORKSPACE",
      items: workspaceItems,
    },
    ...(isAdmin ? [{
      title: "ADMIN",
      items: [
        { id: 'offboarding', label: 'Offboarding', iconSrc: digitalAvatarsIcon, isAsset: true, isSvg: false },
        { id: 'avatar-admin', label: 'Avatar Admin', iconSrc: offboardingIcon, isAsset: true, isSvg: false },
      ]
    }] : [])
  ] as const;

  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0 }}
      className={clsx(
        "flex flex-col h-full border-r relative flex-shrink-0 z-30 transition-colors duration-200",
        isDarkMode 
          ? "bg-[#171717] border-[#2f2f2f]" 
          : "bg-white border-gray-200"
      )}
    >
      {/* Header / Logo + Org Switcher */}
      <div className="flex-shrink-0 px-4 pt-4 pb-2">
        {/* Logo Row — logo stays at same position */}
        <div className={clsx(
          "flex items-center mb-3 h-8",
          collapsed ? "justify-center" : "justify-between px-2"
        )}>
          <div
            className={clsx("flex items-center", collapsed ? "cursor-pointer" : "gap-3")}
            onClick={collapsed ? onToggleCollapse : undefined}
            title={collapsed ? "Open sidebar" : undefined}
          >
            <RelayLogo size={32} />
            {!collapsed && (
              <span className={clsx(
                "text-xl font-bold tracking-tight whitespace-nowrap transition-colors duration-200",
                isDarkMode ? "text-[#ececec]" : "text-gray-900"
              )}>
                Relay
              </span>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={onToggleCollapse}
              className={clsx(
                "p-1.5 rounded-md transition-colors",
                isDarkMode
                  ? "text-[#8e8e8e] hover:text-[#ececec] hover:bg-[#2f2f2f]"
                  : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
              )}
              title="Close sidebar"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Org Switcher */}
        <div className="relative" ref={orgDropdownRef}>
          <button
            onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
            className={clsx(
              "w-full flex items-center rounded-lg transition-colors",
              collapsed ? "justify-center p-2" : "gap-2.5 px-2.5 py-2",
              isDarkMode
                ? "hover:bg-[#2f2f2f]"
                : "hover:bg-gray-100"
            )}
            title={collapsed ? currentOrg.name : undefined}
          >
            <div className={clsx(
              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border",
              isDarkMode ? "bg-[#2a2a2a] border-[#3a3a3a] text-[#999]" : "bg-white border-gray-200 text-gray-400"
            )}>
              <Building2 className="w-4 h-4" />
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0 text-left">
                  <p className={clsx(
                    "text-sm font-semibold truncate",
                    isDarkMode ? "text-[#ececec]" : "text-gray-900"
                  )}>
                    {currentOrg.name}
                  </p>
                </div>
                <ChevronDown className={clsx(
                  "w-4 h-4 flex-shrink-0 transition-transform",
                  isOrgDropdownOpen ? "rotate-180" : "",
                  isDarkMode ? "text-[#666]" : "text-gray-400"
                )} />
              </>
            )}
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOrgDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className={clsx(
                  "absolute z-50 mt-1 rounded-xl border shadow-lg overflow-hidden",
                  collapsed ? "left-0 w-56" : "left-0 right-0",
                  isDarkMode
                    ? "bg-[#1e1e1e] border-[#333]"
                    : "bg-white border-gray-200"
                )}
              >
                <div className="p-1.5">
                  {organizations.map(org => {
                    const isActive = org.id === currentOrg.id;
                    return (
                      <button
                        key={org.id}
                        onClick={() => {
                          onOrgChange(org.id);
                          setIsOrgDropdownOpen(false);
                        }}
                        className={clsx(
                          "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors",
                          isDarkMode
                            ? isActive ? "bg-[#2f2f2f]" : "hover:bg-[#2a2a2a]"
                            : isActive ? "bg-gray-50" : "hover:bg-gray-50"
                        )}
                      >
                        <div className={clsx(
                          "w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 border",
                          isDarkMode ? "bg-[#2a2a2a] border-[#3a3a3a] text-[#999]" : "bg-white border-gray-200 text-gray-400"
                        )}>
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={clsx(
                            "text-sm font-medium truncate",
                            isDarkMode ? "text-[#ececec]" : "text-gray-900"
                          )}>
                            {org.name}
                          </p>
                        </div>
                        {isActive && (
                          <Check className={clsx(
                            "w-4 h-4 flex-shrink-0",
                            isDarkMode ? "text-[#ececec]" : "text-gray-900"
                          )} strokeWidth={2.5} />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className={clsx(
                  "border-t mx-1.5",
                  isDarkMode ? "border-[#333]" : "border-gray-100"
                )} />

                <div className="p-1.5">
                  <button className={clsx(
                    "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors",
                    isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-50"
                  )}>
                    <div className={clsx(
                      "w-7 h-7 rounded-md flex items-center justify-center border border-dashed",
                      isDarkMode ? "border-[#555] text-[#666]" : "border-gray-300 text-gray-400"
                    )}>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <span className={clsx(
                      "text-sm font-medium",
                      isDarkMode ? "text-[#888]" : "text-gray-500"
                    )}>
                      Add Organization
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {!collapsed && (
              <div className={clsx(
                "px-3 text-xs font-medium uppercase tracking-wider mb-2 transition-colors duration-200",
                isDarkMode ? "text-[#666]" : "text-gray-400"
              )}>
                {section.title}
              </div>
            )}
            
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id as any)}
                    className={clsx(
                      "w-full flex items-center rounded-lg text-sm font-medium transition-colors relative group",
                      collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                      isDarkMode
                        ? isActive 
                          ? "bg-[#2f2f2f] text-[#ececec]" 
                          : "text-[#9b9b9b] hover:bg-[#212121] hover:text-[#ececec]"
                        : isActive 
                          ? "bg-gray-100 text-gray-900" 
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {item.isSvg ? (
                      <svg
                        className={clsx(
                          "w-5 h-5 flex-shrink-0 transition-all",
                          isDarkMode
                            ? isActive ? "opacity-100" : "opacity-[0.55] group-hover:opacity-100"
                            : isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                        )}
                        viewBox="0 0 39 39"
                        fill="none"
                      >
                        <circle cx="24.7105" cy="24.7105" r="12.7895" stroke={isDarkMode ? '#fff' : '#000'} strokeLinecap="round" strokeWidth="3" />
                        <circle cx="14.2895" cy="14.2895" r="12.7895" fill={isDarkMode ? '#171717' : '#fff'} stroke={isDarkMode ? '#fff' : '#000'} strokeLinecap="round" strokeWidth="3" />
                      </svg>
                    ) : (
                      <img 
                        src={item.iconSrc} 
                        alt={item.label}
                        className={clsx(
                          "w-5 h-5 flex-shrink-0 object-contain transition-all",
                          isDarkMode ? "invert brightness-200" : "",
                          isDarkMode
                            ? isActive ? "opacity-100" : "opacity-[0.55] group-hover:opacity-100"
                            : isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                        )} 
                      />
                    )}
                    
                    {!collapsed && (
                      <span className="whitespace-nowrap overflow-hidden flex-1 text-left">
                        {item.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Area */}
      <div className={collapsed ? "p-3" : "px-4 pb-4"}>
        {/* Dark / Light Mode Toggle */}
        <div className={clsx("", collapsed ? "flex justify-center" : "")}>
          <button
            onClick={onToggleDarkMode}
            className={clsx(
              "flex items-center gap-2.5 rounded-lg text-sm transition-colors",
              collapsed ? "p-2.5" : "w-full px-3 py-2",
              isDarkMode 
                ? "hover:bg-[#2f2f2f]" 
                : "hover:bg-gray-100"
            )}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Moon className="w-[18px] h-[18px] flex-shrink-0 text-[#9b9b9b]" strokeWidth={1.8} />
            ) : (
              <Sun className="w-[18px] h-[18px] flex-shrink-0 text-gray-500" strokeWidth={1.8} />
            )}
            {!collapsed && (
              <span className={clsx(
                "font-medium",
                isDarkMode ? "text-[#9b9b9b]" : "text-gray-500"
              )}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className={clsx(
          "border-t transition-colors duration-200",
          isDarkMode ? "border-[#2f2f2f]" : "border-gray-100",
          collapsed ? "my-3" : "my-2 mx-1"
        )} />

        {/* User Profile */}
        <div className={clsx(
          "flex items-center",
          collapsed ? "justify-center flex-col gap-4" : "gap-3"
        )}>
           <div className={clsx(
             "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
             currentUser.avatarBg, currentUser.avatarText
           )}>
             {currentUser.initials}
           </div>
           
           {!collapsed && (
             <div className="flex-1 min-w-0">
               <p className={clsx(
                 "text-sm font-medium truncate transition-colors duration-200",
                 isDarkMode ? "text-[#ececec]" : "text-gray-900"
               )}>{currentUser.name}</p>
               <p className={clsx(
                 "text-[10px] truncate leading-tight mt-0.5 transition-colors duration-200",
                 isDarkMode ? "text-[#777]" : "text-gray-500"
               )}>{currentUser.title}</p>
             </div>
           )}

           {!collapsed && (
             <button 
               onClick={onLogout}
               className={clsx(
                 "transition-colors rounded-lg p-2",
                 isDarkMode 
                   ? "text-[#777] hover:text-[#ececec] hover:bg-[#2f2f2f]" 
                   : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
               )}
               title="Log out"
             >
               <LogOut className="w-5 h-5" />
             </button>
           )}
        </div>
      </div>
    </motion.div>
  );
}