import React from "react";
import { Info } from "../results/FormResult";

const CheckboxField: React.FC<{
  value: Info;
  source: keyof Info;
  setValue: (info: Info) => void;
  label: string;
}> = ({ label, source, value, setValue }) => {
  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ ...value, [source]: e.target.value })}
        value={value.toString()}
        type={"checkbox"}
      />
    </>
  );
};

export default CheckboxField;
