import type { FC } from "react";
import { useAppSelector } from "../../../redux/hooks/hooks";
import styles from "./ModalUpdate.module.css";

const ModalUpdate: FC = () => {
  const hero = useAppSelector((state) => state.heroes.hero);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <form className={styles.form}>
          <div>
            <label></label>
            <input
              type="text"
              value={hero?.catch_phrase}
              placeholder={hero?.catch_phrase}
            />
          </div>
          <input
            type="text"
            value={hero?.nickname}
            placeholder={hero?.catch_phrase}
          />
          <input
            type="text"
            value={hero?.origin_description}
            placeholder={hero?.catch_phrase}
          />
          <input
            type="text"
            value={hero?.real_name}
            placeholder={hero?.catch_phrase}
          />
          <input
            type="text"
            value={hero?.nickname}
            placeholder={hero?.catch_phrase}
          />
          <input
            type="text"
            value={hero?.superpowers}
            placeholder={hero?.catch_phrase}
          />
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
