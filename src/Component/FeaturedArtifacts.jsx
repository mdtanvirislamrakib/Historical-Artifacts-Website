

import { useState, useMemo } from "react";
import { Link } from "react-router"; 
import { motion } from "framer-motion";
import {
    Heart,
    Eye,
    ChevronRight,
    Sparkles,
    TrendingUp,
    Award,
    Star,
    ArrowRight,
    Crown,
    Flame,
} from "lucide-react";

// Helper for random view count, memoized so it doesn't change on re-render
const useRandomViews = (count) => {
    return useMemo(
        () =>
            Array.from({ length: count }, () =>
                Math.floor(Math.random() * 1000) + 100
            ),
        [count]
    );
};

const FeaturedCard = ({
    artifact,
    index,
    isTopRated,
    hoveredCard,
    setHoveredCard,
    randomViews,
}) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500"
            style={{
                background:
                    "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                boxShadow: isTopRated
                    ? "0 8px 32px rgba(251,191,36,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            whileHover={{
                y: -12,
                scale: 1.03,
                boxShadow: isTopRated
                    ? "0 20px 40px rgba(251,191,36,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                    : "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            layout
        >
            {/* Top Rated Badge */}
            {isTopRated && (
                <div className="absolute top-4 left-4 z-20">
                    <motion.div
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-black font-bold text-xs backdrop-blur-sm border border-amber-300/20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    >
                        <Crown className="h-3 w-3" />
                        <span>TOP RATED</span>
                    </motion.div>
                </div>
            )}

            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <motion.img
                    src={artifact.imageUrl || "/placeholder.svg?height=250&width=400"}
                    alt={artifact.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = "/placeholder.svg?height=250&width=400";
                    }}
                    animate={{
                        scale: hoveredCard === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.7 }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Floating sparkle effect for top rated */}
                {isTopRated && (
                    <motion.div
                        className="absolute top-6 right-6 text-amber-400/80"
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
                )}

                {/* Like count overlay */}
                <div className="absolute top-4 right-4">
                    <motion.div
                        className="flex items-center space-x-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Heart className="h-3 w-3 text-red-400" />
                        <span className="text-xs font-medium">{artifact.likeCount || 0}</span>
                    </motion.div>
                </div>

                {/* Trending indicator for artifacts with likes */}
                {(artifact.likeCount || 0) > 0 && (
                    <div className="absolute bottom-4 left-4">
                        <motion.div
                            className="flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-to-r from-green-500/80 to-green-600/80 text-white text-xs font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <TrendingUp className="h-3 w-3" />
                            <span>TRENDING</span>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 relative z-10">
                {/* Artifact Name */}
                <motion.h3
                    className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors duration-300"
                    layoutId={`featured-title-${artifact._id}`}
                >
                    {artifact.name}
                </motion.h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {artifact.description.length > 80
                        ? `${artifact.description.substring(0, 80)}...`
                        : artifact.description}
                </p>

                {/* Stats Row */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-gray-400">
                            <Heart className="h-4 w-4 text-red-400" />
                            <span className="text-sm font-medium">{artifact.likeCount || 0}</span>
                        </div>

                        <div className="flex items-center space-x-1 text-gray-400">
                            <Eye className="h-4 w-4 text-blue-400" />
                            <span className="text-sm">
                                {randomViews[index] ?? 0}
                            </span>
                        </div>
                    </div>
                </div>

                {/* View Details Button */}
                <Link
                    to={`/artifacts/${artifact._id}`}
                    className="group/btn flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 font-medium hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-300 backdrop-blur-sm border border-amber-400/20 hover:border-amber-400/40"
                >
                    <Eye className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                    <span>View Details</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
            </div>

            {/* Hover glow effect */}
            <div
                className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${isTopRated
                        ? "bg-gradient-to-r from-amber-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100"
                        : "bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100"
                    }`}
            ></div>
        </motion.div>
    );
};

const FeaturedArtifacts = ({ featuredData }) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    // Sort artifacts by like count and take top 6
    const topArtifacts = useMemo(() => {
        if (!featuredData || !Array.isArray(featuredData)) return [];
        return [...featuredData]
            .sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
            .slice(0, 6);
    }, [featuredData]);

    // Memoize random views for each artifact to keep them consistent per render
    const randomViews = useRandomViews(topArtifacts.length);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    if (!topArtifacts || topArtifacts.length === 0) {
        return (
            <div className="text-center py-16">
                <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                    No Featured Artifacts
                </h3>
                <p className="text-gray-400">Check back later for featured content.</p>
            </div>
        );
    }

    return (
        <section
            className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            style={{
                background:
                    "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
            }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.08),transparent_50%)]"></div>

            {/* Floating Icons */}
            {[Award, Crown, Flame, TrendingUp, Sparkles].map((Icon, i) => (
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
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Award className="h-5 w-5 text-amber-400" />
                        <span className="text-amber-400 font-medium">Most Loved</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                            Artifacts
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Discover the most appreciated artifacts in our collection, loved by
                        researchers and history enthusiasts worldwide
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center items-center space-x-8 mt-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-amber-400">
                                {topArtifacts.length}
                            </div>
                            <div className="text-sm text-gray-400">Featured Items</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-amber-400">
                                {topArtifacts.reduce(
                                    (sum, artifact) => sum + (artifact.likeCount || 0),
                                    0
                                )}
                            </div>
                            <div className="text-sm text-gray-400">Total Likes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-amber-400">
                                {new Set(topArtifacts.map((artifact) => artifact.type)).size}
                            </div>
                            <div className="text-sm text-gray-400">Categories</div>
                        </div>
                    </div>
                </motion.div>

                {/* Featured Artifacts Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {topArtifacts.map((artifact, index) => (
                        <FeaturedCard
                            key={artifact._id}
                            artifact={artifact}
                            index={index}
                            isTopRated={index === 0 && (artifact.likeCount || 0) > 0}
                            hoveredCard={hoveredCard}
                            setHoveredCard={setHoveredCard}
                            randomViews={randomViews}
                        />
                    ))}
                </motion.div>

                {/* See All Button */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <Link
                        to="/all-artifacts"
                        className="group inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40"
                    >
                        <span>See All Artifacts</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedArtifacts;