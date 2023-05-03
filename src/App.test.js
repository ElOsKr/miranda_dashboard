import { UserEdit } from "./components/Navbar/UserLoggedStyle";
import { render , screen } from '@testing-library/react';

describe('Color and background color', () => {
    test("No props on button", () => {
        render(<UserEdit>Test</UserEdit>);

        expect(screen.getByRole('button')).toHaveStyle("background: #EBF1EF")
        expect(screen.getByRole('button')).toHaveStyle("color: #135846")
    })

    test("Props on button", () => {
        render(<UserEdit variant>Test</UserEdit>);

        expect(screen.getByRole('button')).toHaveStyle("background: #f1ebeb")
        expect(screen.getByRole('button')).toHaveStyle("color: #581313")
    })
})