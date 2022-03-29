import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Requisito 5 - Teste componente Pokedex', () => {
  const pokemonId = 'pokemon-name';
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { level: 2 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Encountered pokémons');
  });

  test('É exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('next-pokemon');

    pokemons.forEach((pokemon) => {
      const poke = screen.getByTestId(pokemonId);
      expect(poke).toHaveTextContent(pokemon.name);
      userEvent.click(button);
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId(pokemonId);
    expect(pokemonName).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    types.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonType = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByRole('button', { name: 'All' });

    userEvent.click(buttonType[2]);
    expect(screen.getByTestId(pokemonId)).not.toHaveTextContent(pokemons[0].name);

    userEvent.click(buttonAll);
    expect(screen.getByTestId(pokemonId)).toHaveTextContent(pokemons[0].name);
  });
});
