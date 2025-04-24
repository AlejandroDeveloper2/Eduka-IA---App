import useMyResourcesTemplateLogic from "@/lib/hooks/core/useMyResourcesTemplateLogic";

import { Empty } from "@/components/atoms";
import { Loader, LoadingBox } from "@/components/molecules";
import {
  MyResourcesHeader,
  PopUp,
  EditResourceTitleForm,
} from "@/components/organisms";

import { getViewer } from "@/lib/utils";

import { ResourcesList } from "./MyResourcesTemplate.style";

const ITEM_HEIGHT = 200;

const getItemLayout = (_: unknown, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

const MyResourcesTemplate = (): JSX.Element => {
  const {
    resourceData,
    editionMode,
    size,
    tabBarHeight,
    t,
    isLoading,
    message,
    onSelectFilter,
    selectedFilter,
    educativeResources,
    loadPercentage,
    isDownloading,
    progress,
    scaleValue,
    keyExtrator,
    renderItem,
    isMounted,
    animatedPopUpStyle,
    closePopUp,
  } = useMyResourcesTemplateLogic();

  return (
    <>
      {isDownloading ? (
        <Loader
          title={t("my-resources-screen-translations.loader-title")}
          description={t("my-resources-screen-translations.loader-description")}
          iconName="download-box-outline"
          size={size}
          loadPercentage={loadPercentage}
          progress={progress}
          scaleValue={scaleValue}
        />
      ) : (
        <ResourcesList
          getItemLayout={getItemLayout}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "flex-start",
            paddingBottom: tabBarHeight + 16,
          }}
          ListHeaderComponent={
            <MyResourcesHeader
              size={size}
              selectedFilter={selectedFilter}
              onSelectFilter={onSelectFilter}
            />
          }
          ListEmptyComponent={
            isLoading && message ? (
              <LoadingBox size={size} message={message} />
            ) : (
              <Empty
                text={t("my-resources-screen-translations.list-empty-msg")}
                size={size}
              />
            )
          }
          data={educativeResources}
          keyExtractor={keyExtrator}
          renderItem={renderItem}
        />
      )}
      {resourceData && (
        <PopUp
          title={resourceData.title}
          size={size}
          isMounted={isMounted}
          animatedPopUpStyle={animatedPopUpStyle}
          closePopUp={closePopUp}
        >
          {editionMode ? (
            <EditResourceTitleForm
              resourceData={resourceData}
              editionMode="Preview"
              closePopUp={closePopUp}
            />
          ) : (
            getViewer(resourceData.formatOption.key, size, resourceData.content)
          )}
        </PopUp>
      )}
    </>
  );
};

export default MyResourcesTemplate;
