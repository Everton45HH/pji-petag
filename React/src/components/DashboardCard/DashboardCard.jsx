import { Settings, X } from 'lucide-react';
import styles from '../../styles/dashboard.module.css';
import haversine from 'haversine';

export default function DeviceCard({ device, onSettingsClick }) {

  // Dados que vem no device(Vem da api)
  // device = {
  //   'idColeira' : 'X',
  //   'latitude' : 'x',
  //   'longitude' : 'x',
  //   'nomeColeira' : 'x',
  //   'distanciaMaxima : 'x,
  // }
  
  // const coordenadasDoIF = {latitude : -22.948448886784796, longitude : -46.55843799140167}
  const coordenadasDoIF = {latitude : 0, longitude : 0}
  const coordenadasColeira = {latitude : device.latitude , longitude : device.longitude}
  // POR FAVOR NAO MEXER

  
  device.distance = (haversine(coordenadasDoIF,coordenadasColeira) * 1000).toFixed(2)
    
  const getDistanceColor = () => {
    const current = parseInt(device.distance);
    const max = parseInt(device.distanciaMaxima);
    const percentage = (current / max) * 100;
    if (percentage < 50) return styles['distance-green'];
    if (percentage < 80) return styles['distance-yellow'];
    return styles['distance-red'];
  };

  const getProgressColor = () => {
    const current = parseInt(device.distance);
    const max = parseInt(device.distanciaMaxima);
    const percentage = (current / max) * 100;
    if (percentage < 50) return styles['progress-green'];
    if (percentage < 80) return styles['progress-yellow'];
    return styles['progress-red'];
  };

  const progressWidth = Math.min((parseInt(device.distance) / parseInt(device.distanciaMaxima)) * 100, 100);

  return (
    <div className={styles['device-card']}>
      <div className={styles['device-card-header']}>
        <div className={styles['device-info']}>
          <h3>{device.nomeColeira}</h3>

          <span className={
            `${styles['device-type-badge']} ${device.type === 'central' ? styles['device-type-central'] : styles['device-type-collar']}`
          }>
            {device.type === 'central' ? 'Dispositivo Central' : 'Coleira'} {device.idColeira}
          </span>
        </div>
        <button
          onClick={() => onSettingsClick(device)}
          className={styles['device-settings-button']}
        >
          <Settings />
        </button>
      </div>
      <div className={styles['device-distance-info']}>
        <div className={styles['distance-row']}>
          <span className={styles['distance-label']}>Distância</span>
          <span className={getDistanceColor()}>
            {device.distance}m / {device.distanciaMaxima}m
          </span>
        </div>
        <div className={styles['progress-bar-container']}>
          <div
            className={`${styles['progress-bar']} ${getProgressColor()}`}
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}