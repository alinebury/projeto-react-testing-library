import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Requisito 3 - Teste o componente FavoritePokemons', () => {
  test('É exibido No favorite pokemon found se não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons pokemons={ [] } />);

    const title = screen.getByText('No favorite pokemon found');
    expect(title).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const poke = pokemons.filter((pokemon) => pokemon.type === 'Fire');
    renderWithRouter(<FavoritePokemons pokemons={ poke } />);

    const pokemonType = screen.getAllByTestId('pokemon-type');

    expect(pokemonType).toHaveLength(2);
  });
});
