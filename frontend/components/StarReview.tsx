"use client"
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarReview() {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    return (
        <div className="flex gap-7 p-4 w-fit h-auto">

            {
                [...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label key={i} className="flex items-center justify-center  " >
                            <input className="relative hidden"
                                type="radio"
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                            />
                            <FaStar
                                size={24}
                                className="absolute transition-colors"
                                color={ratingValue <= (hover | rating) ? "#ffc017" : "#e4e5e9"}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)} />
                        </label>)
                })
            }
        </div >
    )
}