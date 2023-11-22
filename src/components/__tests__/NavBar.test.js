import { render, screen } from '../../test-utils'
import { render as defaultRender } from '@testing-library/react'
import { screen as defaultScreen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import user from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import Navbar from '../NavBar'


describe('navbar', () => {
    describe('logo', () => {
        test('renders correctly', () => {
            render(<Navbar />)
            const imageElement = screen.getByAltText(/word tangle logo/i)
            expect(imageElement).toBeInTheDocument()
        })
    })
    describe('dashboard link', () => {
        test('renders correctly', () => {
            render(<Navbar />)
            const textElement = screen.getByText(/dashboard/i)
            expect(textElement).toBeInTheDocument()
        })
        // test('routes correctly', () => {
        //     const history = createMemoryHistory();
        //     user.setup()
        //     history.push = jest.fn();

        //     defaultRender(<MemoryRouter history={history}><Navbar/></MemoryRouter>)
        //     const linkElement = screen.getByText(/dashboard/i)
        //     user.click(linkElement)
        //     expect(history.push).toHaveBeenCalledWith('/Dashboard')
        // })
    })
    describe('learn link', () => {
        test('renders correctly', () => {
            render(<Navbar />)
            const textElement = screen.getByText(/learn/i)
            expect(textElement).toBeInTheDocument()
        })
    })
    describe('forums link', () => {
        test('renders correctly', () => {
            render(<Navbar />)
            const textElement = screen.getByText(/forum/i)
            expect(textElement).toBeInTheDocument()
        })
    })
    describe('settings link', () => {
        test('renders correctly', () => {
            render(<Navbar />)
            const textElement = screen.getByText(/settings/i)
            expect(textElement).toBeInTheDocument()
        })
    })
    describe('about link', () => {
        test('renders correctly', () => {
            render(<Navbar />)
            const textElement = screen.getByText(/about/i)
            expect(textElement).toBeInTheDocument()
        })
    })
    describe('sign out link', () => {
        test('renders correctly', () => {
            render(<Navbar />)
            const textElement = screen.getByText(/sign out/i)
            expect(textElement).toBeInTheDocument()
        })
    })
})