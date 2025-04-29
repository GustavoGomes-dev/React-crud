import React from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';  // Importando componentes responsivos do React-Bootstrap

const PlayerList = ({ players, onEdit, onDelete }) => {
  return (
    <div className="player-list">
      <h2>Lista de Jogadores</h2>
      <Row className="mb-4">
        <Col xs={12}>
          <Table striped bordered hover responsive>
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
                    <Button variant="warning" className="me-2" onClick={() => onEdit(player)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(player)}>
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default PlayerList;
