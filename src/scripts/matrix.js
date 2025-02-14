import parameters from "./parameters";
import sourcesMeshes from "./sourcesMeshes";

const grassWidth = sourcesMeshes.find(obj => obj.name == 'grass').width
const parametersEasy = parameters.find(obj => obj.level == 'easy')
const offset = (grassWidth / 2)
let amountStones = parametersEasy.amountStones 
let amountTreasures = parametersEasy.amountTreasures

function setMatrix(offset, amountStones, amountTreasures, grassWidth) {
    const randomCoordinate = function(width, offset) {
        // console.log(width, offset)
        return Math.round(Math.random() * width - offset)
    }
    let matrix = {
        stones: [],
        treasures: []
    }

    while (amountStones) {
        const location = [randomCoordinate(grassWidth, offset), randomCoordinate(grassWidth, offset)]
        const locationExist = matrix.stones.some( subArray => subArray.every( (val, index) => val === location[index] ) )
        
        if ( !locationExist ) {
            matrix.stones[amountStones - 1] = location  
            amountStones--
        }
    }
    while (amountTreasures) {
        const location = [randomCoordinate(grassWidth, offset), randomCoordinate(grassWidth, offset)]
        const locationExistInStones = matrix.stones.some( subArray => subArray.every( (val, index) => val === location[index] ) )
        const locationExistInTreasures = matrix.treasures.some( subArray => subArray.every( (val, index) => val === location[index] ) )
        
        if ( !locationExistInStones && !locationExistInTreasures ) {
            matrix.treasures[amountTreasures - 1] = location  
            amountTreasures--
        }
    }
    console.log(matrix);
    return matrix
}
export default setMatrix(offset, amountStones, amountTreasures, grassWidth);