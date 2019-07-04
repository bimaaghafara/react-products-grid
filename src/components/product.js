import React from 'react';

export default function Product(props) {
    return (
        <div className="product-wrapper">
            <div className="face-wrapper" style={{fontSize: `${props.size}px`}}>
                <div className="face">{props.face}</div>
            </div>
            <div className="description">
                <div className="price text-right">
                    ${(props.price/100).toFixed(2)}
                </div>
                <div className="added-time text-right">
                   {getAddedTimeLabel(props.date)}
                </div>
            </div>
        </div>
    );
}

function getAddedTimeLabel(addedTime) {
    // in milisecond :
    const oneSecond = 1000;
    const oneMinute = 60*oneSecond;
    const oneHour = 60*oneMinute;
    const oneDay = 24*oneHour;
    const oneWeek = 7*oneDay;

    const diffTime = new Date() - new Date(addedTime);
    if (diffTime < oneMinute) {
        const timeAgo = Math.floor(diffTime/oneSecond);
        return `${timeAgo} ${timeAgo>1? 'seconds': 'second'} ago` ;
    } else if (diffTime < oneHour) {
        const timeAgo = Math.floor(diffTime/oneMinute);
        return `${timeAgo} ${timeAgo>1? 'minutes': 'minute'} ago` ;
    } else if (diffTime < oneDay) {
        const timeAgo = Math.floor(diffTime/oneHour);
        return `${timeAgo} ${timeAgo>1? 'hours': 'hour'} ago`;
    } else if (diffTime < oneWeek) {
        const timeAgo = Math.floor(diffTime/oneDay);
        return `${timeAgo} ${timeAgo>1? 'days': 'day'} ago`;
    } else {
        return `${new Date(addedTime).toLocaleString()}`; 
    }
}