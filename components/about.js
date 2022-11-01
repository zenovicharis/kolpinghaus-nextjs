import clsx from "clsx";
import styles from "../styles/About.module.scss";

export default function About({ schedule }) {
  var days = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];
  return (
    <div className={styles.aboutRestourant}>
      <div className={styles.headPic}>
        <h2>Mediterrane Vielfalt im passenden Ambiente genießen.</h2>
      </div>
      <div className={styles.description}>
        <div className={styles.bottomText}>
          <h3>&nbsp;</h3>
          <p>
            Die kroatische Küche ist so abwechslungsreich wie die Geschichte des
            Landes. In den Gerichten spiegeln sich die Einflüsse
            unterschiedlichster Kulturen wider: Römische Einflüsse sind genauso
            zu finden wie italienische, österreichische, türkische und
            ungarische. Aber auch die Küche der einzelnen Regionen zeigt große
            Unterschiede. Je nach dem lokalen Angebot findet man Rezepte mit
            viel Gemüse oder Fleisch oder mit Meerestieren. Jeder wird hier sein
            Lieblingsgericht finden - da sind wir uns ganz sicher.
            <br />
            <br />
            Viele Menschen reduzieren die Spezialitäten auf Ćevapčići oder
            Ražnjići, was der Vielfalt der kroatischen Küche nicht gerecht wird.
            Aber überzeugen Sie sich selbst: In unserem Restaurant Kolpinghaus
            verwöhnen wir Sie und Ihre Lieben mit einer Vielzahl an kroatischen
            und mediterranen Spezialitäten. Und auch größere Gesellschaften, wie
            zum Beispiel bei Geburtstags-, Familien- oder Betriebsfeiern, wissen
            unsere mannigfaltige Küche zu schätzen. Unser Saal, der bis zu 50
            Personen Platz bietet, bildet das optimale Ambiente für jegliche
            Events mit kulinarischen Highlights.
            <br />
            <br />
            Und natürlich ist auch für Kurzweil gesorgt, gleich zwei Kegelbahnen
            stehen unseren Gästen zur Verfügung.
            <br />
            <br />
            Vor dem Restaurant stehen Ihnen großzügige Parkgelegenheiten für Pkw
            zur Verfügung. Lassen Sie sich von der Vielfalt der kroatischen
            Küche in ihren Bann ziehen – und besuchen Sie uns!
          </p>
        </div>
        <div className={styles.sideBorder}></div>
        <div className={styles.schedule}>
          <h3>Öffnungszeiten</h3>
          <div className={styles.tableResponsive}>
            <table
              className={clsx([
                styles.table,
                styles.tableReflow,
                styles.workingtime,
              ])}
            >
              <tbody>
                {schedule &&
                  days.map((d, i) => (
                    <tr key={i}>
                      <td>{d}</td>
                      <td>{schedule ? schedule[d] : ""}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
