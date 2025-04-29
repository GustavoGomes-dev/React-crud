import React, { useState, useEffect } from 'react';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import PlayerService from './services/PlayerService';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';  // Importando componentes responsivos
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [playerToDelete, setPlayerToDelete] = useState(null);

  // Carrega jogadores do LocalStorage
  const loadPlayers = () => {
    setPlayers(PlayerService.getPlayers());
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  // Função para abrir o modal correto
  const handleOpenModal = (player = null, type = 'add') => {
    setModalType(type);
    setIsModalOpen(true);

    if (type === 'edit') {
      setPlayerToEdit(player);
      setPlayerToDelete(null);
    } else if (type === 'delete') {
      setPlayerToDelete(player);
      setPlayerToEdit(null);
    } else {
      setPlayerToEdit(null);
      setPlayerToDelete(null);
    }
  };

  // Função para salvar o jogador e atualizar a lista
  const handleSavePlayer = () => {
    loadPlayers();
    setPlayerToEdit(null);
    setIsModalOpen(false);
  };

  // Função para excluir um jogador
  const handleDeletePlayer = () => {
    if (playerToDelete) {
      PlayerService.deletePlayer(playerToDelete.id);
      loadPlayers();
      setIsModalOpen(false);  // FECHAR o modal após excluir
      setPlayerToDelete(null);
    }
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPlayerToDelete(null);
    setPlayerToEdit(null);
  };

  return (
    <div className="App">
      <Container className="py-5">
        <h1 className="text-center mb-5">Gestão de Jogadores do Corinthians</h1>

        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Button variant="primary" className="mb-4 w-100" onClick={() => handleOpenModal(null, 'add')}>
              Adicionar Jogador
            </Button>
          </Col>
        </Row>

        <PlayerList 
          players={players} 
          onEdit={(player) => handleOpenModal(player, 'edit')} 
          onDelete={(player) => handleOpenModal(player, 'delete')}
        />

        <Modal 
          show={isModalOpen}
          onHide={handleCloseModal}
          centered
          className="custom-modal"  // Classe personalizada para fundo preto
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {modalType === 'edit' && 'Editar Jogador'}
              {modalType === 'add' && 'Adicionar Jogador'}
              {modalType === 'delete' && 'Confirmar Exclusão'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {modalType === 'delete' ? (
              <p>
                Você tem certeza que deseja excluir o jogador{' '}
                <strong>{playerToDelete ? playerToDelete.name : ''}</strong>?
              </p>
            ) : (
              <PlayerForm playerToEdit={playerToEdit} onSave={handleSavePlayer} />
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
            {modalType === 'delete' && (
              <Button variant="danger" onClick={handleDeletePlayer}>
                Excluir
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default App;
