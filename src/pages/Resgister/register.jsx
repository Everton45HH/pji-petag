import styles from '../../styles/Register.module.css';
import dog from '../../assets/images/cao2.webp';
import logo from '../../assets/images/Logo.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Register() {
const navigate = useNavigate();

const [nome, setNome] = useState("");
const [telefone, setTelefone] = useState("");
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [errorMessage , setErrorMessage] = useState("")
const [senhaVisivel, setSenhaVisivel] = useState(false);
const toggleSenhaVisivel = () => {
  setSenhaVisivel(!senhaVisivel);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, telefone, email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      setErrorMessage("")
      navigate("/user/login");
    } else {
      console.log(data.message);    
      setErrorMessage(data.message)
    }
    
  } catch (error) {
    console.log(data.message);    
    setErrorMessage(data.message)
  }
};

  return (

      <div className={styles.container}>

          <img src={dog} alt="Dog" className={styles.animal_img} />

          <div className={styles.login}>

              <img src={logo} alt="Logo PeTAG" className={styles.logo} />

              <form className={styles.login_box} onSubmit={handleSubmit}>

                  <label htmlFor="nome">Nome:</label>
                  <input type="text" required placeholder="Digite seu Nome" name="nome" onChange={(e) => setNome(e.target.value)} />
                  
                  <label htmlFor="telefone">Telefone:</label>
                  <input type="number" required placeholder="Digite seu Telefone" name="telefone" onChange={(e) => setTelefone(e.target.value)} />

                  <label htmlFor="email">Email:</label>
                  <input type="email" required placeholder="Digite seu Email" name="email" onChange={(e) => setEmail(e.target.value)} />

                  <label htmlFor="senha" className={styles.label}>Senha:</label>

                  <div className={styles.senha_box}>
                                
                    <input type={senhaVisivel ? "text" : "password"} placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)} className={styles.input} />
                    
                      <button type="button" onClick={toggleSenhaVisivel} className={styles.button_eye} aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}>
                              {senhaVisivel ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                      </button>

                  </div>

                  <p className={styles.ou}>OU</p>
                  
                  <div className={styles.social_login}>
                      <i className="fa-brands fa-google"></i>
                      <i className="fa-brands fa-facebook"></i>
                      <i className="fa-brands fa-microsoft"></i>
                  </div>
                    <input 
                    type="submit" 
                    value="CRIAR CONTA" 
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

          {/* Acredita em mim tem que ser desse jeito  :)*/}
    
                  <p className={styles.cadastro}>
                      Já tem uma conta? <a href="/user/login">Conecte-se</a>
                  </p>
                                      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                  
              </form>
          </div>
      </div>
  );
}

