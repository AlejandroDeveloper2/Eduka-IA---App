import { WebView } from "react-native-webview";

import useScreenDimensions from "@/lib/hooks/core/useScreenDimensions";

import { renderHtmlPdf } from "@/lib/utils/renderHtmlPdf";

import { FlexibleWebViewBox } from "./WebViewer.style";

interface WebViewerProps {
  base64Content: string;
}

const WebViewer = ({ base64Content }: WebViewerProps): JSX.Element => {
  const html = renderHtmlPdf(base64Content);
  const size = useScreenDimensions();

  return (
    <FlexibleWebViewBox>
      <WebView
        nestedScrollEnabled
        originWhitelist={["*"]}
        source={{
          html,
        }}
        style={[
          {
            width: size === "Large" ? 600 : 320,
            height: 400,
          },
        ]}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />
    </FlexibleWebViewBox>
  );
};

export default WebViewer;
