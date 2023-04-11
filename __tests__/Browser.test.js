/**
 * @jest-environment jsdom
 */

import React, { Component } from "react";
import { render, fireEvent, screen, within } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';
// import React from 'react';
import { SeriesBrowser, SeriesInfo, BookInfo } from '../src/frontend/components/Browser';

describe("Browser", () => {
    test('clicking the "+" button adds all books for the user logged in', () => {
        let mockUser = { iduser: 1 };
        const { getByText } = render(<SeriesBrowser user={mockUser} />, { wrapper: BrowserRouter });
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
});

describe("SeriesInfo", () => {
    test('clicking the "+" button adds the selected book for the user logged in', () => {
        let mockUser = { iduser: 1 };
        const { getByText } = render(<SeriesInfo user={mockUser} />, { wrapper: BrowserRouter });
        const addButton = getByText('+');

        fireEvent.click(addButton);
        const confirmButton = getByText('Confirm')
        fireEvent.click(confirmButton);
    
        expect(setBookToAdd).toHaveBeenCalledWith(expectedBookId);
        expect(insertBook).toHaveBeenCalled();
    });
        
    test('clicking the "Edit" button opens the edit modal', () => {
        const mockSeries = { idbookseries: 1, bookseries: 'Mock Series', publisher: 'Mock Publisher' };
        const { getByText } = render(<SeriesInfo />);
        const editButton = getByText('Edit');
    
        fireEvent.click(editButton);
    
        expect(openEditModal).toHaveBeenCalledWith(mockSeries);
    });

    test('the table is rendered with the correct data', () => {
        const mockBooks = [
            { idbook: 1, bookname: 'Mock Book 1', publicationyear: '2000' },
            { idbook: 2, bookname: 'Mock Book 2', publicationyear: '2001' },
        ];
        const { getAllByRole } = render(<SeriesInfo />);
        const tableRows = getAllByRole('row');
    
        expect(tableRows).toHaveLength(mockBooks.length + 1); // Header row + data rows
        expect(tableRows[1]).toHaveTextContent('Mock Book 1');
        expect(tableRows[1]).toHaveTextContent('2000');
        expect(tableRows[2]).toHaveTextContent('Mock Book 2');
        expect(tableRows[2]).toHaveTextContent('2001');
    });
});

describe("BookInfo", () => {
    test('clicking the "Quick add" button adds the selected book for the user logged in', () => {
        let mockUser = { iduser: 1 };
        const { getByText } = render(<SeriesInfo user={mockUser} />, { wrapper: BrowserRouter });
        const addButton = getByText('Quick add');

        fireEvent.click(addButton);
        const confirmButton = getByText('Confirm')
        fireEvent.click(confirmButton);
    
        expect(setBookToAdd).toHaveBeenCalledWith(expectedBookId);
        expect(insertBook).toHaveBeenCalled();
    });

    test('clicking the "Add with information" button opens a modal for adding a book copy with information', () => {
        let mockUser = { iduser: 1 };
        const { getByText } = render(<SeriesInfo user={mockUser} />, { wrapper: BrowserRouter });
        const addButton = getByText('Add with information');

        fireEvent.click(addButton);
        
        expect(openModal).toHaveBeenCalled();
    });

    test('clicking the "Edit" button opens an edit modal', () => {
        const { getByText } = render(<BookInfo />);
        const editButton = getByText('Edit');
    
        fireEvent.click(editButton);
    
        expect(openEditModal).toHaveBeenCalled();
    });
})

