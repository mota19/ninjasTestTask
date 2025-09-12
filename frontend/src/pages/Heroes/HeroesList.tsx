import { useState, type FC } from "react";
import { useGetHeroesQuery } from "../../redux/sevices/heroApi";
import HeroCard from "./components/heroCard";
import Pagination from "./components/pagination";
import styles from "./HeroList.module.css";

const HeroesList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetHeroesQuery({ page: currentPage });

  if (isLoading) {
    return <div>...</div>;
  }

  return (
    <div className={styles.container}>
      {data?.heroes?.map((el) => (
        <HeroCard nickname={el.nickname} images={el.images} key={el.id} />
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
