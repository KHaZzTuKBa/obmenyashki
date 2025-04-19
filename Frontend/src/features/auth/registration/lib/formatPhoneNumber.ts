export const formatPhoneNumber = (value: string) => {
    // Удаляем все символы, кроме цифр и плюса
    const cleaned = value.replace(/[^\d+]/g, '');

    // Гарантируем начало с +7
    let numbers = cleaned;
    if (!numbers.startsWith('+7')) {
        numbers = '+7' + numbers.replace(/[^\d]/g, '');
    }

    // Берем максимум 10 цифр после +7
    const digitsAfter7 = numbers.slice(2).replace(/\D/g, '').slice(0, 10);

    // Разбиваем на части: 3 | 3 | 2 | 2
    const parts = [
        digitsAfter7.slice(0, 3),
        digitsAfter7.slice(3, 6),
        digitsAfter7.slice(6, 8),
        digitsAfter7.slice(8, 10),
    ];

    // Собираем форматированную строку
    let formatted = '+7';

    if (parts[0]) {
        formatted += ` (${parts[0]})`;
    }
    if (parts[1]) {
        formatted += `-${parts[1]}`;
    }
    if (parts[2]) {
        formatted += `-${parts[2]}`;
    }
    if (parts[3]) {
        formatted += `-${parts[3]}`;
    }

    return formatted;
};
