import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, Calendar, MapPin, Clock, Heart, Star } from "lucide-react";
import Swal from "sweetalert2";

const MyArtifactCard = ({ artifact }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleEdit = () => {
        navigate(`/update-artifact/${artifact._id}`)
        console.log("edit");
    }

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                fetch(`http://localhost:3000/my-artifact/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })



            }
        });
    }

    return (
        <motion.div
            className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl border transition-all duration-700 border-white/10 hover:border-white/30`}
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
        >
            {/* Glass Reflection */}
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

                {/* Gradient Overlay */}
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

                {/* Stats Row */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1.5 text-gray-400">
                            <Heart className="h-4 w-4 text-red-400" />
                            <span className="text-sm font-semibold">{artifact.likedBy?.length || 0}</span>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3.5 w-3.5 transition-colors duration-200 ${i < 4 ? "text-amber-400 fill-current" : "text-gray-600"}`}
                            />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">4.8</span>
                    </div>
                </div>

                {/* Action Buttons */}
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
                        onClick={() => handleDelete(artifact._id)}
                        className="px-4 py-3 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-400/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/40 transition-all duration-300 group/btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    </motion.button>
                </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        </motion.div>
    );
};

export default MyArtifactCard;