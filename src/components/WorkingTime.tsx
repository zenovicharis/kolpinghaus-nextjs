import { FC } from "react";
import { Worktime } from "../db/schema";


interface WorkingTimeProps {
	workingTimes: Worktime[];
}


const WorkingTime: FC<WorkingTimeProps> = ({ workingTimes }) => {
  return (
    <section
      className="home-widget parallax"
      style={{ background: "gray" }}
    >
         <div className="parallax-content">
            <div className="container">
               <div className="row">
                  <div className="col-md-12 alignc">
                  
                    <h2 className="home-subtitle">Tisch reservieren</h2>
                     <h1 className="home-title title-headline margin-b24">Öffnungszeiten</h1>

                     {workingTimes.map((time, index) => (
                        <p key={index} style={{marginBottom: "6px"}}>
                           {time.day}: {time.open}{time.close ? ` - ${time.close}` : ""}
                        </p>
                     ))}
                     <a className="view-more more-white margin-t36" href="/reservation">Jetzt buchen</a>

                  </div>
               </div>
            </div>
         </div>
      </section>
  );
};

export default WorkingTime;
