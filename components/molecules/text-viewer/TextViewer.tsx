import { Fragment } from "react";
import { ScrollView } from "react-native";
import { useMarkdown } from "react-native-marked";

import { FlexibleContentBox } from "./TextViewer.style";

interface TextViewerProps {
  content: string;
}

const TextViewer = ({ content }: TextViewerProps): JSX.Element => {
  const elements = useMarkdown(content, { colorScheme: "light" });

  return (
    <FlexibleContentBox>
      <ScrollView style={{ width: "100%" }}>
        {elements.map((element, index) => {
          return <Fragment key={`demo_${index}`}>{element}</Fragment>;
        })}
      </ScrollView>
    </FlexibleContentBox>
  );
};

export default TextViewer;
