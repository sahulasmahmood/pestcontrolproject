"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Award,
  Users,
  CheckCircle,
  Shield,
  Clock,
  Star,
  Building,
  Bug,
  Zap,
  Leaf,
  Home,
  ThumbsUp,
  Microscope,
  ShieldCheck,
  Wrench,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactButtons from "@/components/FloatingContactButtons"
import { AboutPageSeo } from "@/components/About/AboutSeo"
import { useBanner } from "@/hooks/use-banner"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
}

export default function AboutPage() {
  const { banner } = useBanner("about")

  const whyPerfectPest = [
    {
      icon: <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Licensed & Certified",
      description:
        "Fully licensed pest control professionals with certified technicians and approved treatment methods for your safety.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Leaf className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Eco-Friendly Solutions",
      description:
        "Safe, environmentally responsible pest control methods that protect your family, pets, and the environment.",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: <Zap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Fast & Effective",
      description: "Quick response times with proven treatment methods that eliminate pests efficiently and permanently.",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: <Clock className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "24/7 Emergency Service",
      description: "Round-the-clock emergency pest control services for urgent infestations and critical situations.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: <Microscope className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Advanced Technology",
      description: "Latest pest detection and treatment technologies for precise identification and targeted solutions.",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: <ThumbsUp className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Satisfaction Guarantee",
      description:
        "100% satisfaction guarantee with follow-up services to ensure complete pest elimination and prevention.",
      gradient: "from-teal-500 to-cyan-600",
    },
  ]

  const values = [
    {
      title: "Health & Safety",
      description:
        "Your family's health and safety are our top priority with safe, non-toxic treatments and protective measures.",
      icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Professional Excellence",
      description:
        "Certified technicians with extensive training and expertise in identifying and eliminating all types of pests.",
      icon: <Award className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Environmental Care",
      description:
        "Eco-friendly pest control solutions that protect the environment while effectively eliminating pest problems.",
      icon: <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Customer Trust",
      description:
        "Transparent pricing, honest communication, and reliable service that builds lasting relationships with our clients.",
      icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
  ]

  const stats = [
    { number: "2000+", label: "Properties Protected", icon: <Home className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { number: "15+", label: "Years Experience", icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { number: "50+", label: "Pest Types Eliminated", icon: <Bug className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { number: "98%", label: "Success Rate", icon: <Target className="h-4 w-4 sm:h-5 sm:w-5" /> },
  ]

  return (
    <div className="min-h-screen">
      <AboutPageSeo />
      <Navbar />

      {/* Hero Section */}
  <section className="relative bg-admin-gradient text-white py-16 sm:py-20 lg:py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {/* Image Layer */}
            <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
              <img
                src={banner?.status === "active" && banner?.image ? banner.image : "/placeholder.jpg"}
                alt={banner?.title || "Tamil Nadu Tourism"}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Gradient Overlay Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-transparent" />
            
            {/* Admin Gradient Layer */}
            <div className="absolute inset-0 bg-admin-gradient/20" />
            
            {/* Animated Gradient Layers */}
            <motion.div
              className="absolute inset-0 bg-admin-gradient/10"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute inset-0 bg-admin-gradient/5"
              animate={{
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-7xl">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-3 sm:mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
              <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              About Perfect Pest Control
            </Badge>

            {/* Optional dynamic banner title (keeps existing main heading) */}
            {banner?.title && (
              <p className="text-white/90 text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{banner.title}</p>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Professional Pest Control
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1 sm:mt-2 font-normal">
                Protecting Your Property
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Learn about our commitment to providing safe, effective, and environmentally responsible pest control 
              solutions that protect your home, family, and business from unwanted pests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 h-full">
                  <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 bg-admin-gradient rounded-xl flex items-center justify-center">
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-admin-gradient mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium text-xs sm:text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section id="story" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white/20"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
                <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Our Story
              </Badge>
              <h2 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                Pest Control Excellence
                <span className="block text-transparent bg-clip-text bg-admin-gradient text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Since 2008
                </span>
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Perfect Pest Control was established with a mission to provide safe, effective, and environmentally 
                  responsible pest management solutions. Our journey began with a commitment to protecting homes and 
                  businesses from pest infestations while prioritizing the health and safety of our clients.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Today, we are a leading pest control service provider offering comprehensive solutions including 
                  residential pest control, commercial pest management, termite treatment, rodent control, and 
                  preventive maintenance programs. Our expertise has protected over 2000 properties across the region.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="text-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-admin-gradient mb-1 sm:mb-2">
                    2000+
                  </div>
                  <div className="text-gray-600 font-medium text-xs sm:text-sm">Properties Protected</div>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-admin-gradient mb-1 sm:mb-2">
                    15+
                  </div>
                  <div className="text-gray-600 font-medium text-xs sm:text-sm">Years Experience</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border-2 border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-admin-gradient rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                    Perfect Pest Control
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                    Professional Pest Management Solutions
                  </p>
                  <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">4.9 Rating</span>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 mr-1" />
                      Licensed
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 mr-1" />
                      Insured
                    </div>
                    <div className="flex items-center">
                      <Leaf className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 mr-1" />
                      Eco-Safe
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Our Foundation
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              The Principles That
              <span className="block text-transparent bg-clip-text bg-admin-gradient">Guide Our Work</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              The core values and vision that define our commitment to excellence and innovation
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Target className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />,
                title: "Our Mission",
                description:
                  "To provide safe, effective, and environmentally responsible pest control solutions that protect homes and businesses while ensuring the health and safety of our clients and their families.",
                gradient: "from-admin-primary to-admin-secondary",
              },
              {
                icon: <Award className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />,
                title: "Our Vision",
                description:
                  "To be the leading pest control service provider, recognized for our professional excellence, innovative solutions, and commitment to customer satisfaction and environmental stewardship.",
                gradient: "from-blue-500 to-cyan-600",
              },
              {
                icon: <Shield className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />,
                title: "Our Commitment",
                description:
                  "Safety, reliability, professional expertise, and environmental responsibility are the core principles that guide our pest control services and customer relationships.",
                gradient: "from-purple-500 to-indigo-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="sm:col-span-2 lg:col-span-1 last:sm:col-start-1 last:sm:col-span-2 last:lg:col-span-1 last:lg:col-start-auto"
              >
                <Card className="card-hover h-full border-0 shadow-xl overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center relative">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg`}
                    >
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="card-hover h-full border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-4 sm:p-5 md:p-6 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-admin-gradient rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <div className="text-white">{value.icon}</div>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">{value.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Perfect Pest Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white/20"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Why Choose
              <span className="block text-transparent bg-clip-text bg-admin-gradient">Perfect Pest Control?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Discover what makes us the trusted choice for professional pest control services
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {whyPerfectPest.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="card-hover h-full border-0 shadow-xl overflow-hidden group">
                  <CardContent className="p-6 sm:p-8 relative">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${item.gradient} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Bug className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Pest Control Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Comprehensive Pest
              <span className="block text-transparent bg-clip-text bg-admin-gradient">Management Solutions</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              We handle all types of pest infestations with safe, effective, and environmentally responsible methods
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "🐜",
                title: "Ants",
                description: "Complete ant colony elimination and prevention",
                color: "from-red-500 to-orange-600",
              },
              {
                icon: "🪳",
                title: "Cockroaches",
                description: "Effective cockroach control and sanitation",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: "🐭",
                title: "Rodents",
                description: "Safe mouse and rat removal services",
                color: "from-gray-500 to-slate-600",
              },
              {
                icon: "🦟",
                title: "Mosquitoes",
                description: "Mosquito control and breeding site treatment",
                color: "from-blue-500 to-cyan-600",
              },
              {
                icon: "🪲",
                title: "Termites",
                description: "Complete termite elimination and wood protection",
                color: "from-purple-500 to-indigo-600",
              },
              {
                icon: <Leaf className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
                title: "Eco-Safe",
                description: "Environmentally friendly pest solutions",
                color: "from-green-500 to-teal-600",
              },
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp} className="xl:col-span-1">
                <Card className="card-hover h-full border-0 shadow-xl overflow-hidden group bg-white">
                  <CardContent className="p-4 sm:p-6 text-center relative">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white text-xl sm:text-2xl md:text-3xl">
                        {typeof service.icon === 'string' ? service.icon : service.icon}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Our Team
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Expert Technicians
              <span className="block text-transparent bg-clip-text bg-admin-gradient">Protecting Your Property</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Meet our certified pest control professionals who bring expertise, safety, and reliability to every service
            </p>
          </motion.div>

          <motion.div
            className="max-w-6xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-transparent bg-clip-text bg-admin-gradient">
                      Certified Pest Control Team
                    </h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base md:text-lg">
                      Our team consists of licensed pest control technicians, entomologists, and customer service 
                      specialists dedicated to providing effective pest management solutions. Each team member is 
                      trained in the latest pest control techniques and safety protocols.
                    </p>
                    <div className="grid gap-3 sm:gap-4">
                      {[
                        "Licensed Pest Control Technicians",
                        "Certified Chemical Applicators",
                        "24/7 Emergency Response",
                        "Safety-First Approach",
                        "Eco-Friendly Solutions",
                        "Guaranteed Results",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 mr-2 sm:mr-3 flex-shrink-0" />
                          <span className="text-gray-700 font-medium text-sm sm:text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center border-2 border-emerald-100">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-admin-gradient rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                      <Wrench className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                      Pest Control Experts
                    </h4>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      Dedicated professionals ensuring pest-free environments
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-sm border border-emerald-100">
                        <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-admin-gradient">
                          8+
                        </div>
                        <div className="text-gray-600">Technicians</div>
                      </div>
                      <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-sm border border-emerald-100">
                        <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-admin-gradient">
                          3+
                        </div>
                        <div className="text-gray-600">Support Staff</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Treatment Process Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-emerald-50/50"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Wrench className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Our Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Professional Treatment
              <span className="block text-transparent bg-clip-text bg-admin-gradient">Process</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Our systematic approach ensures effective pest elimination and long-term prevention
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                icon: <Microscope className="h-6 w-6 sm:h-7 sm:w-7" />,
                title: "Inspection",
                description: "Thorough property inspection to identify pest types, entry points, and infestation levels",
                color: "from-blue-500 to-cyan-600",
              },
              {
                step: "02",
                icon: <Target className="h-6 w-6 sm:h-7 sm:w-7" />,
                title: "Treatment Plan",
                description: "Customized treatment strategy based on pest type, severity, and property requirements",
                color: "from-emerald-500 to-green-600",
              },
              {
                step: "03",
                icon: <Zap className="h-6 w-6 sm:h-7 sm:w-7" />,
                title: "Treatment",
                description: "Safe and effective pest elimination using approved methods and eco-friendly solutions",
                color: "from-purple-500 to-indigo-600",
              },
              {
                step: "04",
                icon: <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" />,
                title: "Prevention",
                description: "Follow-up services and preventive measures to ensure long-term pest-free environment",
                color: "from-orange-500 to-red-600",
              },
            ].map((process, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="card-hover h-full border-0 shadow-xl overflow-hidden group relative bg-white">
                  <CardContent className="p-6 sm:p-8 text-center relative">
                    {/* Step Number - Better positioned */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-sm sm:text-base font-bold text-gray-600">{process.step}</span>
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${process.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{process.icon}</div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
                      {process.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{process.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingContactButtons />
    </div>
  )
}
