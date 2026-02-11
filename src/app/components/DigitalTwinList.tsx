import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { clsx } from 'clsx';
import { Employee } from '../types';
import { Avatar } from './Avatar';

interface DigitalTwinListProps {
  employees: Employee[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function DigitalTwinList({ employees, selectedId, onSelect }: DigitalTwinListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-[375px] flex-shrink-0">
      {/* Header Section */}
      <div className="flex-shrink-0 bg-white z-20">
        {/* Title and Actions */}
        <div className="h-[72px] px-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Digital Avatars</h2>
        </div>
        
        {/* Search Bar */}
        <div className="px-6 py-4 pb-2">
          <div className="relative search-input-box rounded-xl bg-gray-50">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto pt-2">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            onClick={() => onSelect(emp.id)}
            className={clsx(
              "px-6 py-4 cursor-pointer transition-colors hover:bg-gray-50 flex items-start gap-4",
              selectedId === emp.id ? "bg-gray-50" : ""
            )}
          >
            <Avatar name={emp.name} size="md" />
            
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-gray-900 truncate block">{emp.name}</span>
              <p className="text-sm text-gray-500 mt-0.5">
                {emp.department}
              </p>
            </div>
          </div>
        ))}

        {filteredEmployees.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-sm">
            No digital twins found
          </div>
        )}
      </div>
    </div>
  );
}
