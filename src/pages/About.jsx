import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FaHistory, 
  FaUsers, 
  FaGlobe, 
  FaAward, 
  FaLightbulb, 
  FaEye, 
  
  FaLinkedin, 
  FaTwitter, 
  FaGithub, 
  FaEnvelope 
} from "react-icons/fa"
import { 
  HiOutlineSparkles, 
  HiOutlineGlobeAlt, 
  HiOutlineAcademicCap, 
  HiOutlineLightBulb, 
  HiOutlineHeart,
  HiOutlineShieldCheck, 
   
} from "react-icons/hi"
import { FaDownLeftAndUpRightToCenter } from "react-icons/fa6"
import { Helmet } from "react-helmet-async"

const AboutSection = () => {
  const [activeTeamMember, setActiveTeamMember] = useState(0)
  const [activeValue, setActiveValue] = useState(0)

  const stats = [
    { number: "50K+", label: "Artifacts Documented", icon: FaHistory },
    { number: "200+", label: "Museums Partnered", icon: FaGlobe },
    { number: "10K+", label: "Active Researchers", icon: FaUsers },
    { number: "95%", label: "Accuracy Rate", icon: FaAward },
  ]

  const coreValues = [
    {
      icon: HiOutlineHeart,
      title: "Passion for History",
      description: "We believe that every artifact tells a story worth preserving and sharing with the world.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: HiOutlineAcademicCap,
      title: "Academic Excellence",
      description: "Our platform maintains the highest standards of scholarly research and documentation.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: HiOutlineGlobeAlt,
      title: "Global Accessibility",
      description: "Making historical knowledge accessible to researchers, students, and enthusiasts worldwide.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: HiOutlineLightBulb,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to revolutionize archaeological documentation.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Preservation",
      description: "Committed to safeguarding cultural heritage for future generations through digital archiving.",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: HiOutlineSparkles,
      title: "Discovery",
      description: "Facilitating new discoveries and connections between historical artifacts and cultures.",
      color: "from-amber-500 to-yellow-500",
    },
  ]

  const teamMembers = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Archaeologist",
      bio: "Leading expert in ancient civilizations with 20+ years of field experience across Egypt, Greece, and Rome.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@historivault.com",
      },
    },
    {
      name: "Prof. James Chen",
      role: "Head of Digital Preservation",
      bio: "Pioneer in digital archaeology and 3D artifact modeling, published author of 50+ research papers.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        github: "#",
        email: "james@historivault.com",
      },
    },
    {
      name: "Dr. Maria Rodriguez",
      role: "Cultural Heritage Specialist",
      bio: "Expert in Latin American archaeology and indigenous artifact preservation with UNESCO experience.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "maria@historivault.com",
      },
    },
    {
      name: "Dr. Ahmed Hassan",
      role: "Authentication Director",
      bio: "Specialist in artifact authentication and dating techniques, former curator at the British Museum.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ahmed@historivault.com",
      },
    },
  ]

  const milestones = [
    {
      year: "2018",
      title: "Foundation",
      description: "HistoriVault was founded with a vision to digitize global archaeological heritage.",
    },
    {
      year: "2019",
      title: "First Partnership",
      description: "Established partnerships with 10 major museums worldwide.",
    },
    {
      year: "2020",
      title: "AI Integration",
      description: "Launched AI-powered artifact identification and classification system.",
    },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Expanded to 50+ countries with multilingual support.",
    },
    {
      year: "2022",
      title: "Research Platform",
      description: "Launched collaborative research platform for academic institutions.",
    },
    {
      year: "2024",
      title: "50K Milestone",
      description: "Reached 50,000 documented artifacts with advanced 3D modeling.",
    },
  ]

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >

      // dynamic title add
      <Helmet>
        <title>HistoriVault | About</title>
      </Helmet>


      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.08),transparent_50%)]"></div>

      {/* Floating Icons */}
      {[FaHistory, FaGlobe, FaUsers, FaAward, FaLightbulb].map((Icon, i) => (
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <FaHistory className="h-5 w-5 text-amber-400" />
            <span className="text-amber-400 font-medium">Our Story</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-wide">
            About{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              HistoriVault
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are passionate archaeologists, historians, and technologists united by a common mission: to preserve,
            document, and share the world's archaeological heritage through innovative digital solutions.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600">
                <FaDownLeftAndUpRightToCenter className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To democratize access to archaeological knowledge by creating the world's most comprehensive digital
              archive of historical artifacts, empowering researchers, educators, and enthusiasts to explore and
              understand our shared human heritage.
            </p>
          </motion.div>

          <motion.div
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600">
                <FaEye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To become the global standard for archaeological documentation and research, fostering international
              collaboration and ensuring that cultural heritage is preserved and accessible for future generations
              through cutting-edge technology.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {stats.map((stat, index) => {
            const StatIcon = stat.icon
            return (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StatIcon className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Our Core Values</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do at HistoriVault
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => {
              const ValueIcon = value.icon
              return (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => setActiveValue(index)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                >
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-r ${value.color} w-fit mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <ValueIcon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Meet Our Team</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              World-class experts dedicated to preserving our archaeological heritage
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Team Member Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeTeamMember === index
                      ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/30"
                      : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                  }`}
                  onClick={() => setActiveTeamMember(index)}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h4 className="text-lg font-bold text-white text-center mb-1">{member.name}</h4>
                  <p className="text-amber-400 text-sm text-center">{member.role}</p>
                </motion.div>
              ))}
            </div>

            {/* Active Team Member Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTeamMember}
                className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={teamMembers[activeTeamMember].image || "/placeholder.svg"}
                    alt={teamMembers[activeTeamMember].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-2xl font-bold text-white">{teamMembers[activeTeamMember].name}</h4>
                    <p className="text-amber-400">{teamMembers[activeTeamMember].role}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">{teamMembers[activeTeamMember].bio}</p>

                <div className="flex space-x-4">
                  {teamMembers[activeTeamMember].social.linkedin && (
                    <motion.a
                      href={teamMembers[activeTeamMember].social.linkedin}
                      className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaLinkedin className="h-5 w-5" />
                    </motion.a>
                  )}
                  {teamMembers[activeTeamMember].social.twitter && (
                    <motion.a
                      href={teamMembers[activeTeamMember].social.twitter}
                      className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-blue-400 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTwitter className="h-5 w-5" />
                    </motion.a>
                  )}
                  {teamMembers[activeTeamMember].social.github && (
                    <motion.a
                      href={teamMembers[activeTeamMember].social.github}
                      className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub className="h-5 w-5" />
                    </motion.a>
                  )}
                  <motion.a
                    href={`mailto:${teamMembers[activeTeamMember].social.email}`}
                    className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaEnvelope className="h-5 w-5" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Our Journey</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Key milestones in our mission to preserve archaeological heritage
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.2, duration: 0.6 }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <div className="text-2xl font-bold text-amber-400 mb-2">{milestone.year}</div>
                      <h4 className="text-xl font-bold text-white mb-3">{milestone.title}</h4>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 border-4 border-black z-10"></div>
                  </div>

                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-sm border border-amber-400/20">
            <h3 className="text-4xl font-bold text-white mb-6">Join Our Mission</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Whether you're a researcher, educator, or history enthusiast, become part of our community dedicated to
              preserving and sharing archaeological heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-600/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Exploring
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection