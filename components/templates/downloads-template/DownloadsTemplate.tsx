import useDownloadsTemplateLogic from "@/lib/hooks/core/useDownloadsTemplateLogic";

import { Empty } from "@/components/atoms";
import { LoadingBox } from "@/components/molecules";
import {
  DownloadsHeader,
  EditResourceTitleForm,
  PopUp,
} from "@/components/organisms";

import { DownloadsList } from "./DownloadsTemplate.style";

const DownloadsTemplate = (): JSX.Element => {
  const {
    fileData,
    size,
    tabBarHeight,
    t,
    downloadedResources,
    keyExtrator,
    isLoading,
    message,
    renderItem,
    isMounted,
    animatedPopUpStyle,
    closePopUp,
  } = useDownloadsTemplateLogic();

  return (
    <>
      <DownloadsList
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "flex-start",
          paddingBottom: tabBarHeight + 16,
        }}
        ListHeaderComponent={
          <DownloadsHeader
            size={size}
            downloadedResources={downloadedResources.length}
          />
        }
        ListEmptyComponent={
          isLoading && message ? (
            <LoadingBox size={size} message={message} />
          ) : (
            <Empty
              text={t(
                "download-history-screen-translations.file-list-empty-msg"
              )}
              size={size}
            />
          )
        }
        data={downloadedResources}
        keyExtractor={keyExtrator}
        renderItem={renderItem}
      />
      {fileData && (
        <PopUp
          title={fileData.name.split(".")[0]}
          size={size}
          isMounted={isMounted}
          animatedPopUpStyle={animatedPopUpStyle}
          closePopUp={closePopUp}
        >
          <EditResourceTitleForm
            resourceData={fileData}
            editionMode="Downloaded-file"
            closePopUp={closePopUp}
          />
        </PopUp>
      )}
    </>
  );
};

export default DownloadsTemplate;
