import styles from '../../styles/login.module.css';
import dog from '../../assets/images/cao2.webp';
import logo from '../../assets/images/Logo.png';
import { data, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage , setErrorMassage] = useState("")

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://127.0.0.1:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("userID", data.userID);
            console.log(localStorage)
            setErrorMassage("")
            navigate("/user/dashboard");

        } else {
        console.log(data.message);    
        setErrorMassage(data.message)
    }
    
    }catch (error) {
    console.log(error);
    setErrorMassage("Erro ao conectar com o servidor");
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
                        <input type="password" placeholder="Senha" name="senha" required onChange={(e) => setSenha(e.target.value)}/>

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
            {/* Acredita em mim tem que ser desse jeito  :)*/}

                    <p className={styles.cadastro}>Não tem uma conta? <a href="/user/register">Cadastre-se</a></p>
                    
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                        
                </form>

            </div>
        </div>
        </>
    );
}