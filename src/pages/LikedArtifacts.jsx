import { useLoaderData } from "react-router"
import { motion } from "framer-motion"
import { Heart, Sparkles, Star, TrendingUp } from "lucide-react"
import MyLikedArtifactCard from "./MyLikedArtifactCard"

const LikedArtifacts = () => {
  const likedArtifacts = useLoaderData()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-red-600/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(239,68,68,0.08),transparent_50%)]"></div>

      {/* Floating Icons */}
      {[Heart, Star, Sparkles, TrendingUp].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400/20"
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
          <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 fill-current" />
            <span className="text-pink-400 font-medium text-sm sm:text-base">Your Collection</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide">
            Liked{" "}
            <span className="bg-gradient-to-r from-pink-400 via-pink-300 to-red-500 bg-clip-text text-transparent">
              Artifacts
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Your curated collection of fascinating historical discoveries
          </p>

          {/* Stats Badge */}
          {likedArtifacts.length > 0 && (
            <motion.div
              className="inline-flex items-center space-x-2 mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/20 to-red-600/20 backdrop-blur-sm border border-pink-400/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Heart className="h-4 w-4 text-pink-400 fill-current" />
              <span className="text-pink-300 font-semibold">
                {likedArtifacts.length} {likedArtifacts.length === 1 ? "Artifact" : "Artifacts"} Liked
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Content */}
        {likedArtifacts.length === 0 ? (
          <motion.div
            className="text-center py-16 sm:py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl backdrop-blur-xl border border-white/10"
              style={{
                background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 100%)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500/20 to-red-600/20 flex items-center justify-center border border-pink-400/20"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-pink-400" />
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">No Liked Artifacts Yet</h3>

              <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base px-2">
                Start exploring our collection and like artifacts that fascinate you. Your liked items will appear here
                for easy access.
              </p>

              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-600 text-white font-semibold rounded-xl hover:from-pink-400 hover:to-red-500 transition-all duration-300 shadow-lg shadow-pink-600/30 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/all-artifacts")}
              >
                Explore Artifacts
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {likedArtifacts.map((artifact) => (
              <motion.div key={artifact._id} variants={itemVariants} className="w-full">
                <MyLikedArtifactCard artifact={artifact} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom Decoration */}
        {likedArtifacts.length > 0 && (
          <motion.div
            className="text-center mt-16 sm:mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <Sparkles className="h-4 w-4 text-pink-400" />
              <span className="text-gray-400 text-sm">Keep exploring to discover more amazing artifacts</span>
              <Sparkles className="h-4 w-4 text-pink-400" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default LikedArtifacts
