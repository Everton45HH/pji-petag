import map from '../../assets/images/map.jpg'
import style from '../../styles/tracker.module.css';


export default function Login() {
    return (
        <div className={style.container}>
            
            <div className={style.deviceHeader}>

                <div className={style.back}>
                    <a href="/"><i className="fa-solid fa-arrow-left"></i></a>
                </div>

                <div className={style.deviceName}>

                    <h1>Dispositivo 1</h1>

                </div>
            </div>

            <div className={style.map}>
                <img src={map} alt="MAPA"/>
            </div>

            <div className={style.deviceData}>
                <h1>
                    Historico De Coordenadas
                </h1>
            </div>
        </div>
    )}
