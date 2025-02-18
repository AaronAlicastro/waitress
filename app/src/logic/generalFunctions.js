export function areEquals(...arrays) {
  const uniqueArray = [];
  let totalLengthArrays = 0;

  arrays.forEach((ar) => {
    totalLengthArrays += ar.length;
    uniqueArray.push(...ar);
  });

  const averageLength = totalLengthArrays / arrays.length + "";

  if (!averageLength.includes(".")) {
    const totalLength = [...new Set(uniqueArray)].length;
    return totalLength === averageLength;
  }

  return false;
}

export class ObjectsInteractivesOver {
  constructor() {
    this.objectsWorked = [];
  }

  verifyInteraction(principalObject, clientX, clientY) {
    const currentObjects = this.objectsWorked.filter(
      (objs) => objs != principalObject
    );

    return currentObjects.find((ob) => {
      if (
        clientX > ob.offsetLeft &&
        clientX < ob.offsetLeft + ob.offsetWidth && // X
        clientY > ob.offsetTop &&
        clientY < ob.offsetTop + ob.offsetHeight // Y
      ) {
        return true;
      }

      return false;
    });
  }

  setBillCounter(inputWorked, target) {
    if (target === inputWorked) {
      this.objectsWorked = [...document.querySelectorAll(".billBallNumbers")];
    } else this.objectsWorked = [inputWorked];
  }
}
