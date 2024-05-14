import * as React from "react";

import Pagination, { ReactPaginateProps } from "react-paginate";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import styles from "./AppPagination.module.scss";
const ReactPaginate = Pagination as any;
interface Props { }

export const AppPagination: React.FC<Props & ReactPaginateProps> = (props) => {
  return (
    <ReactPaginate
      containerClassName={styles.container}
      breakLabel="..."
      pageRangeDisplayed={1}
      nextClassName={styles.next}
      activeClassName={styles.active}
      nextLabel={<FaArrowRight size={20} />}
      previousLabel={<FaArrowLeft size={20} />}
      disabledClassName={styles.disabled}
      {...props}
    />
  );
};
