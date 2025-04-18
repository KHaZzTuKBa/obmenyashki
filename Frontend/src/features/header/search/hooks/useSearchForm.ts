import { useState, FormEvent, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Path } from '@/shared/config/routes';

export const useSearchForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialQueryFromUrl = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQueryFromUrl);

    const wasSearchActive = useRef(!!initialQueryFromUrl);

    useEffect(() => {
        const currentUrlQuery = searchParams.get('q') ?? '';

        if (currentUrlQuery !== query) {
            setQuery(currentUrlQuery);
        }

        if (currentUrlQuery) {
            wasSearchActive.current = true;
        }
    }, [searchParams]);

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setQuery(newValue);

        const currentUrlQuery = searchParams.get('q');
        if (newValue.trim() === '' && currentUrlQuery) {
            navigate(Path.FEED, { replace: true });
            wasSearchActive.current = false;
        } else if (newValue.trim() !== '') {
            wasSearchActive.current = true;
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            if (searchParams.has('q')) {
                navigate(Path.FEED, { replace: true });
            }
            wasSearchActive.current = false;
            return;
        }

        if (searchParams.get('q') === trimmedQuery) {
            return;
        }

        navigate(`${Path.FEED}?q=${encodeURIComponent(trimmedQuery)}`);
        wasSearchActive.current = true;
    };

    return {
        query,
        handleQueryChange,
        handleSubmit,
    };
};
