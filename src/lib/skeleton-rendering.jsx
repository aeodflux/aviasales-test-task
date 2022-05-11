const skeletonTicket = <div className='ticketBody skeletonTicket'>
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

export const skeletonRender = (n) => {
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(skeletonTicket)
    }
    return result;
}