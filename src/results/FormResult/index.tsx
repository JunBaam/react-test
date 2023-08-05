import { useState } from "react";
import TextField from "../../components/textFeild";
import Form from "../../components/form";
import CheckboxField from "../../components/checkboxFeild";

export interface Info {
  name: string;
  password: string;
  confirm: boolean;
}

function FormResult() {
  const [info, setInfo] = useState<Info>({
    name: "",
    password: "",
    confirm: false,
  });

  const onSubmit = () => {
    if (info.confirm) {
      alert(`name: ${info.name}`);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextField value={info} source="name" setValue={setInfo} label="이름" />
      <CheckboxField
        value={info}
        source="confirm"
        setValue={setInfo}
        label="위 내용이 제출됩니다 동의하십니까?"
      />
    </Form>
  );
}

export default FormResult;
