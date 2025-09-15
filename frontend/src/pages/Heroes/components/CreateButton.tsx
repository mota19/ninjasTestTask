import { useState, type FC } from "react";
import CreateModal from "./CreateModal";
import styles from "./CreateButton.module.css";

const UpdateButton: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open && <CreateModal setIsOpen={setOpen}/>}
      <button onClick={() => setOpen(!open)} className={styles.updateButton}>Create</button>
    </>
  );
};

export default UpdateButton;
