import type { FC } from "react";
import { useParams } from "react-router-dom";
import styles from "./HeroInfo.module.css";
import { useGetHeroByIdQuery } from "../../redux/sevices/heroApi";
import DeleteButton from "./components/DeleteButton";
import UpdateButton from "./components/UpdataeButton";

const HeroesInfo: FC = () => {
  const { id = 0 } = useParams();

  const { data, isLoading, error } = useGetHeroByIdQuery({ id: Number(id) });
  if (isLoading) return <div>loading...</div>;

  if (error || !data) return <div>error not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {data.images.map((el) => (
          <img
            src={`/images/${id}/${el}`}
            alt={data.nickname}
            className={styles.poster}
          />
        ))}
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>{data.nickname}</h1>
        <p>
          <strong>Real name</strong> {data.real_name}
        </p>
        <p>
          <strong>Origin description</strong> {data.origin_description}
        </p>
        <p>
          <strong>Super powers</strong> {data.superpowers.join(", ")}
        </p>
        <p>
          <strong>Catch phrase</strong> {data.catch_phrase}
        </p>
      </div>
      <DeleteButton id={+id} />
      <UpdateButton />
    </div>
  );
};

export default HeroesInfo;
