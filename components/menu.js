import clsx from "clsx";
import { useState } from "react";
import styles from "../styles/Menu.module.scss";

function Menu({ food }) {
  let [currentMeanType, setCurrentMeanType] = useState(0);
  let [currentSubMeanType, setCurrentSubMeanType] = useState(0);
  return (
    <div className={styles.menuCart}>
      <div className={styles.menu}>
        <div className={styles.menuTitle}>
          <div className={styles.menuTitleLine}></div>

          <h1>Restourant Menu </h1>

          <div className={styles.menuTitleLine}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.sections}>
            <p>
              {food &&
                food.map((a, i) => (
                  <span key={i}>
                    <a
                      href="#"
                      className={clsx({ active: currentMeanType == i })}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentMeanType(i);
                        setCurrentSubMeanType(0);
                      }}
                    >
                      <span>{a.name.toUpperCase()}</span>
                    </a>
                    {i + 1 < food.length ? " · " : ""}
                  </span>
                ))}
            </p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={clsx([styles.sections, styles.sub])}>
            <p>
              {food[currentMeanType] &&
                food[currentMeanType].types.map((e, p) => (
                  <a
                    key={p}
                    href="#"
                    className={clsx({ active: currentSubMeanType == p })}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentSubMeanType(p);
                    }}
                  >
                    <span className={styles.flasses}>{e.name}</span>
                  </a>
                ))}
            </p>
          </div>
        </div>
        <div className={styles.items}>
          {food[currentMeanType] &&
            food[currentMeanType].types[currentSubMeanType].list.map((d, k) => (
              <div className={styles.itemList} key={k}>
                <div className={styles.info}>
                  <h5>{d.name}</h5>
                  <p>{d.info}</p>
                </div>
                <div className={styles.price}></div>
              </div>
            ))}
          {/* {# <h5>{{food.price|number_format(2, '.')}} &euro;</h5> #} */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
