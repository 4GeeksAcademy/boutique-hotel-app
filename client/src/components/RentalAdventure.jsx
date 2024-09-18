import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'

const Scene = ({ title, description, index, totalScenes }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })

  return (
    <Parallax speed={-20}>
      <section ref={ref} className="h-screen flex items-center justify-center relative" aria-label={`Scene ${index + 1}: ${title}`}>
        <img
          src={`/placeholder.svg?height=1080&width=1920&text=Scene+${index + 1}`}
          alt={`Illustrative image for ${title}`}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-xl md:text-2xl text-white">{description}</p>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-opacity-50">
          {index + 1} / {totalScenes}
        </div>
      </section>
    </Parallax>
  )
}

export default function RentalAdventure() {
  const targetRef = useRef(null)
  const [showButton, setShowButton] = useState(false)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  const scenes = [
    { title: "Welcome to Your Dream Getaway", description: "Begin your journey through luxury" },
    { title: "Breathtaking Views", description: "Wake up to stunning vistas every morning" },
    { title: "Luxurious Interiors", description: "Indulge in our meticulously designed spaces" },
    { title: "Relaxation Awaits", description: "Unwind in our state-of-the-art amenities" },
    { title: "Unforgettable Experiences", description: "Create lasting memories in paradise" }
  ]

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => setShowButton(v >= 0.9))
    return () => unsubscribe()
  }, [scrollYProgress])

  const isInView = useInView(targetRef, { once: false, amount: 0.1 })

  return (
    <ParallaxProvider>
      <motion.div
        ref={targetRef}
        className="relative bg-black text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {scenes.map((scene, index) => (
          <Scene key={index} {...scene} index={index} totalScenes={scenes.length} />
        ))}

        <div className="relative h-screen">
          <img
            src="/placeholder.svg?height=1080&width=1920&text=Final+Scene"
            alt="Final adventure scene"
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showButton ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center p-8 max-w-2xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Create Lasting Memories?</h3>
              <p className="text-xl mb-8">Your unforgettable experience in paradise awaits.</p>
              <motion.button
                className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold"
                whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Booking functionality would be implemented here')}
              >
                Book Your Paradise Getaway
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </ParallaxProvider>
  )
}