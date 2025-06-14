"use client"

import { useState, useMemo, use } from "react"
import { useLoaderData, Link, NavLink } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Grid3X3,
  List,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Clock,
  Heart,
  Share2,
  Star,
  TrendingUp,
  Award,
  Package,
  Filter,
  BarChart3,
  Zap,
  Copy,
  RefreshCw,
  AlertTriangle,
  Globe,
  Users,
  Activity,
} from "lucide-react"
import { AuthContext } from "../Authentication/AuthProvider"

const MyArtifacts = () => {
  const { user } = use(AuthContext)
  const AllArtifactsData = useLoaderData()
  const artifacts = AllArtifactsData?.data || []

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [artifactToDelete, setArtifactToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  // Current user from auth context
  const currentUser = {
    email: user?.email || "",
    name: user?.displayName || "Anonymous User",
    avatar: user?.photoURL || "/placeholder.svg?height=64&width=64",
  }

  // Filter artifacts by current user's email
  const userArtifacts = useMemo(() => {
    return artifacts.filter((artifact) => artifact.email === currentUser.email)
  }, [artifacts, currentUser.email])

  // Get unique artifact types for filter
  const artifactTypes = useMemo(() => {
    const types = [...new Set(userArtifacts.map((artifact) => artifact.type))]
    return types.sort()
  }, [userArtifacts])

  // Calculate enhanced user statistics
  const userStats = useMemo(() => {
    const totalLikes = userArtifacts.reduce((sum, artifact) => sum + (artifact.likedBy?.length || 0), 0)
    const avgLikes = userArtifacts.length > 0 ? (totalLikes / userArtifacts.length).toFixed(1) : 0
    const mostLiked = userArtifacts.reduce(
      (max, artifact) => ((artifact.likedBy?.length || 0) > (max.likedBy?.length || 0) ? artifact : max),
      userArtifacts[0],
    )

    const recentlyAdded = userArtifacts.filter(
      (artifact) => new Date() - new Date(artifact.discoveredAt) < 30 * 24 * 60 * 60 * 1000,
    ).length

    return {
      total: userArtifacts.length,
      totalLikes,
      avgLikes,
      categories: artifactTypes.length,
      mostLiked: mostLiked?.name || "None",
      recentlyAdded,
    }
  }, [userArtifacts, artifactTypes.length])

  // Filter and sort artifacts
  const filteredArtifacts = useMemo(() => {
    const filtered = userArtifacts.filter((artifact) => {
      const matchesSearch =
        artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artifact.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artifact.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === "all" || artifact.type === selectedType

      // Enhanced status filtering
      const likes = artifact.likedBy?.length || 0
      const isRecent = new Date() - new Date(artifact.discoveredAt) < 30 * 24 * 60 * 60 * 1000
      let status = "new"
      if (likes > 10) status = "trending"
      else if (likes > 0) status = "liked"
      else if (isRecent) status = "recent"

      const matchesStatus = selectedStatus === "all" || status === selectedStatus

      return matchesSearch && matchesType && matchesStatus
    })

    // Enhanced sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.discoveredAt) - new Date(a.discoveredAt)
        case "oldest":
          return new Date(a.discoveredAt) - new Date(b.discoveredAt)
        case "name":
          return a.name.localeCompare(b.name)
        case "likes":
          return (b.likedBy?.length || 0) - (a.likedBy?.length || 0)
        case "type":
          return a.type.localeCompare(b.type)
        default:
          return 0
      }
    })

    return filtered
  }, [userArtifacts, searchTerm, selectedType, selectedStatus, sortBy])

  const handleDelete = async (artifact) => {
    setArtifactToDelete(artifact)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Deleting artifact:", artifactToDelete._id)
      // Here you would make the actual API call
    } catch (error) {
      console.error("Error deleting artifact:", error)
    } finally {
      setIsLoading(false)
      setShowDeleteModal(false)
      setArtifactToDelete(null)
    }
  }

  const handleEdit = (artifactId) => {
    console.log("Editing artifact:", artifactId)
    // Navigate to edit page
  }



  const getArtifactStatus = (artifact) => {
    const likes = artifact.likedBy?.length || 0
    const isRecent = new Date() - new Date(artifact.discoveredAt) < 30 * 24 * 60 * 60 * 1000

    if (likes > 10)
      return { status: "trending", color: "text-purple-400", bgColor: "bg-purple-500/20", icon: TrendingUp }
    if (likes > 0) return { status: "liked", color: "text-blue-400", bgColor: "bg-blue-500/20", icon: Heart }
    if (isRecent) return { status: "recent", color: "text-amber-400", bgColor: "bg-amber-500/20", icon: Zap }
    return { status: "new", color: "text-gray-400", bgColor: "bg-gray-500/20", icon: Package }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      // Show success toast
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const ArtifactCard = ({ artifact, index }) => {
    const { status, color, bgColor, icon: StatusIcon } = getArtifactStatus(artifact)
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.div
        variants={cardVariants}
        className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl border transition-all duration-700 ${"border-white/10 hover:border-white/30"}`}
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(20,20,20,0.95) 50%, rgba(0,0,0,0.85) 100%)",
          backdropFilter: "blur(25px) saturate(200%)",
          WebkitBackdropFilter: "blur(25px) saturate(200%)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
        whileHover={{
          y: -12,
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        layout
      >
        {/* Enhanced Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={artifact.imageUrl || "/placeholder.svg?height=250&width=400"}
            alt={artifact.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=250&width=400"
            }}
          />

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>

          {/* Type Badge */}
          <div className="absolute top-4 right-4">
            <motion.div
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/95 to-amber-600/95 text-black font-bold text-xs backdrop-blur-sm border border-amber-300/30 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {artifact.type}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="p-6 relative z-10">
          {/* Title */}
          <motion.h3
            className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors duration-300"
            layoutId={`title-${artifact._id}`}
          >
            {artifact.name}
          </motion.h3>

          {/* Enhanced Info Grid */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-400/30">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <span className="text-sm font-medium">Created: {artifact.createdAt}</span>
            </div>

            <div className="flex items-center space-x-3 text-gray-300">
              <div className="p-1.5 rounded-lg bg-blue-500/20 border border-blue-400/30">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <span className="text-sm font-medium">Found: {artifact.discoveredAt}</span>
            </div>

            <div className="flex items-center space-x-3 text-gray-300">
              <div className="p-1.5 rounded-lg bg-green-500/20 border border-green-400/30">
                <MapPin className="h-3.5 w-3.5 text-green-400" />
              </div>
              <span className="text-sm font-medium line-clamp-1">{artifact.presentLocation}</span>
            </div>
          </div>

          {/* Enhanced Stats Row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 text-gray-400">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-sm font-semibold">{artifact.likedBy?.length || 0}</span>
              </div>
            </div>

            {/* Enhanced Rating */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 transition-colors duration-200 ${
                    i < 4 ? "text-amber-400 fill-current" : "text-gray-600"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-400 ml-1">4.8</span>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              to={`/artifacts/${artifact._id}`}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 font-semibold hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-300 backdrop-blur-sm border border-amber-400/20 hover:border-amber-400/40 group/btn"
            >
              <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
              <span>View</span>
            </Link>

            <motion.button
              onClick={() => handleEdit(artifact._id)}
              className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-300 group/btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
            </motion.button>

            <motion.button
              onClick={() => handleDelete(artifact)}
              className="px-4 py-3 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-400/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/40 transition-all duration-300 group/btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Enhanced Hover Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      </motion.div>
    )
  }

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.97) 0%, rgba(20,20,20,0.99) 50%, rgba(0,0,0,0.97) 100%)",
      }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/3 via-transparent to-purple-600/3"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(251,191,36,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(147,51,234,0.06),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.03),transparent_70%)]"></div>

      {/* Enhanced Floating Icons */}
      {[Package, TrendingUp, Award, Star, Globe, Users, Activity].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-400/15"
          style={{
            left: `${8 + i * 12}%`,
            top: `${4 + i * 11}%`,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.15, 0.4, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 0.7,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        >
          <Icon className="h-10 w-10" />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header with User Profile */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced User Profile Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
            <div className="flex items-center space-x-6">
              <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <img
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt={currentUser.name}
                  className="w-20 h-20 rounded-2xl border-2 border-amber-400/40 shadow-lg shadow-amber-500/20"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=80&width=80"
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">{currentUser.name}</h1>
                <p className="text-amber-400 font-medium mb-1">Artifact Contributor</p>
                <p className="text-gray-400 text-sm">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <NavLink
                to="/add-artifacts"
                className="flex items-center space-x-3 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Artifact</span>
              </NavLink>
            </div>
          </div>

          {/* Enhanced Title and Description */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center space-x-3 mb-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Package className="h-6 w-6 text-amber-400" />
              <span className="text-amber-400 font-semibold text-lg">Personal Collection</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-wide">
              My{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Artifacts
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Manage and showcase your contributed artifacts to the global research community. Track performance, engage
              with viewers, and build your archaeological legacy.
            </p>
          </div>

          {/* Enhanced Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
            {[
              { icon: Package, value: userStats.total, label: "Total Artifacts", color: "text-amber-400" },
              { icon: Heart, value: userStats.totalLikes, label: "Total Likes", color: "text-red-400" },
              { icon: BarChart3, value: userStats.avgLikes, label: "Avg Likes", color: "text-blue-400" },
              { icon: Filter, value: userStats.categories, label: "Categories", color: "text-green-400" },
              { icon: Zap, value: userStats.recentlyAdded, label: "Recent", color: "text-yellow-400" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon
                  className={`h-8 w-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`}
                />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Controls */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div
            className="p-8 rounded-3xl backdrop-blur-xl border border-white/10"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(20,20,20,0.95) 50%, rgba(0,0,0,0.85) 100%)",
              backdropFilter: "blur(25px) saturate(200%)",
              WebkitBackdropFilter: "blur(25px) saturate(200%)",
            }}
          >
            <div className="flex flex-col xl:flex-row gap-6 items-center">
              {/* Enhanced Search */}
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your artifacts by name, type, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                />
              </div>

              {/* Enhanced Filters */}
              <div className="flex gap-3 flex-wrap">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
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

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                >
                  <option value="all" className="bg-gray-800">
                    All Status
                  </option>
                  <option value="trending" className="bg-gray-800">
                    Trending
                  </option>
                  <option value="liked" className="bg-gray-800">
                    Liked
                  </option>
                  <option value="recent" className="bg-gray-800">
                    Recent
                  </option>
                  <option value="new" className="bg-gray-800">
                    New
                  </option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                >
                  <option value="newest" className="bg-gray-800">
                    Newest First
                  </option>
                  <option value="oldest" className="bg-gray-800">
                    Oldest First
                  </option>
                  <option value="name" className="bg-gray-800">
                    Name A-Z
                  </option>
                  <option value="likes" className="bg-gray-800">
                    Most Liked
                  </option>
                  <option value="type" className="bg-gray-800">
                    By Type
                  </option>
                </select>

                {/* Enhanced View Mode Toggle */}
                <div className="flex rounded-xl bg-white/10 border border-white/20 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === "grid" ? "bg-amber-500/20 text-amber-300" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === "list" ? "bg-amber-500/20 text-amber-300" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Artifacts Grid */}
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
              {filteredArtifacts.map((artifact, index) => (
                <ArtifactCard key={artifact._id} artifact={artifact} index={index} />
              ))}
            </motion.div>
          ) : userArtifacts.length === 0 ? (
            <motion.div
              key="empty-state"
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-8">
                <Package className="h-24 w-24 text-gray-400 mx-auto mb-6" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No artifacts yet</h3>
              <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">
                Start building your collection by adding your first artifact. Share your discoveries with the world!
              </p>
              <Link
                to="/add-artifacts"
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-600/30"
              >
                <Plus className="h-6 w-6" />
                <span>Add Your First Artifact</span>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Search className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">No artifacts found</h3>
              <p className="text-gray-400 mb-8 text-lg">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <motion.button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedType("all")
                  setSelectedStatus("all")
                }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <div className="p-4 rounded-2xl bg-red-500/20 border border-red-400/30 w-fit mx-auto mb-6">
                    <AlertTriangle className="h-12 w-12 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Delete Artifact</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    Are you sure you want to delete{" "}
                    <span className="text-white font-semibold">"{artifactToDelete?.name}"</span>? This action cannot be
                    undone and will permanently remove the artifact from your collection.
                  </p>
                  <div className="flex space-x-4">
                    <motion.button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-6 py-3 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300 font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isLoading}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={confirmDelete}
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all duration-300 font-medium disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/30 w-fit mx-auto mb-6">
                    <Share2 className="h-12 w-12 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Share Artifact</h3>
                  <p className="text-gray-400 mb-6">
                    Share <span className="text-white font-semibold">"{artifactToShare?.name}"</span> with others
                  </p>

                  <div className="space-y-3 mb-6">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 transition-all duration-200">
                      <Share2 className="h-5 w-5" />
                      <span>Share on Twitter</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-blue-800/20 border border-blue-700/30 text-blue-300 hover:bg-blue-800/30 transition-all duration-200">
                      <Share2 className="h-5 w-5" />
                      <span>Share on Facebook</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/artifacts/${artifactToShare?._id}`)}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-600/20 border border-gray-500/30 text-gray-300 hover:bg-gray-600/30 transition-all duration-200"
                    >
                      <Copy className="h-5 w-5" />
                      <span>Copy Link</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setShowShareModal(false)}
                    className="w-full px-6 py-3 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300 font-medium"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MyArtifacts
