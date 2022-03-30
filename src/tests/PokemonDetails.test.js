import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 7 - Teste componente Pokemon Details', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText('More details');
      userEvent.click(moreDetails);

      const PokemonName = screen
        .getByRole('heading', { name: 'Pikachu Details', level: 2 });
      expect(PokemonName).toBeInTheDocument();

      expect(moreDetails).not.toBeInTheDocument();

      const elementH2 = screen.getByRole('heading', { name: 'Summary', level: 2 });
      expect(elementH2).toBeInTheDocument();

      const pokemonParagraph = screen.getByText(/This intelligent Pokémon/i);
      expect(pokemonParagraph).toBeInTheDocument();
    });

  test('Teste se existe uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${pokemons[0].id}`);

      const elementH2 = screen
        .getByRole('heading', { name: `Game Locations of ${pokemons[0].name}` });
      expect(elementH2).toBeInTheDocument();

      pokemons[0].foundAt.forEach((found, index) => {
        const pokemonImg = screen
          .getAllByRole('img', { name: `${pokemons[0].name} location` });

        expect(screen.getByText(found.location)).toHaveTextContent(found.location);

        expect(pokemonImg[index])
          .toHaveAttribute('alt', `${pokemons[0].name} location`);

        expect(pokemonImg[index])
          .toHaveAttribute('src', found.map);
      });
    });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${pokemons[0].id}`);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();

      const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
      expect(labelFavorite).toBeInTheDocument();

      userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);

      userEvent.click(checkbox);
      expect(checkbox.checked).not.toBe();
    });
});
