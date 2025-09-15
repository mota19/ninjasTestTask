import type { FC } from "react";
import { useDeleteHeroMutation } from "../../../redux/sevices/heroApi";
import { useNavigate } from "react-router-dom";
import styles from "./DeleteButton.module.css";

const DeleteButton: FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();
  const [deleteHero] = useDeleteHeroMutation();

  function handleClick() {
    deleteHero(id);
    navigate("/");
  }

  return <button onClick={handleClick} className={styles.deleteButton}> delete</button>;
};

export default DeleteButton;
