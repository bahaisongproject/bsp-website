import React from "react";

import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

// Tabs styled in main.css
const ExcerptCard = ({ excerpt }) => (
  <Tabs
    className="max-w-xl my-4"
    defaultIndex={excerpt.source.excerpts
      .map((excerpt) => excerpt.language.language_name_en)
      .findIndex(
        (language_name_en) =>
          language_name_en === excerpt.language.language_name_en
      )}
  >
    <TabList className="ml-1">
      {excerpt.source.excerpts.map((excerpt) => (
        <Tab key="0">{excerpt.language.language_name_en}</Tab>
      ))}
    </TabList>
    <TabPanels>
      {excerpt.source.excerpts.map((excerpt) => (
        <TabPanel
          className="border-l-4 border-gray-800 my-1 p-8 xs:p-16 bg-gray-200 text-gray-900 font-serif shadow-lg rounded-sm"
          key="0"
        >
          <div className="">
            {(() => {
              let excerpt_text = excerpt.excerpt_text
                .split("  ")
                .map((paragraph, i) => {
                  return <p key={i}>{paragraph}</p>;
                });
              return <blockquote>{excerpt_text}</blockquote>;
            })()}
          </div>
          <div className="text-sm mt-8 flex flex-wrap justify-between">
            <div className="mt-2">{excerpt.source.source_author}</div>
            <div className="mt-2">{excerpt.source.source_description}</div>
          </div>
        </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
);

export default ExcerptCard;
