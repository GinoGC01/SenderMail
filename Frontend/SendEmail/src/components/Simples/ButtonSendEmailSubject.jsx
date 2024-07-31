// import { useState, useContext } from "react";
// import { StudiosContext } from "../../context/StudiosContext";
import SendMessage from "../Icons/SendMessage";
import Loader01 from "../Icons/Loader01";
import PropTypes from "prop-types";
import useEnviarEmails from "../../hooks/useEnviarEmails";

export default function ButtonSendEmailSubject({
  asuntoContent,
  text,
  typemessage,
  url,
}) {
  const { enviarEmails, isLoading } = useEnviarEmails({
    url,
    typemessage,
    asuntoContent,
  });

  return (
    <button onClick={enviarEmails} disabled={isLoading} className="button-form">
      {isLoading ? (
        <div className={"loader-01"}>
          <Loader01 />
        </div>
      ) : (
        <div className={"off-loader-01"}>
          {text} <SendMessage />
        </div>
      )}
    </button>
  );
}

ButtonSendEmailSubject.propTypes = {
  asuntoContent: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  typemessage: PropTypes.string,
  url: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
};
