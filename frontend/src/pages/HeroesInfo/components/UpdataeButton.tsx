import { useState, type FC } from "react";
import ModalUpdate from "./ModalUpdate";
import styles from "./UpdateButton.module.css";

const UpdateButton: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open && <ModalUpdate />}
      <button onClick={() => setOpen(!open)} className={styles.updateButton}>update</button>
    </>
  );
};

export default UpdateButton;
