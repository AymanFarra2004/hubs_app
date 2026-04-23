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

      <UsersClient initialUsers={users} />
    </div>
  );
}
