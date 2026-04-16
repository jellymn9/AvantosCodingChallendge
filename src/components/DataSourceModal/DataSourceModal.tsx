import styles from "./DataSourceModal.module.css";
import type { DataSourceOption } from "../../dataSources/types";

type GroupedOptions = {
  label: string;
  options: DataSourceOption[];
};

type DataSourceModalProps = {
  field: string | null;
  groupedOptions: GroupedOptions[];
  onClose: () => void;
  onSelect: (value: DataSourceOption["value"]) => void;
};

export function DataSourceModal({
  field,
  groupedOptions,
  onClose,
  onSelect,
}: DataSourceModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>Select Data Source</h3>
            <p className={styles.subtitle}>Field: {field}</p>
          </div>

          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {groupedOptions.map((group) => (
          <div key={group.label} className={styles.group}>
            <h4 className={styles.groupTitle}>{group.label}</h4>

            <div className={styles.optionsList}>
              {group.options.map((option, index) => (
                <button
                  key={`${group.label}-${index}`}
                  className={styles.optionButton}
                  onClick={() => onSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
