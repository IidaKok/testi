import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Addbook } from '../components/Addbook';
import { Update } from '../components/Update';
import { Addseries } from '../components/Addseries';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

describe('Addbook component', () => {
    const mockUser = { iduser: 1 };

    test('should render the form with the correct inputs', () => {
        render(<Addbook user={mockUser} />);
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
        render(<Addbook user={mockUser} />);
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
        render(<Addbook user={mockUser} addBook={addBookMock} />); // pass the mock function as a prop

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
        render(<Addseries user={mockUser} />);
        expect(screen.getByPlaceholderText('Bookseries')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Publisher')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Classification')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('should handle input changes correctly', () => {
        render(<Addseries user={mockUser} />);
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
        render(<Update user={mockUser} />);
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