import { connectToDatabase } from "../../lib/mongodb";
import styles from "../../styles/Home.module.scss";
import SideBar from "../../components/sideBar";
import Contact from "../../components/contact";
import { Element } from "react-scroll";
import Image from "next/image";

export default function Impressum({ workTime, siteKey }) {
  return (
    <div>
      <SideBar schedule={workTime} isMainPage={false} />
      <div className={styles.content}>
        <div className={styles.impressumContent}>
          <div>
            <div>
              <h3>Impressum</h3>
            </div>
            <div className={styles.impressumLogo}>
              <div>
                <p>
                  <strong>
                    Anbieterkennzeichnung nach § 5 TMG (Telemediengesetz):{" "}
                  </strong>
                </p>
                <p>Für diese Internetseite ist verantwortlich:</p>
                <br />
                <p>
                  <strong>Restaurant Kolpinghaus </strong>
                  <br />
                  Zanet Tosic <br />
                  Weidenauer Straße 27 <br />
                  57078 Siegen - Weidenau
                  <br />
                </p>
                <p>
                  0271/77002976
                  <br />
                  zanettosic@hotmail.com
                  <br />
                  Steuernummer.: 342/5320/2736 <br />
                </p>
              </div>
              <div>
                <a href="/login">
                  <Image
                    src="/img/Impressum/impress.jpg"
                    alt="Impressum Logo"
                    width={100}
                    height={100}
                  />
                </a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h3>Haftungsausschluss</h3>
              <p>
                <strong>1. Inhalt des Onlineangebotes</strong>
              </p>
              <p>
                Der Autor übernimmt keinerlei Gewähr für die Aktualität,
                Korrektheit, Vollständigkeit oder Qualität der bereitgestellten
                Informationen. Haftungsansprüche gegen den Autor, welche sich
                auf Schäden materieller oder ideeller Art beziehen, die durch
                die Nutzung oder Nichtnutzung der dargebotenen Informationen
                bzw. durch die Nutzung fehlerhafter und unvollständiger
                Informationen verursacht wurden sind grundsätzlich
                ausgeschlossen, sofern seitens des Autors kein nachweislich
                vorsätzliches oder grob fahrlässiges Verschulden vorliegt. Alle
                Angebote sind freibleibend und unverbindlich. Der Autor behält
                es sich ausdrücklich vor, Teile der Seiten oder das gesamte
                Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen,
                zu löschen oder die Veröffentlichung zeitweise oder endgültig
                einzustellen.
              </p>
              <br />
              <p>
                <strong>2. Verweise und Links</strong>
              </p>
              <p>
                Bei direkten oder indirekten Verweisen auf fremde Internetseiten
                (&quot;Links&quot;), die außerhalb des Verantwortungsbereiches
                des Autors liegen, würde eine Haftungsverpflichtung
                ausschließlich in dem Fall in Kraft treten, in dem der Autor von
                den Inhalten Kenntnis hat und es ihm technisch möglich und
                zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu
                verhindern.
                <br />
                <br />
                Der Autor erklärt daher ausdrücklich, dass zum Zeitpunkt der
                Linksetzung die entsprechenden verlinkten Seiten frei von
                illegalen Inhalten waren. Der Autor hat keinerlei Einfluss auf
                die aktuelle und zukünftige Gestaltung und auf die Inhalte der
                gelinkten/verknüpften Seiten. Deshalb distanziert er sich
                hiermit ausdrücklich von allen Inhalten aller gelinkten
                /verknüpften Seiten, die nach der Linksetzung verändert wurden.
                Diese Feststellung gilt für alle innerhalb des eigenen
                Internetangebotes gesetzten Links und Verweise sowie für
                Fremdeinträge in vom Autor eingerichteten Gästebüchern,
                Diskussionsforen und Mailinglisten. Für illegale, fehlerhafte
                oder unvollständige Inhalte und insbesondere für Schäden, die
                aus der Nutzung oder Nichtnutzung solcherart dargebotener
                Informationen entstehen, haftet allein der Anbieter der Seite,
                auf welche verwiesen wurde, nicht derjenige, der über Links auf
                die jeweilige Veröffentlichung lediglich verweist.
              </p>
              <br />
              <p>
                <strong>3. Urheber- und Kennzeichenrecht</strong>
              </p>
              <p>
                Der Autor ist bestrebt, in allen Publikationen die Urheberrechte
                der verwendeten Grafiken, Tondokumente, Videosequenzen und Texte
                zu beachten, von ihm selbst erstellte Grafiken, Tondokumente,
                Videosequenzen und Texte zu nutzen oder auf lizenzfreie
                Grafiken, Tondokumente, Videosequenzen und Texte
                zurückzugreifen.
                <br /> <br />
                Alle innerhalb des Internetangebotes genannten und ggf. durch
                Dritte geschützten Marken- und Warenzeichen unterliegen
                uneingeschränkt den Bestimmungen des jeweils gültigen
                Kennzeichenrechts und den Besitzrechten der jeweiligen
                eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist
                nicht der Schluß zu ziehen, dass Markenzeichen nicht durch
                Rechte Dritter geschützt sind!
                <br /> <br />
                Das Copyright für veröffentlichte, vom Autor selbst erstellte
                Objekte bleibt allein beim Autor der Seiten. Eine
                Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente,
                Videosequenzen und Texte in anderen elektronischen oder
                gedruckten Publikationen ist ohne ausdrückliche Zustimmung des
                Autors nicht gestattet.
                <br /> <br />
                Wir behalten uns vor, Ihre E-Mail Adresse ausschließlich für
                UNSERE Werbezwecke zu speichern und diese nicht an Dritte
                weiterzugeben.
              </p>
              <br />
              <p>
                <strong>
                  4. Rechtswirksamkeit dieses Haftungsausschlusses
                </strong>
              </p>
              <p>
                Dieser Haftungsausschluss ist als Teil des Internetangebotes zu
                betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern
                Teile oder einzelne Formulierungen dieses Textes der geltenden
                Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen
                sollten, bleiben die übrigen Teile des Dokumentes in ihrem
                Inhalt und ihrer Gültigkeit davon unberührt.
              </p>
              <br />
            </div>
          </div>
        </div>
        <Element name="contact">
          <Contact siteKey={siteKey} />
        </Element>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let { db } = await connectToDatabase();
  const workTime = await db.collection("work-time").findOne();
  const SITE_KEY = process.env.SITE_KEY;

  return {
    props: {
      workTime: JSON.parse(JSON.stringify(workTime)),
      siteKey: SITE_KEY,
    },
  };
}
