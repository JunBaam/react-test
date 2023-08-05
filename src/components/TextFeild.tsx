import React from "react";
import { Info } from "../results/FormResult";

const TextField: React.FC<{
  value: Info;
  source: keyof Info;
  setValue: (info: Info) => void;
  label: string;
}> = ({ value, source, setValue, label }) => {
  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ ...value, [source]: e.target.value })}
        value={value[source].toString()}
      />
    </>
  );
};

export default TextField;
