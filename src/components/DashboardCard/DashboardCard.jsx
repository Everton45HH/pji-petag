import { Settings } from 'lucide-react';
import styles from '../../styles/dashboard.module.css';

export default function DeviceCard({ device, onSettingsClick }) {
  const getDistanceColor = () => {
    const current = parseInt(device.distance);
    const max = parseInt(device.maxDistance);
    const percentage = (current / max) * 100;
    if (percentage < 50) return styles['distance-green'];
    if (percentage < 80) return styles['distance-yellow'];
    return styles['distance-red'];
  };

  const getProgressColor = () => {
    const current = parseInt(device.distance);
    const max = parseInt(device.maxDistance);
    const percentage = (current / max) * 100;
    if (percentage < 50) return styles['progress-green'];
    if (percentage < 80) return styles['progress-yellow'];
    return styles['progress-red'];
  };

  const progressWidth = Math.min((parseInt(device.distance) / parseInt(device.maxDistance)) * 100, 100);

  return (
    <div className={styles['device-card']}>
      <div className={styles['device-card-header']}>
        <div className={styles['device-info']}>
          <h3>{device.name}</h3>
          <span className={
            `${styles['device-type-badge']} ${device.type === 'central' ? styles['device-type-central'] : styles['device-type-collar']}`
          }>
            {device.type === 'central' ? 'Dispositivo Central' : 'Coleira'}
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
            {device.distance}m / {device.maxDistance}m
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