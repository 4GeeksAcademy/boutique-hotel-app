import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function FlowingPropertyShowcase() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={stagger}
        ref={ref}
        className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
      >
        <motion.h1 
          variants={fadeInUp}
          className="text-5xl font-extrabold text-center mb-12 text-text"
        >
          Mountain Vista Retreat
        </motion.h1>

        <div className="relative mb-24">
          <motion.img
            variants={fadeInUp}
            src="/placeholder.svg?height=600&width=800"
            alt="Mountain Vista Retreat"
            className="w-full h-96 object-cover rounded-lg shadow-2xl"
          />
          <motion.div
            variants={fadeInUp}
            className="absolute -bottom-12 -right-6 w-64 h-64 bg-background-light p-4 rounded-lg shadow-xl"
          >
            <img
              src="/placeholder.svg?height=300&width=300"
              alt="Cozy interior"
              className="w-full h-full object-cover rounded"
            />
          </motion.div>
        </div>

        <motion.p
          variants={fadeInUp}
          className="text-xl text-center max-w-3xl mx-auto mb-16 text-text-light"
        >
          Nestled in the heart of the majestic mountains, our retreat offers a perfect blend of rustic charm and modern luxury. Immerse yourself in nature while enjoying breathtaking views and unparalleled comfort.
        </motion.p>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-3xl font-bold text-text">Property Highlights</h2>
            <ul className="list-disc list-inside space-y-2 text-text-light">
              <li>Panoramic mountain views from every window</li>
              <li>Spacious deck with outdoor hot tub</li>
              <li>Fully equipped gourmet kitchen</li>
              <li>Cozy fireplace for chilly evenings</li>
              <li>High-speed Wi-Fi and smart home features</li>
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp} className="relative h-80">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Property exterior"
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-center mb-12 text-text"
        >
          Nearby Adventures
        </motion.h2>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Hiking Trails", image: "/placeholder.svg?height=300&width=400", description: "Miles of scenic trails for all skill levels" },
            { title: "Mountain Biking", image: "/placeholder.svg?height=300&width=400", description: "Thrilling downhill runs and peaceful forest paths" },
            { title: "Alpine Lakes", image: "/placeholder.svg?height=300&width=400", description: "Crystal-clear waters perfect for swimming and fishing" },
          ].map((activity, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-background-light rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-text">{activity.title}</h3>
                <p className="text-text-light">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="text-center"
        >
          <a
            href="#book-now"
            className="inline-block bg-primary text-text font-bold py-3 px-8 rounded-full text-lg hover:bg-primary-dark transition-colors duration-300 transform hover:scale-105"
          >
            Book Your Mountain Getaway
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            fill="none"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="2"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></motion.path>
        </svg>
      </div>
    </div>
  )
} 