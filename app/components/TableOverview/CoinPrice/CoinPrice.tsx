import React from "react";
import { TableDataProps } from "../TableDataProps/TableDataProps";

const CoinPrice = ({ coin }: { coin: TableDataProps }) => {
  return (
    <td className="py-4">${coin.current_price.toLocaleString("en-US")}</td>
  );
};

export default CoinPrice;
