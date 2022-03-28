import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 1 - Teste o componente App', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('O segundo link deve possuir o texto About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('O tercceiro link deve possuir o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Teste  a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');

    const pag = screen.getByText('Page requested not found');
    expect(pag).toBeInTheDocument();
  });
});
