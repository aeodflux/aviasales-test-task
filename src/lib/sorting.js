export const cheapestSorting = (a, b) => {
    return (Number((a.price).replace(/\s+/g, '' )) - Number((b.price).replace(/\s+/g, '')))
}
export const fastestSorting = (a, b) => {
    return ((Number(a.segments[0].duration) + Number(a.segments[1].duration)) - (Number(b.segments[0].duration) + Number(b.segments[1].duration)))
}
export const optimalSorting = (a, b) => {
    return (((Number(a.segments[0].duration)+Number(a.segments[1].duration))*Number((a.price).replace(/\s+/g, ''))) - 
    ((Number(b.segments[0].duration)+Number(b.segments[1].duration))*Number((b.price).replace(/\s+/g, ''))))
}