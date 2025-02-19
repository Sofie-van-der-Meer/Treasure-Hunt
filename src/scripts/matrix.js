export default
function setMatrix(amountStones, amountTreasures, grassWidth) {
    const randomCoordinate = function(width) {
        return Math.round(Math.random() * width - (width / 2))
    }
    let matrix = {
        models: [[-3,-3],[3,3]],
        stones: [],
        treasures: []
    }

    while (amountStones) {
        const location = [randomCoordinate(grassWidth), randomCoordinate(grassWidth)]
        const locationExistInModels = findLocation(matrix.models, location)
        const locationExistInStones = findLocation(matrix.stones, location)
        
        if ( !locationExistInModels && !locationExistInStones ) {
            matrix.stones[amountStones - 1] = location  
            amountStones--
        }
    }
    while (amountTreasures) {
        const location = [randomCoordinate(grassWidth), randomCoordinate(grassWidth)]
        const locationExistInModels = findLocation(matrix.models, location)
        const locationExistInStones = findLocation(matrix.stones, location)
        const locationExistInTreasures = findLocation(matrix.treasures, location)
        
        if ( !locationExistInModels && !locationExistInStones && !locationExistInTreasures ) {
            matrix.treasures[amountTreasures - 1] = location  
            amountTreasures--
        }
    }
    return matrix
}
function findLocation(element, location) {
    return element.some( subArray => subArray.every( (val, index) => val === location[index] ) )
}
