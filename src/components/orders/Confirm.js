"use client";

import KhaltiPayment from "./KhaltiPayment";
import CashOnDelivery from "./CashOnDelivery";

function ConfirmOrder({ order }) {
  return (
    <div className="flex gap-3">
      <CashOnDelivery order={order} />
      <KhaltiPayment order={order} />
    </div>
  );
}

export default ConfirmOrder;
