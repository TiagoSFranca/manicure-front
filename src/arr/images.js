const getImages = () => {
    let arr = []
    for (let index = 0; index < 10; index++) {
        arr.push({
            id: index,
            src: `https://picsum.photos/500/300?image=${index * 5 + 10}`
        })
    }
    
    return arr;
}

export default {
    getImages
}