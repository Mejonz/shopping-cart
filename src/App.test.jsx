import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';

import App from './App';
// import Shop from './Shop';
// import ShoppingCart from './ShoppingCart';
// import Homepage from './Homepage';
// import { wait } from '@testing-library/user-event/dist/cjs/utils/index.js';

// describe('something truthy and falsy', () => {
//     it('true to be true', () => {
//         expect(true).toBe(true);
//     });

//     it('false to be false', () => {
//         expect(false).toBe(false);
//     });
// });

describe('react router test', () => {
    it('navigation works', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
                <Routes>
                    <Route path="/" element={<h2>Homepage contents</h2>} />
                    <Route path="/shop" element={<h2>Loading...</h2>} />
                    <Route path="/shoppingcart" element={<h2>cart contents</h2>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Homepage contents")).toBeInTheDocument();
        
        const shoppingCartLink = screen.getByRole('link', {name: /cart/i});
        await userEvent.click(shoppingCartLink);
        expect(screen.getByText("cart contents")).toBeInTheDocument();
        
        const shopLink = screen.getByRole('link', {name: /shop/i});
        await userEvent.click(shopLink);
        expect(screen.getByText("Loading...")).toBeInTheDocument();

        
    })
})



