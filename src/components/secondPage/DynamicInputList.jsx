import React, { useState, useEffect } from 'react';

const DynamicInputList = ({ title, type, items, setItems }) => {
    
    const getDefaultName = (index) => {
        return type === "alphabet" ? String.fromCharCode(65 + (index % 26)) : (index + 1);
    };

    const handleNumberChange = (e) => {
        const val = parseInt(e.target.value) || 0;
        if (val > items.length) {
            const diff = val - items.length;
            const news = Array.from({ length: diff }, () => ({ id: Math.random() + Date.now(), nom: "" }));
            setItems([...items, ...news]);
        } else if (val < items.length && val >= 1) {
            // Logique de vérification si vide avant de diminuer
            const toRemove = items.slice(val);
            if (toRemove.every(i => i.nom === "")) {
                setItems(items.slice(0, val));
            } else {
                alert("Veuillez supprimer manuellement les champs remplis.");
            }
        }
    };

    return (
        <div className="dynamic-section">
            <div className="header-row">
                <label>{title}</label>
                <input type="number" value={items.length} onChange={handleNumberChange} min="1" />
            </div>
            {items.map((item, index) => (
                <div key={item.id} className="item-row">
                    <input 
                        placeholder={`Nom: ${getDefaultName(index)}`} 
                        value={item.nom} 
                        onChange={(e) => {
                            const copy = [...items];
                            copy[index].nom = e.target.value;
                            setItems(copy);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default DynamicInputList;