import type { FC } from "react";
import type { IHero } from "../../../types/herotypes";
import styles from "./HeroCard.module.css";
import { Link } from "react-router-dom";

const HeroCard: FC<Partial<IHero>> = ({ nickname, images, id }) => {
  return (
    <Link className={styles.card} to={`/hero/${id}`}>
      <img className={styles.img} src={images?.[0]} alt={nickname} />
      <p>{nickname}</p>
    </Link>
  );
};

export default HeroCard;
