import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Addbook } from '../components/Addbook';
import { Update } from '../components/Update';
import { Addseries } from '../components/Addseries';
import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'; // Add this import statement
import { MemoryRouter } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { UserPage } from '../components/UserPage';

describe('Addbook component', () => {
    const mockUser = { iduser: 1 };

    test('should render the form with the correct inputs', () => {
        render(<Addbook user={mockUser} />, { wrapper: BrowserRouter });
        expect(screen.getByPlaceholderText('bookname*')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('edition*')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('publicationyear*')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('purchaseprice')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('soldprice')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('purchasedate')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('solddate')).toBeInTheDocument();
        expect(screen.getByText('Select book condition')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('should handle input changes correctly', () => {
        render(<Addbook user={mockUser} />, { wrapper: BrowserRouter });
        const bookNameInput = screen.getByPlaceholderText('bookname*');
        fireEvent.change(bookNameInput, { target: { value: 'Test Book' } });
        expect(bookNameInput).toHaveValue('Test Book');

        const editionInput = screen.getByPlaceholderText('edition*');
        fireEvent.change(editionInput, { target: { value: '1' } });
        expect(editionInput).toHaveValue(1);

        const publicationYearInput = screen.getByPlaceholderText('publicationyear*');
        fireEvent.change(publicationYearInput, { target: { value: '2022' } });
        expect(publicationYearInput).toHaveValue(2022);
    });

    test('should submit the form with the correct data', () => {
        const addBookMock = jest.fn(); // create a mock function for the addBook function
        new addBookMock({
            bookname: 'Test Book',
            edition: 1,
            publicationyear: 2022,
            purchasedate: '',
            purchaseprice: '',
            solddate: '',
            soldprice: '',
            userid: 1
        });
        render(<Addbook user={mockUser} addBook={addBookMock} />, { wrapper: BrowserRouter }); // pass the mock function as a prop

        const bookNameInput = screen.getByPlaceholderText('bookname*');
        fireEvent.change(bookNameInput, { target: { value: 'Test Book' } });

        const editionInput = screen.getByPlaceholderText('edition*');
        fireEvent.change(editionInput, { target: { value: '1' } });

        const publicationYearInput = screen.getByPlaceholderText('publicationyear*');
        fireEvent.change(publicationYearInput, { target: { value: '2022' } });

        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);

        // assert that the addBookMock function was called with the correct data
        expect(addBookMock).toHaveBeenCalledWith({
            bookname: 'Test Book',
            edition: 1,
            publicationyear: 2022,
            purchasedate: '',
            purchaseprice: '',
            solddate: '',
            soldprice: '',
            userid: 1
        });
    });
});

describe('Addseries component', () => {
    const mockUser = { iduser: 1 };

    test('should render the form with the correct inputs', () => {
        render(<Addseries user={mockUser} />, { wrapper: BrowserRouter });
        expect(screen.getByPlaceholderText('Bookseries')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Publisher')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Classification')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('should handle input changes correctly', () => {
        render(<Addseries user={mockUser} />, { wrapper: BrowserRouter });
        const bookSeriesInput = screen.getByPlaceholderText('Bookseries');
        fireEvent.change(bookSeriesInput, { target: { value: 'ListofBooks' } });
        expect(bookSeriesInput).toHaveValue('ListofBooks');

        const PublisherInput = screen.getByPlaceholderText('Publisher');
        fireEvent.change(PublisherInput, { target: { value: 'Osuma' } });
        expect(PublisherInput).toHaveValue('Osuma');

        const DescriptionInput = screen.getByPlaceholderText('Description');
        fireEvent.change(DescriptionInput, { target: { value: 'mybooks' } });
        expect(DescriptionInput).toHaveValue('mybooks');

        const ClassificationInput = screen.getByPlaceholderText('Classification');
        fireEvent.change(ClassificationInput, { target: { value: 'ClassOne' } });
        expect(ClassificationInput).toHaveValue('ClassOne');
    });

    test('should add series when "Add" button is clicked', () => {
        const mockUser = { iduser: 1 };
        const addSeriesMock = jest.fn(); // Mock the addSeries function passed as a prop
        new addSeriesMock({
            bookSeries: 'ListofBooks',
            publisher: 'Osuma',
            description: 'mybooks',
            classification: 'ClassOne',
            userId: 1
        });
        render(<Addseries user={mockUser} addSeries={addSeriesMock} />, { wrapper: BrowserRouter });

        const bookSeriesInput = screen.getByPlaceholderText('Bookseries');
        const publisherInput = screen.getByPlaceholderText('Publisher');
        const descriptionInput = screen.getByPlaceholderText('Description');
        const classificationInput = screen.getByPlaceholderText('Classification');

        // Enter input values
        fireEvent.change(bookSeriesInput, { target: { value: 'ListofBooks' } });
        fireEvent.change(publisherInput, { target: { value: 'Osuma' } });
        fireEvent.change(descriptionInput, { target: { value: 'mybooks' } });
        fireEvent.change(classificationInput, { target: { value: 'ClassOne' } });

        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);

        // Assert that the addSeries function was called with the correct arguments
        expect(addSeriesMock).toHaveBeenCalledWith({
            bookSeries: 'ListofBooks',
            publisher: 'Osuma',
            description: 'mybooks',
            classification: 'ClassOne',
            userId: mockUser.iduser
        });
    });
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

describe('Update component', () => {
    const mockUser = { iduser: 1 };
    beforeEach(() => {
        useLocation.mockReturnValue({ pathname: '/book/123' });
    });

    test('should render the form with the correct inputs', () => {
        render(
            <Router>
                <Update user={mockUser} />
            </Router>
        );

        expect(screen.getByPlaceholderText('bookname')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('edition')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('publicationyear')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('purchaseprice')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('soldprice')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('purchasedate')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('solddate')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Photo-URL')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Photo page number')).toBeInTheDocument();
        expect(screen.getByText('Select book condition')).toBeInTheDocument();
        expect(screen.getByText('Update')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('should handle input changes correctly', () => {
        render(<Update user={mockUser} />, { wrapper: BrowserRouter });
        const bookNameInput = screen.getByPlaceholderText('bookname');
        fireEvent.change(bookNameInput, { target: { value: 'Test Book' } });
        expect(bookNameInput).toHaveValue('Test Book');

        const editionInput = screen.getByPlaceholderText('edition');
        fireEvent.change(editionInput, { target: { value: '1' } });
        expect(editionInput).toHaveValue(1);

        const publicationYearInput = screen.getByPlaceholderText('publicationyear');
        fireEvent.change(publicationYearInput, { target: { value: '2022' } });
        expect(publicationYearInput).toHaveValue(2022);
    });

    test('should update the book correctly when submit button is clicked', () => {
        // Mock the API call for updating the book
        const updateBookMock = jest.fn();
        new updateBookMock({
            iduser: 1,
            bookname: 'Test Book',
            edition: 1,
            publicationyear: 2022,
        });
        // Render the Update component with the mock user and the updateBookMock function
        render(
            <Router>
                <Update user={mockUser} updateBook={updateBookMock} />
            </Router>
        );

        // Input some values in the form fields
        const bookNameInput = screen.getByPlaceholderText('bookname');
        fireEvent.change(bookNameInput, { target: { value: 'Test Book' } });

        const editionInput = screen.getByPlaceholderText('edition');
        fireEvent.change(editionInput, { target: { value: '1' } });

        const publicationYearInput = screen.getByPlaceholderText('publicationyear');
        fireEvent.change(publicationYearInput, { target: { value: '2022' } });

        // Trigger the form submission
        const updateButton = screen.getByText('Update');
        fireEvent.click(updateButton);

        // Assert that the updateBookMock function is called with the correct arguments
        expect(updateBookMock).toHaveBeenCalledTimes(1);
        expect(updateBookMock).toHaveBeenCalledWith({
            iduser: 1,
            bookname: 'Test Book',
            edition: 1,
            publicationyear: 2022,
        });
    });
});

describe("UserPage", () => {
    test("Deletes a book successfully", async () => {
        // Mock book data
        const bookcopy = [
            {
                idbookcopy: 1,
                bookname: "Test Book",
                publicationyear: "2020",
                description: "Test Description",
                edition: "1st Edition",
                condition: "Good",
                purchasedate: "2022-01-01",
                purchaseprice: "10",
                solddate: null,
                soldprice: null,
            },
        ];

        // Mock book photo data
        const bookPhotos = {
            1: ["example.com/photo.jpg"],
        };

        // Mock user data
        const user = {
            iduser: 1,
        };

        // Mock fetch API
        global.fetch = jest.fn();
        global.fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => bookcopy,
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => bookPhotos,
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ message: "Book deleted" }),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ message: "Photo deleted" }),
            });

        // Render UserPage component
        render(
            <MemoryRouter>
                <UserPage user={user} />
            </MemoryRouter>
        );

        // Find delete button and click on it
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        // Check if book is deleted from bookcopy state
        expect(screen.queryByText("Test Book")).toBeNull();

        // Check if photo is deleted from bookPhotos state
        expect(bookPhotos[1]).toBeUndefined();
    });
});
