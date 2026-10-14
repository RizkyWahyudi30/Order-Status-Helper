function isPaid(order) {
  if (order.payment.status) {
    return true;
  } else {
    return false;
  }
}

function hasShipped(order) {
  if (order.shipping.status) {
    return true;
  } else {
    return false;
  }
}

function getDeliveryMessage(order) {
  if (order.shipping.status === "shipped") {
    return `Order ${order.shipping.status}. Estimated delivery: ${order.shipping.estimatedDelivery}`;
  } else {
    return `Order has not shipped yet.`;
  }
}

function needsAttention(order) {
  if (
    order.payment.status === "unpaid" ||
    !order.shipping.status === "shipped"
  ) {
    return true;
  } else {
    return false;
  }
}

function createOrderSummary(order) {
  let totalItem = order.items.reduce((acc, currItem) => {
    return acc + currItem.quantity;
  }, 0);

  return {
    id: order.id,
    customerName: order.customer.name,
    paid: isPaid(order),
    shipped: hasShipped(order),
    itemCount: totalItem,
    deliveryMessage: getDeliveryMessage(order),
    needsAttention: needsAttention(order),
  };
}

const order = {
  id: "ORD-1001",
  customer: {
    name: "Ava Stone",
    email: "ava@example.com",
  },
  payment: {
    status: "paid",
  },
  shipping: {
    status: "shipped",
    estimatedDelivery: "2026-06-18",
  },
  items: [
    { name: "Notebook", quantity: 2 },
    { name: "Pen Set", quantity: 1 },
  ],
};

console.log(createOrderSummary(order));
console.log(isPaid(order));
console.log(hasShipped(order));

const pendingOrder = {
  ...order,
  payment: { status: "unpaid" },
  shipping: { status: "processing", estimatedDelivery: "2026-06-18" },
};
console.log(needsAttention(pendingOrder));
console.log(getDeliveryMessage(pendingOrder));
