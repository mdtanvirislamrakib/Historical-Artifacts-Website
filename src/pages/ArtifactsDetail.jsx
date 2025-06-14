"use client"

import { useState, useEffect } from "react"
import { useLoaderData, Link, useNavigate } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Calendar,
  MapPin,
  User,
  Clock,
  FileText,
  Mail,
  Eye,
  Bookmark,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Copy,
  Check,
  Star,
  Globe,
  Camera,
  History,
  Award,
} from "lucide-react"

const ArtifactsDetail = () => {
  const artifactData = useLoaderData()
  const artifact = artifactData?.data
  const navigate = useNavigate()

  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [imageZoom, setImageZoom] = useState(1)
  const [imageRotation, setImageRotation] = useState(0)
  const [showFullImage, setShowFullImage] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  // Mock user data - replace with actual user context
  const currentUser = {
    email: "user@example.com",
  }

  useEffect(() => {
    // Check if current user has liked this artifact
    if (artifact?.likedBy?.includes(currentUser.email)) {
      setIsLiked(true)
    }
  }, [artifact, currentUser.email])

  const handleLike = async () => {
    setIsLiked(!isLiked)
    // Here you would make an API call to update the like status
    console.log(`${isLiked ? "Unliked" : "Liked"} artifact:`, artifact._id)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    console.log(`${isBookmarked ? "Removed bookmark" : "Bookmarked"} artifact:`, artifact._id)
  }

  const handleShare = async (platform) => {
    const url = window.location.href
    const text = `Check out this amazing artifact: ${artifact.name}`

    switch (platform) {
      case "copy":
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error("Failed to copy:", err)
        }
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      default:
        break
    }
    setShareMenuOpen(false)
  }

  const handleImageZoom = (direction) => {
    if (direction === "in" && imageZoom < 3) {
      setImageZoom(imageZoom + 0.5)
    } else if (direction === "out" && imageZoom > 0.5) {
      setImageZoom(imageZoom - 0.5)
    }
  }

  const handleImageRotate = () => {
    setImageRotation((prev) => (prev + 90) % 360)
  }

  if (!artifact) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Artifact not found</h2>
          <Link to="/artifacts" className="text-amber-400 hover:text-amber-300">
            Back to All Artifacts
          </Link>
        </div>
      </div>
    )
  }

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.08),transparent_50%)]"></div>

      {/* Floating Icons */}
      {[History, Award, Camera, Globe, Star].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-400/20"
          style={{
            left: `${5 + i * 22}%`,
            top: `${8 + i * 12}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.8,
          }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Navigation */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </motion.button>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={handleLike}
              className={`p-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                isLiked
                  ? "bg-red-500/20 border-red-400/30 text-red-400"
                  : "bg-white/10 border-white/20 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            </motion.button>

            <motion.button
              onClick={handleBookmark}
              className={`p-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                isBookmarked
                  ? "bg-amber-500/20 border-amber-400/30 text-amber-400"
                  : "bg-white/10 border-white/20 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
            </motion.button>

            <div className="relative">
              <motion.button
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="h-5 w-5" />
              </motion.button>

              <AnimatePresence>
                {shareMenuOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-50"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2">
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                        <span>{copied ? "Copied!" : "Copy Link"}</span>
                      </button>
                      <button
                        onClick={() => handleShare("twitter")}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share on Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share on Facebook</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Image Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Main Image */}
            <div
              className="relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 group"
              style={{
                background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div className="aspect-square relative overflow-hidden">
                <motion.img
                  src={artifact.imageUrl || "/placeholder.svg?height=600&width=600"}
                  alt={artifact.name}
                  className="w-full h-full object-cover cursor-zoom-in"
                  style={{
                    transform: `scale(${imageZoom}) rotate(${imageRotation}deg)`,
                    transition: "transform 0.3s ease",
                  }}
                  onClick={() => setShowFullImage(true)}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=600&width=600"
                  }}
                />

                {/* Image Controls */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    onClick={() => handleImageZoom("out")}
                    className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleImageZoom("in")}
                    className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    onClick={handleImageRotate}
                    className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <RotateCw className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Zoom indicator */}
                {imageZoom !== 1 && (
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                    {Math.round(imageZoom * 100)}%
                  </div>
                )}
              </div>
            </div>

            {/* Image Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <Eye className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">1.2K</div>
                <div className="text-sm text-gray-400">Views</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <Heart className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">{artifact.likedBy?.length || 0}</div>
                <div className="text-sm text-gray-400">Likes</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <Download className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">89</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Title and Type */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-black font-bold text-sm backdrop-blur-sm border border-amber-300/20"
                  whileHover={{ scale: 1.05 }}
                >
                  {artifact.type}
                </motion.div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                  ))}
                  <span className="text-gray-400 text-sm ml-2">(4.9)</span>
                </div>
              </div>

              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
                layoutId={`title-${artifact._id}`}
              >
                {artifact.name}
              </motion.h1>

              <p className="text-xl text-gray-300 leading-relaxed">{artifact.description}</p>
            </div>

            {/* Key Information Grid */}
            <div
              className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl backdrop-blur-xl border border-white/10"
              style={{
                background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,20,20,0.8) 50%, rgba(0,0,0,0.6) 100%)",
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/30">
                    <Calendar className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Created</div>
                    <div className="text-white font-medium">{artifact.createdAt}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Discovered</div>
                    <div className="text-white font-medium">{artifact.discoveredAt}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-500/20 border border-green-400/30">
                    <User className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Discovered By</div>
                    <div className="text-white font-medium">{artifact.discoveredBy}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                    <MapPin className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Present Location</div>
                    <div className="text-white font-medium">{artifact.presentLocation}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Context */}
            <div
              className="p-6 rounded-2xl backdrop-blur-xl border border-white/10"
              style={{
                background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,20,20,0.8) 50%, rgba(0,0,0,0.6) 100%)",
              }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/30">
                  <History className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Historical Context</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{artifact.historicalContext}</p>
            </div>

            {/* Submitter Information */}
            <div
              className="p-6 rounded-2xl backdrop-blur-xl border border-white/10"
              style={{
                background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,20,20,0.8) 50%, rgba(0,0,0,0.6) 100%)",
              }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-400/30">
                  <Mail className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Submitted By</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 rounded-full flex items-center justify-center border border-indigo-400/20">
                  <User className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{artifact.email}</div>
                  <div className="text-gray-400 text-sm">Artifact Contributor</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-600/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="h-5 w-5" />
                <span>Download High-Res</span>
              </motion.button>

              <motion.button
                className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="h-5 w-5" />
                <span>View Research Papers</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Full Screen Image Modal */}
        <AnimatePresence>
          {showFullImage && (
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFullImage(false)}
            >
              <motion.div
                className="relative max-w-4xl max-h-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={artifact.imageUrl || "/placeholder.svg?height=800&width=800"}
                  alt={artifact.name}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=800&width=800"
                  }}
                />
                <button
                  onClick={() => setShowFullImage(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-200"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ArtifactsDetail
