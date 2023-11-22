import { render, screen } from '../../test-utils'
import Footer from '../Footter'

describe('footer', () => {
    test('renders correctly', () => {
        render(<Footer/>)
        const footerElement = screen.getByTestId('footer-testid')
        expect(footerElement).toBeInTheDocument()
    })
})