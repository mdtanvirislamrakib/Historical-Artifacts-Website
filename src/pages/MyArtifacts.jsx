import { use } from "react";
import { useLoaderData, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, TrendingUp, Award, Star, Globe, Users, Activity } from "lucide-react";
import { AuthContext } from "../Authentication/AuthProvider";
import Swal from "sweetalert2";
import MyArtifactCard from "../Component/MyArtifactCard";


const MyArtifacts = () => {
    const { user } = use(AuthContext);
    const AllArtifactsData = useLoaderData();
    const artifacts = AllArtifactsData?.data || [];



    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.97) 0%, rgba(20,20,20,0.99) 50%, rgba(0,0,0,0.97) 100%)",
        }}>
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/3 via-transparent to-purple-600/3"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(251,191,36,0.08),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(147,51,234,0.06),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.03),transparent_70%)]"></div>

            {/* Floating Icons */}
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
                {/* Header with User Profile */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* User Profile Section */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
                        <div className="flex items-center space-x-6">
                            <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                <img
                                    src={user?.photoURL|| "/placeholder.svg"}
                                    alt={user?.name}
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
                                <h1 className="text-4xl font-bold text-white mb-1">{user?.name}</h1>
                                <p className="text-amber-400 font-medium mb-1">Artifact Contributor</p>
                                <p className="text-gray-400 text-sm">{user?.email}</p>
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

                    {/* Title and Description */}
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
                </motion.div>

                {/* Artifacts Grid */}
                <AnimatePresence mode="wait">
                    {artifacts.length > 0 ? (
                        <motion.div
                            key="artifacts-grid"
                            className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            layout
                        >
                            {artifacts.map((artifact) => (
                                <MyArtifactCard 
                                    key={artifact._id} 
                                    artifact={artifact}
                                />
                            ))}
                        </motion.div>
                    ) : (
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
                                to="/add-artifact"
                                className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-600/30"
                            >
                                <Plus className="h-6 w-6" />
                                <span>Add Your First Artifact</span>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MyArtifacts;