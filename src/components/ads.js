import React from 'react';

export default function Ads(props) {
    return (
        <div className="product-wrapper">
            <div className="img-wrapper" style={{backgroundImage: `url('http://localhost:3000/ads?r=${props.rParam}')`}}>
            </div>
            <div className="description">
                #{props.rParam}
                <div className="price text-right">
                    $X.XX
                </div>
                <div className="added-time text-right">
                   This is product ads!
                </div>
            </div>
        </div>
    );
}