import React, { useCallback } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewListIcon from "@material-ui/icons/ViewList";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { DATA_VIEW_MODE } from "../constans";
import PropTypes from "prop-types";

const ToggleDataViewMode = ({ dataViewMode, setDataViewMode }) => {
  const handleChangeDataViewMode = useCallback(
    (e, nextView) => {
      setDataViewMode(nextView);
    },
    [setDataViewMode]
  );
  return (
    <ToggleButtonGroup
      value={dataViewMode}
      exclusive
      onChange={handleChangeDataViewMode}
    >
      <ToggleButton
        value={DATA_VIEW_MODE.GRID}
        aria-label={DATA_VIEW_MODE.GRID}
      >
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton
        value={DATA_VIEW_MODE.TABLE}
        aria-label={DATA_VIEW_MODE.TABLE}
      >
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
export default ToggleDataViewMode;
ToggleDataViewMode.propTypes = {
  dataViewMode: PropTypes.oneOf([DATA_VIEW_MODE.GRID, DATA_VIEW_MODE.TABLE])
    .isRequired,
  setDataViewMode: PropTypes.func.isRequired,
};
