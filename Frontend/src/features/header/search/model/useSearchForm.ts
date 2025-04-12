// TODO: сделать хук
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// TODO: импорт констант путей для большей надежности
// import { Path } from '@/shared/config/routes';

export function useSearchForm() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Предотвращаем стандартную отправку формы
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            // Не переходим, если запрос пустой (или можно перейти на /feed без ?q=)
            return;
        }
        // Переходим на страницу /feed с параметром поиска q
        // Используйте константу пути, если она есть: navigate(`${Path.FEED}?q=${trimmedQuery}`);
        navigate(`/feed?q=${encodeURIComponent(trimmedQuery)}`);
    };

    return {
        query,
        handleQueryChange,
        handleSubmit,
    };
}
