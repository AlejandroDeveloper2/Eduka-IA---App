import { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";

import { SizeType } from "@/lib/types";

import { InputText, ButtonWithLabel } from "@/components/molecules";

import Dropdown from "../dropdown/Dropdown";
import PromptPanel from "../prompt-panel/PromptPanel";

import {
  FormButtons,
  FormContainer,
  FieldTable,
  FieldRow,
  FieldColumn,
} from "./Form.style";
import AttachFileBox from "../attach-file-box/AttachFileBox";

interface FormProps {
  size: SizeType;
  submitButtonText: string;
  messageLoading?: string;
  isLoading?: boolean;
  buttonIconName: keyof typeof Ionicons.glyphMap;
  children: ReactNode | ReactNode[];
  handleSubmit: () => void;
}

interface FieldsTableProps {
  children: ReactNode | ReactNode[];
}

interface FieldRowProps {
  children: ReactNode | ReactNode[];
}

interface FieldColProps {
  children: ReactNode | ReactNode[];
  size: SizeType;
  fill: boolean;
}

const FormFieldCol = ({ children, size, fill }: FieldColProps): JSX.Element => {
  return (
    <FieldColumn size={size} fill={fill}>
      {children}
    </FieldColumn>
  );
};

const FormFieldRow = ({ children }: FieldRowProps): JSX.Element => {
  return <FieldRow>{children}</FieldRow>;
};

const FormFieldTable = ({ children }: FieldsTableProps): JSX.Element => {
  return <FieldTable>{children}</FieldTable>;
};

const Form = ({
  size,
  submitButtonText,
  messageLoading,
  isLoading,
  buttonIconName,
  children,
  handleSubmit,
}: FormProps): JSX.Element => {
  return (
    <FormContainer>
      {children}
      <FormButtons>
        <ButtonWithLabel
          label={submitButtonText}
          iconName={buttonIconName}
          size={size}
          variant="primary"
          width="fill"
          onPress={handleSubmit}
          loading={isLoading}
          messageLoading={messageLoading}
          disabled={isLoading}
        />
      </FormButtons>
    </FormContainer>
  );
};

Form.Fields = FormFieldTable;
Form.Row = FormFieldRow;
Form.Col = FormFieldCol;
Form.Input = InputText;
Form.Dropdown = Dropdown;
Form.PromptPanel = PromptPanel;
Form.AttachFileBox = AttachFileBox;

export default Form;
