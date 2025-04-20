export const formatDateToEuropean = (isoDate: string): string => {
    const date = new Date(isoDate);

    // Проверка на корректность даты
    if (isNaN(date.getTime())) {
        return 'Некорректная дата';
    }

    // Извлечение компонентов даты с учётом локального времени
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};
