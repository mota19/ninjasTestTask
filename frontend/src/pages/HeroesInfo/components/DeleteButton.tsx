import type { FC } from "react";
import { useDeleteHeroMutation } from "../../../redux/sevices/heroApi";
import { useNavigate } from "react-router-dom";

const DeleteButton: FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();
  const [deleteHero] = useDeleteHeroMutation();

  function handleClick() {
    deleteHero(id);
    navigate("/");
  }

  return <button onClick={handleClick}>delete</button>;
};

export default DeleteButton;
