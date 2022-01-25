import {Cardio} from './database.service';

export const getTodaysDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
}

export const animateRequired = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
        el.classList.add("animate__shakeY");
        setTimeout(() => el.classList.remove("animate__shakeY"), 800);
    }
};

export const calculateDistance = (cardio: Cardio) => {
    const metres = cardio.speed * 1000;
    const metresPerSecond = metres / (60 * 60);
    return cardio.duration * metresPerSecond;
};

export const formatDuration = (duration: number): string => {
    return new Date(duration * 1000).toISOString().substr(11, 8);
};