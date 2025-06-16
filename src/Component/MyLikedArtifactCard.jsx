import { useState } from "react"
import { Link } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Eye,
  Calendar,
  MapPin,
  User,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from "lucide-react"

const MyLikedArtifactCard = ({ artifact, viewMode = "grid", showLikeStatus = true }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(true) // Always true for liked artifacts
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleUnlike = async () => {
    setIsLiked(false)
    // Here you would make an API call to unlike the artifact
    console.log("Unliked artifact:", artifact._id)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  if (viewMode === "list") {
    return (
      <motion.div
        variants={cardVariants}
        className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/10 hover:border-pink-400/30 transition-all duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(20,20,20,0.95) 50%, rgba(0,0,0,0.85) 100%)",
          backdropFilter: "blur(25px) saturate(200%)",
          WebkitBackdropFilter: "blur(25px) saturate(200%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
        whileHover={{ y: -4, scale: 1.01 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        layout
      >
        <div className="flex items-center p-6 space-x-6">
          {/* Image */}
          <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
            <motion.img
              src={artifact.imageUrl || "/placeholder.svg?height=96&width=96"}
              alt={artifact.name}
              className="w-full h-full object-cover"
              variants={imageVariants}
              initial="hidden"
              animate={imageLoaded ? "visible" : "hidden"}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.src = "/placeholder.svg?height=96&width=96"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-pink-300 transition-colors">
                  {artifact.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{artifact.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{artifact.createdAt}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{artifact.presentLocation}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <motion.button
                  onClick={handleUnlike}
                  className="p-2 rounded-lg bg-pink-500/20 border border-pink-400/30 text-pink-400 hover:bg-pink-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </motion.button>

                <Link
                  to={`/artifacts/${artifact._id}`}
                  className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={cardVariants}
        className="group relative overflow-hidden rounded-3xl backdrop-blur-xl border border-white/10 hover:border-pink-400/30 transition-all duration-700"
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
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        {/* Liked Badge */}
        {showLikeStatus && (
          <div className="absolute top-4 left-4 z-20">
            <motion.div
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/90 to-red-600/90 text-white font-bold text-xs backdrop-blur-sm border border-pink-300/20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Heart className="h-3 w-3 fill-current" />
              <span>LIKED</span>
            </motion.div>
          </div>
        )}

        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={artifact.imageUrl || "/placeholder.svg?height=250&width=400"}
            alt={artifact.name}
            className="w-full h-full object-cover"
            variants={imageVariants}
            initial="hidden"
            animate={imageLoaded ? "visible" : "hidden"}
            onLoad={() => setImageLoaded(true)}
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
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/95 to-amber-600/95 text-black font-bold text-xs backdrop-blur-sm border border-amber-300/30 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {artifact.type}
            </motion.div>
          </div>

          {/* Floating sparkle effect */}
          <motion.div
            className="absolute bottom-6 left-6 text-pink-400/80"
            animate={{
              y: [0, -10, 0],
              opacity: [0.8, 1, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>

          {/* Popularity indicator */}
          {(artifact.likedBy?.length || 0) > 10 && (
            <div className="absolute bottom-4 right-4">
              <motion.div
                className="flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-to-r from-green-500/80 to-green-600/80 text-white text-xs font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <TrendingUp className="h-3 w-3" />
                <span>POPULAR</span>
              </motion.div>
            </div>
          )}
        </div>

        {/* Enhanced Content Section */}
        <div className="p-6 relative z-10">
          {/* Title */}
          <motion.h3
            className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-pink-300 transition-colors duration-300"
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

            <div className="flex items-center space-x-3 text-gray-300">
              <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-400/30">
                <User className="h-3.5 w-3.5 text-purple-400" />
              </div>
              <span className="text-sm font-medium">{artifact.discoveredBy}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">{artifact.description}</p>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              to={`/artifacts/${artifact._id}`}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-red-600/20 text-pink-300 font-semibold hover:from-pink-500/30 hover:to-red-600/30 transition-all duration-300 backdrop-blur-sm border border-pink-400/20 hover:border-pink-400/40 group/btn"
            >
              <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
              <span>View Details</span>
              <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>

            <motion.button
              onClick={handleUnlike}
              className="px-4 py-3 rounded-xl bg-pink-500/20 backdrop-blur-sm border border-pink-400/30 text-pink-400 hover:bg-pink-500/30 hover:text-pink-300 transition-all duration-300 group/btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Unlike this artifact"
            >
              <Heart className="h-4 w-4 fill-current group-hover/btn:scale-110 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Enhanced Hover Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MyLikedArtifactCard