import { SetStateAction } from 'react';
import { AiOutlineLeft, AiOutlineLoading3Quarters, AiOutlineRight } from 'react-icons/ai';
import style from './Pagination.module.scss';

export const GET_API_LIMIT = 50;

type PaginationType = {
  disabled?: boolean;
  count: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  limit?: number;
  className?: string;
} & React.ComponentProps<'div'>;

const PaginationButtonLoading = () => (
  <div className={style.loadingContainer}>
    <AiOutlineLoading3Quarters />
  </div>
);

const Pagination = ({ disabled, count, currentPage, setCurrentPage, limit, className }: PaginationType) => {
  const useLimit = limit ?? GET_API_LIMIT;

  const content: {
    page: number;
  }[] = [];
  const newCount = Math.ceil(count / useLimit);
  for (let i = 0; i < newCount; i++) {
    content.push({
      page: i,
    });
  }

  return (
    <div className={`${style.container} ${className ?? ''}`}>
      <button
        type="button"
        className="bg-blue text-white items-center rounded text-white p-2 text-sm mx-1"
        style={currentPage <= 0 ? { background: 'gray' } : {}}
        onClick={() => {
          if (disabled) return;
          if (currentPage <= 0) return;
          setCurrentPage((prev) => prev - 1);
        }}
      >
        <AiOutlineLeft />
      </button>
      <div className={style.pages}>
        {content.map((item, i) => (
          <button
            key={i}
            type="button"
            className="bg-blue text-white items-center rounded text-white p-1 px-3 text-md mx-1"
            style={currentPage === item.page ? { background: 'gray' } : {}}
            onClick={() => {
              if (disabled) return;
              if (currentPage === item.page) return;
              setCurrentPage(item.page);
            }}
          >
            {currentPage === item.page && disabled ? <PaginationButtonLoading /> : <>{item.page + 1}</>}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="bg-blue text-white items-center rounded text-white p-2 text-sm mx-1"
        style={(currentPage + 1) * useLimit >= count ? { background: 'gray' } : {}}
        onClick={() => {
          if (disabled) return;
          if ((currentPage + 1) * useLimit >= count) return;
          setCurrentPage((prev) => prev + 1);
        }}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
};


export default Pagination;
