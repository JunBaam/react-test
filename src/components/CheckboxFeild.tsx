import React, { useContext } from "react";
import { Info, InfoContext } from "../results/FormResult";

type Booleankeys = {
  [K in keyof Info]: Info[K] extends boolean ? K : never;
}[keyof Info];

const CheckboxField: React.FC<{
  source: Booleankeys;
  label: string;
}> = ({ label, source }) => {
  const { value, setValue } = useContext(InfoContext);

  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ [source]: e.target.checked })}
        value={value[source].toString()}
        type={"checkbox"}
      />
    </>
  );
};

export default CheckboxField;
