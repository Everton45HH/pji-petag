import { useEffect, useState } from "react";
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import HeaderDashBoard from '../../components/HeaderDashBoard/HeaderDashBoard.jsx';
import styles from '../../styles/dashboard.module.css';
import '../../styles/dashboard.module.css';
    
export default function Dashboard() {
  // Estado para dispositivos adicionados pelo usuário
  const [devices, setDevices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    distance: '',
    maxDistance: '',
    type: 'central'
  });

  // Estado para coleiras (mantido para integração futura)
  const [coleiras, setColeiras] = useState([]);
  useEffect(() => {
    const fetchColeiras = () => {
      let userId = localStorage.getItem("userID");
      if (!userId) {
        userId = 1;
      }
      fetch(`http://localhost:5000/api/coleira/${userId}`)
        .then(res => res.json())
        .then(data => setColeiras(data))
        .catch(() => {});
    };
    fetchColeiras();
    const interval = setInterval(fetchColeiras, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSettingsClick = (device) => {
    console.log('Configurações para:', device.name);
  };

  // Abrir formulário para adicionar dispositivo
  const handleAddDeviceClick = () => {
    setShowForm(true);
  };

  // Atualizar campos do formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewDevice(prev => ({ ...prev, [name]: value }));
  };

  // Confirmar adição do dispositivo
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newDevice.name) return;
    setDevices(prev => [
      ...prev,
      {
        id: Date.now(),
        ...newDevice
      }
    ]);
    setShowForm(false);
    setNewDevice({ name: '', distance: '', maxDistance: '', type: 'central' });
  };

  // Cancelar formulário
  const handleCancel = () => {
    setShowForm(false);
    setNewDevice({ name: '', distance: '', maxDistance: '', type: 'central' });
  };

  return (
    <>
      <HeaderDashBoard />
      <main className={styles.dashboard} style={{ background: '#fff' }}>
        <div className={styles['dashboard-header']}>
          <h2 className={styles['dashboard-title']}>
            Meus Dispositivos
          </h2>
          <p className={styles['dashboard-subtitle']}>
            Monitore a localização dos seus pets em tempo real
          </p>
        </div>

        {/* Formulário inline para adicionar dispositivo */}
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
              name="distance"
              placeholder="Distância"
              value={newDevice.distance}
              onChange={handleFormChange}
              className={styles['device-input']}
            />
            <input
              type="number"
              name="maxDistance"
              placeholder="Distância Máxima"
              value={newDevice.maxDistance}
              onChange={handleFormChange}
              className={styles['device-input']}
            />
            <select
              name="type"
              value={newDevice.type}
              onChange={handleFormChange}
              className={styles['device-input']}
            >
              <option value="central">Central</option>
              <option value="collar">Coleira</option>
            </select>
            <button type="submit" className={styles['device-btn']}>Adicionar</button>
            <button type="button" onClick={handleCancel} className={styles['device-btn']} style={{ background: '#ccc', color: '#222', marginLeft: 8 }}>Cancelar</button>
          </form>
        )}

        {/* Grid de dispositivos só aparece se houver dispositivos */}
        {devices.length > 0 && (
          <div className={styles['devices-grid']}>
            {devices.map((device) => (
              <DashboardCard
                key={device.id}
                device={device}
                onSettingsClick={handleSettingsClick}
              />
            ))}
          </div>
        )}

        {/* Empty state se não houver dispositivos */}
        {devices.length === 0 && (
          <div className={styles['empty-state']}>
            <div className={styles['empty-state-icon']}>📱</div>
            <h3 className={styles['empty-state-title']}>
              Nenhum dispositivo encontrado
            </h3>
            <p className={styles['empty-state-description']}>
              Adicione seu primeiro dispositivo para começar o rastreamento
            </p>
          </div>
        )}

        <div className={styles['action-buttons']}>
          <ActionButtons
            onAddCentralDevice={handleAddDeviceClick}
            onAddCollar={handleAddDeviceClick}
          />
        </div>
      </main>
    </>
  );
}
