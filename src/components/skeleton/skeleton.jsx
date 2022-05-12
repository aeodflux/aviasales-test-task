import React from 'react';
import "./skeleton.scss"

export class SkeletonTicket extends React.Component {
    constructor(props) {
        super(props);
        this.key = this.props.key;
        this.count = this.props.count;
    }
    render() {
        let result = [];
        for (let i = 0; i < this.count; i++) {
            result.push(
                <div className='ticketBody skeletonTicket' key={i}>
                    <div className='ticketBody__headingContainer'>
                        <div className='ticketBody__heading'></div>
                        <div alt="logo" width="150px" height="60px" className="skeletonTicket__logo"/>
                    </div>
                    <div className='ticketBody__data'>
                        <div className='ticketBody__dataBlock dataBlock__time'>
                            <div className='ticketBody__dataHeading'></div>
                            <div className='ticketBody__dataTime'></div>
                        </div>
                        <div className='ticketBody__dataBlock dataBlock__path'>
                            <div className='ticketBody__dataHeading'></div>
                            <div className='ticketBody__dataTime'></div>
                        </div>
                        <div className='ticketBody__dataBlock'>
                        <div className="ticketBody__dataHeading"></div>
                            <div className='ticketBody__dataTime'></div>
                        </div>
                    </div>
                    <div className='ticketBody__data'>
                        <div className='ticketBody__dataBlock dataBlock__time'>
                            <div className='ticketBody__dataHeading'></div>
                            <div className='ticketBody__dataTime'></div>
                        </div>
                        <div className='ticketBody__dataBlock dataBlock__path'>
                            <div className='ticketBody__dataHeading'></div>
                            <div className='ticketBody__dataTime'></div>
                        </div>
                        <div className='ticketBody__dataBlock'>
                            <div className="ticketBody__dataHeading"></div>
                            <div className='ticketBody__dataTime'></div>
                        </div>
                    </div>
                </div> 
            )
        }
        return result;
    }
}