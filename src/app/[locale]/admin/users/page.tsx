import { getAdminUsers } from "@/src/actions/users";
import { getTranslations } from "next-intl/server";
import { UsersClient } from "./UsersClient";

export default async function AdminUsersPage() {
  const usersRes = await getAdminUsers();
  const t = await getTranslations("AdminUsers");
  
  let users = usersRes.data || [];
  if (!Array.isArray(users)) {
    users = users.data || [];
  }
  if (!Array.isArray(users)) users = [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("description")}</p>
      </div>

      <UsersClient initialUsers={users} translations={{
        addUser: t("addUser"),
        editUser: t("editUser"),
        deleteUser: t("deleteUser"),
        name: t("name"),
        email: t("email"),
        phone: t("phone"),
        role: t("role"),
        specialization: t("specialization"),
        password: t("password"),
        passwordConfirm: t("passwordConfirm"),
        actions: t("actions"),
        save: t("save"),
        cancel: t("cancel"),
        confirmDelete: t("confirmDelete"),
        noUsers: t("noUsers"),
        loading: t("loading"),
        failedToLoad: t("failedToLoad"),
        created: t("created"),
        updated: t("updated"),
        deleted: t("deleted"),
        failedToUpdate: t("failedToUpdate"),
        failedToDelete: t("failedToDelete"),
        failedToCreate: t("failedToCreate"),
        allUsers: t("allUsers"),
        regularUser: t("regularUser"),
        hubOwner: t("hubOwner"),
        confirmDeleteTitle: t("confirmDeleteTitle"),
        confirmDeleteDesc: t("confirmDeleteDesc"),
        confirmBtn: t("confirmBtn"),
        cancelBtn: t("cancelBtn")
      }} />
    </div>
  );
}
