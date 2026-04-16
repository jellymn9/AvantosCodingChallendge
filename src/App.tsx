import styles from "./App.module.css";
import { FormList } from "./components/FormList/FormList";
import { PrefillPanel } from "./components/PrefillPanel/PrefillPanel";
import { useState } from "react";
import { useBlueprintGraph } from "./hooks/useBlueprintGraph";
import { DataSourceModal } from "./components/DataSourceModal/DataSourceModal";
import { useDataSourceOptions } from "./hooks/useDataSourceOptions";
import { usePrefillMapping } from "./hooks/usePrefillMapping";

export default function App() {
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const { data, loading, error } = useBlueprintGraph(
    1,
    "bp_01jk766tckfwx84xjcxazggzyc",
  );

  const { mapping, setFieldMapping, clearFieldMapping } = usePrefillMapping();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    field: string | null;
  }>({
    isOpen: false,
    field: null,
  });

  const groupedOptions = useDataSourceOptions(selectedFormId, data);

  function closeModal() {
    setModalState({
      isOpen: false,
      field: null,
    });
  }

  if (loading) {
    return <div className={styles.statusMessage}>Loading blueprint…</div>;
  }

  if (error) {
    return (
      <div className={styles.errorMessage}>
        Failed to load forms: {error.message}
      </div>
    );
  }

  if (!data) {
    return <div className={styles.statusMessage}>No data.</div>;
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Forms</h2>

        <FormList
          forms={data.formsById}
          selectedFormId={selectedFormId}
          onSelectForm={setSelectedFormId}
        />
      </aside>
      {selectedFormId ? (
        <PrefillPanel
          form={data.formsById[selectedFormId]}
          allForms={data.formsById}
          mapping={mapping}
          selectedFormId={selectedFormId}
          onOpenModal={(field) =>
            setModalState({
              isOpen: true,
              field,
            })
          }
          onClear={clearFieldMapping}
        />
      ) : (
        <section className={styles.emptyState}>
          Select a form to configure its prefill mappings.
        </section>
      )}
      {selectedFormId && modalState.isOpen && (
        <DataSourceModal
          field={modalState.field}
          groupedOptions={groupedOptions}
          onClose={closeModal}
          onSelect={(value) => {
            if (!modalState.field) return;

            setFieldMapping(selectedFormId, modalState.field, value);

            closeModal();
          }}
        />
      )}
    </div>
  );
}
