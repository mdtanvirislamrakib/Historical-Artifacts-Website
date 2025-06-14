
import { useState, useMemo } from "react"
import { useLoaderData, Link } from "react-router" 
import { motion, AnimatePresence } from "framer-motion"
import {
  Eye,
  Calendar,
  MapPin,
  User,
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  Clock,
  Tag,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from "lucide-react"

const AllArtifacts = () => {
  const AllArtifactsData = useLoaderData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const artifacts = AllArtifactsData?.data || []

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("name") // 'name', 'type', 'createdAt'

  // Get unique artifact types for filter
  const artifactTypes = useMemo(() => {
    const types = [...new Set(artifacts.map((artifact) => artifact.type))]
    return types.sort()
  }, [artifacts])

  // Filter and sort artifacts
  const filteredArtifacts = useMemo(() => {
    const filtered = artifacts.filter((artifact) => {
      const matchesSearch =
        artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artifact.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artifact.discoveredBy.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === "all" || artifact.type === selectedType
      return matchesSearch && matchesType
    })

    // Sort artifacts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "type":
          return a.type.localeCompare(b.type)
        case "createdAt":
          return new Date(b.createdAt) - new Date(a.createdAt) // Fixed date comparison
        default:
          return 0
      }
    })

    return filtered
  }, [artifacts, searchTerm, selectedType, sortBy])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const ArtifactCard = ({ artifact }) => ( // Removed unused index prop
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
      layout
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={artifact.imageUrl || "/placeholder.svg?height=200&width=300"}
          alt={artifact.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=200&width=300"
          }}
          whileHover={{ scale: 1.1 }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <motion.div
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-black font-bold text-xs backdrop-blur-sm border border-amber-300/20"
            whileHover={{ scale: 1.05 }}
          >
            {artifact.type}
          </motion.div>
        </div>

        {/* Like button */}
        <div className="absolute top-4 right-4">
          <motion.button
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Floating sparkle effect */}
        <motion.div
          className="absolute top-6 right-12 text-amber-400/60"
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-4 w-4" />
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative z-10">
        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors duration-300"
          layoutId={`title-${artifact._id}`}
        >
          {artifact.name}
        </motion.h3>

        {/* Info Grid */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span className="text-sm">Created: {new Date(artifact.createdAt).toLocaleDateString()}</span> {/* Fixed date display */}
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <User className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span className="text-sm">Discovered by: {artifact.discoveredBy}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span className="text-sm line-clamp-1">Location: {artifact.presentLocation}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span className="text-sm">Found: {new Date(artifact.discoveredAt).toLocaleDateString()}</span> {/* Fixed date display */}
          </div>
        </div>

        {/* View Detail Button */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to={`/artifacts/${artifact._id}`}
            className="group/btn flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 font-medium hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-300 backdrop-blur-sm border border-amber-400/20 hover:border-amber-400/40"
          >
            <Eye className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
            <span>View Details</span>
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>

          {/* Likes count */}
          <div className="flex items-center space-x-1 text-gray-400">
            <Heart className="h-4 w-4" />
            <span className="text-sm">{artifact.likedBy?.length || 0}</span>
          </div>
        </motion.div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  )

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.08),transparent_50%)]"></div>

      {/* Floating Icons */}
      {[Search, Filter, Grid3X3, TrendingUp, Tag].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-400/20"
          style={{
            left: `${10 + i * 20}%`,
            top: `${5 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.2,
          }}
        >
          <Icon className="h-8 w-8" />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-5 w-5 text-amber-400" />
            <span className="text-amber-400 font-medium">Discover History</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            All{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Artifacts
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive collection of historical artifacts from around the world
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{artifacts.length}</div>
              <div className="text-sm text-gray-400">Total Artifacts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{artifactTypes.length}</div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{filteredArtifacts.length}</div>
              <div className="text-sm text-gray-400">Showing</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div
            className="p-6 rounded-2xl backdrop-blur-xl border border-white/10"
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search artifacts by name, description, or discoverer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                />
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
              >
                <option value="all" className="bg-gray-800">
                  All Types
                </option>
                {artifactTypes.map((type) => (
                  <option key={type} value={type} className="bg-gray-800">
                    {type}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
              >
                <option value="name" className="bg-gray-800">
                  Sort by Name
                </option>
                <option value="type" className="bg-gray-800">
                  Sort by Type
                </option>
                <option value="createdAt" className="bg-gray-800">
                  Sort by Era
                </option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex rounded-xl bg-white/10 border border-white/20 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid" ? "bg-amber-500/20 text-amber-300" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "list" ? "bg-amber-500/20 text-amber-300" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Artifacts Grid */}
        <AnimatePresence mode="wait">
          {filteredArtifacts.length > 0 ? (
            <motion.div
              key="artifacts-grid"
              className={`grid gap-8 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 lg:grid-cols-2"
              }`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
            >
              {filteredArtifacts.map((artifact) => (
                <ArtifactCard key={artifact._id} artifact={artifact} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No artifacts found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <motion.button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedType("all")
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AllArtifacts