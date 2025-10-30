import styles from '../../styles/login.module.css';
import dog from '../../assets/images/cao2.webp';
import logo from '../../assets/images/Logo.png';
// CORREÇÃO: Removendo a importação desnecessária 'data'
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';

import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Login() {
    const navigate = useNavigate()

    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage , setErrorMessage] = useState(""); // Inicializa como string vazia

    const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpa a mensagem de erro ao submeter
    
    try {
        const response = await fetch("http://127.0.0.1:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
        // ESSENCIAL: Garante que o cookie JWT seja enviado e recebido
        credentials: "include", 
        });

        // Tenta ler o corpo da resposta, mesmo que a resposta não seja 'ok'
        const data = await response.json(); 

        if (response.ok) {
            // Login bem-sucedido
            console.log("Login realizado com sucesso. Redirecionando...");
            // O cookie JWT já foi definido no navegador.
            navigate("/user/dashboard"); // <--- Mantenho sua rota de navegação
        } else {
            // Falha no login (401, 404, etc.)
            console.log("Falha no login:", data.message); 
            // Usa a mensagem de erro vinda do servidor (ex: "Senha incorreta")
            setErrorMessage(data.message || "Erro desconhecido ao fazer login."); 
        }
    
    }catch (error) {
        // Erro de rede (servidor fora do ar, CORS, etc.)
        console.error("Erro de conexão/rede:", error);
        setErrorMessage("Erro ao conectar com o servidor. Verifique a rede/CORS.");
    }
    };


    return (
        <>
        <div className={styles.container}>

            <img src={dog} alt="Dog" className={styles.animal_img} />

            <div className={styles.login}>
                
                <img src={logo} alt="Logo PeTAG" className={styles.logo} />

                <form className={styles.login_box} onSubmit={handleSubmit}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input type="email" placeholder="Email" name="email" required onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="senha" className={styles.label}>Senha:</label>

                    <div className={styles.senha_box}>
                        
                        <input type={senhaVisivel ? "text" : "password"} placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)} className={styles.input} />

                        <button type="button" onClick={toggleSenhaVisivel} className={styles.button_eye} aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}>

                            {senhaVisivel ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}

                        </button>

                    </div>

                    <p>OU</p>

                    <div className={styles.social_login}>
                        <i className="fa-brands fa-google"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-microsoft"></i>
                    </div>

                    <input 
                    type="submit" 
                    value="ENVIAR" 
                    style={{
                        backgroundColor: "#b0e57c",
                        fontWeight: 600,
                        color: "white",
                        margin: "5px",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                    />
            
                    <p className={styles.cadastro}>Não tem uma conta? <a href="/user/register">Cadastre-se</a></p>
                    
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                        
                </form>

            </div>
        </div>
        </>
    );
}