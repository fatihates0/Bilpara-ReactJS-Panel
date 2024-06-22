import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const TruncatedText = ({ text, maxLength, alert }) => {
    const [isHovered, setIsHovered] = useState(false);



    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Token başarıyla kopyalandı.');
            //alert('Text copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <span
            className="ms-2 badge bg-soft-danger text-success"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            {isHovered ? text : `${text.slice(0, maxLength)}...`}
        </span>
    );
};

export default TruncatedText;
