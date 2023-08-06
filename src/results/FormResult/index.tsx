import { createContext, useReducer, useState } from "react";
import TextField from "../../components/TextField";
import Form from "../../components/form";
import CheckboxField from "../../components/checkboxFeild";

export interface Info {
  name: string;
  confirm: boolean;
}

const defaultInfo: Info = {
  name: "",
  confirm: false,
};

// type PartialInfo =
//   | { name: string }
//   | { confirm: boolean }
//   | { password: string }
//   | { address: string };

type PartialInfo = {
  [infoKey in keyof Info]: Record<infoKey, Info[infoKey]>;
}[keyof Info];

export const InfoContext = createContext<{
  value: Info;
  setValue: (v: PartialInfo) => void;
}>({
  value: defaultInfo,
  setValue: (v) => {},
});

function FormResult() {
  // const [info, setInfo] = useState<Info>(defaultInfo);
  const [info, setInfo] = useReducer((prevInfo: Info, partialInfo: any) => {
    return {
      ...prevInfo,
      ...partialInfo,
    };
  }, defaultInfo);

  const onSubmit = () => {
    if (info.confirm) {
      alert(`name: ${info.name}`);
    }
  };

  // const onChange = (value: Record<string, string | boolean>) => {
  //   //key를 통해 이전값을 새로운값으로 덮어쓰기
  //   setInfo((prev) => ({ ...prev, ...value }));
  // };

  return (
    <InfoContext.Provider value={{ value: info, setValue: setInfo }}>
      <Form onSubmit={onSubmit}>
        <TextField source="name" label="이름" />
        <CheckboxField
          source="confirm"
          label="위 내용이 제출됩니다 동의하십니까?"
        />
      </Form>
    </InfoContext.Provider>
  );
}

export default FormResult;
