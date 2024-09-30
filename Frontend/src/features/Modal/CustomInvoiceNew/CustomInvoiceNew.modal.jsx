import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from "react-modal";
import { current_month, current_year } from '../../../common';
import CustomInvoiceForm from '../../../forms/Invoice/CustomInvoice/CustomInvoice.form';

const CustomInvoiceNewModal = (
    {
        isOpen,

        shouldCloseOnEsc,
        onCloseCreateInvoice,
        shouldCloseOnOverlayClick,
        onRequestClose,
        contentLabel,
        style,
        operation = "create"
    }
) => {


    return (
        <Modal
            id="modal"
            isOpen={isOpen}
            shouldCloseOnEsc={shouldCloseOnEsc}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            style={style}
        >

            <div className="projects-section-header sticky top-0 z-50 bg-white p-5">
                <p>
                    <button onClick={onCloseCreateInvoice} className="px-2 outline-1">
                        <FontAwesomeIcon icon="fa-solid fa-circle-xmark" className="text-xl text-red-500 hover:text-red-600" />
                    </button>
                    {contentLabel}
                </p>
                <p className="time">
                    {current_month}, {current_year}
                </p>
            </div>
            <div className="relative">
                <CustomInvoiceForm operation={operation} />
            </div>

        </Modal>
    );
};

export default CustomInvoiceNewModal;