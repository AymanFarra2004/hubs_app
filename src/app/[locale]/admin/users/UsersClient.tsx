"use client";

import { useState, useMemo, Suspense } from "react";
import { UsersTable } from "./UsersTable";
import { UserModal } from "./UserModal";
import { Plus } from "lucide-react";
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
    if (currentRole === 'all') return initialUsers;
    return initialUsers.filter(u => u.role === currentRole);
  }, [initialUsers, currentRole]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Tabs */}
        <div className="flex bg-muted/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => handleTabChange('all')}
            className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${currentRole === 'all' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t("allUsers") || "All"}
          </button>
          <button 
            onClick={() => handleTabChange('user')}
            className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${currentRole === 'user' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t("regularUser") || "Regular"}
          </button>
          <button 
            onClick={() => handleTabChange('hub_owner')}
            className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${currentRole === 'hub_owner' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t("hubOwner") || "Hub Owners"}
          </button>
        </div>

        <button 
          onClick={handleAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto shrink-0"
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
