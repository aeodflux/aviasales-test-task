import React from 'react';
import "./skeleton.scss"

export class SkeletonTicket extends React.Component {
    constructor(props) {
        super(props);
        this.key = this.props.key;
        this.count = this.props.count;
    }
    render() {
        return (Array.from({ length: this.props.count }).map((el, indx) => 
            <div className='skeleton-body' key={indx}>
                <div className="skeleton-body__container">
                    <div className='skeleton-body__price'/>
                    <div className='skeleton-body__logo'/>
                </div>
                <div className='skeleton-body__data-container'>
                    <div className='skeleton-body__data'/>
                    <div className='skeleton-body__data'/>
                </div>
            </div>
        ))
    }
}