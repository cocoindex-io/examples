import type { ReactNode } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

type LastReviewedProps = {
    date?: string;
    margin?: string;
};

function LastReviewed({ date, margin = '0 0 24px 0' }: LastReviewedProps): ReactNode {
    const displayDate = date || new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            margin
        }}>
            <FaCheckCircle style={{ color: '#22c55e' }} />
            <span style={{ color: 'black' }}>Last reviewed: {displayDate}</span>
        </div>
    );
}

export { LastReviewed };

