import styles from "./FormList.module.css";
import type { FormsById } from "../../utils/normalization";

interface FormListProps {
  forms: FormsById;
  selectedFormId: string | null;
  onSelectForm: (formId: string) => void;
}

export function FormList({
  forms,
  selectedFormId,
  onSelectForm,
}: FormListProps) {
  function handleClick(formId: string) {
    onSelectForm(formId);
  }

  return (
    <ul className={styles.list}>
      {Object.keys(forms).map((formId) => {
        const form = forms[formId];
        const isSelected = formId === selectedFormId;

        return (
          <li key={formId} className={styles.listItem}>
            <button
              type="button"
              onClick={() => handleClick(formId)}
              className={`${styles.button} ${
                isSelected ? styles.selected : ""
              }`}
            >
              {form.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
