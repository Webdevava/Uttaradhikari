"use client";

import UploadedDocuments from "@/components/dashboard/document-carousel";
import NomineeShareChart from "@/components/dashboard/nominee-chart";
import SampleChart from "@/components/dashboard/sample-chart";
// import EcommercePlatformChart from '@/components/dashboard/sample-chart'
import StatsSection from "@/components/dashboard/stats-section";
// import DocumentCarousel from '@/components/dashboard/document-carousel'
import React from "react";

const Dashboard = () => {
  return (
    <div className="mx-auto container   p-4 sm:p-6">
      <StatsSection />
      <div className="grid grid-cols-5 gap-5 ">
        <div className="col-span-3 h-full">
          <SampleChart />
        </div>
        <div className="col-span-2 h-full">
          <NomineeShareChart />
        </div>
      </div>
      <UploadedDocuments />
    </div>
  );
};

export default Dashboard;
