import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="bg-background text-text">
            {/* Hero Section */}
            <div className="relative h-[80vh]">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url(/static/images/hero.jpg)`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                />
                <div className="absolute inset-0 bg-black/50" />
                
                <div className="relative z-10 h-full flex items-center justify-center text-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Welcome to Boutique Hotel
                        </h1>
                        <p className="text-lg md:text-xl mb-8">
                            Experience unparalleled comfort and exceptional service
                        </p>
                        <Link 
                            to="/rooms"
                            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            Book Your Stay
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Experience Luxury
                        </h2>
                        <p className="mt-4 text-xl text-gray-500">
                            Discover what makes us unique
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Elegant Rooms",
                                description: "Beautifully designed spaces for your comfort"
                            },
                            {
                                title: "Fine Dining",
                                description: "World-class cuisine at your doorstep"
                            },
                            {
                                title: "Premium Service",
                                description: "24/7 concierge and room service"
                            }
                        ].map((feature, index) => (
                            <div 
                                key={index}
                                className="text-center p-6 bg-gray-50 rounded-lg"
                            >
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Rooms Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Featured Rooms
                        </h2>
                        <p className="mt-4 text-xl text-gray-500">
                            Select your perfect stay
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Room cards will be dynamically added here */}
                    </div>

                    <div className="text-center mt-12">
                        <Link 
                            to="/rooms"
                            className="inline-block bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                            View All Rooms
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
} 