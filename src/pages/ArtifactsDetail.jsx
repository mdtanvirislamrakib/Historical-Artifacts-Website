import { use, useEffect, useState } from "react"
import { useLoaderData, Link, useNavigate } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Heart,
  Calendar,
  MapPin,
  User,
  Clock,
  History,
  Mail,
} from "lucide-react"
import { AuthContext } from "../Authentication/AuthProvider"
import Swal from "sweetalert2"
import axios from "axios"

const ArtifactsDetail = () => {
  const { user } = use(AuthContext)

  const artifactData = useLoaderData()
  const artifact = artifactData?.data
  const navigate = useNavigate()

  const [isLiked, setIsLiked] = useState(artifact?.likedBy?.includes(user?.email));
  const [likeCount, setLikeCount] = useState(artifact?.likedBy?.length);

  useEffect(() => {
    setIsLiked(artifact?.likedBy?.includes(user?.email))
  }, [artifact?.likedBy, user])

  const handleLike = () => {
    if (artifact?.email === user?.email) {
      return Swal.fire({
        title: "You don't like your own post!",
        icon: "warning",
        draggable: true
      });
    }

    axios.patch(`http://localhost:3000/like/${artifact?._id}`, {
      email: user?.email,
    })
    .then(data => {
      console.log("liked data", data?.data);
      setIsLiked(data?.data?.liked)
      setLikeCount(prev => data?.data?.liked ? prev + 1 : prev - 1)
    })
    .catch(err => {
      console.log(err);
    })
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

          {/* Like Button */}
          <motion.button
            onClick={handleLike}
            className={`p-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${isLiked
                ? "bg-red-500/20 border-red-400/30 text-red-400"
                : "bg-white/10 border-white/20 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
          </motion.button>
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
              className="relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10"
              style={{
                background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={artifact.imageUrl || "/placeholder.svg?height=600&width=600"}
                  alt={artifact.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=600&width=600"
                  }}
                />
                
                {/* Like Count on Image */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white">
                  <Heart className="h-4 w-4 text-red-400 fill-current" />
                  <span className="text-sm font-medium">{likeCount || 0}</span>
                </div>
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ArtifactsDetail