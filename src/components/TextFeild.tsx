import React, { useContext } from "react";
import { Info, InfoContext } from "../results/FormResult";

const TextField: React.FC<{
  source: keyof Info;
  label: string;
}> = ({ label, source }) => {
  const { value, setValue } = useContext(InfoContext);

  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ [source]: e.target.value })}
        value={value[source].toString()}
      />
    </>
  );
};

export default TextField;
