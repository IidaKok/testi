import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { SeriesBrowser } from '../src/frontend/components/Browser';

test('clicking the "+" button adds all books for the user logged in', () => {
    const mockUser = { iduser: 1 };
    const { getByText } = render(<SeriesBrowser user={mockUser} />);
    const addButton = getByText('+');

    fireEvent.click(addButton);

    expect(setBookToAdd).toHaveBeenCalledWith(expectedBookSeriesId);
    expect(insertBooksToBookshelf).toHaveBeenCalled();
});

test('clicking the "Edit" button opens the edit modal', () => {
    const mockSeries = { idbookseries: 1, bookseries: 'Mock Series', publisher: 'Mock Publisher' };
    const { getByText } = render(<SeriesBrowser />);
    const editButton = getByText('Edit');

    fireEvent.click(editButton);

    expect(openEditModal).toHaveBeenCalledWith(mockSeries);
});

test('the table is rendered with the correct data', () => {
    const mockSeries = [
        { idbookseries: 1, bookseries: 'Mock Series 1', publisher: 'Mock Publisher 1' },
        { idbookseries: 2, bookseries: 'Mock Series 2', publisher: 'Mock Publisher 2' },
    ];
    const { getAllByRole } = render(<SeriesBrowser />);
    const tableRows = getAllByRole('row');

    expect(tableRows).toHaveLength(mockSeries.length + 1); // Header row + data rows
    expect(tableRows[1]).toHaveTextContent('Mock Series 1');
    expect(tableRows[1]).toHaveTextContent('Mock Publisher 1');
    expect(tableRows[2]).toHaveTextContent('Mock Series 2');
    expect(tableRows[2]).toHaveTextContent('Mock Publisher 2');
});

