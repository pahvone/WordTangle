import { render, screen } from '../../test-utils'
import SignUp from '../SignUp'


describe('Sign Up', () => {
    describe('word tangle logo', () => {
        test('renders correctly', () => {
            render(<SignUp />)
            const imageElement = screen.getByAltText(/word tangle logo/i)
            expect(imageElement).toBeInTheDocument()
        })
    })
    describe('username label', () => {
        test('renders correctly', () => {
            render(<SignUp />)
            const imageElement = screen.getByText(/username/i)
            expect(imageElement).toBeInTheDocument()
        })
    })
    describe('username input box', () => {
        test('renders correctly', () => {
            render(<SignUp />)
            const imageElement = screen.getByRole('textbox', {name:/username/i})
            expect(imageElement).toBeInTheDocument()
        })
    })
    describe('email label', () => {
        test('renders correctly', () => {
            render(<SignUp />)
            const imageElement = screen.getByText(/email/i)
            expect(imageElement).toBeInTheDocument()
        })
    })
    describe('email input box', () => {
        test('renders correctly', () => {
            render(<SignUp />)
            const imageElement = screen.getByRole('textbox', {name:/email/i})
            expect(imageElement).toBeInTheDocument()
        })
    })
    describe('password label', () => {
        test('renders correctly', () => {
            render(<SignUp />)
            const imageElement = screen.getByText(/password/i)
            expect(imageElement).toBeInTheDocument()
        })
    })
    describe('password input box', () => {
        test('renders correctly', () => {
            render(<SignUp />)
            const imageElement = screen.getByRole('textbox', {name:/password/i})
            expect(imageElement).toBeInTheDocument()
        })
    })
    describe('sign up button', () => {
        test('renders correctly', () => {
            render(<SignUp />)
            const buttonElement = screen.getByRole('button', {name:/sign up/i})
            expect(buttonElement).toBeInTheDocument()
        })
    })
    describe('alternate login label', () => {
        test('renders correctly', () => {
            render(<SignUp />)
            const textElement = screen.getByText(/or sign up/i)
            expect(textElement).toBeInTheDocument()
        })
    })
    describe('google logo', () => {
        test('renders correctly', () => {
            render(<SignUp />)
            const imageElement = screen.getByAltText(/google logo/i)
            expect(imageElement).toBeInTheDocument()
        })
    })
})