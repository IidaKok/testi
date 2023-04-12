/**
 * @jest-environment jsdom
 */

import React, { Component } from "react";
import { render, fireEvent, screen, within, getByTestId } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';
// import React from 'react';
import { SeriesBrowser, SeriesInfo, BookInfo } from '../src/frontend/components/Browser';
import "@testing-library/jest-dom/extend-expect";
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const user = { iduser: 1, username: "Matti.Mainio", password: "Kissa", email: "matti@email.com" };
jest.setTimeout(10000);

describe("Browser", () => {
    test('clicking the "+" button adds all books for the user logged in', () => {
        render(
            <BrowserRouter>
                <SeriesBrowser user={user} />
            </BrowserRouter>
        );
        const addButton = getByTestId('add-books');

        fireEvent.click(addButton);

        expect(setBookToAdd).toHaveBeenCalledWith(expectedBookSeriesId);
        expect(insertBooksToBookshelf).toHaveBeenCalled();
    });

    test('clicking the "Edit" button opens the edit modal', () => {
        const mockSeries = { idbookseries: 1, bookseries: 'Mock Series', publisher: 'Mock Publisher' };
        render(
            <BrowserRouter>
                <SeriesBrowser user={user} />
            </BrowserRouter>
        );
        const editButton = getByTestId('edit-series');

        fireEvent.click(editButton);

        expect(openEditModal).toHaveBeenCalledWith(mockSeries);
    });

    test('the table is rendered with the correct data', () => {
        const mockSeries = [
            { idbookseries: 1, bookseries: 'Mock Series 1', publisher: 'Mock Publisher 1' },
            { idbookseries: 2, bookseries: 'Mock Series 2', publisher: 'Mock Publisher 2' },
        ];
        render(
            <BrowserRouter>
                <SeriesBrowser user={user} />
            </BrowserRouter>
        );
        setSeries(mockSeries);
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
        render(
            <BrowserRouter>
                <SeriesInfo user={user} />
            </BrowserRouter>
        );
        const addButton = getByTestId('add-book');

        fireEvent.click(addButton);
        const confirmButton = getByTestId('confirm');
        fireEvent.click(confirmButton);

        expect(setBookToAdd).toHaveBeenCalledWith(expectedBookId);
        expect(insertBook).toHaveBeenCalled();
    });

    test('clicking the "Edit" button opens the edit modal', () => {
        const mockSeries = { idbookseries: 1, bookseries: 'Mock Series', publisher: 'Mock Publisher' };
        render(
            <BrowserRouter>
                <SeriesInfo user={user} />
            </BrowserRouter>
        );
        const editButton = getByTestId('edit-series');

        fireEvent.click(editButton);

        expect(openEditModal).toHaveBeenCalledWith(mockSeries);
    });

    test('the table is rendered with the correct data', () => {
        const mockBooks = [
            { idbook: 1, bookname: 'Mock Book 1', publicationyear: '2000' },
            { idbook: 2, bookname: 'Mock Book 2', publicationyear: '2001' },
        ];
        render(
            <BrowserRouter>
                <SeriesInfo user={user} />
            </BrowserRouter>
        );
        setBookData(mockBooks);
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
        render(
            <BrowserRouter>
                <BookInfo user={user} />
            </BrowserRouter>
        );
        const addButton = getByTestId('quick-add');

        fireEvent.click(addButton);
        const confirmButton = getByTestId('confirm');
        fireEvent.click(confirmButton);

        expect(setBookToAdd).toHaveBeenCalledWith(expectedBookId);
        expect(insertBook).toHaveBeenCalled();
    });

    test('clicking the "Add with information" button opens a modal for adding a book copy with information', () => {
        render(
            <BrowserRouter>
                <BookInfo user={user} />
            </BrowserRouter>
        );
        const addButton = getByTestId('add-w-info');

        fireEvent.click(addButton);

        expect(openModal).toHaveBeenCalled();
    });

    test('clicking the "Edit" button opens an edit modal', () => {
        render(
            <BrowserRouter>
                <BookInfo user={user} />
            </BrowserRouter>
        );
        const editButton = getByTestId('edit-book');

        fireEvent.click(editButton);

        expect(openEditModal).toHaveBeenCalled();
    });
});

