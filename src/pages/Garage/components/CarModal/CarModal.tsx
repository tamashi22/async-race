import React, { useState, useEffect } from 'react';
import { AppModalBase } from '@components/ui/AppModalBase';
import { Button } from '@components/ui/Button';
import { TextField } from '@components/ui/TextField';
import { PopoverPicker } from '@components/PopoverPicker';
import { createCar, updateCar, getCar } from '@services/GarageApi';
import { Car, NewCar } from 'src/types/CarTypes';
import styles from './CarModal.module.scss';

interface CarModalProps {
    carId?: number;
    onClose: () => void;
    onSave: () => void;
}

const CarModal: React.FC<CarModalProps> = ({ carId, onClose, onSave }) => {
    const [name, setName] = useState<string>('');
    const [color, setColor] = useState<string>('#ffffff');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (carId !== undefined) {
            const fetchCar = async () => {
                setIsLoading(true);
                try {
                    const response = await getCar(carId);
                    setName(response.name);
                    setColor(response.color);
                } catch (err) {
                    setError('Failed to fetch car data.');
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCar();
        }
    }, [carId]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            if (carId !== undefined) {
                await updateCar(carId, { id: carId, name, color });
            } else {
                await createCar({ name, color });
            }
            onSave();
        } catch (err) {
            setError('Failed to save car.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppModalBase onClose={onClose}>
            <div className={styles.carModal}>
                <h2>{carId ? 'Update Car' : 'Create Car'}</h2>
                {error && <p className={styles.error}>{error}</p>}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <TextField
                            label="Car Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <PopoverPicker color={color} onChange={setColor} />
                        <Button onClick={handleSave} className={styles.saveButton}>
                            {carId ? 'Update' : 'Create'}
                        </Button>
                    </>
                )}
            </div>
        </AppModalBase>
    );
};

export default CarModal;
