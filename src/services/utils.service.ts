export const getTodaysDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} ${day}`;
}

export const animateRequired = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
        el.classList.add("animate__shakeY");
        setTimeout(() => el.classList.remove("animate__shakeY"), 800);
    }
};