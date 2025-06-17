import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import {
    AlertCircle,
    Calendar,
    Clock,
    Eye,
    EyeOff,
    FileText,
    ImageIcon,
    MapPin,
    Plus,
    Search,
    Tag,
    Upload,
    User
} from "lucide-react"
import { use, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"
import { AuthContext } from "../Authentication/AuthProvider"

const AddArtifact = () => {
    const navigate = useNavigate();
    const { user } = use(AuthContext)
    const [formData, setFormData] = useState({
        name: "",
        imageUrl: "",
        type: "",
        historicalContext: "",
        description: "",
        createdAt: "",
        discoveredAt: "",
        discoveredBy: "",
        presentLocation: "",
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagePreview, setImagePreview] = useState("")
    const [showImagePreview, setShowImagePreview] = useState(false)

    // Mock logged-in user data
    const loggedInUser = {
        name: user?.displayName || "NA",
        email: user?.email || "NA",
    }

    const artifactTypes = [
        "Tools",
        "Weapons",
        "Documents",
        "Writings",
        "Pottery",
        "Stones",
        "Jewelry",
        "Coins",
        "Sculptures",
        "Textiles",
        "Religious Items",
        "Household Items",
        "Art",
        "Other",
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }

        // Handle image URL preview
        if (name === "imageUrl" && value) {
            setImagePreview(value)
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Artifact name is required"
        }

        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = "Image URL is required"
        } else if (!isValidUrl(formData.imageUrl)) {
            newErrors.imageUrl = "Please enter a valid URL"
        }

        if (!formData.type) {
            newErrors.type = "Artifact type is required"
        }

        if (!formData.historicalContext.trim()) {
            newErrors.historicalContext = "Historical context is required"
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required"
        } else if (formData.description.length < 20) {
            newErrors.description = "Description must be at least 20 characters"
        }

        if (!formData.createdAt.trim()) {
            newErrors.createdAt = "Creation date is required"
        }

        if (!formData.discoveredAt.trim()) {
            newErrors.discoveredAt = "Discovery date is required"
        }

        if (!formData.discoveredBy.trim()) {
            newErrors.discoveredBy = "Discoverer name is required"
        }

        if (!formData.presentLocation.trim()) {
            newErrors.presentLocation = "Present location is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const isValidUrl = (string) => {
        try {
            new URL(string)
            return true
        } catch (err) {
            return false
        }
    }

    const handleAddArtifacts = (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }
        const form = e.target;
        const formData = new FormData(form)
        const newArtifacts = Object.fromEntries(formData.entries());


        newArtifacts.email = user?.email;
        newArtifacts.likedBy = [];


        // save artifacts data in DB by add artifacts
        axios.post('https://historical-artifacts-server-three.vercel.app/add-artifacts', newArtifacts, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
            .then(res => {
                if (res?.data?.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your artifacts has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/all-artifacts")
                }
            })
            .catch(err => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 2500
                });
            })






        setIsSubmitting(true)


    }

    const inputVariants = {
        focus: {
            scale: 1.02,
            transition: { duration: 0.2 },
        },
        blur: {
            scale: 1,
            transition: { duration: 0.2 },
        },
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
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
            {/* dynamic title add */}
            <Helmet>
                <title>HistoriVault | Add-Artifact</title>
            </Helmet>
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.08),transparent_50%)]"></div>

            {/* Floating Icons */}
            {[Upload, Calendar, MapPin, FileText, Tag].map((Icon, i) => (
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

            <div className="max-w-4xl mx-auto relative z-10">
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
                        <Plus className="h-5 w-5 text-amber-400" />
                        <span className="text-amber-400 font-medium">Add New Discovery</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
                        Submit{" "}
                        <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                            Artifact
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Share your archaeological discoveries with the global research community
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleAddArtifacts}
                    className="space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div
                        className="p-8 rounded-3xl backdrop-blur-xl border border-white/10 relative overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)",
                            backdropFilter: "blur(20px) saturate(180%)",
                            WebkitBackdropFilter: "blur(20px) saturate(180%)",
                            boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                        }}
                    >
                        {/* Glass reflection */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 pointer-events-none"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Artifact Name */}
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                                        <Tag className="h-4 w-4 text-amber-400" />
                                        <span>Artifact Name</span>
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter artifact name..."
                                            className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${errors.name ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"
                                                }`}
                                        />
                                    </motion.div>
                                    {errors.name && (
                                        <motion.p
                                            className="mt-2 text-sm text-red-400 flex items-center space-x-1"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.name}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Artifact Type */}
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                                        <FileText className="h-4 w-4 text-amber-400" />
                                        <span>Artifact Type</span>
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${errors.type ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"
                                                }`}
                                        >
                                            <option value="" className="bg-gray-800 text-gray-300">
                                                Select artifact type...
                                            </option>
                                            {artifactTypes.map((type) => (
                                                <option key={type} value={type} className="bg-gray-800 text-white">
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </motion.div>
                                    {errors.type && (
                                        <motion.p
                                            className="mt-2 text-sm text-red-400 flex items-center space-x-1"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.type}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Created At */}
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                                        <Calendar className="h-4 w-4 text-amber-400" />
                                        <span>Created At</span>
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                                        <input
                                            type="text"
                                            name="createdAt"
                                            value={formData.createdAt}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 100 BC, 1200 CE, 3000 BCE..."
                                            className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${errors.createdAt ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"
                                                }`}
                                        />
                                    </motion.div>
                                    {errors.createdAt && (
                                        <motion.p
                                            className="mt-2 text-sm text-red-400 flex items-center space-x-1"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.createdAt}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Discovered At */}
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                                        <Search className="h-4 w-4 text-amber-400" />
                                        <span>Discovered At</span>
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                                        <input
                                            type="text"
                                            name="discoveredAt"
                                            value={formData.discoveredAt}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 1799, 1922, 2010..."
                                            className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${errors.discoveredAt ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"
                                                }`}
                                        />
                                    </motion.div>
                                    {errors.discoveredAt && (
                                        <motion.p
                                            className="mt-2 text-sm text-red-400 flex items-center space-x-1"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.discoveredAt}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Discovered By */}
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                                        <User className="h-4 w-4 text-amber-400" />
                                        <span>Discovered By</span>
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                                        <input
                                            type="text"
                                            name="discoveredBy"
                                            value={formData.discoveredBy}
                                            onChange={handleInputChange}
                                            placeholder="Enter discoverer's name..."
                                            className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${errors.discoveredBy ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"
                                                }`}
                                        />
                                    </motion.div>
                                    {errors.discoveredBy && (
                                        <motion.p
                                            className="mt-2 text-sm text-red-400 flex items-center space-x-1"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.discoveredBy}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Present Location */}
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                                        <MapPin className="h-4 w-4 text-amber-400" />
                                        <span>Present Location</span>
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                                        <input
                                            type="text"
                                            name="presentLocation"
                                            value={formData.presentLocation}
                                            onChange={handleInputChange}
                                            placeholder="e.g., British Museum, London..."
                                            className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${errors.presentLocation ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"
                                                }`}
                                        />
                                    </motion.div>
                                    {errors.presentLocation && (
                                        <motion.p
                                            className="mt-2 text-sm text-red-400 flex items-center space-x-1"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.presentLocation}</span>
                                        </motion.p>
                                    )}
                                </motion.div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Image URL */}
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                                        <ImageIcon className="h-4 w-4 text-amber-400" />
                                        <span>Artifact Image URL</span>
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                                        <input
                                            type="url"
                                            name="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/artifact-image.jpg"
                                            className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${errors.imageUrl ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"
                                                }`}
                                        />
                                    </motion.div>
                                    {errors.imageUrl && (
                                        <motion.p
                                            className="mt-2 text-sm text-red-400 flex items-center space-x-1"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.imageUrl}</span>
                                        </motion.p>
                                    )}

                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <motion.div
                                            className="mt-4"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-400">Image Preview</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowImagePreview(!showImagePreview)}
                                                    className="text-amber-400 hover:text-amber-300 transition-colors"
                                                >
                                                    {showImagePreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                            <AnimatePresence>
                                                {showImagePreview && (
                                                    <motion.div
                                                        className="relative rounded-xl overflow-hidden border border-white/20"
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <img
                                                            src={imagePreview || "/placeholder.svg"}
                                                            alt="Artifact preview"
                                                            className="w-full h-48 object-cover"
                                                            onError={(e) => {
                                                                e.target.src = "/placeholder.svg?height=200&width=300"
                                                            }}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Historical Context */}
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                                        <Clock className="h-4 w-4 text-amber-400" />
                                        <span>Historical Context</span>
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                                        <textarea
                                            name="historicalContext"
                                            value={formData.historicalContext}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder="Describe the historical period, culture, and significance..."
                                            className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 resize-none ${errors.historicalContext ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"
                                                }`}
                                        />
                                    </motion.div>
                                    {errors.historicalContext && (
                                        <motion.p
                                            className="mt-2 text-sm text-red-400 flex items-center space-x-1"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.historicalContext}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Description */}
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                                        <FileText className="h-4 w-4 text-amber-400" />
                                        <span>Short Description</span>
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder="Provide a detailed description of the artifact..."
                                            className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 resize-none ${errors.description ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"
                                                }`}
                                        />
                                    </motion.div>
                                    <div className="flex justify-between items-center mt-2">
                                        {errors.description ? (
                                            <motion.p
                                                className="text-sm text-red-400 flex items-center space-x-1"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <AlertCircle className="h-4 w-4" />
                                                <span>{errors.description}</span>
                                            </motion.p>
                                        ) : (
                                            <div></div>
                                        )}
                                        <span
                                            className={`text-sm ${formData.description.length < 20 ? "text-gray-400" : "text-green-400"}`}
                                        >
                                            {formData.description.length}/20 min
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Submitter Info (Read-only) */}
                                <motion.div variants={itemVariants}>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                                        <User className="h-4 w-4 text-amber-400" />
                                        <span>Submitted By</span>
                                    </label>
                                    <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-full flex items-center justify-center border border-amber-400/20">
                                                <User className="h-5 w-5 text-amber-400" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{loggedInUser.name}</p>
                                                <p className="text-gray-400 text-sm">{loggedInUser.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.div className="mt-8 flex justify-center" variants={itemVariants}>
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-amber-600/30 hover:shadow-amber-500/40 cursor-pointer`}
                                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                            >
                                <>
                                    <Upload className="h-6 w-6" />
                                    <span>Add Artifact</span>
                                </>

                            </motion.button>
                        </motion.div>
                    </div>
                </motion.form>
            </div>
        </div>
    )
}

export default AddArtifact;