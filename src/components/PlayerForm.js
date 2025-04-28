import React, { useState, useEffect } from 'react';
import PlayerService from '../services/PlayerService';

const PlayerForm = ({ playerToEdit, onSave }) => {
  const [player, setPlayer] = useState({
    id: '',
    nome: '',
    posicao: '',
    nacionalidade: '',
    numeroCamisa: '' // Novo campo
  });

  useEffect(() => {
    if (playerToEdit) {
      setPlayer(playerToEdit);
    }
  }, [playerToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.id) {
      PlayerService.updatePlayer(player);  // Atualiza jogador
    } else {
      PlayerService.savePlayer(player);   // Adiciona jogador
    }
    onSave(); // Callback para atualizar a lista
    setPlayer({ id: '', nome: '', posicao: '', nacionalidade: '', numeroCamisa: '' }); // Limpar formulário
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={player.nome}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Posição</label>
        <input
          type="text"
          name="posicao"
          value={player.posicao}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Nacionalidade</label>
        <input
          type="text"
          name="nacionalidade"
          value={player.nacionalidade}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Número da Camisa</label>
        <input
          type="number"
          name="numeroCamisa"
          value={player.numeroCamisa}
          onChange={handleChange}
        />
      </div>
      <button type="submit">
        {player.id ? 'Atualizar Jogador' : 'Salvar Jogador'}
      </button>
    </form>
  );
};

export default PlayerForm;
