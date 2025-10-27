// import { useState } from "react";
// import { ArrowUpRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { projects } from "@/data/projects";
// import heroStructure3 from "@/assets/hero-structure-3.jpg";

// const categories = ["All", "Commercial", "Industrial", "Infrastructure", "Residential"];

// const Projects = () => {
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filteredProjects =
//     activeCategory === "All"
//       ? projects
//       : projects.filter((project) => project.category === activeCategory);

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section
//         className="relative h-[50vh] flex items-center justify-center"
//         style={{
//           backgroundImage: `url(${heroStructure3})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
//         <div className="relative container-fluid text-center space-y-4">
//           {/* Breadcrumb */}
//           <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
//             <Link to="/" className="hover:text-primary transition-colors">Home</Link>
//             <span>/</span>
//             <span className="text-primary">Projects</span>
//           </div>
          
//           <p className="text-primary text-sm uppercase tracking-widest">Our Work</p>
//           <h1 className="text-5xl md:text-7xl font-bold">Projects Portfolio</h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Showcasing excellence across commercial, industrial, infrastructure, and residential projects.
//           </p>
//         </div>
//       </section>

//       {/* Filter Categories */}
//       <section className="py-12 container-fluid border-b border-border/50">
//         <div className="flex flex-wrap gap-4 justify-center">
//           {categories.map((category) => (
//             <Button
//               key={category}
//               variant={activeCategory === category ? "hero" : "outline"}
//               onClick={() => setActiveCategory(category)}
//               className="min-w-[120px]"
//             >
//               {category}
//             </Button>
//           ))}
//         </div>
//       </section>

//       {/* Projects Grid - Asymmetric Magazine Layout */}
//       <section className="py-24 md:py-32 container-fluid">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] gap-6">
//           {filteredProjects.map((project, index) => {
//             // Create varied spans for asymmetric layout
//             const spans = [
//               "col-span-1 row-span-2",
//               "col-span-1 row-span-1",
//               "col-span-1 row-span-1",
//               "col-span-1 row-span-2",
//               "col-span-1 row-span-1",
//               "col-span-1 row-span-1",
//             ];
//             const spanClass = spans[index % spans.length];

//             return (
//               <Link
//                 key={project.id}
//                 to={`/projects/${project.id}`}
//                 className={`group relative overflow-hidden bg-muted ${spanClass}`}
//                 style={{
//                   animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`,
//                 }}
//               >
//                 {/* Project Image */}
//                 <div className="absolute inset-0">
//                   <img
//                     src={project.image}
//                     alt={project.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
//                 </div>

//                 {/* Project Info */}
//                 <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
//                   <div className="space-y-2">
//                     <p className="text-primary text-xs uppercase tracking-widest font-medium">
//                       {project.category} • {project.location} • {project.year}
//                     </p>
//                     <h3 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
//                       {project.title}
//                     </h3>
//                   </div>

//                   {/* Hover Arrow */}
//                   <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary">
//                     <ArrowUpRight className="h-6 w-6 text-primary-foreground" />
//                   </div>
//                 </div>

//                 {/* Bottom Accent Line */}
//                 <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700" />
//               </Link>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Projects;





"use client"

import { useState, useMemo } from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import { LazyImage } from "@/components/common/LazyImage"
import { Breadcrumbs } from "@/components/common/Breadcrumbs"
import { useSEO } from "@/hooks/useSEO"
import { pageSEO } from "@/lib/seo"
import heroStructure3 from "@/assets/hero-structure-3.jpg"

const categories = ["All", "Commercial", "Industrial", "Infrastructure", "Residential"]
const locations = ["All", "California", "New York", "Texas", "Other"]
const years = ["All", "2024", "2023", "2022"]
const ITEMS_PER_PAGE = 12

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeLocation, setActiveLocation] = useState("All")
  const [activeYear, setActiveYear] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  useSEO(pageSEO.projects)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch = activeCategory === "All" || project.category === activeCategory
      const locationMatch = activeLocation === "All" || project.location.includes(activeLocation)
      const yearMatch = activeYear === "All" || project.year === activeYear
      return categoryMatch && locationMatch && yearMatch
    })
  }, [activeCategory, activeLocation, activeYear])

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroStructure3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="relative container-fluid text-center space-y-4">
          <Breadcrumbs items={[{ label: "Projects", url: "/projects" }]} />

          <p className="text-primary text-sm uppercase tracking-widest">Our Work</p>
          <h1 className="text-5xl md:text-7xl font-bold">Projects Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing excellence across commercial, industrial, infrastructure, and residential projects.
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-12 container-fluid border-b border-border/50">
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "hero" : "outline"}
                  onClick={() => {
                    setActiveCategory(category)
                    handleFilterChange()
                  }}
                  className="min-w-[120px]"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">Location</h3>
            <div className="flex flex-wrap gap-3">
              {locations.map((location) => (
                <Button
                  key={location}
                  variant={activeLocation === location ? "hero" : "outline"}
                  onClick={() => {
                    setActiveLocation(location)
                    handleFilterChange()
                  }}
                  size="sm"
                >
                  {location}
                </Button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">Year</h3>
            <div className="flex flex-wrap gap-3">
              {years.map((year) => (
                <Button
                  key={year}
                  variant={activeYear === year ? "hero" : "outline"}
                  onClick={() => {
                    setActiveYear(year)
                    handleFilterChange()
                  }}
                  size="sm"
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground pt-4 border-t border-border/50">
            Showing {paginatedProjects.length} of {filteredProjects.length} projects
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 md:py-32 container-fluid">
        {paginatedProjects.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] gap-6">
              {paginatedProjects.map((project, index) => {
                const spans = [
                  "col-span-1 row-span-2",
                  "col-span-1 row-span-1",
                  "col-span-1 row-span-1",
                  "col-span-1 row-span-2",
                  "col-span-1 row-span-1",
                  "col-span-1 row-span-1",
                ]
                const spanClass = spans[index % spans.length]

                return (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className={`group relative overflow-hidden bg-muted ${spanClass}`}
                    style={{
                      animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    {/* Project Image with Lazy Loading */}
                    <div className="absolute inset-0">
                      <LazyImage
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    </div>

                    {/* Project Info */}
                    <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                      <div className="space-y-2">
                        <p className="text-primary text-xs uppercase tracking-widest font-medium">
                          {project.category} • {project.location} • {project.year}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      {/* Hover Arrow */}
                      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary">
                        <ArrowUpRight className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700" />
                  </Link>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "hero" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                    size="sm"
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No projects found matching your filters.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Projects
