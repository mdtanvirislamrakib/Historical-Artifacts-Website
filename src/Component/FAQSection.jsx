import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, HelpCircle, Shield, BookOpen, Search } from "lucide-react"

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0)
  const [activeCategory, setActiveCategory] = useState("general")

  const faqCategories = [
    { id: "general", label: "General", icon: HelpCircle },
    { id: "authentication", label: "Authentication", icon: Shield },
    { id: "collection", label: "Collection", icon: BookOpen },
    { id: "research", label: "Research", icon: Search },
  ]

  const faqData = {
    general: [
      {
        question: "What is HistoriVault and what makes it unique?",
        answer:
          "HistoriVault is a premier digital repository of historical artifacts from civilizations across the globe. We combine cutting-edge technology with archaeological expertise to provide detailed documentation, 3D models, and historical context for each artifact. Our collection spans over 5,000 years of human history, making it one of the most comprehensive digital archives available.",
      },
      {
        question: "How do you acquire and verify historical artifacts?",
        answer:
          "All artifacts in our collection are acquired through legitimate channels including museum partnerships, archaeological expeditions, and private donations. Each piece undergoes rigorous authentication by our team of expert archaeologists and historians using advanced dating techniques, provenance research, and scientific analysis.",
      },
      {
        question: "Can I visit the physical artifacts or are they only digital?",
        answer:
          "While HistoriVault primarily serves as a digital platform, many of our featured artifacts are housed in partner museums worldwide. We provide location information and visiting details for physical viewing when available. Some artifacts are exclusively digital due to their fragile nature or restricted access.",
      },
      {
        question: "Is HistoriVault suitable for educational purposes?",
        answer:
          "HistoriVault is designed with educators and students in mind. We offer educational licenses, curriculum integration tools, and detailed historical context for each artifact. Many universities and schools use our platform for history, archaeology, and cultural studies courses.",
      },
    ],
    authentication: [
      {
        question: "How do you ensure the authenticity of artifacts?",
        answer:
          "Our authentication process involves multiple layers of verification including carbon dating, thermoluminescence testing, X-ray analysis, and provenance documentation. Each artifact is examined by at least three independent experts before being added to our collection.",
      },
      {
        question: "What happens if an artifact's authenticity is questioned?",
        answer:
          "We take authenticity concerns very seriously. If new evidence emerges questioning an artifact's authenticity, we immediately launch a comprehensive review involving external experts. Questionable items are flagged or removed until verification is complete.",
      },
      {
        question: "Do you work with international heritage organizations?",
        answer:
          "Yes, we collaborate closely with UNESCO, ICOM, and various national heritage organizations to ensure ethical practices and compliance with international heritage laws. We also support repatriation efforts when appropriate.",
      },
    ],
    collection: [
      {
        question: "How often do you add new artifacts to the collection?",
        answer:
          "We add new artifacts weekly, with major collection updates monthly. Our team is constantly working with archaeological sites, museums, and researchers to expand our offerings. Premium subscribers get early access to new additions.",
      },
      {
        question: "Can I suggest artifacts for inclusion in the collection?",
        answer:
          "We welcome suggestions from our community! You can submit artifact recommendations through our contact form. While we can't guarantee inclusion, our curatorial team reviews all suggestions and may reach out for more information.",
      },
      {
        question: "Are there artifacts from all continents and time periods?",
        answer:
          "Our collection spans all inhabited continents and covers over 5,000 years of history, from prehistoric tools to medieval manuscripts. We're continuously working to ensure balanced representation across cultures and time periods.",
      },
      {
        question: "Do you have 3D models and interactive features?",
        answer:
          "Many of our artifacts feature high-resolution 3D models that you can rotate, zoom, and examine in detail. We also offer AR experiences for select pieces and virtual exhibition tours for premium subscribers.",
      },
    ],
    research: [
      {
        question: "Can researchers access detailed documentation?",
        answer:
          "Researchers can access comprehensive documentation including provenance records, scientific analysis reports, and bibliographic references. Academic researchers may apply for enhanced access to raw data and unpublished research materials.",
      },
      {
        question: "Do you support academic research projects?",
        answer:
          "We actively support academic research through our Scholar Program, which provides free access to researchers, collaboration opportunities, and potential funding for relevant projects. We've supported over 200 research projects to date.",
      },
      {
        question: "How can I cite artifacts from HistoriVault in my research?",
        answer:
          "Each artifact page includes a 'Cite This Artifact' section with properly formatted citations for various academic styles (APA, MLA, Chicago, etc.). We also provide DOI numbers for permanent reference.",
      },
      {
        question: "Is there an API for developers and researchers?",
        answer:
          "Yes, we offer a comprehensive API that allows developers and researchers to access artifact metadata, images, and documentation programmatically. API access is available for academic and non-commercial use with proper attribution.",
      },
    ],
  }

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index)
  }

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_50%)]"></div>

      {/* Floating Question Marks */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-400/20 text-2xl font-bold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        >
          ?
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
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-amber-400 font-medium">Knowledge Base</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-wide">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our historical artifacts collection, authentication processes, and
            research capabilities.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {faqCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setOpenFAQ(0)
              }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-600/30"
                  : "bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 pointer-events-none"></div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {faqData[activeCategory].map((faq, index) => (
                    <motion.div
                      key={index}
                      className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/10 transition-all duration-300"
                      >
                        <span className="text-white font-medium text-lg pr-4">{faq.question}</span>
                        <motion.div
                          animate={{ rotate: openFAQ === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          {openFAQ === index ? (
                            <Minus className="h-6 w-6 text-amber-400" />
                          ) : (
                            <Plus className="h-6 w-6 text-amber-400" />
                          )}
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {openFAQ === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 border-t border-white/10">
                              <p className="text-gray-300 leading-relaxed pt-4">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
