"use client";
import React, { useEffect, useState } from "react";
import ManipulationCard from "../_components/ManipulationCard";
import { getManipulations } from "@/server/Manipulations";
import { getTest } from "@/server/GetTest";
import LoadingPage from "@/components/LoadingPage";
const page = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [manipulations, setManipulations] = useState([]);
  const [selectedManipulations, setSelectedManipulations] = useState([]);

  useEffect(() => {
    const fetchManipulations = async () => {
      try {
        const { error, success } = await getManipulations();
        if (error) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        if (success) {
          success.push({
            name: "Not a manipulation",
            desc: "???",
            image_link: "https://via.placeholder.com/150",
          });
          setManipulations(success);
        }
      } catch (error) {
        console.error("Error fetching manipulations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        const { error, success } = await getTest({
          test_uuid: params.test_uuid,
        });
        if (error) {
          throw new Error(`HTTP error! status: ${error.status}`);
        }
        if (success) {
          setData(processTestItems(success));
        }
      } catch (error) {
        console.error("Error fetching the test:", error);
      } finally {
        setIsLoading(false);
      }
    };

    function processTestItems(success) {
      // Extract testItems from the success object
      const testItems = success.testItems;

      // Filter out items with non-null grades
      const unfinishedItems = testItems.filter((item) => item.grade === null);

      // Count the number of answered items
      const answeredCount = testItems.length - unfinishedItems.length;

      // Prepare the result object
      return {
        items: unfinishedItems,
        itemNumber: 1 + answeredCount,
      };
    }

    fetchManipulations();
    fetchData();
  }, []);

  const handleManipulationClick = (name) => {
    setSelectedManipulations((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [name];
      }
    });
  };

  if (!isLoading && data) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Question # {data.itemNumber}</h1>
        <div>{data.items[0].question}</div>
        <div
          id="manipulations"
          className="flex gap-5 items-center justify-center flex-wrap"
        >
          {manipulations
            .filter((manipulation) =>
              data.items[0].choices.includes(manipulation.name)
            )
            .map((manipulation, index) => (
              <ManipulationCard
                key={index}
                manipulation={manipulation}
                isSelected={selectedManipulations.includes(manipulation.name)}
                onClick={handleManipulationClick}
              />
            ))}
        </div>
      </div>
    );
  }

  return <LoadingPage />;
};

export default page;
