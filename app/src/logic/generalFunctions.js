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