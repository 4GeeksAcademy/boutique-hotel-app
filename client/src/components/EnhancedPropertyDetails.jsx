import React, { useState } from 'react'
import { CalendarIcon, WifiIcon, TvIcon, CoffeeIcon, UtensilsIcon, CarIcon, StarIcon, MapPinIcon } from 'lucide-react'
import Button from './Button'

export default function EnhancedPropertyDetails({ property }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { name, price, rating, reviewCount, images, amenities, description, reviews, details } = property

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-background text-text">
      <h1 className="text-4xl font-bold mb-6">{name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-96 mb-4">
            <img
              src={images[selectedImage]}
              alt={`Property image ${selectedImage + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-24 h-16 object-cover rounded cursor-pointer transition-all ${
                  selectedImage === index ? 'ring-2 ring-primary shadow-md' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <div className="bg-background-light rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-text">${price} <span className="text-lg font-normal text-text-dark">per night</span></h2>
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-primary" />
                <span className="ml-1 font-semibold text-text">{rating} ({reviewCount} reviews)</span>
              </div>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-text" htmlFor="check-in">Check-in</label>
                  <div className="relative">
                    <input
                      type="date"
                      id="check-in"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary bg-background text-text"
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-text-dark pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-text" htmlFor="check-out">Check-out</label>
                  <div className="relative">
                    <input
                      type="date"
                      id="check-out"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary bg-background text-text"
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-text-dark pointer-events-none" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-text" htmlFor="guests">Guests</label>
                <select id="guests" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary bg-background text-text">
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                </select>
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Book Now
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-text">About this property</h2>
          <p className="mb-6 text-text-light leading-relaxed">{description}</p>
          
          <h3 className="text-xl font-semibold mb-4 text-text">Amenities</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {amenities.map((amenity, index) => (
              <li key={index} className="flex items-center text-text-light">
                <span className="mr-2 text-primary">{amenity.icon}</span>
                {amenity.name}
              </li>
            ))}
          </ul>
          
          <h3 className="text-xl font-semibold mb-4 text-text">Location</h3>
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-123.45678!3d45.67890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDQwJzQ0LjAiTiAxMjPCsDI3JzI0LjQiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy"
              title="Property location"
            ></iframe>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-text">Guest Reviews</h3>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2 text-text">{review.author}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'text-primary' : 'text-text-dark'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-text-light">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-background-light rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-text">Property Details</h3>
            <ul className="space-y-2 text-text-light">
              {Object.entries(details).map(([key, value]) => (
                <li key={key}><strong className="text-text">{key}:</strong> {value}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  )
}