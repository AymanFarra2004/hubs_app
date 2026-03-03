import { HubCard } from "@/src/app/[locale]/components/general/HubCard";
import { staticHubs } from "@/data/hubs";
import { IHub } from "@/data/hubs";

export default function FeaturedHubSection(){
    return(
         <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Hubs</h2>
                <p className="mt-2 text-muted-foreground">Top-rated and verified locations across Gaza.</p>
              </div>
              <a href="/hubs" className="hidden sm:flex text-primary font-medium hover:underline items-center gap-1">
                View all hubs <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticHubs.map((hub: IHub) => (
                <HubCard key={hub.id} hub={hub} />
              ))}
            </div>
            
            <div className="mt-10 sm:hidden">
              <a href="/hubs" className="block w-full bg-muted text-center py-3 rounded-lg text-foreground font-medium hover:bg-muted/80 transition-colors">
                View all hubs
              </a>
            </div>
          </div>
        </section>
    );
}