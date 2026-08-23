import { vi, describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useOutletContext } from "react-router";
import { useState } from "react";

import ShoppingCart from "./ShoppingCart";

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
        items: [],
        setItems: vi.fn(),
        error: null,
        setError: vi.fn(),
        loading: false,
        setLoading: vi.fn(),
        cartItems:[{
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
            amount: 1,
        }],
        setCartItems: vi.fn(),
        totalItemsInCart: 1,
        setTotalItemsInCart: vi.fn(),
    });
});

it('shows cart empty message when cart is empty', () => {
    mockedUseContextOutlet.mockReturnValue({
        items: [],
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

    render(<ShoppingCart />);
    expect(screen.getByText("cart empty")).toBeInTheDocument();
})

it('displays items', () => {
    render(<ShoppingCart />);
    expect(screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")).toBeInTheDocument();
    expect(screen.getByText("Subtotal: 109.95")).toBeInTheDocument();
})


it('plus button adds 1 to item amount', async () => {
    function TestWrapper() {
        const [cartItems, setCartItems] = useState([
            {
                id: 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
                amount: 1,
            }
        ]);

        mockedUseContextOutlet.mockReturnValue({
            cartItems,
            setCartItems,
            totalItemsInCart: 1,
            setTotalItemsInCart: vi.fn(),
        });

        return <ShoppingCart />;
    }

    render(<TestWrapper />);

    const plusBtn = screen.getByRole('button', { name: '+' });
    await userEvent.click(plusBtn);
    expect(screen.getByText("Amount: 2")).toBeInTheDocument();
    expect(screen.getByText("Total price: 219.90")).toBeInTheDocument();
    const minusBtn = screen.getByRole('button', { name: '-' });
    await userEvent.click(minusBtn);
    expect(screen.getByText("Amount: 1")).toBeInTheDocument();
});


it('remove button removes item', async () => {
    function TestWrapper() {
        const [cartItems, setCartItems] = useState([
            {
                id: 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
                amount: 1,
            }
        ]);

        const [totalItemsInCart, setTotalItemsInCart] = useState(1);

        mockedUseContextOutlet.mockReturnValue({
            cartItems,
            setCartItems,
            totalItemsInCart,
            setTotalItemsInCart,
        });

        return <ShoppingCart />;
    }

    render(<TestWrapper />);

    const deleteBtn = screen.getByRole('button', {
        name: 'remove item'
    });

    await userEvent.click(deleteBtn);
    expect(screen.getByText("cart empty")).toBeInTheDocument();
});