import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Requisito 2 - Teste o componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {

  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const title = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    render(<About />);
    const image = screen.getByRole('img');

    expect(image.src).toBe(url);
  });
});
