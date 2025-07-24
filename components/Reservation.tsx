import { FC } from "react";

const Reservation: FC = () => {
  return (
    <section id="reservation" className="home-widget">
      <div className="container">
        <div className="row">
          <div className="col-md-12 alignc">
            <h2 className="home-subtitle">Reservieren Sie einen Tisch</h2>
            <h1 className="home-title margin-b24 title-headline">Reservierung</h1>
            <p>
              Sie können einen Tisch online reservieren. Bitte füllen Sie das untenstehende Formular aus und wir werden uns so schnell wie möglich bei Ihnen melden.
            </p>
            {/* Add your reservation form here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
