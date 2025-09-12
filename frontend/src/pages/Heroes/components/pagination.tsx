import type { FC } from "react";
import styles from "./Pagination.module.css";

const Pagination: FC<{
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}> = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers: number[] = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.pagination}>
      {startPage > 1 && (
        <>
          <button onClick={() => setCurrentPage(1)}>1</button>
          {startPage > 2 && <span className={styles.dots}>...</span>}
        </>
      )}

      {pageNumbers.map((el) => (
        <button
          key={el}
          onClick={() => setCurrentPage(el)}
          className={el === currentPage ? styles.active : ""}
        >
          {el}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className={styles.dots}>...</span>}
          <button onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
