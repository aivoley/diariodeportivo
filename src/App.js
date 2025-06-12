import { useEffect, useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cambia aquí usuario y contraseña a tu gusto:
    const user = "entrenador";
    const pass = "v0ley2025";

    if (username === user && password === pass) {
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "auto", padding: 20, marginTop: 100, textAlign: "center", border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Login Entrenador</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={{ width: "100%", padding: 10, backgroundColor: "#2563EB", color: "white", border: "none", borderRadius: 4 }}>
          Entrar
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Datos simulados de jugadoras con modoClub activo para modo entrenador
  const [jugadoras, setJugadoras] = useState([]);

  useEffect(() => {
    // Simula que se cargan datos compartidos de jugadoras
    const data = localStorage.getItem("confianzaAppJugadoras");
    if (data) {
      setJugadoras(JSON.parse(data));
    }
  }, []);

  // Vista entrenador muestra jugadoras que comparten datos
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1 style={{ color: "#2563EB", textAlign: "center" }}>Modo Entrenador</h1>
      {jugadoras.length === 0 ? (
        <p>No hay jugadoras compartiendo datos.</p>
      ) : (
        <div>
          {jugadoras.map((jugadora, i) => (
            <div key={i} style={{ border: "1px solid #ccc", borderRadius: 6, padding: 15, marginBottom: 15 }}>
              <h2>{jugadora.nombre || `Jugadora ${i + 1}`}</h2>
              <p><b>Objetivo semanal:</b> {jugadora.objetivo || "No definido"}</p>
              <p><b>Nivel confianza:</b> {jugadora.emocion || "-"}</p>
              <p><b>Diario:</b></p>
              <ul>
                <li><b>Bien:</b> {jugadora.diario?.bien || "-"}</li>
                <li><b>Desafío:</b> {jugadora.diario?.desafio || "-"}</li>
                <li><b>Intento:</b> {jugadora.diario?.intento || "-"}</li>
              </ul>
              <p><b>Mantra:</b> {jugadora.mantra || "-"}</p>
            </div>
          ))}
        </div>
      )}
      <button
        style={{ marginTop: 20, padding: 10, backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: 6 }}
        onClick={() => setLoggedIn(false)}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
