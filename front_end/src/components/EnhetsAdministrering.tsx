import { useState } from 'react';
import '../styles/EnhetsAdministrering.css'; // Sørg for at denne filen eksisterer

export default function EnhetsAdministrering() {
  const [enheter, setEnheter] = useState(["Enhet 1", "Enhet 2", "Enhet 3"]);

  const fjernEnhet = (index: number) => {
    const nyeEnheter = [...enheter];
    nyeEnheter.splice(index, 1);
    setEnheter(nyeEnheter);
  };

  const leggTilEnhet = () => {
    const nyEnhet = `Enhet ${enheter.length + 1}`;
    setEnheter([...enheter, nyEnhet]);
  };

  return (
    <section className="container">
      <header>
        <h2>Legg til enheter</h2>
      </header>
      <div className="enhetsliste">
        {enheter.map((enhet, index) => (
          <article key={index} className="enhet-item">
            <span>{enhet}</span>
            <button className="fjern-knapp" aria-label={`Fjern ${enhet}`} onClick={() => fjernEnhet(index)}>
              -
            </button>
          </article>
        ))}
        <button className="legg-til-knapp" aria-label="Legg til ny enhet" onClick={leggTilEnhet}>
          +
        </button>
      </div>
    </section>
  );
}
