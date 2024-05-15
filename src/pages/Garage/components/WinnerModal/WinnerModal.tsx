import React from 'react';
import { AppModalBase } from '@components/ui/AppModalBase';
import { Button } from '@components/ui/Button';
import { Car } from 'src/types/CarTypes';
import styles from './WinnerModal.module.scss';
import { GiPartyPopper } from "react-icons/gi";
import { CarIcon } from '@components/CarIcon';
interface WinnerModalProps {
    winner: { car: Car; time: number };
    onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
    return (
        <AppModalBase onClose={onClose} contentClass={styles.modal}>
            <div className={styles.winnerModal}>
                <h2 className={styles.tiitle}>
                    <GiPartyPopper color='red' size={30} />  Winner! <GiPartyPopper color='red' size={30} /></h2>
                <div className={styles.icon}><CarIcon color={winner.car.color} id={winner.car.name} /></div>
                <p>Car: {winner.car.name}</p>
                <p>Time: {winner.time.toFixed(2)} seconds</p>
                <Button onClick={onClose}>Close</Button>
            </div>
        </AppModalBase>
    );
};

export default WinnerModal;
