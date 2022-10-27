import { useEffect, useState } from "react";

type ErrorProps = {
  error: any;
};

const Error = ({ error }: ErrorProps) => {
    let formatedError = '';
    let parsedError = error !== undefined ? JSON.parse(error) : null;
    if (parsedError) {
        if (parsedError.data) {
            formatedError = parsedError.data.message;
        } else if (parsedError.message) {
            formatedError = parsedError.message;
        } else {
            formatedError = JSON.stringify(error);
        }
    }

  return (
    formatedError && (
    <div className="error">
        { formatedError }
        
    <style jsx>{`
        .error {
            width: 50%;
            background: #a94545;
            color: white;
            text-align: left;
            margin: 0 auto;
            margin-top: 20px;
            padding: 15px;
            font-weight: bold;
        }
      `}</style>
    </div>
  ));
};

export default Error;
