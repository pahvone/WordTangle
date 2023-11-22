import {getByRole, render, screen} from '../../test-utils'
import LessonPath from '../LessonPath'

describe('lessons', () => {
    describe('language header', () => {
        test('renders correctly', () => {
            render(<LessonPath/>)
            const textElement = screen.getByRole('heading')
            expect(textElement).toBeInTheDocument()
        })
    })
    describe('lesson 1 button', () => {
        test('renders correctly', () => {
            render(<LessonPath/>)
            const buttonElement = screen.getByRole('button', {name: 'Numbers 1'})
            expect(buttonElement).toBeInTheDocument()
        })
    })
})