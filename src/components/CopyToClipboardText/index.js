import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// import Tooltip from "@material-ui/core/Tooltip";
import { useCopyToClipboard } from "react-use";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      cursor: "pointer",
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);

const CopyToClipboardText = ({ text }) => {
  const classes = useStyles();
  const [, copyToClipboard] = useCopyToClipboard();
  const [statusCopy, setStatusCopy] = useState("copy");
  // const tooltipTitle = () => {
  //   switch (statusCopy) {
  //     case "copy":
  //       return "Copy";
  //     case "copied":
  //       return "Copied";
  //     default:
  //       return "";
  //   }
  // };
  const onClickCopy = useCallback(() => {
    copyToClipboard(text);
    setStatusCopy("copied");
  }, [copyToClipboard, text]);
  return (
    // <Tooltip title={tooltipTitle} placement={"top"}>
    //   <Button className={classes.root} onClick={() => copyToClipboard(text)} />
    //   <FileCopyOutlinedIcon fontSize={"small"} className={classes.icon} />
    //   {text}
    // </Tooltip>
    <Box
      title={"Copy"}
      display={"flex"}
      alignItems={"center"}
      className={classes.root}
      onClick={onClickCopy}
    >
      <FileCopyOutlinedIcon fontSize={"small"} className={classes.icon} />
      {text}
    </Box>
  );
};
export default CopyToClipboardText;

CopyToClipboardText.propTypes = {
  text: PropTypes.string.isRequired,
};
