import { use, useEffect, useState } from "react";
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import HeaderDashBoard from '../../components/HeaderDashBoard/HeaderDashBoard.jsx';
import styles from '../../styles/dashboard.module.css';

export default function Dashboard() {

  const userID = localStorage.getItem("userID");

  
  if (!userID) {
    alert("Crie uma conta e faça login para acessar o dashboard.");
    window.location.href = "/user/login";
  }
  
  const [coleiras, setColeiras] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    distance: '',
    maxDistance: '',
    type: 'central'
  });
  
  useEffect(() => {
    async function fetchColeiras() {
      try {
        console.log("ID da sessão:" + userID);
        const res = await fetch(`http://127.0.0.1:5000/api/coleira/${userID}`);
        const data = await res.json();
        setColeiras(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchColeiras();
    const interval = setInterval(fetchColeiras, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSettingsClick = (device) => {
    console.log('Configurações para:', device.coleira);
  };

  const handleAddDeviceClick = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewDevice(prev => ({ ...prev, [name]: value }));
  };
const handleFormSubmit = async (e) => {
  e.preventDefault();
  const newColeira = {
    nomeColeira: newDevice.name,
    userID: userID,
    distanciaMaxima: newDevice.maxDistance,
    longitude: 0,
    latitude: 0
  };


  try {
    await fetch("http://127.0.0.1:5000/api/coleira", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newColeira)
    });
    // eu sei ,mas nao sei como que ta pocando
    setColeiras(prev => [...prev, newColeira]);
    setShowForm(false);
    setNewDevice({ name: '', distance: '', maxDistance: '', type: 'central' });
  } catch (err) {
    console.error("Erro ao criar coleira:", err);
  }
};

  const handleCancel = () => {
    setShowForm(false);
    setNewDevice({ name: '', distance: '', maxDistance: '', type: 'central' });
  };

  return (
    <>
      <HeaderDashBoard />
      <main className={styles.dashboard} >
          <h2 className={styles['dashboard-title']}>Meus Dispositivos</h2>
          <p className={styles['dashboard-subtitle']}>
            Monitore a localização dos seus pets em tempo real
          </p>

        <div className={styles.table}>
          {showForm && (
          <form className={styles['device-form']} onSubmit={handleFormSubmit} style={{ marginBottom: 24 }}>
            <input
              type="text"
              name="name"
              placeholder="Nome do dispositivo"
              value={newDevice.name}
              onChange={handleFormChange}
              className={styles['device-input']}
              required
            />

            <input
              type="number"
              name="maxDistance"
              placeholder="Distância Máxima"
              value={newDevice.maxDistance}
              onChange={handleFormChange}
              className={styles['device-input']}
            />
            <button type="submit" className={styles['device-btn']}>Adicionar</button>
            <button type="button" onClick={handleCancel} className={styles['device-btn']} style={{ background: '#ccc', color: '#222', marginLeft: 8 }}>Cancelar</button>
          </form>
        )}

        {coleiras.length > 0 && (
          <div className={styles['coleiras-grid']}>
            {coleiras.map((device) => (
              <DashboardCard
                key={device.id}
                device={device}
                onSettingsClick={handleSettingsClick}
              />
            ))}
          </div>
        )}

        {coleiras.length === 0 && (
          <div className={styles['empty-state']}>
            <div className={styles['empty-state-icon']}>📱</div>
            <h3 className={styles['empty-state-title']}>Nenhum dispositivo encontrado</h3>
            <p className={styles['empty-state-description']}>
              Adicione seu primeiro dispositivo para começar o rastreamento
            </p>
          </div>
        )}

      </div>

        <div className={styles['action-buttons']}>
          <ActionButtons
            onAddCollar={handleAddDeviceClick}
          />
        </div>
      </main>
    </>
  );
}
