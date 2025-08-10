import React from "react";

const fetchDataByIds = async (dispatch, apiAction, ids, setData) => {
  console.log("🔍 Fetching data by IDs:", ids);
  try {
    const result = await dispatch(apiAction({ ids }));
    if (result?.payload) {
      setData(result.payload);
      console.log("✅ Data fetched by IDs:", result.payload, ids,);
    } else {
      console.error("⚠️ No data returned for IDs:", ids);
    }
  } catch (error) {
    console.error("❌ Error fetching data by IDs:", error);
  }
};

export default fetchDataByIds;
