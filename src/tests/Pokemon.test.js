import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Requisito 6 - Teste componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImg = screen.getByRole('img', { name: 'Pikachu sprite' });

      expect(pokemonName).toHaveTextContent('Pikachu');
      expect(pokemonType).toHaveTextContent('Electric');
      expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
      expect(pokemonImg.src).toBe(pokemons[0].image);
    });

  test(`Teste se o card do Pokémon indicado contém
  o link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const moreDetails = screen.getByText('More details');

    userEvent.click(moreDetails);
    expect(moreDetails).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const URL = 'http://localhost/star-icon.svg';
    const favoriteImg = screen
      .getByRole('img', { name: 'Pikachu is marked as favorite' });

    expect(favoriteImg.src).toBe(URL);
  });
});
