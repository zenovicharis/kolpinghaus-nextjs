import { GetServerSideProps } from "next";
import HomeContact from "../components/HomeContact";
import Layout from "../components/Layout";
import Image from "next/image";
import { getWorkTime } from "../lib/queries/workTime";
import { Worktime } from "../db/schema";
import { useRef } from "react";

interface ImpressumProps {
	siteKey: string;
	workTime: Worktime[];
}

const Impressum = ({ siteKey, workTime }: ImpressumProps) => {
  const impressumClicksRef = useRef(0);

  return (
    <Layout workTime={workTime}>
      <section
        className="topSingleBkg topPageBkg"
        style={{
          backgroundImage: "url('/img/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="item-content-bkg">
          <div className="item-img"></div>
          <div className="inner-desc">
            <h1 className="post-title single-post-title">Impressum</h1>
            <span className="post-subtitle">
							Anbieterkennzeichnung nach § 5 TMG
            </span>
          </div>
        </div>
      </section>

      <section className="about-1 margin-b72">
        <div className="container">
          <div className="row margin-b54">
            <div className="col-md-6">
              <div className="headline">
                <h2>Verantwortlich für diese Internetseite</h2>
              </div>
              <p>
								Restaurant Kolpinghaus
                <br />
								Zanet Tosic
                <br />
								Weidenauer Straße 27
                <br />
								57078 Siegen - Weidenau
                <br />
                <br />
								0271/77002976
                <br />
								zanettosic@hotmail.com
                <br />
								Steuernummer: 342/5320/2736
              </p>
            </div>

            <div
              className="col-md-6 impressum-image"
              onClick={() => {
                impressumClicksRef.current += 1;
                if (impressumClicksRef.current === 3) {
                  window.location.href = "/admin/login";
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <Image
                className="img-fluid img-feature img-responsive"
                src="/img/impressum.png"
                alt="Impressum"
                width={202.5}
                height={231}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="headline">
                <h2>Haftungsausschluss</h2>
              </div>
              <h5>1. Inhalt des Onlineangebotes</h5>
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
              <h5>2. Verweise und Links</h5>
              <p>
								Bei direkten oder indirekten Verweisen auf fremde Internetseiten
								(&apos;Links&apos;), die außerhalb des Verantwortungsbereiches
								des Autors liegen, würde eine Haftungsverpflichtung
								ausschließlich in dem Fall in Kraft treten, in dem der Autor von
								den Inhalten Kenntnis hat und es ihm technisch möglich und
								zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu
								verhindern. Der Autor erklärt daher ausdrücklich, dass zum
								Zeitpunkt der Linksetzung die entsprechenden verlinkten Seiten
								frei von illegalen Inhalten waren. Der Autor hat keinerlei
								Einfluss auf die aktuelle und zukünftige Gestaltung und auf die
								Inhalte der gelinkten/verknüpften Seiten. Deshalb distanziert er
								sich hiermit ausdrücklich von allen Inhalten aller gelinkten
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
              <h5>3. Urheber- und Kennzeichenrecht</h5>
              <p>
								Der Autor ist bestrebt, in allen Publikationen die Urheberrechte
								der verwendeten Grafiken, Tondokumente, Videosequenzen und Texte
								zu beachten, von ihm selbst erstellte Grafiken, Tondokumente,
								Videosequenzen und Texte zu nutzen oder auf lizenzfreie
								Grafiken, Tondokumente, Videosequenzen und Texte
								zurückzugreifen. Alle innerhalb des Internetangebotes genannten
								und ggf. durch Dritte geschützten Marken- und Warenzeichen
								unterliegen uneingeschränkt den Bestimmungen des jeweils
								gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen
								eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist
								nicht der Schluß zu ziehen, dass Markenzeichen nicht durch
								Rechte Dritter geschützt sind! Das Copyright für
								veröffentlichte, vom Autor selbst erstellte Objekte bleibt
								allein beim Autor der Seiten. Eine Vervielfältigung oder
								Verwendung solcher Grafiken, Tondokumente, Videosequenzen und
								Texte in anderen elektronischen oder gedruckten Publikationen
								ist ohne ausdrückliche Zustimmung des Autors nicht gestattet.
								Wir behalten uns vor, Ihre E-Mail Adresse ausschließlich für
								UNSERE Werbezwecke zu speichern und diese nicht an Dritte
								weiterzugeben.
              </p>
              <h5>4. Rechtswirksamkeit dieses Haftungsausschlusses</h5>
              <p>
								Dieser Haftungsausschluss ist als Teil des Internetangebotes zu
								betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern
								Teile oder einzelne Formulierungen dieses Textes der geltenden
								Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen
								sollten, bleiben die übrigen Teile des Dokumentes in ihrem
								Inhalt und ihrer Gültigkeit davon unberührt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HomeContact siteKey={siteKey} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
	ImpressumProps
> = async () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const workTime = await getWorkTime();
  return {
    props: {
      siteKey,
      workTime: JSON.parse(JSON.stringify(workTime)),
    },
  };
};

export default Impressum;
