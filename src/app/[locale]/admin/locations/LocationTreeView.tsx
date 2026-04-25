"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, MapPin, Edit2, Trash2, Plus, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface Location {
  id: number;
  name: string | { ar: string; en: string };
  slug: string;
  type: "governorate" | "city" | "area";
  parent_id: number | null;
  children?: Location[];
}

interface LocationTreeViewProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (location: Location) => void;
  onAddChild: (parent: Location) => void;
  locale: string;
}

export default function LocationTreeView({
  locations,
  onEdit,
  onDelete,
  onAddChild,
  locale
}: LocationTreeViewProps) {
  const t = useTranslations("AdminLocations");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  // Function to build tree structure from flat array
  const buildTree = (list: Location[]) => {
    const map: Record<number, any> = {};
    const tree: any[] = [];

    list.forEach(loc => {
      map[loc.id] = { ...loc, children: [] };
    });

    list.forEach(loc => {
      if (loc.parent_id && map[loc.parent_id]) {
        map[loc.parent_id].children.push(map[loc.id]);
      } else if (!loc.parent_id) {
        tree.push(map[loc.id]);
      }
    });

    return tree;
  };

  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const getName = (location: Location) => {
    if (typeof location.name === "string") return location.name;
    return locale === "en" ? location.name.en : location.name.ar;
  };

  const filteredTree = buildTree(locations).filter(root => {
    if (!searchQuery) return true;
    const match = (node: any): boolean => {
      const nameMatch = getName(node).toLowerCase().includes(searchQuery.toLowerCase());
      const childrenMatch = node.children?.some((child: any) => match(child));
      return nameMatch || childrenMatch;
    };
    return match(root);
  });

  const renderNode = (node: any, level: number = 0) => {
    const isExpanded = expandedIds.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const displayName = getName(node);

    // If searching, auto-expand nodes that match or have matching children
    if (searchQuery && !isExpanded) {
      const hasMatch = (n: any): boolean => {
        if (getName(n).toLowerCase().includes(searchQuery.toLowerCase())) return true;
        return n.children?.some((c: any) => hasMatch(c));
      };
      if (hasMatch(node)) {
        setExpandedIds(prev => new Set(prev).add(node.id));
      }
    }

    return (
      <div key={node.id} className="flex flex-col">
        <div 
          className={`
            group flex items-center gap-2 py-2 px-3 rounded-xl transition-all hover:bg-muted/60
            ${level > 0 ? "ms-6 border-s border-border/50 ps-4" : ""}
          `}
        >
          <button 
            onClick={() => hasChildren && toggleExpand(node.id)}
            className={`cursor-pointer p-1 rounded-md transition-colors ${hasChildren ? "hover:bg-muted text-muted-foreground" : "opacity-0 cursor-default"}`}
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 rtl:rotate-180" />}
          </button>

          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <MapPin className="h-4 w-4" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground truncate">{displayName}</span>
              <span className={`
                text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full
                ${node.type === 'governorate' ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : ""}
                ${node.type === 'city' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : ""}
                ${node.type === 'area' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : ""}
              `}>
                {t(node.type)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate opacity-0 group-hover:opacity-100 transition-opacity">
              /{node.slug}
            </p>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {node.type !== 'area' && (
              <button 
                onClick={() => onAddChild(node)}
                title={t("addLocation")}
                className="cursor-pointer p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
            <button 
              onClick={() => onEdit(node)}
              className="cursor-pointer p-1.5 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onDelete(node)}
              className="cursor-pointer p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {node.children.map((child: any) => renderNode(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all rtl:pl-4 rtl:pr-10"
        />
      </div>

      <div className="bg-background rounded-2xl border border-border p-4 shadow-sm min-h-[400px]">
        {filteredTree.length > 0 ? (
          filteredTree.map(root => renderNode(root))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-4 bg-muted rounded-full mb-4">
              <MapPin className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
            <p className="text-muted-foreground font-medium">{t("noLocations")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
