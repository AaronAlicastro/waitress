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

export function createOrderCopy(order) {
  return {
    manager: order.manager,
    table: order.table,
    tableNumber: order.tableNumber,
    productsAsked: [...order.productsAsked],
    total: order.total,
  };
}

export function setOrderStatusStyle(status) {
  let background = "var(--order_pending)";

  if (status === "preparando") background = "var(--order_making)";
  else if (status === "terminado") background = "var(--order_finished)";
  else if (status === "entregado") background = "var(--order_delivered)";

  return { background };
}
