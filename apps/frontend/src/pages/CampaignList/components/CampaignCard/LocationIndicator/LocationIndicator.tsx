import { TownId } from "@shared/types";
import styles from "./LocationIndicator.module.scss";
import { TOWNS } from "@shared/constants";
import { formatDistance } from "@utils/formatMoney";
import { FaLocationArrow } from "react-icons/fa";

type LocationIndicatorProps = {
  town: TownId;
  radiusInKm: number;
};

const LocationIndicator = ({ town, radiusInKm }: LocationIndicatorProps) => {
  return (
    <div className={styles.container}>
      <FaLocationArrow />
      <span className={styles.townName}>
        {TOWNS.find((t) => t.id === town)?.name}
      </span>
      <span className={styles.distance}>+{formatDistance(radiusInKm)}</span>
    </div>
  );
};

export default LocationIndicator;
