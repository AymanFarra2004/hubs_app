import { Edit2, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { deleteAdminUser } from "@/src/actions/users";
import toast from "react-hot-toast";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { useTranslations } from "next-intl";

export function UsersTable({ users, onEdit }: { users: any[], onEdit: (u: any) => void }) {
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const t = useTranslations("AdminUsers");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Match HubsTable

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const confirmDeleteAction = (user: any) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    setDeletingId(userToDelete.id);
    const res = await deleteAdminUser(userToDelete.id);
    setDeletingId(null);
    setDeleteModalOpen(false);
    setUserToDelete(null);
    if (res.success) {
      toast.success(t("deleted"));
    } else {
      toast.error(res.error || t("failedToDelete"));
    }
  };

  if (users.length === 0) {
    return <div className="p-12 text-center border border-border rounded-2xl bg-background text-muted-foreground shadow-sm">{t("noUsers")}</div>;
  }

  return (
    <>
      <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4">{t("name")}</th>
                <th className="px-6 py-4">{t("email")}</th>
                <th className="px-6 py-4">{t("phone")}</th>
                <th className="px-6 py-4">{t("role")}</th>
                <th className="px-6 py-4 text-center">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.phone || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'hub_owner' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {user.role === 'hub_owner' ? (t("hubOwner") || 'Hub Owner') : (t("regularUser") || 'Regular User')}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <button 
                      onClick={() => onEdit(user)}
                      className="cursor-pointer p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors"
                      title={t("editUser")}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => confirmDeleteAction(user)}
                      disabled={deletingId === user.id}
                      className="cursor-pointer p-2 text-muted-foreground hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors disabled:opacity-50"
                      title={t("deleteUser")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {users.length > 0 && (
          <div className="px-6 py-4 bg-muted/20 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-medium">
              {t("showing", {
                count: paginatedUsers.length,
                total: users.length
              })}
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="cursor-pointer px-3 py-1.5 border border-border bg-background rounded-lg text-xs font-semibold hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("previous")}
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? "bg-primary text-white shadow-sm"
                            : "hover:bg-muted text-muted-foreground border border-transparent"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="cursor-pointer px-3 py-1.5 border border-border bg-background rounded-lg text-xs font-semibold hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("next")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <DeleteConfirmationModal 
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={handleDelete}
        userName={userToDelete?.name || ""}
        isDeleting={deletingId !== null}
      />
    </>
  );
}
