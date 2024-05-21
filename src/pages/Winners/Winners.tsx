import React, { useEffect, useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { getWinners } from '@services/WinnersApi';
import { getCar } from '@services/GarageApi';
import { CarIcon } from '@components/CarIcon';
import { AppPagination } from '@components/ui/AppPagination';
import { Car } from 'src/types/CarTypes';
import styles from './Winners.module.scss';

interface Winner {
  id: number;
  wins: number;
  time: number;
  car: Car; // Detailed car information
}

const Winners: React.FC<{ currentView: 'garage' | 'winners' }> = ({
  currentView,
}) => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalWinners, setTotalWinners] = useState<number>(0);
  const [sortField, setSortField] = useState<'id' | 'wins' | 'time'>('id');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const winnersPerPage = 10;

  useEffect(() => {
    if (currentView === 'winners') {
      fetchWinners();
    }
  }, [page, sortField, sortOrder, currentView]);

  const fetchWinners = async () => {
    try {
      const response = await getWinners(
        page,
        winnersPerPage,
        sortField,
        sortOrder,
      );
      const winnersWithCars = await Promise.all(
        response.data.map(async winner => {
          const car = await getCar(winner.id);
          return { ...winner, car };
        }),
      );
      setWinners(winnersWithCars);
      setTotalWinners(response.totalCount);
    } catch (error) {
      console.error('Failed to fetch winners:', error);
    }
  };
  const handleSort = (field: 'id' | 'wins' | 'time') => {
    const order = sortField === field && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortField(field);
    setSortOrder(order);
  };

  const renderSortIcon = (field: 'id' | 'wins' | 'time') => {
    if (sortField !== field) return <FaSort />;
    if (sortOrder === 'ASC') return <FaSortUp />;
    return <FaSortDown />;
  };
  return (
    <div className="container">
      <h2>Winners</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>Id {renderSortIcon('id')}</th>
              <th>CAR</th>
              <th>NAME</th>
              <th onClick={() => handleSort('wins')}>
                WINS {renderSortIcon('wins')}
              </th>
              <th onClick={() => handleSort('time')}>
                BEST TIME (SECONDS) {renderSortIcon('time')}
              </th>
            </tr>
          </thead>
          <tbody>
            {winners.map(winner => (
              <tr key={winner.id}>
                <td>{winner.id}</td>
                <td>
                  <CarIcon color={winner.car.color} id={winner.car.name} />
                </td>
                <td>{winner.car.name}</td>
                <td>{winner.wins}</td>
                <td>{winner.time.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AppPagination
        pageCount={Math.ceil(totalWinners / winnersPerPage)}
        onPageChange={item => {
          setPage(item.selected + 1);
        }}
      />

    </div>
  );
};

export default Winners;
