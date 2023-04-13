import React, { useState } from "react";
import { type SetStateAction } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import type { FC } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import "antd/dist/reset.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cat.net/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Pdf: React.FC = () => {
  // 设置文件地址
  const [file, setFile] = useState("gopl-zh.pdf");
  // 设置总页数
  const [numPages, setNumPages] = useState(0);
  // 设置当前页
  const [pageNumber, setPageNumber] = useState(1);
  // 是否为最后一页
  // const [isLast, setIsLast] = useState(false);
  // 初始化
  function onDocumentLoadSuccess({
    numPages,
  }: {
    numPages: SetStateAction<null>;
  }) {
    setNumPages(numPages);
  }

  const [current, setCurrent] = useState(3);

  const onChange: PaginationProps["onChange"] = (page) => {
    pageNumber < numPages ? setPageNumber(page) : "";
  };
  return (
    <div className="previrew">
      {/* file: 可以是 URL、base64 内容、Uint8Array 等*/}
      <Document
        className="flex preview md:justify-center"
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
        <Pagination
          className="absolute hidden transition-all bottom-5 pagin"
          simple
          current={pageNumber}
          onChange={onChange}
          total={numPages}
        />
      </Document>
    </div>
  );
};

export default Pdf;
