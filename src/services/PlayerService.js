// Função para obter todos os jogadores
const getPlayers = () => {
  const players = JSON.parse(localStorage.getItem('players')) || [];
  return players;
};

// Função para salvar ou adicionar um novo jogador
const savePlayer = (player) => {
  const players = getPlayers();
  player.id = player.id || new Date().getTime().toString(); // Gerar ID único
  players.push(player);
  localStorage.setItem('players', JSON.stringify(players));
};

// Função para atualizar um jogador existente
const updatePlayer = (updatedPlayer) => {
  const players = getPlayers();
  const index = players.findIndex(player => player.id === updatedPlayer.id);
  if (index !== -1) {
    players[index] = updatedPlayer;
    localStorage.setItem('players', JSON.stringify(players));
  }
};

// Função para excluir um jogador
const deletePlayer = (id) => {
  const players = getPlayers().filter(player => player.id !== id);
  localStorage.setItem('players', JSON.stringify(players));
};

// Exporta todas as funções como métodos do PlayerService
const PlayerService = {
  getPlayers,
  savePlayer,
  updatePlayer,
  deletePlayer
};

export default PlayerService;
