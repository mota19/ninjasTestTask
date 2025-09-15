import { useState, type FC } from "react";
import { useGetHeroesQuery } from "../../redux/sevices/heroApi";
import HeroCard from "./components/HeroCard";
import Pagination from "./components/pagination";
import styles from "./HeroesList.module.css";
import CreateButton from "./components/CreateButton";

const HeroesList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetHeroesQuery({ page: currentPage });

  if (isLoading) return <div>loading...</div>;

  if (error || !data) return <div>error not found</div>;

  return (
    <div className={styles.container}>
      <CreateButton />
      {data?.heroes?.map((el) => (
        <HeroCard
          nickname={el.nickname}
          images={el.images}
          key={el.id}
          id={el.id}
        />
      ))}
      {data?.totalPages && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default HeroesList;
