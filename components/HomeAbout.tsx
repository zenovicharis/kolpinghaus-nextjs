import { FC } from "react";

const HomeAbout: FC = () => {
  return (
    <section id="about" className="home-about-2">
      <div className="row no-margin">
        <div className="col-lg-8 col-md-6">
          <div className="about-2-content">
            <h2 className="home-subtitle">Über Uns</h2>
            <h1 className="home-title margin-b24 title-headline">Kolpinghaus</h1>
            <p>
              Die kroatische Küche ist so abwechslungsreich wie die Geschichte
              des Landes. In den Gerichten spiegeln sich die Einflüsse
              unterschiedlichster Kulturen wider. Je nach dem lokalen Angebot
              findet man Rezepte mit viel Gemüse oder Fleisch oder mit
              Meerestieren. Jeder wird hier sein Lieblingsgericht finden - da
              sind wir uns ganz sicher.
            </p>
            <p>
              Überzeugen Sie sich selbst: In unserem Restaurant Kolpinghaus
              verwöhnen wir Sie und Ihre Lieben mit einer Vielzahl an
              kroatischen und mediterranen Spezialitäten. Und auch größere
              Gesellschaften wissen unsere mannigfaltige Küche zu schätzen.
              Unser Saal, der bis zu 50 Personen Platz bietet, bildet das
              optimale Ambiente für jegliche Events mit kulinarischen
              Highlights.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 no-padding">
          <div className="home-featured-item-2">
            <div
              className="home-featured-img-2"
              style={{
                backgroundImage: "url('/img/banner.jpg')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
