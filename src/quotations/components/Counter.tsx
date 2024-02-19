import { IoAdd, IoRemove } from "react-icons/io5";
import {
  removeOneItemFromList,
  setProdListCookie,
} from "../quotations-actions";


interface Props {
  quantity: number;
  prodId: string;
  addQty: () => void;
  removeQty: () => void;
  setQty: (arg: number) => void;
}

export const Counter = ({ quantity, prodId , addQty, removeQty, setQty}: Props) => {

    const onAdd = () => {
        addQty()
    }

    const onRemove = () => {
        removeQty()
    }

  return (
    <div className="flex flex-col ">
      <label className="w-2/12">Quantity</label>
      <div className="flex items-center justify-center">
        <div className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer flex justify-center items-center min-h-[37.6px] border ">
          <IoRemove
            onClick={() => onRemove()}
            className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white"
            size={20}
            height={30}
          />
        </div>

        <input
          type="number"
          className="border  bg-slate-100 outline-none max-w-12 p-2 text-center"
          value={quantity}
          disabled
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <div className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer flex justify-center items-center min-h-[37.6px]  border">
          <IoAdd
            className="bg-blue-500 hover:bg-blue-700  hover:cursor-pointer text-white"
            size={20}
            onClick={() => onAdd()}
          />
        </div>
      </div>
    </div>
  );
};
