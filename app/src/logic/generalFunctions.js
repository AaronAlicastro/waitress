export function areEquals(...arrays) {
    let totalLengthArrays = 0, uniqueArray = [];
    arrays.forEach(ar => {
        totalLengthArrays += ar.length;
        uniqueArray.push(...ar);
    });
    let averageLength = totalLengthArrays / arrays.length;
    if (!(averageLength + "").includes(".") || !(averageLength + "").includes(",")) {
        let totalLength = [...new Set(uniqueArray)].length;
        return (totalLength == averageLength);
    } 
    return false;
}

export class ObjectsInteractivesOver {
    constructor() {
        this.objectsWorked = [];
    }

    setObjectsWorked(objs) {
        this.objectsWorked = objs;
    }

    verifyInteraction(principalObject, clientX, clientY) {
        let currentObjects = this.objectsWorked.filter(objs => objs != principalObject);
        return currentObjects.find(ob => {
            if (
                clientX > ob.offsetLeft && clientX < (ob.offsetLeft + ob.offsetWidth) && // X
                clientY > ob.offsetTop && clientY < (ob.offsetTop + ob.offsetHeight) // Y
            ) return true;
            return false;
        });
    }
}