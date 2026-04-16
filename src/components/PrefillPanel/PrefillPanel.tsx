import styles from "./PrefillPanel.module.css";
import type { Form } from "../../utils/normalization";
import type { FormsById } from "../../utils/normalization";
import type { MappingState } from "../../types/mapping";

type PrefillPanelProps = {
  form: Form;
  allForms: FormsById;
  mapping: MappingState;
  selectedFormId: string;
  onOpenModal: (field: string) => void;
  onClear: (formId: string, field: string) => void;
};

export function PrefillPanel({
  form,
  allForms,
  mapping,
  selectedFormId,
  onOpenModal,
  onClear,
}: PrefillPanelProps) {
  const formMapping = mapping[selectedFormId] || {};

  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>{form.name}</h2>

      <p className={styles.subtitle}>Configure how fields are prefilled.</p>

      <div className={styles.fieldsList}>
        {form.fields.map((field) => {
          const mapped = formMapping[field];

          return (
            <div
              role="button"
              tabIndex={mapped ? 0 : -1}
              onClick={mapped ? undefined : () => onOpenModal(field)}
              key={field}
              className={styles.fieldCard}
            >
              <div className={styles.fieldInfo}>
                <div className={styles.fieldName}>{field}</div>

                {mapped ? (
                  <div className={styles.fieldValue}>
                    {mapped.type === "form_field"
                      ? `${allForms[mapped.sourceFormId!]?.name}.${mapped.sourceField}`
                      : mapped.sourceField}
                  </div>
                ) : (
                  <div className={styles.fieldEmpty}>No mapping selected</div>
                )}
              </div>

              {mapped && (
                <button
                  className={styles.clearButton}
                  onClick={() => onClear(selectedFormId, field)}
                  aria-label="Close"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
