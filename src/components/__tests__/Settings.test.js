import { render, screen, waitFor} from '../../test-utils'
import Settings from '../Settings'

describe('settings page', () => {
    describe('logo', () => {
        test('renders correctly', () => {
            render(<Settings/>)
            const imageElement = screen.getByAltText("Word Tangle Logo")
            expect(imageElement).toBeInTheDocument()
        })
    })
    describe('change nickname button', () => {
        test('renders correctly', () => {
            render(<Settings/>)
            const buttonElement = screen.getByRole("button", {name: 'Change Nickname'})
            expect (buttonElement).toBeInTheDocument()
        })
    })
    describe('change password button', () => {
        test('renders correctly', () => {
            render(<Settings/>)
            const buttonElement = screen.getByRole("button", {name: 'Change Password'})
            expect (buttonElement).toBeInTheDocument()
        })
    })
    describe('get user data button', () => {
        test('renders correctly', () => {
            render(<Settings/>)
            const buttonElement = screen.getByRole("button", {name: 'Get User Data'})
            expect (buttonElement).toBeInTheDocument()
        })
    })
    describe('sign out button', () => {
        test('renders correctly', () => {
            render(<Settings/>)
            const buttonElement = screen.getByRole("button", {name: 'Sign Out'})
            expect (buttonElement).toBeInTheDocument()
        })
    })
    describe('password field', () => {
        test('renders correctly', async ()=>{
            render(<Settings/>)
            await waitFor(() => expect(screen.getByPlaceholderText('Enter password to delete account')).toBeInTheDocument())
        })
    })
    describe('delete account button', () => {
        test('renders correctly', () => {
            render(<Settings/>)
            const buttonElement = screen.getByRole("button", {name: 'Delete Account'})
            expect (buttonElement).toBeInTheDocument()
        })
    })
})