import { Button } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useState,useCallback } from 'react';
import { useCopyToClipboard } from 'react-use';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      cursor: 'pointer',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);
const STATUS_COPY = {
  COPY: 'copy',
  COPIED: 'copied',
};
const TITLE_BY_STATUS = {
  [STATUS_COPY.COPY]: 'Copy',
  [ STATUS_COPY.COPIED]: 'Copied'
}

export const CopyToClipBoardText = ({ text }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const classes = useStyles();
  const [stateCopy, setStateCopy] = useState(STATUS_COPY.COPY);


  // const getTitleTooltip = () => {
  //   switch (stateCopy) {
  //     case STATUS_COPY.COPY:
  //       return 'Copy';
  //     case STATUS_COPY.COPIED:
  //       return 'Copied';
  //     default:
  //       return '';
  //   }
  // };
  const onClickCopy = useCallback(() => {
    copyToClipboard(text);
    setStateCopy(STATUS_COPY.COPIED);
  }, [copyToClipboard, text]);

  const onClickAwayCopy = useCallback(() => {
    setStateCopy(STATUS_COPY.COPY);
  }, [setStateCopy]);

  return (
    <ClickAwayListener onClickAway={onClickAwayCopy}>
      <Tooltip title={TITLE_BY_STATUS[stateCopy]}>
        <Button className={classes.root} display='flex' onClick={onClickCopy}>
          <FileCopyIcon fontSize='small' className={classes.icon} />
          {text}
        </Button>
      </Tooltip>
    </ClickAwayListener>
  );
};
