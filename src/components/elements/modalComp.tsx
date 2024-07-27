import React, { useState } from "react";
import { Button, Modal } from "antd";

type ModalProps = {
  open: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
  title?: string;
};

const ModalComp = ({ open,  onCancel, children, title }: ModalProps) => {
  return (
    <>
      <Modal
      footer={false}
        open={open}
        title={title}
        onCancel={onCancel}>
        {children}
      </Modal>
    </>
  );
};

export default ModalComp;
