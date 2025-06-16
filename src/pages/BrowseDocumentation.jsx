import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Filter, ChevronRight, Download, Eye, Star, Clock, Users, FileText, Video, Image, Code, Globe, Bookmark, ArrowRight, Calendar, Tag, TrendingUp, Award, Zap } from 'lucide-react';
import carbonImage from "../assets/carbon.jpg";
import egyptImage from "../assets/egypt.jpg";
import apiImage from "../assets/api.jpg";
import { Helmet } from 'react-helmet-async';

const BrowseDocumentation = () => {
    const [activeCategory, setActiveCategory] = useState('getting-started');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [featuredDoc, setFeaturedDoc] = useState(0);

    const documentationCategories = [
        {
            id: 'getting-started',
            label: 'Getting Started',
            icon: Zap,
            description: 'Quick start guides and basic concepts',
            count: 12
        },
        {
            id: 'artifact-guide',
            label: 'Artifact Guide',
            icon: BookOpen,
            description: 'Comprehensive artifact documentation',
            count: 45
        },
        {
            id: 'research-methods',
            label: 'Research Methods',
            icon: Search,
            description: 'Archaeological and historical research techniques',
            count: 28
        },
        {
            id: 'api-reference',
            label: 'API Reference',
            icon: Code,
            description: 'Technical documentation for developers',
            count: 67
        },
        {
            id: 'authentication',
            label: 'Authentication',
            icon: Award,
            description: 'Artifact verification and dating methods',
            count: 23
        },
        {
            id: 'case-studies',
            label: 'Case Studies',
            icon: FileText,
            description: 'Real-world archaeological discoveries',
            count: 34
        }
    ];

    const filterOptions = [
        { value: 'all', label: 'All Types', icon: Globe },
        { value: 'guide', label: 'Guides', icon: BookOpen },
        { value: 'tutorial', label: 'Tutorials', icon: Video },
        { value: 'reference', label: 'Reference', icon: FileText },
        { value: 'case-study', label: 'Case Studies', icon: Image }
    ];

    // FIX: Use direct image src instead of {image: {imageVar}}
    const featuredDocuments = [
        {
            title: "Complete Guide to Ancient Egyptian Artifacts",
            description: "Comprehensive documentation covering identification, dating, and cultural significance of Egyptian archaeological finds.",
            image: egyptImage,
            category: "artifact-guide",
            type: "guide",
            readTime: "45 min",
            difficulty: "Intermediate",
            views: "15.2K",
            rating: 4.9,
            lastUpdated: "2024-01-15"
        },
        {
            title: "Carbon Dating Methodology and Best Practices",
            description: "Technical guide to radiocarbon dating techniques used in archaeological artifact authentication.",
            image: carbonImage,
            category: "authentication",
            type: "reference",
            readTime: "30 min",
            difficulty: "Advanced",
            views: "8.7K",
            rating: 4.8,
            lastUpdated: "2024-01-10"
        },
        {
            title: "API Integration for Historical Data Access",
            description: "Step-by-step tutorial for integrating HistoriVault's API into your research applications.",
            image: apiImage,
            category: "api-reference",
            type: "tutorial",
            readTime: "25 min",
            difficulty: "Beginner",
            views: "12.1K",
            rating: 4.7,
            lastUpdated: "2024-01-12"
        }
    ];

    const documentationData = {
        'getting-started': [
            {
                title: "Welcome to HistoriVault",
                description: "Introduction to our platform and core concepts",
                type: "guide",
                readTime: "10 min",
                difficulty: "Beginner",
                views: "25.3K",
                rating: 4.9,
                isNew: true
            },
            {
                title: "Creating Your First Collection",
                description: "Step-by-step guide to organizing artifacts",
                type: "tutorial",
                readTime: "15 min",
                difficulty: "Beginner",
                views: "18.7K",
                rating: 4.8,
                isPopular: true
            },
            {
                title: "Understanding Artifact Classifications",
                description: "Learn how we categorize historical items",
                type: "reference",
                readTime: "20 min",
                difficulty: "Intermediate",
                views: "12.4K",
                rating: 4.6
            },
            {
                title: "Navigation and Search Tips",
                description: "Master the platform's search capabilities",
                type: "guide",
                readTime: "12 min",
                difficulty: "Beginner",
                views: "16.8K",
                rating: 4.7
            }
        ],
        'artifact-guide': [
            {
                title: "Ancient Pottery Analysis",
                description: "Comprehensive guide to ceramic artifact study",
                type: "guide",
                readTime: "35 min",
                difficulty: "Advanced",
                views: "9.2K",
                rating: 4.9,
                isNew: true
            },
            {
                title: "Medieval Weapon Documentation",
                description: "Cataloging and analyzing medieval armaments",
                type: "reference",
                readTime: "40 min",
                difficulty: "Intermediate",
                views: "7.8K",
                rating: 4.8
            },
            {
                title: "Textile Preservation Techniques",
                description: "Methods for documenting ancient fabrics",
                type: "guide",
                readTime: "28 min",
                difficulty: "Advanced",
                views: "6.1K",
                rating: 4.7,
                isPopular: true
            }
        ],
        'research-methods': [
            {
                title: "Stratigraphic Analysis Fundamentals",
                description: "Understanding archaeological layer dating",
                type: "tutorial",
                readTime: "45 min",
                difficulty: "Advanced",
                views: "5.4K",
                rating: 4.9
            },
            {
                title: "Digital Documentation Standards",
                description: "Best practices for artifact photography",
                type: "guide",
                readTime: "25 min",
                difficulty: "Intermediate",
                views: "8.9K",
                rating: 4.6,
                isNew: true
            }
        ],
        'api-reference': [
            {
                title: "Authentication Endpoints",
                description: "API authentication and security protocols",
                type: "reference",
                readTime: "20 min",
                difficulty: "Intermediate",
                views: "11.2K",
                rating: 4.8
            },
            {
                title: "Artifact Data Retrieval",
                description: "Accessing artifact information via API",
                type: "tutorial",
                readTime: "30 min",
                difficulty: "Beginner",
                views: "14.6K",
                rating: 4.7,
                isPopular: true
            }
        ],
        'authentication': [
            {
                title: "Provenance Documentation",
                description: "Establishing artifact ownership history",
                type: "guide",
                readTime: "50 min",
                difficulty: "Advanced",
                views: "4.3K",
                rating: 4.9,
                isNew: true
            },
            {
                title: "Scientific Dating Methods",
                description: "Overview of modern dating techniques",
                type: "reference",
                readTime: "35 min",
                difficulty: "Advanced",
                views: "6.7K",
                rating: 4.8
            }
        ],
        'case-studies': [
            {
                title: "The Pompeii Digital Archive Project",
                description: "Large-scale artifact digitization case study",
                type: "case-study",
                readTime: "60 min",
                difficulty: "Intermediate",
                views: "3.8K",
                rating: 4.9,
                isPopular: true
            },
            {
                title: "Viking Ship Reconstruction",
                description: "3D modeling of archaeological finds",
                type: "case-study",
                readTime: "45 min",
                difficulty: "Advanced",
                views: "5.2K",
                rating: 4.7
            }
        ]
    };

    // Auto-rotate featured documents
    useEffect(() => {
        const interval = setInterval(() => {
            setFeaturedDoc((prev) => (prev + 1) % featuredDocuments.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [featuredDocuments.length]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'from-green-500 to-green-600';
            case 'Intermediate': return 'from-yellow-500 to-yellow-600';
            case 'Advanced': return 'from-red-500 to-red-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'guide': return BookOpen;
            case 'tutorial': return Video;
            case 'reference': return FileText;
            case 'case-study': return Image;
            default: return FileText;
        }
    };

    const filteredDocs = documentationData[activeCategory]?.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedFilter === 'all' || doc.type === selectedFilter;
        return matchesSearch && matchesFilter;
    }) || [];

    return (
        <section className="relative py-20 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)',
            }}>

            {/* // dynamic title add */}
            <Helmet>
                <title>HistoriVault | Browse-Documentation</title>
            </Helmet>

            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.08),transparent_50%)]"></div>

            {/* Floating Documentation Icons */}
            {[BookOpen, FileText, Code, Search, Award].map((Icon, i) => (
                <motion.div
                    key={i}
                    className="absolute text-amber-400/20"
                    style={{
                        left: `${15 + i * 18}%`,
                        top: `${8 + i * 12}%`,
                    }}
                    animate={{
                        y: [0, -25, 0],
                        rotate: [0, 5, -5, 0],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 5 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                    }}
                >
                    <Icon className="h-6 w-6" />
                </motion.div>
            ))}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                        whileHover={{ scale: 1.05 }}
                    >
                        <BookOpen className="h-5 w-5 text-amber-400" />
                        <span className="text-amber-400 font-medium">Knowledge Center</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-wide">
                        Browse{' '}
                        <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                            Documentation
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Comprehensive guides, tutorials, and references to help you master
                        historical artifact research and documentation techniques.
                    </p>
                </motion.div>

                {/* Featured Document Carousel */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="rounded-3xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 pointer-events-none"></div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={featuredDoc}
                                className="grid lg:grid-cols-2 gap-8 p-8"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="relative">
                                    <img
                                        src={featuredDocuments[featuredDoc].image || "/placeholder.svg"}
                                        alt={featuredDocuments[featuredDoc].title}
                                        className="w-full h-64 lg:h-80 object-cover rounded-2xl"
                                    />
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-sm">
                                        Featured
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center">
                                    <h3 className="text-3xl font-bold text-white mb-4">
                                        {featuredDocuments[featuredDoc].title}
                                    </h3>

                                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                        {featuredDocuments[featuredDoc].description}
                                    </p>

                                    <div className="flex flex-wrap gap-4 mb-6">
                                        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                                            <Clock className="h-4 w-4 text-amber-400" />
                                            <span className="text-gray-300 text-sm">{featuredDocuments[featuredDoc].readTime}</span>
                                        </div>

                                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(featuredDocuments[featuredDoc].difficulty)} text-white text-sm font-medium`}>
                                            {featuredDocuments[featuredDoc].difficulty}
                                        </div>

                                        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                                            <Eye className="h-4 w-4 text-amber-400" />
                                            <span className="text-gray-300 text-sm">{featuredDocuments[featuredDoc].views}</span>
                                        </div>
                                    </div>

                                    <motion.button
                                        className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-600/30 w-fit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <BookOpen className="h-5 w-5" />
                                        <span>Read Documentation</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Carousel Indicators */}
                        <div className="flex justify-center space-x-2 pb-6">
                            {featuredDocuments.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setFeaturedDoc(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === featuredDoc
                                        ? 'bg-amber-400 w-8'
                                        : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div
                    className="flex flex-col lg:flex-row gap-4 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                            style={{
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)'
                            }}
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto">
                        {filterOptions.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setSelectedFilter(filter.value)}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${selectedFilter === filter.value
                                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                                    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/20'
                                    }`}
                            >
                                <filter.icon className="h-4 w-4" />
                                <span>{filter.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Category Sidebar */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <div className="sticky top-8">
                            <h3 className="text-xl font-bold text-white mb-6">Categories</h3>
                            <div className="space-y-2">
                                {documentationCategories.map((category) => (
                                    <motion.button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${activeCategory === category.id
                                            ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/30 text-white'
                                            : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <category.icon className={`h-5 w-5 ${activeCategory === category.id ? 'text-amber-400' : 'text-gray-400'}`} />
                                            <div className="flex-1">
                                                <div className="font-medium">{category.label}</div>
                                                <div className="text-sm opacity-70">{category.description}</div>
                                            </div>
                                            <div className="text-xs bg-white/20 rounded-full px-2 py-1">
                                                {category.count}
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Documentation List */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white">
                                {documentationCategories.find(cat => cat.id === activeCategory)?.label}
                            </h3>
                            <span className="text-gray-400">
                                {filteredDocs.length} document{filteredDocs.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory + selectedFilter + searchTerm}
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                {filteredDocs.map((doc, index) => {
                                    const TypeIcon = getTypeIcon(doc.type);
                                    return (
                                        <motion.div
                                            key={index}
                                            className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <TypeIcon className="h-5 w-5 text-amber-400" />
                                                        <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                                                            {doc.title}
                                                        </h4>
                                                        {doc.isNew && (
                                                            <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full">
                                                                NEW
                                                            </span>
                                                        )}
                                                        {doc.isPopular && (
                                                            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold rounded-full">
                                                                POPULAR
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-gray-300 mb-4 leading-relaxed">
                                                        {doc.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-3">
                                                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                                                            <Clock className="h-4 w-4" />
                                                            <span>{doc.readTime}</span>
                                                        </div>

                                                        <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(doc.difficulty)} text-white text-xs font-medium`}>
                                                            {doc.difficulty}
                                                        </div>

                                                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                                                            <Eye className="h-4 w-4" />
                                                            <span>{doc.views}</span>
                                                        </div>

                                                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                                                            <Star className="h-4 w-4 text-yellow-400" />
                                                            <span>{doc.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-2 ml-4">
                                                    <motion.button
                                                        className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all duration-300"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <Bookmark className="h-4 w-4" />
                                                    </motion.button>

                                                    <motion.button
                                                        className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all duration-300"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </motion.button>

                                                    <motion.button
                                                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <span>Read</span>
                                                        <ChevronRight className="h-4 w-4" />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>

                        {filteredDocs.length === 0 && (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No documents found</h3>
                                <p className="text-gray-400">
                                    Try adjusting your search terms or filters to find what you're looking for.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Quick Stats */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    {[
                        { number: "200+", label: "Documentation Pages", icon: FileText },
                        { number: "50+", label: "Video Tutorials", icon: Video },
                        { number: "1M+", label: "Monthly Views", icon: TrendingUp },
                        { number: "24/7", label: "Updated Content", icon: Clock }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <stat.icon className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BrowseDocumentation;