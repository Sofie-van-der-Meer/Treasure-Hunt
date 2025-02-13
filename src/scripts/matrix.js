import parameters from "./parameters";
import sourcesMeshes from "./sourcesMeshes";

const grassWidth = sourcesMeshes.find(obj => obj.name == 'grass').width
const parametersEasy = parameters.find(obj => obj.level == 'easy')
const offset = (grassWidth / 2)
const totalAmount = (parametersEasy.amountStones + parametersEasy.amountTreasures)

function setMatrix(offset, totalAmount, grassWidth) {
    const randomCoordinate = function(width, offset) {
        // console.log(width, offset)
        return Math.round(Math.random() * width - offset)
    }
    let matrix = []

    while (totalAmount) {
        const location = [randomCoordinate(grassWidth, offset), randomCoordinate(grassWidth, offset)]
        const locationExist = matrix.some( subArray => subArray.every( (val, index) => val === location[index] ) )
        
        if ( !locationExist ) {
            matrix[totalAmount - 1] = location  
            totalAmount--
        }
    }
    return matrix
}
export default setMatrix(offset, totalAmount, grassWidth);