import React, { useState } from 'react';
import NewsModal from '../NewsModal'; // Ruta actualizada para NewsModal
import './NewsSection.css';

// Importar imágenes
import noticia1 from '../../assets/network.webp'; // Ruta corregida para las imágenes
import noticia2 from '../../assets/dungeons.png';
import noticia3 from '../../assets/noticia3.webp';

const newsData = [
  {
    id: 1,
    title: "¡FlanCraft se convierte en una Network!",
    date: "6 de Octubre, 2024",
    image: noticia1,
    body: `¡Así es, Flancraftianos! Nos hemos expandido a lo grande y ahora somos una Network. ¿Qué significa esto? ¡Que podrás disfrutar de múltiples servidores y modos de juego en un solo lugar! Desde Survival hasta Creativo, pasando por el emocionante 1Block y muchas sorpresas más que están por venir.

¡Nuevas posibilidades, mismas aventuras épicas!
Hasta ahora, FlanCraft te ofrecía una experiencia única, pero queríamos llevarlo al siguiente nivel. Nuestra comunidad ha crecido, y con ello, también nuestro servidor principal. Así que nos hemos puesto manos a la obra y actualizado todo con un potente bare metal con 256 GB de RAM. ¡Sí, has leído bien! ¡Nada de lag, cero caídas y una estabilidad increíble para todas tus batallas!

Seguridad al máximo 
Y no solo eso. Sabemos lo importante que es tener un lugar seguro donde jugar y divertirse. Con nuestro nuevo sistema, contamos con protección de seguridad de última generación que mantiene alejados a los hackers y protege todas tus construcciones y avances. ¡Olvídate de esos días de miedo! 

¿Listo para entrar? 
¡Explora nuestros diferentes mundos y descubre cuál es el que más te gusta! Un solo comando y ya estarás en otra dimensión, listo para construir, pelear o, simplemente, relajarte con amigos.

Esto es solo el principio.  A lo largo de las próximas semanas, iremos añadiendo nuevos modos de juego, eventos exclusivos y ¡quién sabe qué otras locuras más!

¿Te lo vas a perder? 
Conéctate ya con la IP play.flancraft.com y empieza tu FlanAdventure hoy mismo.  ¡Nos vemos dentro!`
  },
  {
    id: 2,
    title: "¡Dungeons Adventures ya está aqui!",
    date: "5 de Octubre, 2024",
    image: noticia2,
    body: `¡Atención, aventureros de Flancraft! 
         ¡Presentamos el nuevo sistema de Dungeons!

         Enfrenta retos épicos, combate criaturas míticas y desentraña los secretos mejor guardados de nuestras mazmorras. Cada dungeon ha sido cuidadosamente diseñada para ofrecerte una experiencia única y desafiante, con una dificultad progresiva que pondrá a prueba tus habilidades como jugador.

         ¿Qué te espera? 

         Mazmorras fijas, cada una con su propio ambiente, enemigos y retos específicos. ¡Aprende cada rincón y perfecciona tu estrategia para superarlas!
         Bosses temibles con habilidades especiales que requieren trabajo en equipo y astucia para derrotarlos.
         Recompensas exclusivas como ítems legendarios y monedas FLAN para aquellos que se atrevan a conquistar las dungeons.
         Actualizaciones periódicas con nuevas dungeons que iremos añadiendo para mantener la aventura viva.

         ¡Esto es solo el comienzo!

         Flancraft no se detiene aquí. Continuaremos expandiendo el universo de las dungeons, añadiendo nuevos retos y tesoros para que siempre haya algo más por descubrir.

         Únete hoy y descubre las mazmorras en Flancraft. Cada batalla cuenta, y los tesoros esperan solo a los más valientes.

         ¡No lo pienses más y lánzate a la acción en Flancraft! 
         ¡Nos vemos en las mazmorras, héroe!`
  },
  {
    id: 3,
    title: "Nueva Modalidad de AFK Farming en FlanCraft",
    date: "3 de Octubre, 2024",
    image: noticia3,
    body: `
  ¡Relájate y gana mientras descansas!

  Hemos implementado una increíble modalidad de AFK Farming en FlanCraft para que puedas farmear $Flan mientras te tomas un descanso en nuestro lujoso jacuzzi virtual. Todo lo que necesitas hacer es poner /afk cuando quieras dejar de jugar activamente, y automáticamente entrarás en nuestra "Pool de Relajación".

 ¿Cómo funciona?

  1. ¡Ponte cómodo! Al activar el modo AFK con /afk, tu personaje se sumerge en un elegante jacuzzi dentro del juego.
  2. Automáticamente empiezas a ganar 7 $Flan cada 10 minutos.
  3. No hay límite de tiempo: puedes estar en modo AFK todo el tiempo que quieras y seguir generando ganancias.
  4. Seguridad garantizada: Nuestro servidor protege tu sesión de cualquier intento de expulsión o hackeo mientras estás relajándote.

 ¿Por qué es especial?

  En esta modalidad, cada minuto cuenta, ya que puedes farmear criptomonedas sin hacer absolutamente nada, permitiendo que te relajes mientras ves cómo se incrementa tu cuenta de $Flan. ¡Todo esto ocurre en un entorno seguro y optimizado, con una experiencia visual espectacular!

¿Qué esperas para probarlo?

  ¡Conéctate y disfruta de esta novedosa forma de ganar sin esfuerzo, mientras te sumerges en un ambiente de lujo y comodidad en FlanCraft!
  `,
}
];

const NewsSection = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [wrapperHeight, ] = useState(80); // Valor inicial en vh como número

  const handleClick = (news) => {
    setSelectedNews(news);
  };

  const handleClose = () => {
    setSelectedNews(null);
  };

  return (
    <section className="news-section">
      <div className="news-wrapper" style={{ height: `${wrapperHeight}vh` }}>
        <h1 className="news-title">
          {Array.from("Noticias Recientes").map((char, index) => (
            <span key={index} className="news-title-char">{char}</span>
          ))}
        </h1>
        <div className="news-main" onClick={() => handleClick(newsData[0])}>
          <img src={newsData[0].image} alt={newsData[0].title} className="news-main-image" />
          <div className="news-main-content">
            <h2 className="news-main-title">{newsData[0].title}</h2>
            <p className="news-main-date">{newsData[0].date}</p>
            <p className="news-main-content-text">{newsData[0].body.slice(0, 100)}...</p>
          </div>
        </div>
        <div className="news-container">
          {newsData.slice(1).map((news) => (
            <div key={news.id} className="news-item" onClick={() => handleClick(news)}>
              <img src={news.image} alt={news.title} className="news-item-image" />
              <h3 className="news-item-title">{news.title}</h3>
              <p className="news-item-date">{news.date}</p>
              <p className="news-item-content">{news.body.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
      <NewsModal isOpen={!!selectedNews} onClose={handleClose} news={selectedNews} />
    </section>
  );
};

export default NewsSection;
