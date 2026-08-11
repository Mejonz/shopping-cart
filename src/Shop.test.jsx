import { vi, describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useOutletContext } from "react-router";

import Shop from "./Shop";

vi.mock('react-router', async() => {
    const actual = await vi.importActual<typeof import('react-router')>(
        "react-router"
    );

    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

const mockedUseContextOutlet = vi.mocked(useOutletContext);

beforeEach(() => {
    mockedUseContextOutlet.mockReturnValue({
        items: [{
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        }],
        setItems: vi.fn(),
        error: null,
        setError: vi.fn(),
        loading: false,
        setLoading: vi.fn(),
        cartItems:[],
        setCartItems: vi.fn(),
        totalItemsInCart: 0,
        setTotalItemsInCart: vi.fn(),
    });
});

it('loading message shows when loading is true', () => {
    mockedUseContextOutlet.mockReturnValue({
        items: [{
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        }],
        setItems: vi.fn(),
        error: null,
        setError: vi.fn(),
        loading: true,
        setLoading: vi.fn(),
        cartItems:[],
        setCartItems: vi.fn(),
        totalItemsInCart: 0,
        setTotalItemsInCart: vi.fn(),
    });    
    
    render(<Shop />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    }
)

it('error message shows when error is not null', () => {
    mockedUseContextOutlet.mockRejectedValue({
        items: [],
        setItems: vi.fn(),
        error: 404,
        setError: vi.fn(),
        loading: false,
        setLoading: vi.fn(),
        cartItems: [],
        setCartItems: vi.fn(),
        totalItemsInCart: 0,
        setTotalItemsInCart: vi.fn(),
    });

    render(<Shop />);
    expect(screen.getByText("A network error has occured!")).toBeInTheDocument();
})


it('displays items', () => {
    render(<Shop />);
    expect(screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")).toBeInTheDocument();
    expect(screen.getByText("Price: $109.95")).toBeInTheDocument();
})


it('input defaults to 0', () => {
    render(<Shop />);
    const itemInput = screen.getByRole('textbox');
    expect(itemInput).toHaveValue('0');
})

it('input does not allow non-numbers', async () => {
    const user = userEvent.setup();
    render(<Shop />);
    const itemInput = screen.getByRole('textbox');
    await user.type(itemInput, 'abcd');
    expect(itemInput).toHaveValue('0');
})

it('input allows numbers', async () => {
    const user = userEvent.setup();
    render(<Shop />);
    const itemInput = screen.getByRole('textbox');
    await user.type(itemInput, '123');
    expect(itemInput).toHaveValue('123');
})

it('+ button adds 1 to current number in input', async () => {
    render(<Shop />);
    const plusBtn = screen.getByRole('button', {name: '+' });
    await userEvent.click(plusBtn);
    expect(screen.getByRole('textbox')).toHaveValue('1');
})

it('- button does not allow value to go below 0', async () => {
    render(<Shop />);
    const minusBtn = screen.getByRole('button', {name: '-'});
    await userEvent.click(minusBtn);
    expect(screen.getByRole('textbox')).toHaveValue('0');
})

it('- button subracts 1 to current number in input', async () => {
    render(<Shop />);
    const plusBtn = screen.getByRole('button', {name: '+' });
    await userEvent.click(plusBtn);
    const minusBtn = screen.getByRole('button', {name: '-'});
    await userEvent.click(minusBtn);
    expect(screen.getByRole('textbox')).toHaveValue('0');
})







