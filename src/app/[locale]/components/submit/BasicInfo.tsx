import React from 'react'

const BasicInfo = () => {
  return (
    <section className="space-y-4">
                <h2 className="text-xl font-semibold border-b border-border pb-2">1. Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Hub Name</label>
                  <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Al-Bahr Connection" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Governorate</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select Governorate</option>
                      <option value="North Gaza">North Gaza</option>
                      <option value="Gaza City">Gaza City</option>
                      <option value="Deir al-Balah">Deir al-Balah</option>
                      <option value="Khan Yunis">Khan Yunis</option>
                      <option value="Rafah">Rafah</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Detailed Location</label>
                    <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Al-Rashid St, Near the Port" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                  <textarea rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Describe the atmosphere, specific directions, or rules..." />
                </div>
              </section>
  )
}

export default BasicInfo