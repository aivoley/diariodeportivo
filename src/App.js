import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ConfianzaApp() {
  const [nombre, setNombre] = useState("");
  const [diario, setDiario] = useState({ bien: '', desafio: '', intento: '' });
  const [mantra, setMantra] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [emocion, setEmocion] = useState(3);
  const [modoClub, setModoClub] = useState(false);
  const [loginEntrenador, setLoginEntrenador] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [listaJugadoras, setListaJugadoras] = useState([]);

  // Cargar datos al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("confianzaApp");
    if (saved) {
      const data = JSON.parse(saved);
      setNombre(data.nombre || "");
      setDiario(data.diario || { bien: '', desafio: '', intento: '' });
      setMantra(data.mantra || "");
      setObjetivo(data.objetivo || "");
      setEmocion(data.emocion || 3);
      setModoClub(data.modoClub || false);
    }
  }, []);

  // Función para guardar datos jugadora (local + compartido)
  const guardarDatos = () => {
    if (!nombre.trim()) {
      alert("Por favor, ingresa tu nombre para guardar y compartir datos.");
      return;
    }
    // Guardar datos individuales en localStorage
    localStorage.setItem(
      "confianzaApp",
      JSON.stringify({ nombre, diario, mantra, objetivo, emocion, modoClub })
    );

    // Guardar datos compartidos para entrenador
    let lista = JSON.parse(localStorage.getItem("confianzaAppJugadoras") || "[]");
    const index = lista.findIndex(j => j.nombre === nombre);
    const datosJugadora = { nombre, diario, mantra, objetivo, emocion };
    if (index >= 0) {
      lista[index] = datosJugadora;
    } else {
      lista.push(datosJugadora);
    }
    localStorage.setItem("confianzaAppJugadoras", JSON.stringify(lista));

    alert("Datos guardados ✅");
  };

  // Login entrenador
  const login = () => {
    if (user === "entrenador" && pass === "v0ley2025") {
      setLoginEntrenador(true);
      // Cargar lista de jugadoras para el entrenador
      const lista = JSON.parse(localStorage.getItem("confianzaAppJugadoras") || "[]");
      setListaJugadoras(lista);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  // Logout entrenador
  const logout = () => {
    setLoginEntrenador(false);
    setUser("");
    setPass("");
  };

  if (loginEntrenador) {
    // Vista modo entrenador
    return (
      <div className="max-w-xl mx-auto p-4 space-y-4 bg-gradient-to-b from-green-50 to-white min-h-screen">
        <h1 className="text-3xl font-bold text-center text-green-700">Modo Entrenador 🧑‍🏫</h1>
        <Button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white w-full mb-4">
          Cerrar sesión
        </Button>

        {listaJugadoras.length === 0 && <p>No hay datos de jugadoras compartidos.</p>}

        {listaJugadoras.map((juga, i) => (
          <Card key={i} className="shadow-md mb-4">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">{juga.nombre}</h2>
              <p><strong>Diario - Qué hizo bien:</strong> {juga.diario.bien}</p>
              <p><strong>Desafíos:</strong> {juga.diario.desafio}</p>
              <p><strong>Intentos:</strong> {juga.diario.intento}</p>
              <p><strong>Mantra:</strong> {juga.mantra}</p>
              <p><strong>Objetivo semanal:</strong> {juga.objetivo}</p>
              <p><strong>Nivel confianza:</strong> {juga.emocion} / 5</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Vista modo jugadora
  return (
    <div className="max-w-xl mx-auto p-4 space-y-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700">Confianza Deportiva 💪</h1>

      <Tabs defaultValue="diario">
        <TabsList className="grid grid-cols-4 rounded-xl bg-blue-100">
          <TabsTrigger value="diario">📔 Diario</TabsTrigger>
          <TabsTrigger value="mantra">🧘 Mantra</TabsTrigger>
          <TabsTrigger value="club">🏐 Club</TabsTrigger>
          <TabsTrigger value="login">🔐 Entrenador</TabsTrigger>
        </TabsList>

        <TabsContent value="diario">
          <Card className="shadow-xl">
            <CardContent className="space-y-3 pt-4">
              <Input
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <Textarea
                placeholder="¿Qué hice bien hoy?"
                value={diario.bien}
                onChange={(e) => setDiario({ ...diario, bien: e.target.value })}
              />
              <Textarea
                placeholder="¿Qué me costó?"
                value={diario.desafio}
                onChange={(e) => setDiario({ ...diario, desafio: e.target.value })}
              />
              <Textarea
                placeholder="¿Qué quiero intentar mañana?"
                value={diario.intento}
                onChange={(e) => setDiario({ ...diario, intento: e.target.value })}
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={guardarDatos}>
                Guardar entrada
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mantra">
          <Card className="shadow-xl">
            <CardContent className="space-y-3 pt-4">
              <Textarea
                placeholder="Tu mantra personal"
                value={mantra}
                onChange={(e) => setMantra(e.target.value)}
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={guardarDatos}>
                Guardar mantra
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="club">
          <Card className="shadow-xl">
            <CardContent className="space-y-4 pt-4">
              <div>
                <label className="font-semibold text-sm">🎯 Objetivo semanal</label>
                <Input
                  placeholder="Ej: Hablar más en defensa"
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                />
              </div>
              <div>
                <label className="font-semibold text-sm">📊 Nivel de confianza (1 a 5)</label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={emocion}
                  onChange={(e) => setEmocion(Number(e.target.value))}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={modoClub} onCheckedChange={setModoClub} />
                <span className="text-sm">
                  {modoClub ? "Compartir con entrenador/a 🧑‍🏫" : "Modo privado 🔒"}
                </span>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={guardarDatos}>
                Guardar semana
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card className="shadow-xl max-w-md mx-auto">
            <CardContent className="space-y-3 pt-4">
              <Input
                placeholder="Usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={login}>
                Entrar como entrenador
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


