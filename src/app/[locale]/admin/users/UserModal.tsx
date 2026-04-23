import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { createAdminUser, updateAdminUser } from "@/src/actions/users";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export function UserModal({ user, onClose }: { user: any, onClose: () => void }) {
  const isEditing = !!user;
  const t = useTranslations("AdminUsers");
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "user",
    specialization: user?.specialization || "",
    password: "",
    password_confirmation: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!isEditing && (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))) {
      newErrors.email = "Valid email is required";
    }
    if (!isEditing && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!isEditing && formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }
    if (formData.phone && !/^\+?\d{8,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = "Invalid phone format. Example: +970591234567";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    
    let payload: any = {};
    if (isEditing) {
      // Advanced editing logic
      payload.name = formData.name;
      payload.role = formData.role;
      payload.phone = formData.phone || null; // Send null if empty
    } else {
      payload.name = formData.name;
      payload.email = formData.email;
      payload.phone = formData.phone || null;
      payload.password = formData.password;
      payload.password_confirmation = formData.password_confirmation;
      payload.role = formData.role;
    }

    const action = isEditing ? updateAdminUser.bind(null, user.id) : createAdminUser;
    const res = await action(payload);
    
    setLoading(false);
    if (res.success) {
      toast.success(isEditing ? t("updated") : t("created"));
      onClose();
    } else {
      toast.error(res.error || (isEditing ? t("failedToUpdate") : t("failedToCreate")));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-background w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">{isEditing ? t("editUser") : t("addUser")}</h2>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium mb-1.5">{t("name")} *</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              className={`w-full px-4 py-2.5 border rounded-xl bg-background text-sm outline-none focus:ring-2 transition-all ${
                errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {!isEditing && (
            <div>
              <label className="block text-sm font-medium mb-1.5">{t("email")} *</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-2.5 border rounded-xl bg-background text-sm outline-none focus:ring-2 transition-all ${
                  errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5">{t("phone")}</label>
            <input 
              type="tel" 
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})}
              placeholder="e.g. +970591234567"
              className={`w-full px-4 py-2.5 border rounded-xl bg-background text-sm outline-none focus:ring-2 transition-all ${
                errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">{t("role")} *</label>
            <select
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
            >
              <option value="user">{t("regularUser") || "Regular User"}</option>
              <option value="hub_owner">{t("hubOwner") || "Hub Owner"}</option>
            </select>
          </div>

          {!isEditing && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("password")} *</label>
                <input 
                  type="password" 
                  value={formData.password} 
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className={`w-full px-4 py-2.5 border rounded-xl bg-background text-sm outline-none focus:ring-2 transition-all ${
                    errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'
                  }`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("passwordConfirm")} *</label>
                <input 
                  type="password" 
                  value={formData.password_confirmation} 
                  onChange={e => setFormData({...formData, password_confirmation: e.target.value})}
                  className={`w-full px-4 py-2.5 border rounded-xl bg-background text-sm outline-none focus:ring-2 transition-all ${
                    errors.password_confirmation ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'
                  }`}
                />
                {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
              </div>
            </>
          )}

          <div className="pt-6 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
            >
              {t("cancel")}
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
