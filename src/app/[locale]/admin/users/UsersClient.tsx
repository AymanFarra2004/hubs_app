"use client";

import { useState, useMemo, Suspense } from "react";
import { UsersTable } from "./UsersTable";
import { UserModal } from "./UserModal";
import { Plus, Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

function UsersContent({ initialUsers }: { initialUsers: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("AdminUsers");
  
  const currentRole = searchParams.get('role') || 'all';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (user: any) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  };

  const handleTabChange = (role: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (role === 'all') {
      params.delete('role');
    } else {
      params.set('role', role);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const filteredUsers = useMemo(() => {
    let filtered = initialUsers;
    
    if (currentRole !== 'all') {
      filtered = filtered.filter(u => u.role === currentRole);
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(u => 
        (u.name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.phone || "").toLowerCase().includes(q)
      );
    }
    
    return filtered;
  }, [initialUsers, currentRole, searchQuery]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full sm:w-auto">
          {/* Tabs */}
          <div className="flex bg-muted/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => handleTabChange('all')}
              className={`cursor-pointer flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${currentRole === 'all' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t("allUsers") || "All"}
            </button>
            <button 
              onClick={() => handleTabChange('user')}
              className={`cursor-pointer flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${currentRole === 'user' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t("regularUser") || "Regular"}
            </button>
            <button 
              onClick={() => handleTabChange('hub_owner')}
              className={`cursor-pointer flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${currentRole === 'hub_owner' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t("hubOwner") || "Hub Owners"}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("searchPlaceholder") || "Search users..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 ps-10 pe-4 rounded-xl border border-input bg-muted/20 text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        <button 
          onClick={handleAdd}
          className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto shrink-0"
        >
          <Plus className="h-4 w-4" />
          {t("addUser")}
        </button>
      </div>
      
      <UsersTable 
        users={filteredUsers} 
        onEdit={handleEdit} 
      />

      {isModalOpen && (
        <UserModal 
          user={userToEdit} 
          onClose={handleClose} 
        />
      )}
    </div>
  );
}

export function UsersClient({ initialUsers }: { initialUsers: any[] }) {
  const t = useTranslations("AdminUsers");
  return (
    <Suspense fallback={<div className="h-40 flex items-center justify-center animate-pulse rounded-2xl border border-border bg-background shadow-sm text-muted-foreground">{t("loading") || "Loading..."}</div>}>
      <UsersContent initialUsers={initialUsers} />
    </Suspense>
  );
}
