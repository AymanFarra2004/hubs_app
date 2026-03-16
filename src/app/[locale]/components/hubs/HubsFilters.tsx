import React from 'react'
import { Filter, Search, MapPin, Zap, Wifi } from 'lucide-react'
export default function HubsFilters() {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 font-semibold text-lg mb-6 pb-4 border-b border-border">
                <Filter className="h-5 w-5" />
                Filters
            </div>    
            {/* Search */}
            <div className="space-y-3 mb-6">
                <label className="text-sm font-medium text-foreground">Search Name</label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="e.g. Al-Bahr Connection"
                      className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                    />
                </div>
            </div>

            {/* Location Filter */}
            <div className="space-y-3 mb-6">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Governorate
                </label>
                <div className="space-y-2">
                    {["North Gaza", "Gaza City", "Deir al-Balah", "Khan Yunis", "Rafah"].map(gov => (
                        <div key={gov} className="flex items-center space-x-2">
                            <input type="checkbox" id={`gov-${gov}`} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            <label htmlFor={`gov-${gov}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {gov}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Services Filter */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4" /> Essential Services
                </label>
                <div className="space-y-2">
                    {[
                      { name: "Internet", icon: <Wifi className="h-3 w-3 inline mr-1" /> },
                      { name: "Electricity", icon: <Zap className="h-3 w-3 inline mr-1" /> },
                      { name: "Workspace", icon: null }
                    ].map(service => (
                      <div key={service.name} className="flex items-center space-x-2">
                        <input type="checkbox" id={`srv-${service.name}`} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        <label htmlFor={`srv-${service.name}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {service.icon} {service.name}
                        </label>
                      </div>
                    ))}
                </div>
            </div>
            
            <button className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-4 py-2 rounded-md font-medium transition-colors">
                Apply Filters
            </button>
        </div>
    </aside>
  )
}