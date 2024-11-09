import React from 'react';
import { IMAGES } from '../../constants/images';

export default function Logo({ className = "h-8 w-auto" }) {
    return (
        <div className="flex items-center">
            <img
                src={IMAGES.LOGO}
                alt="Boutique Hotel"
                className={className}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                }}
            />
            <span 
                className="text-2xl font-bold text-primary" 
                style={{ display: 'none' }}
            >
                BH
            </span>
        </div>
    );
} 