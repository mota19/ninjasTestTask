import type { FC } from "react";
import type { IHero } from "../../../types/herotypes";
import styles from "./HeroCard.module.css";

const HeroCard: FC<Partial<IHero>> = ({ nickname, images }) => {
  return (
    <div className={styles.card}>
      <img className={styles.img} src={images?.[0]} alt={nickname} />
      <p>{nickname}</p>
    </div>
  );
};

export default HeroCard;
