import React from "react";
import { useNavigate } from "react-router-dom";

export default function firstPage() {
    const navigate = useNavigate();
    return (
        <div>
            <h1 className='text-primary-color'>page d'acceuil</h1>
            <h1 className='text-secondary-color'>contenue</h1>
            <button type="submit"
                className="bouton-btn bouton-btn-primary"
                onClick={() => navigate("/second")}
            >
                accèder
            </button>
        </div>
    )
}