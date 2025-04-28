import React from 'react';
import PlayerService from '../services/PlayerService';

const PlayerList = ({ players, onEdit, onDelete }) => {
  return (
    <div className="player-list">
      <h2>Lista de Jogadores</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Posição</th>
            <th>Nacionalidade</th>
            <th>Número de Camisa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.nome}</td>
              <td>{player.posicao}</td>
              <td>{player.nacionalidade}</td>
              <td>{player.numeroCamisa}</td>
              <td>
                <button className="edit" onClick={() => onEdit(player)}>Editar</button>
                <button className="delete" onClick={() => onDelete(player)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;
