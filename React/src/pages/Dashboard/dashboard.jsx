import { useEffect, useState } from "react";
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import HeaderDashBoard from '../../components/HeaderDashBoard/HeaderDashBoard.jsx';
import styles from '../../styles/dashboard.module.css';

export default function Dashboard() {
  const [coleiras, setColeiras] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userID , setUserID] = useState(null)
  const [newDevice, setNewDevice] = useState({
    name: '',
    distance: '',
    maxDistance: '',
    type: 'central'
  });

  // http://127.0.0.1:5000/user/me pelo amor divino nao mexa nessas rotas
  // http://127.0.0.1:5000/api/coleira/${id}
  
useEffect(() => {
  async function checkLogin() {
    try {
      const res = await fetch("http://127.0.0.1:5000/user/me", {
        method: "GET",
        credentials : "include"
      });

      if (!res.ok) {
        // alert("Que tal fazer login? Missing Authorization Header");
        // window.location.href = "/user/login";
        console.log("NAO FUNFA")
      }

      const data = await res.json();
      console.log("RAWDATA" , data)
      console.log("Usuário autenticado, UserID :", data.user_ID);

      setUserID(data.user_ID);
      fetchColeiras(data.user_ID);

      const interval = setInterval(() => fetchColeiras(data.user_ID), 3000);
      return () => clearInterval(interval);

    } catch (error) {
      console.error("Erro ao verificar login:", error);
    }
  }

  
  async function fetchColeiras(id) {
    console.log("BUSCANDO COLEIRAS");
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/coleira/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Erro ao buscar coleiras");

      const data = await res.json();
      setColeiras(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  }
  checkLogin();
}, []);


  const handleSettingsClick = (device) => {
    console.log('Configurações para:', device.nomeColeira);
  };

  const handleAddDeviceClick = () => setShowForm(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewDevice(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newColeira = {
      nomeColeira: newDevice.name,
      userID: parseInt(userID),
      distanciaMaxima: newDevice.maxDistance,
      longitude: 0,
      latitude: 0
    };

    try {
      await fetch("http://localhost:5000/api/coleira", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newColeira)
      });

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
      <main className={styles.dashboard}>
        <h2 className={styles['dashboard-title']}>Meus Dispositivos</h2>
        <p className={styles['dashboard-subtitle']}>
          Monitore a localização dos seus pets em tempo real
        </p>

        <div className={styles.table}>
          {showForm && (
            <form onSubmit={handleFormSubmit} className={styles.newDeviceForm}>
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
              <button
                type="button"
                onClick={handleCancel}
                className={styles['device-btn']}
                style={{ background: '#ccc', color: '#222', marginLeft: 8 }}
              >
                Cancelar
              </button>
            </form>
          )}

          {coleiras.length > 0 ? (
            <div className={styles['coleiras-grid']}>
              {coleiras.map(device => (
                <DashboardCard
                  key={device.id || device.nomeColeira} // fallback caso não tenha id
                  device={device}
                  onSettingsClick={handleSettingsClick}
                />
              ))}
            </div>
          ) : (
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
          <ActionButtons onAddCollar={handleAddDeviceClick} />
        </div>
      </main>
    </>
  );
}
