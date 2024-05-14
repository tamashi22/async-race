import React from 'react';
import { AppModalBase } from '@components/ui/AppModalBase';
import { Button } from '@components/ui/Button';
import { Car } from 'src/types/CarTypes';
import styles from './WinnerModal.module.scss';

interface WinnerModalProps {
    winner: { car: Car; time: number };
    onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
    return (
        <AppModalBase onClose={onClose}>
            <div className={styles.winnerModal}>
                <h2>Winner!</h2>
                <p>Car: {winner.car.name}</p>
                <p>ID: {winner.car.id}</p>
                <p>Color: {winner.car.color}</p>
                <p>Time: {winner.time.toFixed(2)} seconds</p>
                <Button onClick={onClose}>Close</Button>
            </div>
        </AppModalBase>
    );
};

export default WinnerModal;
