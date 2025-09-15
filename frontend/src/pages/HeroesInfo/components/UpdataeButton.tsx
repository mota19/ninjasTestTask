import { useState, type FC } from "react";
import ModalUpdate from "./ModalUpdate";

const UpdateButton: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open && <ModalUpdate />}
      <button onClick={() => setOpen(!open)}>update</button>
    </>
  );
};

export default UpdateButton;
